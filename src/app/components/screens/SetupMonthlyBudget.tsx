'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setupFamily } from '@/app/actions';

export default function SetupMonthlyBudget() {
  const [budget, setBudget] = useState(850);
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFinishSetup = async () => {
    if (!familyName || !email || !password) {
      setError('Please fill in your family name, email, and password to create an account.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    const result = await setupFamily({
      familyName,
      email,
      password,
      budget,
      members: [], // We'd ideally pass this from context or local storage
      stores: [],  // We'd ideally pass this from context or local storage
    });

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Failed to setup account');
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
  <header className="w-full top-0 bg-background dark:bg-background z-50">
    <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-3xl" data-icon="pantry">grocery</span>
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Smart Family Pantry</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-on-surface-variant" data-icon="notifications">notifications</span>
        </button>
        <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant">
          <img alt="User" className="w-full h-full object-cover" data-alt="A professional headshot of a friendly-looking middle-aged woman with a warm smile, set against a soft-focus interior domestic background. The lighting is natural and bright, reflecting a light-mode aesthetic. Her appearance is organized and dependable, fitting the brand persona of a hyper-organized but nurturing home manager." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6AqQF76t56mtTyIQ_ZfUnkGlBpVwiInWa-K-dhh3j7W2iawGGyEUigv2SGJVf55FNUToOzYIjmlMMSbVvmFsXBxE2CfTFPVnoWOuaVpghZNUGR30Gc5HgWityI1-Oz9C9J5C4kwRSOwNGxSDw2mV4KM7_gAs_gXMDyTwN-TgQEiC9Kn9FlwdTqhYs5BUFEcALJpznH3IH9pHKAS7eKIZDe6JPBX8nHAiSKwd49yXcDHz3i-aQyT9V2QF7RRYUcNdBMsNcz0bohTOR" />
        </div>
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
      <p className="text-on-surface-variant text-body-lg">Control your monthly spending with a smart grocery limit tailored to your family's needs.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
      <div className="md:col-span-8">
        <div className="bg-surface-container-lowest board-card border border-outline-variant rounded-xl p-8">
          <div className="flex flex-col items-center mb-10">
            <span className="text-on-surface-variant font-label-bold text-label-bold mb-2">MONTHLY TARGET</span>
            <div className="flex items-baseline gap-1">
              <span className="text-headline-md font-bold text-primary">$</span>
              <span className="text-6xl font-bold text-on-surface tracking-tighter">850</span>
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
              <span className="text-primary font-bold">Recommended for 4 people</span>
              <span className="hidden sm:block">Premium</span>
              <span>$2,500+</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="flex flex-col items-start p-4 border-2 border-outline-variant rounded-xl hover:border-primary transition-all text-left bg-surface-container-low group">
              <span className="text-label-sm font-label-sm text-on-surface-variant mb-1">Thrifty</span>
              <span className="text-body-md font-bold text-on-surface">$600</span>
              <p className="text-[10px] text-on-surface-variant mt-2">Essential staples and basic ingredients only.</p>
            </button>
            <button className="flex flex-col items-start p-4 border-2 border-primary rounded-xl transition-all text-left bg-primary-container group relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">MOST POPULAR</div>
              <span className="text-label-sm font-label-sm text-on-primary-container mb-1">Balanced</span>
              <span className="text-body-md font-bold text-on-primary-container">$850</span>
              <p className="text-[10px] text-on-primary-container opacity-80 mt-2">Variety including fresh produce and brand names.</p>
            </button>
            <button className="flex flex-col items-start p-4 border-2 border-outline-variant rounded-xl hover:border-primary transition-all text-left bg-surface-container-low group">
              <span className="text-label-sm font-label-sm text-on-surface-variant mb-1">Abundant</span>
              <span className="text-body-md font-bold text-on-surface">$1,200</span>
              <p className="text-[10px] text-on-surface-variant mt-2">Organic options, specialty items, and snacks.</p>
            </button>
          </div>
        </div>
      </div>
      <div className="md:col-span-4 flex flex-col gap-4">
        <div className="bg-[#FFF9F0] border border-secondary-container rounded-xl p-6 board-card">
          <h3 className="font-label-bold text-label-bold text-on-secondary-container flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-secondary" data-icon="lightbulb">lightbulb</span>
            SMART PREDICTION
          </h3>
          <p className="text-body-md text-on-surface-variant mb-4">Based on your household size of <span className="font-bold">4 people</span>, this budget covers:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1" data-icon="check_circle">check_circle</span>
              <span className="text-label-bold text-label-bold text-on-surface">Weekly Meal Prep</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1" data-icon="check_circle">check_circle</span>
              <span className="text-label-bold text-label-bold text-on-surface">Household Supplies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1" data-icon="check_circle">check_circle</span>
              <span className="text-label-bold text-label-bold text-on-surface">Snacks &amp; Beverages</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-outline text-sm mt-1" data-icon="cancel">cancel</span>
              <span className="text-label-bold text-label-bold text-on-surface-variant line-through">Dine-out / Takeout</span>
            </li>
          </ul>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden board-card mt-auto">
          <img alt="Fresh Groceries" className="w-full h-32 object-cover" data-alt="A beautifully arranged overhead shot of fresh organic groceries including vibrant greens, heirloom tomatoes, and sourdough bread on a clean wooden kitchen countertop. The lighting is soft and domestic, creating a nurturing and hyper-organized mood that reflects a well-maintained home. The color palette is natural with pops of fresh teal and warm amber." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5Yht7LM8ttP3icXjAuSxfKkuK2pJmi2bvUqO5nZG4ZSIPUWTFEFSwHS7QZo2zp4iQ9-uy7O2jpUYviGfJstI2IwCRd2SO1CGPRFZmlh4bI05nqlPv3VKkAfBEYzEysAG195iB99XC9sKnm3joUSXh_wtpwORs17XArO2I0ExZhA6tAcl6HeS08dv1aA57IDTZuWw-IjXi56XZMkZF3slk-RhNbrgR9-hE31Opb04ok7fTmL1bhzoWOdEGadEqEZuzh6mmJkENZAXv" />
          <div className="p-4">
            <p className="text-label-sm font-label-sm text-on-surface-variant italic">"A budget is telling your money where to go instead of wondering where it went."</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Account Details Form */}
    <div className="w-full mt-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 board-shadow">
      <h3 className="font-headline-sm text-on-surface mb-4">Create Your Account</h3>
      {error && (
        <div className="bg-error/10 text-error px-4 py-2 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <label className="font-label-bold text-on-surface-variant">Family Name</label>
          <input 
            className="w-full bg-white border-2 border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-4 py-3 outline-none" 
            placeholder="e.g. The Smith Family" 
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-bold text-on-surface-variant">Email</label>
          <input 
            className="w-full bg-white border-2 border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-4 py-3 outline-none" 
            type="email"
            placeholder="mom@kitchen.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-bold text-on-surface-variant">Password</label>
          <input 
            className="w-full bg-white border-2 border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-4 py-3 outline-none" 
            type="password"
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
    <div className="w-full flex flex-col sm:flex-row gap-4 mt-12 justify-between items-center">
      <Link href="/setup/members" className="flex items-center gap-2 text-on-surface-variant font-label-bold text-label-bold hover:text-primary transition-colors order-2 sm:order-1">
        <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
        Previous Step
      </Link>
      <div className="flex gap-4 w-full sm:w-auto order-1 sm:order-2">
        <button 
          onClick={handleFinishSetup}
          disabled={isLoading}
          className="flex-1 sm:flex-initial px-8 py-3 bg-primary text-on-primary font-label-bold text-label-bold rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Finish Setup'}
        </button>
      </div>
    </div>
  </main>
  <footer className="md:hidden">
    
  </footer>
</div>

    </>
  );
}
