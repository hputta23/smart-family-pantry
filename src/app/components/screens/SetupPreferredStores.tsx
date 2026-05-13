'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AVAILABLE_STORES = [
  { id: 'aldi', name: 'Aldi', branch: 'High Street Branch', distance: '0.8 mi', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeOJaJFii3VVeugo4J4DiSEw4OyJrVHMQ61MKNL03P4P0EzlHpXxGP2tNbkDzX4NRBZazMBAeCsBcdOrhoeicn3l4wZdMzqs09FNi5suUM7CYlT6npCfuRMQIjMaf8yO55psBwEgnmZ128mEUPpmjDa86jDfSEG8rK2b1yRJlOeRGr1f_l1FzXDecnygn5X7LbSf1dJ4wdPsddqszCYR2EWdzXSLe0_1q3PL8VIOfTknzdy0YyGRnqh5s5oY7yM5FiuaoktL_pxwul' },
  { id: 'walmart', name: 'Walmart', branch: 'Supercenter Parkway', distance: '1.2 mi', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeKg-aQy-auH3K4DJFsiyOxsG0hJYp982vaeQqanYEknortiqA99JG_hCtOsnPjt0gnBuyjylZJAfEYV4ELMlXwxaamVfjwYcHT1ov3UjFkFv7YHI0x8Xb9sTprMsRqaPXPPZikIjuOsuPjEEwdkH6kA5TAnhLCjhnEn8CSfcklDpyy6tKttXZDTm4483ivSLMHjKdNFXVysi8Cge7N1_2GW_oT7qv7hEKg4j4c1TpQ4mwMJLBllPERmTgkigBQm9AtmKY8Fi0eTpZ' },
  { id: 'traderjoes', name: "Trader Joe's", branch: 'Westside Market', distance: '2.1 mi', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpC21RYYNNJSlcuKBgvj7phzvSdhyvO2z22FQ8c1vbozEhBR7muvr7cKtgQ2Dpjrv0B97mJBftsbJccvZ3pfl_aoRtSxLupB9X__k6RPaxTFeL10CUv8XSR8VmG4DBZh_O7MnBikfiFxIac0Ikkb0ZoMF3xq3USs-6fkfN9E7F-JkZWq5A5bsY5XIF9DVDcYE7z04krl23pWAyLPk6RFAyvi1CO5B0PUwZPcF3HrO0qVx7wuL8oVcTjOxQni0_qDHiyKaO9Lfrm9yZ' },
  { id: 'costco', name: 'Costco', branch: 'Bulk World Plaza', distance: '3.5 mi', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_qATHztLT8nzKb2eCJAip9R7KuMSIln4qbNJ02Dp94Q2wwc0a4os8Da5ZGSoizOwnObUeKiZt2zUo9PadWhDRbdc0JHhbeKi4mE8H4aFetFngW-SHfMu1zev8D5bXa_TwqYG2F4pM_u9syYKWa4tiixjpMhfx8MECAxw0ROA9xYxm-PzeR5T-tY706BJaii7fIZnz2-tofAST57zFa39J9k_hqCo6tSzIG-GpUIWgDjZJB592rSGU01YruS-Jj7YCJSwJKbQipUhp' },
  { id: 'wholefoods', name: 'Whole Foods', branch: 'Downtown', distance: '1.8 mi', logo: '' },
  { id: 'kroger', name: 'Kroger', branch: 'Main Street', distance: '2.4 mi', logo: '' },
];

export default function SetupPreferredStores() {
  const router = useRouter();
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load any previously saved selections
  useEffect(() => {
    try {
      const saved = localStorage.getItem('setup_stores');
      if (saved) setSelectedStores(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleStore = (storeId: string) => {
    setSelectedStores(prev => {
      const next = prev.includes(storeId)
        ? prev.filter(s => s !== storeId)
        : [...prev, storeId];
      localStorage.setItem('setup_stores', JSON.stringify(next));
      return next;
    });
  };

  const addSuggestedStore = (storeId: string) => {
    if (!selectedStores.includes(storeId)) {
      toggleStore(storeId);
    }
  };

  const handleNext = () => {
    localStorage.setItem('setup_stores', JSON.stringify(selectedStores));
    router.push('/setup/members');
  };

  const filteredStores = AVAILABLE_STORES.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <header className="w-full max-w-2xl mx-auto px-container-padding py-stack-lg mt-unit">
          <div className="flex items-center justify-between mb-stack-md">
            <span className="font-label-bold text-label-bold text-primary">STEP 1 OF 3</span>
            <div className="flex gap-2">
              <div className="w-12 h-1.5 rounded-full bg-primary" />
              <div className="w-8 h-1.5 rounded-full bg-surface-container-highest" />
              <div className="w-8 h-1.5 rounded-full bg-surface-container-highest" />
            </div>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Where do you shop?</h1>
          <p className="text-on-surface-variant font-body-md text-body-md">Select your preferred stores. We&apos;ll help organize your lists by store.</p>
        </header>

        <main className="w-full max-w-2xl mx-auto px-container-padding pb-32">
          {/* Search */}
          <div className="relative mb-stack-lg group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-0 transition-all outline-none font-body-md text-body-md store-card-shadow"
              placeholder="Search for stores..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Selected count */}
          {selectedStores.length > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-label-bold">
                {selectedStores.length} selected
              </span>
            </div>
          )}

          {/* Store Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStores.map(store => {
              const isSelected = selectedStores.includes(store.id);
              return (
                <div
                  key={store.id}
                  onClick={() => toggleStore(store.id)}
                  className={`bg-surface-container-lowest rounded-xl p-5 store-card-shadow flex flex-col justify-between cursor-pointer relative group transition-all duration-200 ${
                    isSelected
                      ? 'border-2 border-primary shadow-md'
                      : 'border border-outline-variant hover:border-primary/50 hover:translate-y-0.5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-stack-md">
                    {store.logo ? (
                      <img alt={`${store.name} Logo`} className="h-10 w-auto object-contain" src={store.logo} />
                    ) : (
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">store</span>
                      </div>
                    )}
                    <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">near_me</span> {store.distance}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-headline-md text-headline-md ${isSelected ? 'text-primary' : 'text-on-surface'}`}>{store.name}</h3>
                    <p className="text-on-surface-variant text-label-sm font-label-sm">{store.branch}</p>
                  </div>
                  <div className={`absolute top-4 right-4 h-6 w-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-primary' : 'border-2 border-outline-variant group-hover:border-primary'
                  }`}>
                    {isSelected && (
                      <span className="material-symbols-outlined text-on-primary text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Smart Suggestion */}
          {!selectedStores.includes('wholefoods') && (
            <div className="mt-stack-lg p-6 bg-secondary-container bg-opacity-10 border border-secondary-container rounded-xl flex gap-4 items-start">
              <div className="bg-secondary-container p-2 rounded-lg">
                <span className="material-symbols-outlined text-on-secondary-container">auto_awesome</span>
              </div>
              <div>
                <h4 className="font-label-bold text-label-bold text-on-secondary-container mb-1">Smart Suggestion</h4>
                <p className="text-on-surface-variant font-body-md text-body-md">Based on your location, many of your neighbors also shop at <strong>Whole Foods</strong>. Would you like to add it?</p>
                <button onClick={() => addSuggestedStore('wholefoods')} className="mt-3 text-primary font-label-bold text-label-bold flex items-center gap-1 hover:underline">
                  Add Whole Foods <span className="material-symbols-outlined text-[16px]">add_circle</span>
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 w-full p-4 bg-surface-container-lowest border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            <button
              onClick={handleNext}
              className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-md text-headline-md shadow-md active:scale-95 transition-transform duration-150 flex items-center justify-center"
            >
              Next
            </button>
            <button
              onClick={() => router.push('/setup/members')}
              className="w-full py-2 text-on-surface-variant font-label-bold text-label-bold hover:text-primary transition-colors flex items-center justify-center"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
