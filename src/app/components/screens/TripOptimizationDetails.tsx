'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/components/Toast';

export default function TripOptimizationDetails() {
  const router = useRouter();
  const { showToast } = useToast();
  const [acceptedPlan, setAcceptedPlan] = useState<string | null>(null);
  const [viewBy, setViewBy] = useState<'store' | 'category'>('store');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleAcceptPlan = (plan: string) => {
    setAcceptedPlan(plan);
    showToast(`${plan} plan accepted! Your list has been optimized.`);
  };

  const handleShare = async () => {
    const text = 'Check out my optimized shopping trip on Smart Family Pantry!';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Trip Optimization', text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      showToast('Trip details copied to clipboard!');
    }
  };

  const toggleItem = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <>
      <div>
        <header className="bg-background w-full top-0 sticky z-50">
          <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="hover:opacity-80 transition-opacity p-2 rounded-full hover:bg-surface-container">
                <span className="material-symbols-outlined text-primary">arrow_back</span>
              </button>
              <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Trip Optimization</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleShare}>
                <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">share</span>
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-container-padding py-stack-md pb-32">
          {/* Status Banner */}
          <div className="mb-stack-lg p-stack-md rounded-xl bg-[#FFF9F0] border border-secondary-fixed shadow-sm flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary text-2xl">lightbulb</span>
            <div>
              <p className="font-label-bold text-label-bold text-on-surface">Optimization Insight</p>
              <p className="font-body-md text-body-md text-on-surface-variant">Based on your current 18-item list, switching from a single store to a dual-store run saves significant money but adds travel time.</p>
            </div>
          </div>

          {/* Strategy Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mb-stack-lg">
            {/* Single Store */}
            <div className={`bg-white border p-stack-md rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${acceptedPlan === 'single' ? 'border-2 border-primary' : 'border-outline-variant'}`}>
              {acceptedPlan === 'single' && (
                <div className="absolute top-0 right-0 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-bl-lg">Selected</div>
              )}
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
              <button
                onClick={() => handleAcceptPlan('single')}
                disabled={acceptedPlan === 'single'}
                className={`mt-6 w-full py-3 font-label-bold rounded-lg transition-colors ${
                  acceptedPlan === 'single'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {acceptedPlan === 'single' ? '✓ Plan Selected' : 'View 1-Store List'}
              </button>
            </div>
            {/* Dual Store */}
            <div className={`bg-white p-stack-md rounded-xl shadow-md relative overflow-hidden ${acceptedPlan === 'dual' ? 'border-2 border-primary' : 'border-2 border-primary'}`}>
              <div className="absolute top-0 right-0 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-bl-lg">
                {acceptedPlan === 'dual' ? 'Selected' : 'Recommended'}
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider mb-1">Dual Store</p>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Aldi + Costco</h3>
                </div>
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">auto_awesome</span>
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
              <button
                onClick={() => handleAcceptPlan('dual')}
                disabled={acceptedPlan === 'dual'}
                className={`mt-6 w-full py-3 font-label-bold rounded-lg transition-opacity shadow-sm ${
                  acceptedPlan === 'dual'
                    ? 'bg-primary text-on-primary opacity-100'
                    : 'bg-primary text-on-primary hover:opacity-90'
                }`}
              >
                {acceptedPlan === 'dual' ? '✓ Plan Accepted' : 'Accept Optimized Plan'}
              </button>
            </div>
          </div>

          {/* Savings Alert */}
          <div className="mb-stack-lg p-stack-md rounded-xl bg-error-container/30 border border-error/20 flex items-center gap-4">
            <span className="material-symbols-outlined text-error">info</span>
            <p className="font-body-md text-body-md text-on-error-container italic">
              Savings less than $8? The app usually flags this as &quot;Probably not worth the extra trip&quot; to respect your time. Today&apos;s savings are <span className="font-bold">$24.30</span>.
            </p>
          </div>

          {/* Item Breakdown */}
          <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden mb-stack-lg">
            <div className="bg-surface-container-low px-stack-md py-4 border-b border-outline-variant flex justify-between items-center">
              <h4 className="font-headline-md text-headline-md text-on-surface">Split Breakdown</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewBy('category')}
                  className={`px-3 py-1 rounded-full text-xs font-label-bold ${viewBy === 'category' ? 'bg-primary text-on-primary' : 'bg-white border border-outline-variant text-on-surface-variant'}`}
                >
                  By Category
                </button>
                <button
                  onClick={() => setViewBy('store')}
                  className={`px-3 py-1 rounded-full text-xs font-label-bold ${viewBy === 'store' ? 'bg-primary text-on-primary' : 'bg-white border border-outline-variant text-on-surface-variant'}`}
                >
                  By Store
                </button>
              </div>
            </div>
            {/* Aldi */}
            <div className="p-stack-md border-b border-surface-container">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-6 bg-[#002C95] rounded-full" />
                <h5 className="font-label-bold text-label-bold text-on-surface">ALDI (12 items) — <span className="text-primary">$42.80</span></h5>
              </div>
              <ul className="space-y-3">
                {['Organic Bananas (Bunch) | $1.89', 'Avocados (3ct bag) | $3.49', 'Whole Milk (1 gal) | $2.95', 'Greek Yogurt 32oz | $5.20'].map(item => {
                  const [name, price] = item.split(' | ');
                  return (
                    <li key={name} className="flex items-center justify-between group cursor-pointer" onClick={() => toggleItem(name)}>
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-xl ${checkedItems[name] ? 'text-primary' : 'text-outline-variant'}`}>
                          {checkedItems[name] ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span className={`font-body-md text-body-md ${checkedItems[name] ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>{name}</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline">{price}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Costco */}
            <div className="p-stack-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-6 bg-[#E31837] rounded-full" />
                <h5 className="font-label-bold text-label-bold text-on-surface">COSTCO (6 items) — <span className="text-primary">$75.40</span></h5>
              </div>
              <ul className="space-y-3">
                {['Bulk Paper Towels (12ct) | $19.99', 'Kirkland Olive Oil (2L) | $24.50', 'Frozen Mixed Berries (4lb) | $12.99'].map(item => {
                  const [name, price] = item.split(' | ');
                  return (
                    <li key={name} className="flex items-center justify-between group cursor-pointer" onClick={() => toggleItem(name)}>
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-xl ${checkedItems[name] ? 'text-primary' : 'text-outline-variant'}`}>
                          {checkedItems[name] ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span className={`font-body-md text-body-md ${checkedItems[name] ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>{name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {name.includes('Paper Towels') && (
                          <span className="bg-secondary-container/20 text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase">Best Value</span>
                        )}
                        <span className="font-label-sm text-label-sm text-outline">{price}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-outline-variant shadow-sm bg-white p-stack-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-label-bold text-label-bold text-on-surface">Optimized Route</h4>
              <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm">directions_car</span>
                8.4 miles total
              </div>
            </div>
            <div className="relative h-64 w-full bg-surface-container rounded-lg overflow-hidden border border-surface-container-high">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8_rOk0Hpbwl8UBTyslcMdlzI-D6DH1d_h-YFynzrl-D2gderyXxyXfrWJ5dMclGoE1hgb7A1dorZPxDXlMSgVT_zm3kG0tBuf_ZpHoKrWD87W49fAPqlPXJYeNlU3LEnsV9ZL82GBmmNtL5uYBdaDfl97DeuNv9BHjyDsNl14C6o9OH43ggPJ72sPqjA1YnTsjvY_5CGjoGvKJI4sQ3ZNAxhelfCKN1Iv3db_mUvvGvIH-dzisd7lVaYNrdQATy-QmLWejcRPgmV" alt="Route Map" />
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md border border-outline-variant">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
                  <span className="font-label-sm text-label-sm">Optimized path active</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
