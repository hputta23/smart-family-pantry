
import React from 'react';

export default function TripOptimizationDetails() {
  return (
    <>
      <div>
  {/* Top App Bar (Suppressing standard shell for Task-Focused "Back" view) */}
  <header className="bg-background dark:bg-background w-full top-0 sticky z-50">
    <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <button className="hover:opacity-80 transition-opacity p-2 rounded-full hover:bg-surface-container">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Trip Optimization</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-on-surface-variant">share</span>
      </div>
    </div>
  </header>
  <main className="max-w-4xl mx-auto px-container-padding py-stack-md">
    {/* Smart Prediction Module: Status Banner */}
    <div className="mb-stack-lg p-stack-md rounded-xl bg-[#FFF9F0] border border-secondary-fixed shadow-sm flex items-start gap-4">
      <span className="material-symbols-outlined text-secondary text-2xl" data-weight="fill">lightbulb</span>
      <div>
        <p className="font-label-bold text-label-bold text-on-surface">Optimization Insight</p>
        <p className="font-body-md text-body-md text-on-surface-variant">Based on your current 18-item list, switching from a single store to a dual-store run saves significant money but adds travel time.</p>
      </div>
    </div>
    {/* Strategy Comparison: Bento Grid Style */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mb-stack-lg">
      {/* Optimal 1-Store Plan */}
      <div className="bg-white border border-outline-variant p-stack-md rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Single Store</p>
            <h3 className="font-headline-md text-headline-md text-on-surface">Walmart Supercenter</h3>
          </div>
          <span className="material-symbols-outlined text-primary bg-primary-fixed-dim/20 p-2 rounded-lg">storefront</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between border-b border-surface-container pb-2">
            <span className="font-body-md text-body-md text-on-surface-variant">Total Cost</span>
            <span className="font-label-bold text-label-bold text-on-surface">$142.50</span>
          </div>
          <div className="flex justify-between border-b border-surface-container pb-2">
            <span className="font-body-md text-body-md text-on-surface-variant">Drive Time</span>
            <span className="font-label-bold text-label-bold text-on-surface">12 mins</span>
          </div>
        </div>
        <button className="mt-6 w-full py-3 bg-surface-container-high text-on-surface-variant font-label-bold rounded-lg hover:bg-surface-container-highest transition-colors">
          View 1-Store List
        </button>
      </div>
      {/* Optimal 2-Store Plan */}
      <div className="bg-white border-2 border-primary p-stack-md rounded-xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-bl-lg">
          Recommended
        </div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider mb-1">Dual Store</p>
            <h3 className="font-headline-md text-headline-md text-on-surface">Aldi + Costco</h3>
          </div>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg" data-weight="fill">auto_awesome</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between border-b border-surface-container pb-2">
            <span className="font-body-md text-body-md text-on-surface-variant">Total Cost</span>
            <div className="text-right">
              <span className="font-label-bold text-label-bold text-primary">$118.20</span>
              <p className="text-xs text-primary font-bold">Save $24.30</p>
            </div>
          </div>
          <div className="flex justify-between border-b border-surface-container pb-2">
            <span className="font-body-md text-body-md text-on-surface-variant">Drive Time</span>
            <div className="text-right">
              <span className="font-label-bold text-label-bold text-on-surface">28 mins</span>
              <p className="text-xs text-secondary font-bold">+16 mins extra</p>
            </div>
          </div>
        </div>
        <button className="mt-6 w-full py-3 bg-primary text-on-primary font-label-bold rounded-lg hover:opacity-90 transition-opacity shadow-sm">
          Accept Optimized Plan
        </button>
      </div>
    </div>
    {/* Savings Threshold Alert */}
    <div className="mb-stack-lg p-stack-md rounded-xl bg-error-container/30 border border-error/20 flex items-center gap-4">
      <span className="material-symbols-outlined text-error">info</span>
      <p className="font-body-md text-body-md text-on-error-container italic">
        Savings less than $8? The app usually flags this as "Probably not worth the extra trip" to respect your time. Today's savings are <span className="font-bold">$24.30</span>.
      </p>
    </div>
    {/* Item Breakdown: The "Board" List */}
    <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden mb-stack-lg">
      <div className="bg-surface-container-low px-stack-md py-4 border-b border-outline-variant flex justify-between items-center">
        <h4 className="font-headline-md text-headline-md text-on-surface">Split Breakdown</h4>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white border border-outline-variant rounded-full text-xs font-label-bold text-on-surface-variant">By Category</span>
          <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-label-bold">By Store</span>
        </div>
      </div>
      {/* Store 1: Aldi */}
      <div className="p-stack-md border-b border-surface-container">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-6 bg-[#002C95] rounded-full" />
          <h5 className="font-label-bold text-label-bold text-on-surface">ALDI (12 items) — <span className="text-primary">$42.80</span></h5>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">radio_button_unchecked</span>
              <span className="font-body-md text-body-md text-on-surface">Organic Bananas (Bunch)</span>
            </div>
            <span className="font-label-sm text-label-sm text-outline">$1.89</span>
          </li>
          <li className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">radio_button_unchecked</span>
              <span className="font-body-md text-body-md text-on-surface">Avocados (3ct bag)</span>
            </div>
            <span className="font-label-sm text-label-sm text-outline">$3.49</span>
          </li>
          <li className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">radio_button_unchecked</span>
              <span className="font-body-md text-body-md text-on-surface">Whole Milk (1 gal)</span>
            </div>
            <span className="font-label-sm text-label-sm text-outline">$2.95</span>
          </li>
          <li className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">radio_button_unchecked</span>
              <span className="font-body-md text-body-md text-on-surface">Greek Yogurt 32oz</span>
            </div>
            <span className="font-label-sm text-label-sm text-outline">$5.20</span>
          </li>
        </ul>
      </div>
      {/* Store 2: Costco */}
      <div className="p-stack-md">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-6 bg-[#E31837] rounded-full" />
          <h5 className="font-label-bold text-label-bold text-on-surface">COSTCO (6 items) — <span className="text-primary">$75.40</span></h5>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">radio_button_unchecked</span>
              <span className="font-body-md text-body-md text-on-surface">Bulk Paper Towels (12ct)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-secondary-container/20 text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase">Best Value</span>
              <span className="font-label-sm text-label-sm text-outline">$19.99</span>
            </div>
          </li>
          <li className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">radio_button_unchecked</span>
              <span className="font-body-md text-body-md text-on-surface">Kirkland Olive Oil (2L)</span>
            </div>
            <span className="font-label-sm text-label-sm text-outline">$24.50</span>
          </li>
          <li className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">radio_button_unchecked</span>
              <span className="font-body-md text-body-md text-on-surface">Frozen Mixed Berries (4lb)</span>
            </div>
            <span className="font-label-sm text-label-sm text-outline">$12.99</span>
          </li>
        </ul>
      </div>
    </div>
    {/* Map Section: Tonal Layering */}
    <div className="rounded-xl overflow-hidden border border-outline-variant shadow-sm bg-white p-stack-md">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-label-bold text-label-bold text-on-surface">Optimized Route</h4>
        <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-sm">directions_car</span>
          8.4 miles total
        </div>
      </div>
      <div className="relative h-64 w-full bg-surface-container rounded-lg overflow-hidden border border-surface-container-high">
        <img className="w-full h-full object-cover" data-alt="A high-fidelity minimalist digital map interface showing a suburban driving route with three circular markers labeled Home, Aldi, and Costco. The map uses a clean, light-mode palette with teal for the primary route line and soft grays for side streets. The lighting is bright and even, conveying a sense of organized modern planning and efficiency in a domestic setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8_rOk0Hpbwl8UBTyslcMdlzI-D6DH1d_h-YFynzrl-D2gderyXxyXfrWJ5dMclGoE1hgb7A1dorZPxDXlMSgVT_zm3kG0tBuf_ZpHoKrWD87W49fAPqlPXJYeNlU3LEnsV9ZL82GBmmNtL5uYBdaDfl97DeuNv9BHjyDsNl14C6o9OH43ggPJ72sPqjA1YnTsjvY_5CGjoGvKJI4sQ3ZNAxhelfCKN1Iv3db_mUvvGvIH-dzisd7lVaYNrdQATy-QmLWejcRPgmV" />
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        {/* Mock Map Overlays */}
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md border border-outline-variant">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
            <span className="font-label-sm text-label-sm">Optimized path active</span>
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* Bottom Navigation (Standard Shell) */}
  
</div>

    </>
  );
}
