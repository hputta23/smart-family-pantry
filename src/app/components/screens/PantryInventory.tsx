
import React from 'react';

export default function PantryInventory() {
  return (
    <>
      <div>
  <header className="bg-background sticky top-0 z-40 w-full">
    <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
      </div>
      <div className="flex items-center gap-4">
      </div>
    </div>
  </header>
  <main className="max-w-7xl mx-auto px-container-padding space-y-stack-lg mt-4">
    <section className="space-y-2">
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">What's at home</h2>
      <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
        <span className="material-symbols-outlined text-[16px]" data-icon="schedule">schedule</span>
        <span>Last updated 2h ago</span>
      </div>
    </section>
    <section className="bg-[#FFF9F0] border border-secondary-fixed p-container-padding rounded-xl kitchen-card flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex gap-4">
        <div className="bg-secondary-container/20 p-3 rounded-full h-fit">
          <span className="material-symbols-outlined text-secondary" data-icon="auto_awesome">auto_awesome</span>
        </div>
        <div className="space-y-1">
          <h3 className="font-label-bold text-label-bold text-secondary">Smart Predictions</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">3 items running low this week — Add all to list?</p>
        </div>
      </div>
      <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-bold text-label-bold hover:opacity-90 transition-opacity active:scale-95 duration-150">
        Add all to list
      </button>
    </section>
    <div className="space-y-stack-lg">
      <section className="space-y-stack-md">
        <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">Dairy</h3>
        <div className="space-y-3">
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl kitchen-card flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-primary" data-icon="water_drop">water_drop</span>
              </div>
              <div className="flex-1">
                <p className="font-label-bold text-label-bold text-on-surface">Whole Milk</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-on-surface-variant font-body-md text-label-sm">1 Gallon</span>
                  <span className="text-secondary font-label-sm bg-secondary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
                    runs out ~Oct 14
                  </span>
                </div>
              </div>
            </div>
            <button className="ml-4 p-2 text-primary hover:bg-primary/5 rounded-full transition-colors active:scale-90">
              <span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
            </button>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl kitchen-card flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-primary" data-icon="egg">egg</span>
              </div>
              <div className="flex-1">
                <p className="font-label-bold text-label-bold text-on-surface">Organic Eggs</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-on-surface-variant font-body-md text-label-sm">12ct Large</span>
                  <span className="text-on-surface-variant font-body-md text-label-sm">Stocked</span>
                </div>
              </div>
            </div>
            <button className="ml-4 p-2 text-primary hover:bg-primary/5 rounded-full transition-colors active:scale-90">
              <span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </section>
      <section className="space-y-stack-md">
        <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">Produce</h3>
        <div className="space-y-3">
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl kitchen-card flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-primary" data-icon="nutrition">nutrition</span>
              </div>
              <div className="flex-1">
                <p className="font-label-bold text-label-bold text-on-surface">Avocados</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-on-surface-variant font-body-md text-label-sm">2 units</span>
                  <span className="text-secondary font-label-sm bg-secondary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
                    runs out ~Oct 12
                  </span>
                </div>
              </div>
            </div>
            <button className="ml-4 p-2 text-primary hover:bg-primary/5 rounded-full transition-colors active:scale-90">
              <span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
            </button>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl kitchen-card flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-primary" data-icon="eco">eco</span>
              </div>
              <div className="flex-1">
                <p className="font-label-bold text-label-bold text-on-surface">Spinach</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-on-surface-variant font-body-md text-label-sm">1 Bag (5oz)</span>
                  <span className="text-secondary font-label-sm bg-secondary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
                    runs out ~Oct 13
                  </span>
                </div>
              </div>
            </div>
            <button className="ml-4 p-2 text-primary hover:bg-primary/5 rounded-full transition-colors active:scale-90">
              <span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
            </button>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl kitchen-card flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-primary" data-icon="fiber_manual_record">fiber_manual_record</span>
              </div>
              <div className="flex-1">
                <p className="font-label-bold text-label-bold text-on-surface">Apples</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-on-surface-variant font-body-md text-label-sm">6 units</span>
                  <span className="text-on-surface-variant font-body-md text-label-sm">Stocked</span>
                </div>
              </div>
            </div>
            <button className="ml-4 p-2 text-primary hover:bg-primary/5 rounded-full transition-colors active:scale-90">
              <span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
  
</div>

    </>
  );
}
