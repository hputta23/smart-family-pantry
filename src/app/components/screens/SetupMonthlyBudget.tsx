'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setupFamily } from '@/app/actions';

const PRESETS = [
  { label: 'Thrifty', value: 600, desc: 'Essential staples and basic ingredients only.' },
  { label: 'Balanced', value: 850, desc: 'Variety including fresh produce and brand names.', popular: true },
  { label: 'Abundant', value: 1200, desc: 'Organic options, specialty items, and snacks.' },
];

export default function SetupMonthlyBudget() {
  const [budget, setBudget] = useState(850);
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [stores, setStores] = useState<string[]>([]);
  const router = useRouter();

  // Read wizard state from localStorage
  useEffect(() => {
    try {
      const savedMembers = localStorage.getItem('setup_members');
      const savedStores = localStorage.getItem('setup_stores');
      if (savedMembers) setMembers(JSON.parse(savedMembers));
      if (savedStores) setStores(JSON.parse(savedStores));
    } catch {}
  }, []);

  const memberCount = members.length || 1;

  const handleFinishSetup = async () => {
    if (!familyName || !email || !password) {
      setError('Please fill in your family name, email, and password to create an account.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await setupFamily({
      familyName,
      email,
      password,
      budget,
      members: members.map(m => ({ ageRange: m.ageRange, sex: m.sex })),
      stores,
    });

    if (result.success) {
      // Clear wizard state
      localStorage.removeItem('setup_stores');
      localStorage.removeItem('setup_members');
      router.push('/inventory');
    } else {
      setError(result.error || 'Failed to setup account');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <header className="w-full top-0 bg-background z-50">
          <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">grocery</span>
              <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Smart Family Pantry</h1>
            </div>
          </div>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center px-gutter py-stack-lg max-w-4xl mx-auto w-full">
          <div className="w-full mb-stack-lg">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-primary font-label-bold text-label-bold uppercase tracking-wider">Step 3 of 3</span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">Set Your Budget</h2>
              </div>
              <div className="hidden md:flex gap-2">
                <div className="w-8 h-2 rounded-full bg-primary" />
                <div className="w-8 h-2 rounded-full bg-primary" />
                <div className="w-12 h-2 rounded-full bg-primary" />
              </div>
            </div>
            <p className="text-on-surface-variant text-body-lg">Control your monthly spending with a smart grocery limit tailored to your family&apos;s needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
            <div className="md:col-span-8">
              <div className="bg-surface-container-lowest board-card border border-outline-variant rounded-xl p-8">
                <div className="flex flex-col items-center mb-10">
                  <span className="text-on-surface-variant font-label-bold text-label-bold mb-2">MONTHLY TARGET</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-headline-md font-bold text-primary">$</span>
                    <span className="text-6xl font-bold text-on-surface tracking-tighter">{budget.toLocaleString()}</span>
                  </div>
                </div>
                <div className="relative w-full mb-12">
                  <input
                    className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                    max={2500} min={200} step={50} type="range"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                  />
                  <div className="flex justify-between mt-4 text-label-sm text-on-surface-variant font-label-sm">
                    <span>$200</span>
                    <span className="hidden sm:block">Frugal</span>
                    <span className="text-primary font-bold">Recommended for {memberCount} {memberCount === 1 ? 'person' : 'people'}</span>
                    <span className="hidden sm:block">Premium</span>
                    <span>$2,500+</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PRESETS.map(preset => (
                    <button
                      key={preset.label}
                      onClick={() => setBudget(preset.value)}
                      className={`flex flex-col items-start p-4 border-2 rounded-xl transition-all text-left group relative ${
                        budget === preset.value
                          ? 'border-primary bg-primary-container'
                          : 'border-outline-variant bg-surface-container-low hover:border-primary'
                      }`}
                    >
                      {preset.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">MOST POPULAR</div>
                      )}
                      <span className={`text-label-sm font-label-sm mb-1 ${budget === preset.value ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>{preset.label}</span>
                      <span className={`text-body-md font-bold ${budget === preset.value ? 'text-on-primary-container' : 'text-on-surface'}`}>${preset.value.toLocaleString()}</span>
                      <p className={`text-[10px] mt-2 ${budget === preset.value ? 'text-on-primary-container opacity-80' : 'text-on-surface-variant'}`}>{preset.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="bg-[#FFF9F0] border border-secondary-container rounded-xl p-6 board-card">
                <h3 className="font-label-bold text-label-bold text-on-secondary-container flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-secondary">lightbulb</span>
                  SMART PREDICTION
                </h3>
                <p className="text-body-md text-on-surface-variant mb-4">Based on your household size of <span className="font-bold">{memberCount} {memberCount === 1 ? 'person' : 'people'}</span>, this budget covers:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <span className="text-label-bold text-on-surface">Weekly Meal Prep</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <span className="text-label-bold text-on-surface">Household Supplies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-sm mt-1 ${budget >= 800 ? 'text-primary' : 'text-outline'}`}>{budget >= 800 ? 'check_circle' : 'cancel'}</span>
                    <span className={`text-label-bold ${budget >= 800 ? 'text-on-surface' : 'text-on-surface-variant line-through'}`}>Snacks &amp; Beverages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-sm mt-1 ${budget >= 1200 ? 'text-primary' : 'text-outline'}`}>{budget >= 1200 ? 'check_circle' : 'cancel'}</span>
                    <span className={`text-label-bold ${budget >= 1200 ? 'text-on-surface' : 'text-on-surface-variant line-through'}`}>Organic &amp; Premium</span>
                  </li>
                </ul>
              </div>

              {/* Wizard state summary */}
              {(stores.length > 0 || members.length > 0) && (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 board-card">
                  <h4 className="font-label-bold text-on-surface-variant text-label-sm mb-2">YOUR SETUP</h4>
                  {stores.length > 0 && (
                    <p className="text-label-sm text-on-surface flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-primary text-[16px]">store</span>
                      {stores.length} {stores.length === 1 ? 'store' : 'stores'} selected
                    </p>
                  )}
                  {members.length > 0 && (
                    <p className="text-label-sm text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[16px]">group</span>
                      {members.length} household {members.length === 1 ? 'member' : 'members'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Account Details Form */}
          <div className="w-full mt-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 board-shadow">
            <h3 className="font-headline-sm text-on-surface mb-4">Create Your Account</h3>
            {error && (
              <div className="bg-error/10 text-error px-4 py-2 rounded-lg text-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="font-label-bold text-on-surface-variant">Family Name</label>
                <input
                  className="w-full bg-white border-2 border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-4 py-3 outline-none transition-all"
                  placeholder="e.g. The Smith Family"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-bold text-on-surface-variant">Email</label>
                <input
                  className="w-full bg-white border-2 border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-4 py-3 outline-none transition-all"
                  type="email"
                  placeholder="mom@kitchen.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-bold text-on-surface-variant">Password</label>
                <input
                  className="w-full bg-white border-2 border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-4 py-3 outline-none transition-all"
                  type="password"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-4 mt-12 justify-between items-center pb-8">
            <Link href="/setup/members" className="flex items-center gap-2 text-on-surface-variant font-label-bold text-label-bold hover:text-primary transition-colors order-2 sm:order-1">
              <span className="material-symbols-outlined">arrow_back</span>
              Previous Step
            </Link>
            <div className="flex gap-4 w-full sm:w-auto order-1 sm:order-2">
              <button
                onClick={handleFinishSetup}
                disabled={isLoading}
                className="flex-1 sm:flex-initial px-8 py-3 bg-primary text-on-primary font-label-bold text-label-bold rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : 'Finish Setup'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
