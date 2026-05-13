'use client';

import React, { useState, useEffect } from 'react';
import { getInventory, addListItem } from '@/app/actions';
import { useToast } from '@/app/components/Toast';

export default function PantryInventory() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const fetchInventory = async () => {
    setIsLoading(true);
    const result = await getInventory();
    if (result.success && result.data) {
      setInventory(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddToList = async (itemName: string) => {
    await addListItem(itemName, 'Any Store');
    showToast(`Added ${itemName} to shopping list!`);
  };

  // Group inventory by category
  const groupedInventory = inventory.reduce((acc, item) => {
    const cat = item.products?.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <>
      <div>
        <header className="bg-background sticky top-0 z-40 w-full">
          <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-3"></div>
            <div className="flex items-center gap-4"></div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-container-padding space-y-stack-lg mt-4 pb-32">
          <section className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">What's at home</h2>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]" data-icon="schedule">schedule</span>
              <span>Live Data</span>
            </div>
          </section>
          
          <section className="bg-[#FFF9F0] border border-secondary-fixed p-container-padding rounded-xl kitchen-card flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="bg-secondary-container/20 p-3 rounded-full h-fit">
                <span className="material-symbols-outlined text-secondary" data-icon="auto_awesome">auto_awesome</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-label-bold text-label-bold text-secondary">Smart Predictions</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Low stock items will appear here.</p>
              </div>
            </div>
          </section>

          <div className="space-y-stack-lg">
            {isLoading ? (
              <p className="text-on-surface-variant animate-pulse">Loading inventory...</p>
            ) : inventory.length === 0 ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">inventory_2</span>
                <p className="text-on-surface-variant">Your pantry is empty. Scan a receipt to add items!</p>
              </div>
            ) : (
              Object.entries(groupedInventory).map(([category, items]) => (
                <section key={category} className="space-y-stack-md">
                  <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">{category}</h3>
                  <div className="space-y-3">
                    {(items as any[]).map((item) => (
                      <div key={item.id} className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl kitchen-card flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
                            <span className="material-symbols-outlined text-primary" data-icon="kitchen">kitchen</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-label-bold text-label-bold text-on-surface">{item.products?.canonical_name || 'Unknown Item'}</p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                              <span className="text-on-surface-variant font-body-md text-label-sm">{item.quantity} {item.unit}</span>
                              {item.estimated_empty_date && (
                                <span className="text-secondary font-label-sm bg-secondary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
                                  runs out ~{new Date(item.estimated_empty_date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleAddToList(item.products?.canonical_name)}
                          className="ml-4 p-2 text-primary hover:bg-primary/5 rounded-full transition-colors active:scale-90"
                          title="Add to Shopping List"
                        >
                          <span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}
