
import React from 'react';

export default function TheFridgeBoardList() {
  return (
    <>
      <div>
  {/* Offline Banner */}
  <div className="bg-inverse-surface text-inverse-on-surface px-container-padding py-2 flex items-center justify-center gap-2 sticky top-0 z-[60]">
    <span className="material-symbols-outlined text-[18px]">cloud_off</span>
    <span className="font-label-sm text-label-sm">Offline Mode: Edits will sync when connected.</span>
  </div>
  {/* Top App Bar */}
  <header className="bg-background w-full top-0 z-50">
    <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
          <img alt="User profile avatar" className="w-full h-full object-cover" data-alt="A close-up portrait of a friendly woman in her thirties with a warm smile, set against a soft-focus interior domestic background. The lighting is natural and bright, creating a clean light-mode aesthetic. The image uses a natural color palette that complements a teal and off-white UI design system, emphasizing a nurturing and hyper-organized brand personality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj5UA_2jQF9V62uG4xixjBuoB7tl1t-y8ffS1LAzdhwAyjd5oHMmzZmvAGWXD7fyQFFDhacnxj2PDJLcIjlCpJsZzvnVi2c-rdyo6R9FVwmoouHSihuI3dY_Ph80dOWiulQE5tWhPGMN2uClRkfheHicGD8qlWdcdXInFOmAXviG4653R4TJ1mgsn8UDL88J637MTsu6nPDEwlU1wrscowTAEpjRfHI9qt6RIShdVhgzYc48dfvjaXjsK9lgSBWcTVC6DpDbHGT9cI" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface">The Millers</h1>
          <span className="font-label-sm text-label-sm text-outline">Digital Kitchen Board</span>
        </div>
      </div>
      <button className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150">
        <span className="material-symbols-outlined">notifications</span>
      </button>
    </div>
  </header>
  <main className="max-w-7xl mx-auto px-container-padding space-y-gutter">
    {/* Trip Summary Pill */}
    <section className="mt-4">
      <div className="bg-surface-container-low rounded-full px-4 py-3 flex items-center justify-between border border-outline-variant shadow-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="material-symbols-outlined text-primary">savings</span>
          <p className="font-label-bold text-label-bold truncate">
            Aldi $34 · Walmart $22 — <span className="text-primary">split saves $9.40</span>
          </p>
        </div>
        <span className="material-symbols-outlined text-outline">chevron_right</span>
      </div>
    </section>
    {/* List Section: Aldi */}
    <section className="space-y-stack-md">
      <div className="flex items-center justify-between py-2 border-b border-outline-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">store</span>
          <h2 className="font-label-bold text-label-bold">Aldi</h2>
          <span className="bg-primary-container/10 text-primary-container px-2 py-0.5 rounded-full text-[10px] font-bold">4 ITEMS</span>
        </div>
        <span className="material-symbols-outlined text-outline">expand_more</span>
      </div>
      <div className="space-y-stack-sm">
        {/* Item Card */}
        <div className="bento-card p-4 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="hand-drawn-check text-primary">
              <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"wght" 700'}}>check</span>
            </div>
            <div>
              <p className="font-body-md text-on-surface font-medium">Whole Milk 1%</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">ALDI $3.12</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary" title="Fresh entry" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-surface-container rounded-lg p-1">
            <button className="w-8 h-8 flex items-center justify-center text-primary active:scale-90 transition-transform"><span className="material-symbols-outlined">remove</span></button>
            <span className="font-label-bold w-4 text-center">2</span>
            <button className="w-8 h-8 flex items-center justify-center text-primary active:scale-90 transition-transform"><span className="material-symbols-outlined">add</span></button>
          </div>
        </div>
        {/* Item Card */}
        <div className="bento-card p-4 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="hand-drawn-check border-outline" />
            <div>
              <p className="font-body-md text-on-surface font-medium">Avocados (5pk)</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">ALDI $4.99</span>
                <div className="w-1.5 h-1.5 rounded-full bg-outline/40" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-surface-container rounded-lg p-1">
            <button className="w-8 h-8 flex items-center justify-center text-primary active:scale-90 transition-transform"><span className="material-symbols-outlined">remove</span></button>
            <span className="font-label-bold w-4 text-center">1</span>
            <button className="w-8 h-8 flex items-center justify-center text-primary active:scale-90 transition-transform"><span className="material-symbols-outlined">add</span></button>
          </div>
        </div>
      </div>
    </section>
    {/* List Section: Walmart */}
    <section className="space-y-stack-md">
      <div className="flex items-center justify-between py-2 border-b border-outline-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">shopping_bag</span>
          <h2 className="font-label-bold text-label-bold">Walmart</h2>
          <span className="bg-primary-container/10 text-primary-container px-2 py-0.5 rounded-full text-[10px] font-bold">2 ITEMS</span>
        </div>
        <span className="material-symbols-outlined text-outline">expand_more</span>
      </div>
      <div className="space-y-stack-sm">
        {/* Item Card with Alert */}
        <div className="bento-card p-4 rounded-xl flex items-center justify-between gap-4 border-l-4 border-l-secondary">
          <div className="flex items-center gap-3 flex-1">
            <div className="hand-drawn-check border-outline" />
            <div>
              <p className="font-body-md text-on-surface font-medium">Paper Towels (12pk)</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-secondary-container/20 text-secondary border border-secondary/30 px-2 py-0.5 rounded text-[10px] font-bold">LOW STOCK</span>
                <span className="text-on-surface-variant text-[10px] font-bold">WMT $18.44</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-surface-container rounded-lg p-1">
            <button className="w-8 h-8 flex items-center justify-center text-primary active:scale-90 transition-transform"><span className="material-symbols-outlined">remove</span></button>
            <span className="font-label-bold w-4 text-center">1</span>
            <button className="w-8 h-8 flex items-center justify-center text-primary active:scale-90 transition-transform"><span className="material-symbols-outlined">add</span></button>
          </div>
        </div>
      </div>
    </section>
    {/* Smart Prediction Module */}
    <section className="mt-stack-lg">
      <div className="bg-[#FFF9F0] rounded-2xl p-container-padding border border-secondary/20 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-secondary">auto_awesome</span>
          <h3 className="font-label-bold text-label-bold text-secondary">AI Suggested Restock</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="bg-white p-3 rounded-xl border border-outline-variant min-w-[140px] flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary mb-2">egg</span>
            <p className="font-label-sm text-label-sm font-bold">Large Eggs</p>
            <p className="text-[10px] text-outline">Usually bought Sunday</p>
            <button className="mt-3 w-full bg-primary text-white py-1.5 rounded-lg text-[12px] font-bold">Add Item</button>
          </div>
          <div className="bg-white p-3 rounded-xl border border-outline-variant min-w-[140px] flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary mb-2">coffee</span>
            <p className="font-label-sm text-label-sm font-bold">Dark Roast</p>
            <p className="text-[10px] text-outline">Low in Pantry</p>
            <button className="mt-3 w-full bg-primary text-white py-1.5 rounded-lg text-[12px] font-bold">Add Item</button>
          </div>
        </div>
      </div>
    </section>
  </main>
  {/* FAB */}
  <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:opacity-90 active:scale-90 transition-all z-40">
    <span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings: '"wght" 600'}}>add</span>
  </button>
  {/* Bottom Nav Bar */}
  
</div>

    </>
  );
}
