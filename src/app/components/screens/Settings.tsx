
import React from 'react';

export default function Settings() {
  return (
    <>
      <div>
  {/* TopAppBar */}
  <header className="fixed top-0 w-full z-50 bg-background py-4 px-container-padding">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img alt="User" className="w-10 h-10 rounded-full border border-outline-variant bg-surface-container-high" data-alt="A clean, minimalist profile avatar placeholder for a high-end pantry management application. The style is modern and domestic, featuring soft neutral tones and professional lighting against a warm off-white background. The aesthetic is clean, organized, and welcoming, fitting perfectly into a modern kitchen digital ecosystem." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvAQDAxCQS1XkKFEAb42zT_yzeIQoudY5JrYy0W3MFiBEcfeRGlMFUd5SiEYaQVQBKSc3jm76AQaBRoSQGac0JZmcFxddilmSlkpCQjJ7AXK8ZvcA79BnnCcMZNv2XYYi5S9yqGPKcNULRqH34ADGlrLcjTaoLNHta1cnOqhdzoS48H4kNycbayPb075IVlONK5iZC5qWD_24Pj-_658WthNJrOp9IWi7UrjhXNHy53wMsE5J5QMjWXHFwMh7qRIN18ks6tCXvgsOu" />
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Smart Family Pantry</h1>
      </div>
      <button className="material-symbols-outlined text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150">notifications</button>
    </div>
  </header>
  {/* Content Canvas */}
  <main className="max-w-4xl mx-auto pt-24 pb-32 px-container-padding space-y-stack-lg">
    {/* Page Headline */}
    <div className="space-y-stack-sm">
      <h2 className="font-headline-lg text-headline-lg text-on-surface">Settings</h2>
      <p className="text-on-surface-variant font-body-md">Manage your domestic hub and family preferences.</p>
    </div>
    {/* Settings Groups */}
    <div className="space-y-gutter">
      {/* 1. Family */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden kitchen-board-shadow">
        <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" data-weight="fill" style={{fontVariationSettings: '"FILL" 1'}}>family_history</span>
          <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant">Family</h3>
        </div>
        <div className="divide-y divide-outline-variant">
          <div className="p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div>
              <p className="font-label-bold text-on-surface">Manage Profiles</p>
              <p className="text-label-sm text-on-surface-variant">4 active members: Sarah, Mark, +2</p>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-label-bold text-on-surface">Family Code</p>
              <p className="text-label-sm font-mono text-primary bg-primary-fixed/30 px-2 py-0.5 rounded">PANTRY-8821-K</p>
            </div>
            <button className="text-primary font-label-bold hover:underline">Copy Link</button>
          </div>
        </div>
      </section>
      {/* 2. Stores */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden kitchen-board-shadow">
        <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" data-weight="fill" style={{fontVariationSettings: '"FILL" 1'}}>store</span>
          <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant">Stores</h3>
        </div>
        <div className="divide-y divide-outline-variant">
          <div className="p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-outline">shopping_cart</span>
              </div>
              <div>
                <p className="font-label-bold text-on-surface">Preferred Stores</p>
                <p className="text-label-sm text-on-surface-variant">Whole Foods, Trader Joe's</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">settings</span>
          </div>
          <div className="p-6 bg-surface-container-lowest">
            <p className="font-label-bold text-on-surface mb-2">Home Location</p>
            <div className="w-full h-32 rounded-lg bg-surface-container-high relative overflow-hidden">
              <img className="w-full h-full object-cover opacity-50" data-alt="A clean, minimalist map representation of a residential neighborhood in San Francisco. The map uses a soft, light-mode palette with teal and slate accents for landmarks. The style is professional and domestic, avoiding high-contrast GPS visuals in favor of a calm, organized kitchen board aesthetic." data-location="San Francisco" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOXBffr6XWpt2_vtKaAuRzYLQUa7PY9zPh-icmXbF4zjNFKGL-XVkJsfDtOJncLHlFAWIdiicCzLhB99fSKotcBQrDOvwrkYsTpRNgGONx_Vb5y0Uoy8lzFy6dKUNIaF2FIDwKsIIcilHQYoAnEJjArM4PYShuKM9l9LvFLS-LeSTeRZ8TnJoK2v9jAkgGtA4pmoas8kR4VZBmCuS_Q_Aq9NDniAPvVQEnd10z8dQXmjrwFT23y2PDsUWH9-nNNW5D9Q9HgvmWboXC" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-4xl" data-weight="fill" style={{fontVariationSettings: '"FILL" 1'}}>location_on</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3. Health Nudges */}
      <section className="bg-primary-container/5 border border-primary/20 rounded-xl overflow-hidden kitchen-board-shadow">
        <div className="px-6 py-4 bg-primary-container/10 border-b border-primary/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary" data-weight="fill" style={{fontVariationSettings: '"FILL" 1'}}>eco</span>
            <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-primary">Health Nudges</h3>
          </div>
          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked className="sr-only peer" type="checkbox" />
            <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
          </label>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-body-md text-on-surface-variant italic">AI-suggested healthier alternatives based on your shopping patterns.</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-surface-container-lowest border border-outline-variant rounded-full text-label-sm text-on-surface">Low Sugar Alerts</span>
            <span className="px-3 py-1 bg-surface-container-lowest border border-outline-variant rounded-full text-label-sm text-on-surface">Whole Grain Swaps</span>
            <span className="px-3 py-1 bg-primary text-white rounded-full text-label-sm flex items-center gap-1">
              Fresh Produce Focus <span className="material-symbols-outlined text-sm">check</span>
            </span>
          </div>
        </div>
      </section>
      {/* 4. Notifications */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden kitchen-board-shadow">
        <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" data-weight="fill" style={{fontVariationSettings: '"FILL" 1'}}>notifications_active</span>
          <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant">Notifications</h3>
        </div>
        <div className="divide-y divide-outline-variant">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-label-bold text-on-surface">Restock Predictions</p>
              <p className="text-label-sm text-on-surface-variant">Get notified when staples are running low.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-label-bold text-on-surface">Sales &amp; Deals</p>
              <p className="text-label-sm text-on-surface-variant">Price drops at your preferred stores.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-container" />
            </label>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-label-bold text-on-surface">Budget Alerts</p>
              <p className="text-label-sm text-on-surface-variant">Weekly spending milestone warnings.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </div>
      </section>
      {/* 5. Privacy */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden kitchen-board-shadow">
        <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" data-weight="fill" style={{fontVariationSettings: '"FILL" 1'}}>security</span>
          <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant">Privacy</h3>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="font-label-bold text-on-surface">Data Sharing</p>
            <p className="text-label-sm text-on-surface-variant pr-8">Anonymized pantry data helps improve community predictions and price tracking.</p>
          </div>
          <button className="px-4 py-2 bg-surface-container-high text-on-surface-variant text-label-bold rounded-lg hover:bg-outline-variant transition-colors">Opt-out</button>
        </div>
      </section>
      {/* 6. Data */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden kitchen-board-shadow">
        <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" data-weight="fill" style={{fontVariationSettings: '"FILL" 1'}}>database</span>
          <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant">Data</h3>
        </div>
        <div className="divide-y divide-outline-variant">
          <div className="p-6 flex items-center justify-between hover:bg-surface-container-low cursor-pointer transition-colors group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-outline group-hover:text-primary">file_export</span>
              <p className="font-label-bold text-on-surface">Export JSON</p>
            </div>
            <span className="material-symbols-outlined text-outline">download</span>
          </div>
          <div className="p-6 flex items-center justify-between hover:bg-error-container/20 cursor-pointer transition-colors group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-error">delete_forever</span>
              <p className="font-label-bold text-error">Delete Account</p>
            </div>
            <p className="text-label-sm text-error/60 italic">Permanent action</p>
          </div>
        </div>
      </section>
    </div>
    {/* Logout Section */}
    <div className="flex justify-center pt-8">
      <button className="flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-label-bold rounded-full hover:bg-primary hover:text-white transition-all active:scale-95">
        <span className="material-symbols-outlined">logout</span>
        Logout from Device
      </button>
    </div>
  </main>
  {/* BottomNavBar */}
  
</div>

    </>
  );
}
