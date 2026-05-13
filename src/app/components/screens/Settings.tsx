'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { logout, exportFamilyData } from '@/app/actions';
import { useToast } from '@/app/components/Toast';

export default function Settings() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    showToast('Logged out successfully');
    router.push('/');
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('PANTRY-8821-K');
      showToast('Family code copied to clipboard!');
    } catch {
      showToast('Failed to copy', 'error');
    }
  };

  const handleExport = async () => {
    showToast('Preparing export...', 'info');
    const result = await exportFamilyData();
    if (result.success && result.data) {
      const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pantry-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Data exported successfully!');
    } else {
      showToast('Export failed', 'error');
    }
  };

  const handleDeleteAccount = () => {
    showToast('Account deletion is not yet available in this version', 'info');
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div>
        <header className="fixed top-0 w-full z-50 bg-background py-4 px-container-padding">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-primary">family_restroom</span>
              </div>
              <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Smart Family Pantry</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto pt-24 pb-32 px-container-padding space-y-stack-lg">
          <div className="space-y-stack-sm">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Settings</h2>
            <p className="text-on-surface-variant font-body-md">Manage your domestic hub and family preferences.</p>
          </div>

          <div className="space-y-gutter">
            {/* 1. Family */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden kitchen-board-shadow">
              <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '"FILL" 1'}}>family_history</span>
                <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant">Family</h3>
              </div>
              <div className="divide-y divide-outline-variant">
                <Link href="/profiles" className="p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer group block">
                  <div>
                    <p className="font-label-bold text-on-surface">Manage Profiles</p>
                    <p className="text-label-sm text-on-surface-variant">View and edit family members</p>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
                </Link>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-label-bold text-on-surface">Family Code</p>
                    <p className="text-label-sm font-mono text-primary bg-primary-fixed/30 px-2 py-0.5 rounded">PANTRY-8821-K</p>
                  </div>
                  <button onClick={handleCopyCode} className="text-primary font-label-bold hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    Copy
                  </button>
                </div>
              </div>
            </section>

            {/* 2. Stores */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden kitchen-board-shadow">
              <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '"FILL" 1'}}>store</span>
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
                      <p className="text-label-sm text-on-surface-variant">Configured during setup</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">settings</span>
                </div>
              </div>
            </section>

            {/* 3. Health Nudges */}
            <section className="bg-primary-container/5 border border-primary/20 rounded-xl overflow-hidden kitchen-board-shadow">
              <div className="px-6 py-4 bg-primary-container/10 border-b border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '"FILL" 1'}}>eco</span>
                  <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-primary">Health Nudges</h3>
                </div>
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
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '"FILL" 1'}}>notifications_active</span>
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
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '"FILL" 1'}}>security</span>
                <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant">Privacy</h3>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-label-bold text-on-surface">Data Sharing</p>
                  <p className="text-label-sm text-on-surface-variant pr-8">Anonymized pantry data helps improve community predictions and price tracking.</p>
                </div>
                <button onClick={() => showToast('Data sharing opted out', 'info')} className="px-4 py-2 bg-surface-container-high text-on-surface-variant text-label-bold rounded-lg hover:bg-outline-variant transition-colors">Opt-out</button>
              </div>
            </section>

            {/* 6. Data */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden kitchen-board-shadow">
              <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '"FILL" 1'}}>database</span>
                <h3 className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant">Data</h3>
              </div>
              <div className="divide-y divide-outline-variant">
                <button onClick={handleExport} className="w-full p-6 flex items-center justify-between hover:bg-surface-container-low cursor-pointer transition-colors group">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary">file_export</span>
                    <p className="font-label-bold text-on-surface">Export JSON</p>
                  </div>
                  <span className="material-symbols-outlined text-outline">download</span>
                </button>
                <div className="relative">
                  <button onClick={() => setShowDeleteConfirm(true)} className="w-full p-6 flex items-center justify-between hover:bg-error-container/20 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-error">delete_forever</span>
                      <p className="font-label-bold text-error">Delete Account</p>
                    </div>
                    <p className="text-label-sm text-error/60 italic">Permanent action</p>
                  </button>
                  {showDeleteConfirm && (
                    <div className="absolute bottom-full left-0 right-0 bg-error-container border border-error rounded-xl p-4 mb-2 shadow-lg z-10">
                      <p className="font-label-bold text-on-error-container mb-3">Are you sure? This cannot be undone.</p>
                      <div className="flex gap-2">
                        <button onClick={handleDeleteAccount} className="flex-1 bg-error text-on-error py-2 rounded-lg font-label-bold text-sm">Delete</button>
                        <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-surface-container text-on-surface py-2 rounded-lg font-label-bold text-sm">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Logout */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-label-bold rounded-full hover:bg-primary hover:text-white transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoggingOut ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="material-symbols-outlined">logout</span>
              )}
              {isLoggingOut ? 'Logging out...' : 'Logout from Device'}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
