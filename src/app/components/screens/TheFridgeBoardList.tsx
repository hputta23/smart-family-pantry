'use client';

import React, { useState, useEffect } from 'react';
import { getShoppingList, toggleListItem, updateListItemQuantity, addListItem } from '@/app/actions';
import { useToast } from '@/app/components/Toast';

export default function TheFridgeBoardList() {
  const [listItems, setListItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItemName, setNewItemName] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const { showToast } = useToast();

  const fetchList = async () => {
    setIsLoading(true);
    const result = await getShoppingList();
    if (result.success && result.data) {
      setListItems(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleToggle = async (item: any) => {
    // Optimistic update
    setListItems(items => items.map(i => i.id === item.id ? { ...i, checked_off: !i.checked_off } : i));
    await toggleListItem(item.id, !item.checked_off);
  };

  const handleUpdateQuantity = async (item: any, delta: number) => {
    const newQty = (item.quantity || 1) + delta;
    if (newQty < 0) return;
    
    // Optimistic update
    if (newQty === 0) {
      setListItems(items => items.filter(i => i.id !== item.id));
    } else {
      setListItems(items => items.map(i => i.id === item.id ? { ...i, quantity: newQty } : i));
    }
    
    await updateListItemQuantity(item.id, newQty);
  };

  const groupedList = listItems.reduce((acc, item) => {
    const store = item.store_name || 'Any Store';
    if (!acc[store]) acc[store] = [];
    acc[store].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const handleAddItem = async () => {
    if (!newItemName.trim()) return;
    setIsAddingItem(true);
    await addListItem(newItemName.trim(), 'Any Store');
    showToast(`Added "${newItemName.trim()}" to list`);
    setNewItemName('');
    setIsAddingItem(false);
    fetchList();
  };

  return (
    <>
      <div>
        <div className="bg-inverse-surface text-inverse-on-surface px-container-padding py-2 flex items-center justify-center gap-2 sticky top-0 z-[60]">
          <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
          <span className="font-label-sm text-label-sm">Live Sync Active</span>
        </div>
        <header className="bg-background w-full top-0 z-50">
          <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">family_restroom</span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Digital Board</h1>
                <span className="font-label-sm text-label-sm text-outline">Shared Shopping List</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-container-padding space-y-gutter pb-32">
          {/* Add Item Form */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Add an item to your list..."
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddItem()}
              className="flex-1 bg-surface-container-lowest border-2 border-outline-variant focus:border-primary rounded-xl px-4 py-3 outline-none transition-all font-body-md"
            />
            <button
              onClick={handleAddItem}
              disabled={isAddingItem || !newItemName.trim()}
              className="bg-primary text-on-primary px-5 py-3 rounded-xl font-label-bold active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add
            </button>
          </div>

          {isLoading ? (
            <p className="text-on-surface-variant animate-pulse mt-8">Syncing list...</p>
          ) : listItems.length === 0 ? (
            <div className="text-center py-12 mt-8">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">format_list_bulleted</span>
              <p className="text-on-surface-variant">Your shopping list is empty.</p>
            </div>
          ) : (
            Object.entries(groupedList).map(([store, items]) => (
              <section key={store} className="space-y-stack-md mt-6">
                <div className="flex items-center justify-between py-2 border-b border-outline-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">store</span>
                    <h2 className="font-label-bold text-label-bold uppercase">{store}</h2>
                    <span className="bg-primary-container/10 text-primary-container px-2 py-0.5 rounded-full text-[10px] font-bold">{(items as any[]).length} ITEMS</span>
                  </div>
                </div>
                <div className="space-y-stack-sm">
                  {(items as any[]).map((item) => (
                    <div key={item.id} className={`bento-card p-4 rounded-xl flex items-center justify-between gap-4 ${item.checked_off ? 'opacity-50' : ''}`}>
                      <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => handleToggle(item)}>
                        <div className={`text-primary flex items-center justify-center w-6 h-6 rounded-md border-2 ${item.checked_off ? 'bg-primary border-primary' : 'border-outline'}`}>
                          {item.checked_off && <span className="material-symbols-outlined text-[16px] text-white" style={{fontVariationSettings: '"wght" 700'}}>check</span>}
                        </div>
                        <div>
                          <p className={`font-body-md text-on-surface font-medium ${item.checked_off ? 'line-through' : ''}`}>
                            {item.custom_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-surface-container rounded-lg p-1">
                        <button onClick={() => handleUpdateQuantity(item, -1)} className="w-8 h-8 flex items-center justify-center text-primary active:scale-90 transition-transform">
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="font-label-bold w-4 text-center">{item.quantity || 1}</span>
                        <button onClick={() => handleUpdateQuantity(item, 1)} className="w-8 h-8 flex items-center justify-center text-primary active:scale-90 transition-transform">
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </main>
      </div>
    </>
  );
}
