
import React from 'react';

export default function BudgetTracker() {
  return (
    <>
      <div>
  {/* TopAppBar */}
  <header className="w-full top-0 bg-background flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto z-50 sticky">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden kitchen-shadow border border-outline-variant">
        <img alt="Profile" data-alt="A professional, warm studio headshot of a person with a friendly expression. The lighting is soft and natural, with a clean, minimalist off-white background that complements a light-mode UI. The focus is sharp on the face, creating a welcoming and trustworthy user profile avatar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKttemFNa1nokzFgPU3DmP-CDG6CISIgquNy2gmyWzlevH_dPghay1AtGvfUNW9Aq8fAd-2F8lcCBsW-pdaGdUo9c3HRUp-2C-67eUHibMvh5lSArsw1GNHN4qXTclGJ175ZGyGS79IHqKoUOu345U_IpjG8BZg9d5z73tgGJI-JBZqCOe7Ug6lkn8E_Qoz5WWfczcV0wNX6dVstegBU9wVTTbGLjPtp8MlhJDfhy1WNctSvaNCMJB2JECVUukvWnf7oq9y0uFhJre" />
      </div>
      <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Smart Family Pantry</h1>
    </div>
    <button className="text-primary hover:opacity-80 transition-opacity p-2 rounded-full flex items-center justify-center">
      <span className="material-symbols-outlined">notifications</span>
    </button>
  </header>
  <main className="max-w-7xl mx-auto px-container-padding pb-32">
    {/* Time Toggle */}
    <div className="flex justify-center mb-stack-lg">
      <div className="bg-surface-container-low p-1 rounded-xl flex gap-1 kitchen-shadow">
        <button className="bg-surface-container-lowest text-primary font-label-bold px-6 py-2 rounded-lg shadow-sm">This month</button>
        <button className="text-on-surface-variant font-label-bold px-6 py-2 rounded-lg hover:bg-surface-container transition-colors">Last 12 months</button>
      </div>
    </div>
    {/* Top Bento Section */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
      {/* Summary Card */}
      <section className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant kitchen-shadow h-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-on-surface-variant font-label-bold mb-1">Spent this month</h2>
            <p className="font-headline-xl text-headline-xl text-on-surface">$245.50</p>
          </div>
          <span className="bg-secondary-container bg-opacity-10 border border-secondary text-secondary px-3 py-1 rounded-full text-label-sm font-label-bold">
            Budget: $300.00
          </span>
        </div>
        <div className="mb-8">
          <div className="flex justify-between text-label-sm font-label-bold text-on-surface-variant mb-2">
            <span>Progress (82%)</span>
            <span>$54.50 left</span>
          </div>
          <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
            <div className="bg-secondary-container h-full rounded-full" style={{width: '82%'}} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-4 rounded-lg">
            <p className="text-label-sm text-on-surface-variant mb-1">Burn rate</p>
            <p className="font-headline-md text-headline-md text-on-surface">$8/day</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg">
            <p className="text-label-sm text-on-surface-variant mb-1">Projected</p>
            <p className="font-headline-md text-headline-md text-on-surface">$290</p>
          </div>
        </div>
      </section>
      {/* Bar Chart Section */}
      <section className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant kitchen-shadow h-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-headline-md text-headline-md text-on-surface">Daily Spend Trend</h2>
          <div className="flex items-center gap-4 text-label-sm font-label-bold text-on-surface-variant">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-primary rounded-sm" /> Actual</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 border border-primary border-dashed rounded-sm" /> Projected</div>
          </div>
        </div>
        <div className="relative h-48 flex items-end justify-between gap-2 px-2">
          {/* Baseline and Projected Line (CSS Drawing) */}
          <div className="absolute bottom-1/4 left-0 w-full border-t border-primary opacity-20 border-dashed" />
          {/* Mock Data Bars */}
          <div className="flex-1 bg-primary bg-opacity-20 rounded-t-sm h-[30%]" />
          <div className="flex-1 bg-primary bg-opacity-40 rounded-t-sm h-[45%]" />
          <div className="flex-1 bg-primary rounded-t-sm h-[60%]" />
          <div className="flex-1 bg-primary bg-opacity-30 rounded-t-sm h-[35%]" />
          <div className="flex-1 bg-primary rounded-t-sm h-[80%]" />
          <div className="flex-1 bg-primary bg-opacity-60 rounded-t-sm h-[50%]" />
          <div className="flex-1 bg-primary rounded-t-sm h-[75%]" />
          <div className="flex-1 bg-primary bg-opacity-20 rounded-t-sm h-[25%]" />
          <div className="flex-1 bg-primary bg-opacity-80 rounded-t-sm h-[65%]" />
          <div className="flex-1 bg-primary rounded-t-sm h-[90%]" />
          <div className="flex-1 bg-primary bg-opacity-40 rounded-t-sm h-[40%]" />
          <div className="flex-1 border-2 border-primary border-dashed border-b-0 rounded-t-sm h-[55%]" />
          <div className="flex-1 border-2 border-primary border-dashed border-b-0 rounded-t-sm h-[60%]" />
          <div className="flex-1 border-2 border-primary border-dashed border-b-0 rounded-t-sm h-[58%]" />
        </div>
        <div className="flex justify-between mt-4 text-label-sm text-on-surface-variant font-label-bold px-2">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Today</span>
          <span>Projected</span>
        </div>
      </section>
    </div>
    {/* Category Breakdown */}
    <section className="mt-gutter bg-surface-container-lowest p-6 rounded-xl border border-outline-variant kitchen-shadow">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">Spend by Category</h2>
        <button className="text-primary font-label-bold flex items-center gap-1 hover:opacity-80 transition-opacity">
          View all <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
      <div className="space-y-6">
        {/* Dairy */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">egg_alt</span>
              <span className="font-label-bold text-on-surface">Dairy &amp; Eggs</span>
            </div>
            <span className="font-label-bold text-on-surface">$72.20</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{width: '32%'}} />
          </div>
        </div>
        {/* Produce */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">eco</span>
              <span className="font-label-bold text-on-surface">Fresh Produce</span>
            </div>
            <span className="font-label-bold text-on-surface">$58.40</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{width: '26%'}} />
          </div>
        </div>
        {/* Meat & Poultry */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">set_meal</span>
              <span className="font-label-bold text-on-surface">Meat &amp; Poultry</span>
            </div>
            <span className="font-label-bold text-on-surface">$45.00</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{width: '20%'}} />
          </div>
        </div>
        {/* Pantry */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">inventory_2</span>
              <span className="font-label-bold text-on-surface">Pantry Staples</span>
            </div>
            <span className="font-label-bold text-on-surface">$39.90</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{width: '15%'}} />
          </div>
        </div>
        {/* Other */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">more_horiz</span>
              <span className="font-label-bold text-on-surface">Other</span>
            </div>
            <span className="font-label-bold text-on-surface">$30.00</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{width: '7%'}} />
          </div>
        </div>
      </div>
    </section>
    {/* Smart Insight Module */}
    <section className="mt-gutter bg-secondary-container bg-opacity-10 border border-secondary-container p-6 rounded-xl kitchen-shadow flex items-center gap-4">
      <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container flex-shrink-0">
        <span className="material-symbols-outlined">lightbulb</span>
      </div>
      <div>
        <h3 className="font-label-bold text-on-secondary-container">Budget Alert</h3>
        <p className="text-body-md text-on-surface-variant">You've spent more on <span className="font-bold">Dairy</span> than usual this month. Consider switching to family-sized packs to save approx. $12/month.</p>
      </div>
    </section>
  </main>
  {/* BottomNavBar */}
  
  {/* Desktop SideNav Placeholder (Hidden on Mobile) */}
  <aside className="hidden md:flex fixed left-0 top-24 bottom-0 w-24 flex-col items-center gap-8 py-8">
    {/* Active Tab Desktop */}
    <div className="p-3 bg-primary-container text-on-primary-container rounded-xl kitchen-shadow cursor-pointer transition-transform hover:scale-105">
      <span className="material-symbols-outlined">payments</span>
    </div>
    <div className="p-3 text-on-surface-variant hover:text-primary cursor-pointer transition-all">
      <span className="material-symbols-outlined">format_list_bulleted</span>
    </div>
    <div className="p-3 text-on-surface-variant hover:text-primary cursor-pointer transition-all">
      <span className="material-symbols-outlined">inventory_2</span>
    </div>
    <div className="p-3 text-on-surface-variant hover:text-primary cursor-pointer transition-all">
      <span className="material-symbols-outlined">settings</span>
    </div>
  </aside>
</div>

    </>
  );
}
