-- Family account (one per household)
CREATE TABLE families (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_name  TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Sub-profiles within a family (parent, teenager, etc.)
CREATE TABLE profiles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id   UUID REFERENCES families(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_emoji TEXT DEFAULT '🧑',
  role        TEXT CHECK (role IN ('admin','member')) DEFAULT 'member',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Family auth credentials (one set per family, not per profile)
CREATE TABLE family_auth (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id    UUID REFERENCES families(id) ON DELETE CASCADE UNIQUE,
  email        TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Household metadata for dietary guidance
CREATE TABLE household_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id   UUID REFERENCES families(id) ON DELETE CASCADE,
  age_range   TEXT CHECK (age_range IN ('0-2','3-8','9-13','14-18','19-50','51-70','71+')),
  sex         TEXT CHECK (sex IN ('male','female','prefer_not_to_say')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Canonical product catalog (normalized product identities)
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_name  TEXT NOT NULL,           -- "Whole Milk, 1 Gallon"
  brand           TEXT,                    -- "Darigold" (nullable for generics)
  category        TEXT NOT NULL,           -- "Dairy", "Produce", "Pantry", etc.
  unit_of_measure TEXT NOT NULL,           -- "gallon", "oz", "each", "lb"
  unit_size       NUMERIC,                 -- 1, 12, 64, etc.
  upc             TEXT UNIQUE,             -- nullable
  usda_food_code  TEXT,                    -- links to FoodData Central
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Receipt OCR aliases → canonical product mapping
CREATE TABLE product_aliases (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alias       TEXT NOT NULL UNIQUE,        -- "KRGR 2% MLK HLF GL"
  product_id  UUID REFERENCES products(id),
  confidence  NUMERIC CHECK (confidence BETWEEN 0 AND 1),
  source      TEXT CHECK (source IN ('ocr_confirmed','manual','ml_model')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Store locations
CREATE TABLE stores (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chain_name  TEXT NOT NULL,               -- "Aldi", "Walmart", "Costco"
  location    TEXT NOT NULL,               -- "123 Main St, Arlington VA"
  lat         NUMERIC,
  lng         NUMERIC,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Price observations (crowdsourced + flyer)
CREATE TABLE price_observations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID REFERENCES products(id),
  store_id    UUID REFERENCES stores(id),
  price       NUMERIC(10,2) NOT NULL,
  unit_price  NUMERIC(10,2),               -- price per standard unit for comparison
  source      TEXT CHECK (source IN ('receipt_scan','flyer_scrape','manual','partner_feed')),
  observed_at TIMESTAMPTZ NOT NULL,        -- when the price was actually seen
  created_at  TIMESTAMPTZ DEFAULT now(),
  family_id   UUID REFERENCES families(id) -- null = public contribution
);

-- Computed: latest price per product per store (materialized, refreshed every 4 hours)
CREATE MATERIALIZED VIEW latest_prices AS
SELECT DISTINCT ON (product_id, store_id)
  product_id,
  store_id,
  price,
  unit_price,
  source,
  observed_at,
  EXTRACT(EPOCH FROM (now() - observed_at)) / 86400 AS age_days
FROM price_observations
ORDER BY product_id, store_id, observed_at DESC;

-- Shopping list items
CREATE TABLE list_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id     UUID REFERENCES families(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id),
  custom_name   TEXT,                      -- if not matched to a product yet
  quantity      NUMERIC DEFAULT 1,
  unit          TEXT,
  added_by      UUID REFERENCES profiles(id),
  checked_off   BOOLEAN DEFAULT false,
  checked_off_by UUID REFERENCES profiles(id),
  checked_off_at TIMESTAMPTZ,
  suggested_store_id UUID REFERENCES stores(id),  -- computed by price engine
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Pantry inventory (what's currently in the home)
CREATE TABLE pantry_inventory (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id       UUID REFERENCES families(id) ON DELETE CASCADE,
  product_id      UUID REFERENCES products(id),
  quantity        NUMERIC NOT NULL DEFAULT 1,
  unit            TEXT,
  purchase_date   DATE,
  estimated_empty_date DATE,              -- computed from consumption rate
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Consumption history (used for predictive restocking)
CREATE TABLE consumption_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id   UUID REFERENCES families(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id),
  quantity    NUMERIC NOT NULL,
  event_date  DATE NOT NULL,
  source      TEXT CHECK (source IN ('receipt_scan','manual_log')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Scanned receipts (raw + parsed)
CREATE TABLE receipts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id       UUID REFERENCES families(id) ON DELETE CASCADE,
  scanned_by      UUID REFERENCES profiles(id),
  store_id        UUID REFERENCES stores(id),
  store_raw_text  TEXT,                   -- what OCR extracted for store name
  total_amount    NUMERIC(10,2),
  receipt_date    DATE,
  image_url       TEXT,                   -- S3 or Cloudflare R2 path
  ocr_raw_text    TEXT,                   -- raw OCR dump
  processing_status TEXT CHECK (processing_status IN ('pending','processing','review_needed','confirmed','failed')),
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Line items extracted from a receipt
CREATE TABLE receipt_line_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id      UUID REFERENCES receipts(id) ON DELETE CASCADE,
  raw_text        TEXT NOT NULL,          -- exactly as it appeared on receipt
  matched_product_id UUID REFERENCES products(id),
  match_confidence NUMERIC CHECK (match_confidence BETWEEN 0 AND 1),
  quantity        NUMERIC DEFAULT 1,
  unit_price      NUMERIC(10,2),
  total_price     NUMERIC(10,2),
  user_confirmed  BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Budget configuration
CREATE TABLE budgets (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id    UUID REFERENCES families(id) ON DELETE CASCADE UNIQUE,
  monthly_limit NUMERIC(10,2) NOT NULL,
  reset_day    INT CHECK (reset_day BETWEEN 1 AND 28) DEFAULT 1,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);
