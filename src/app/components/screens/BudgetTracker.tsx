'use client';

import React, { useState, useEffect } from 'react';
import { getBudgetOverview } from '@/app/actions';

export default function BudgetTracker() {
  const [budgetData, setBudgetData] = useState({ limit: 0, spent: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBudget() {
      const res = await getBudgetOverview();
      if (res.success && res.data) {
        setBudgetData(res.data);
      }
      setIsLoading(false);
    }
    fetchBudget();
  }, []);

  const limit = budgetData.limit || 1; // avoid division by zero
  const spent = budgetData.spent;
  const progressPercent = Math.min(100, Math.round((spent / limit) * 100));
  const left = Math.max(0, limit - spent);
  const burnRate = Math.round(spent / Math.max(1, new Date().getDate()));
  const projected = burnRate * 30;

  return (
    <>
      <div>
        <header className="w-full top-0 bg-background flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto z-50 sticky">
          <div className="flex items-center gap-3">
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Budget Tracker</h1>
          </div>
          <button className="text-primary hover:opacity-80 transition-opacity p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </header>
        
        <main className="max-w-7xl mx-auto px-container-padding pb-32">
          {isLoading ? (
            <p className="animate-pulse">Loading budget data...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                {/* Summary Card */}
                <section className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant kitchen-shadow h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-on-surface-variant font-label-bold mb-1">Spent this month</h2>
                      <p className="font-headline-xl text-headline-xl text-on-surface">${spent.toFixed(2)}</p>
                    </div>
                    <span className="bg-secondary-container bg-opacity-10 border border-secondary text-secondary px-3 py-1 rounded-full text-label-sm font-label-bold">
                      Budget: ${limit.toFixed(2)}
                    </span>
                  </div>
                  <div className="mb-8">
                    <div className="flex justify-between text-label-sm font-label-bold text-on-surface-variant mb-2">
                      <span>Progress ({progressPercent}%)</span>
                      <span>${left.toFixed(2)} left</span>
                    </div>
                    <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${progressPercent > 90 ? 'bg-error' : 'bg-secondary-container'}`} style={{width: `${progressPercent}%`}} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-low p-4 rounded-lg">
                      <p className="text-label-sm text-on-surface-variant mb-1">Burn rate</p>
                      <p className="font-headline-md text-headline-md text-on-surface">${burnRate}/day</p>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-lg">
                      <p className="text-label-sm text-on-surface-variant mb-1">Projected</p>
                      <p className="font-headline-md text-headline-md text-on-surface">${projected}</p>
                    </div>
                  </div>
                </section>
                
                {/* Category Breakdown Mock */}
                <section className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant kitchen-shadow h-full">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Spend by Category</h2>
                  </div>
                  <div className="space-y-6">
                    {/* Mocked Categories for visual layout since detailed receipts aren't fully modeled */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">shopping_basket</span>
                          <span className="font-label-bold text-on-surface">Groceries</span>
                        </div>
                        <span className="font-label-bold text-on-surface">${(spent * 0.8).toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{width: '80%'}} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">more_horiz</span>
                          <span className="font-label-bold text-on-surface">Other</span>
                        </div>
                        <span className="font-label-bold text-on-surface">${(spent * 0.2).toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{width: '20%'}} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {progressPercent > 90 && (
                <section className="mt-gutter bg-error-container bg-opacity-10 border border-error p-6 rounded-xl kitchen-shadow flex items-center gap-4">
                  <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center text-on-error flex-shrink-0">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <h3 className="font-label-bold text-error">Budget Alert</h3>
                    <p className="text-body-md text-on-surface-variant">You are very close to your budget limit for this month.</p>
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
