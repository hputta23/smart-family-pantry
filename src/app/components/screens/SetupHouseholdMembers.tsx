import React from 'react';
import Link from 'next/link';

export default function SetupHouseholdMembers() {
  return (
    <>
      <div>
  {/* Top AppBar Navigation (Suppressed Navigation logic: Rendered for identification but minimal) */}
  <header className="bg-background w-full top-0 z-50">
    <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
      <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Smart Family Pantry</h1>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary hover:opacity-80 transition-opacity cursor-pointer" data-icon="notifications">notifications</span>
        <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant">
          <img alt="User profile avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYjFVm7ba7qw1CTCrOjbIQUElKevEYao7pWqz0vi2oSHszCtTS4G_tyq-cgE6DeLzBeGmyCQ4OP7ymo6hvSwtskyHoEtTrLmnjt9f8AFbL4r0Gq0gaZDdntkejc_6PJp65RebQD8JEjtIrw8T8O2iroZXBOCNKPqJdZgRhUj5zHhaqy8SZwKMVmMv3ab-UvCpM3ZtnX8Wkd9YOq57R-oYPovZOIWaN6CUl0GeBt75Z7y_L1jNj-gN3-82UtEe4E6dphoQwKRmrAfna" />
        </div>
      </div>
    </div>
  </header>
  <main className="max-w-4xl mx-auto px-gutter py-stack-lg min-h-[calc(100vh-140px)] flex flex-col justify-center">
    {/* Progress Bar */}
    <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-stack-lg overflow-hidden max-w-md mx-auto">
      <div className="bg-primary h-full w-1/4 rounded-full" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg">
      {/* Left Side: Header & Context */}
      <div className="md:col-span-5 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-bold text-label-sm">Step 1 of 4</span>
        </div>
        <h2 className="font-headline-xl text-headline-xl text-on-background mb-4 leading-tight">Who's in your household?</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">Tell us a bit about your family. This helps us calculate portion sizes and nutrient needs for your grocery lists.</p>
        <div className="hidden md:block rounded-xl overflow-hidden kitchen-board-shadow border border-outline-variant">
          <img className="w-full h-64 object-cover" data-alt="A warm, brightly lit modern kitchen with clean white countertops and light wooden accents. A family cookbook sits open on a ceramic stand next to a bowl of fresh seasonal fruits. The atmosphere is nurturing and organized, reflecting a calm domestic light-mode aesthetic with soft natural morning light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0gj-e1JDXmnv4WxG7QhHz8HWfmQ65HAzMmgja3k4XRMalhBnKEm_G0h3QL0h1OCdVVSzVmMbkOy1TnIDqInr-sQqT7Ym0bKtDb-qvyN93oC_iCzkZVAl9vjhJQyl1IhrMR5MO94XNL3__Zahe_9tecEyuauPrzgr39ii-uwXLJLeEoKHDYrMbqWGvWBQKcoqF0kCNPb8aa27o4SrKqjmhZtFuOsZfUjAaB8FcyGvXYGKQJAjzxPGRwv7FhX8JyeKG5qRz2iug4KeQ" />
        </div>
      </div>
      {/* Right Side: Interaction Board */}
      <div className="md:col-span-7">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 kitchen-board-shadow">
          {/* Member Entry Row 1 (User Self) */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label-bold text-label-bold text-primary uppercase tracking-wider">Member 1 (You)</span>
            </div>
            <div className="space-y-6">
              {/* Age Selection Chips */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-3">Age Range</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 rounded-full border-2 border-primary bg-primary text-on-primary font-label-bold text-label-bold transition-all">Adult (18-64)</button>
                  <button className="px-4 py-2 rounded-full border border-outline-variant hover:border-primary text-on-surface-variant font-label-bold text-label-bold transition-all">Senior (65+)</button>
                  <button className="px-4 py-2 rounded-full border border-outline-variant hover:border-primary text-on-surface-variant font-label-bold text-label-bold transition-all">Teen (13-17)</button>
                  <button className="px-4 py-2 rounded-full border border-outline-variant hover:border-primary text-on-surface-variant font-label-bold text-label-bold transition-all">Child (3-12)</button>
                  <button className="px-4 py-2 rounded-full border border-outline-variant hover:border-primary text-on-surface-variant font-label-bold text-label-bold transition-all">Infant (0-2)</button>
                </div>
              </div>
              {/* Sex Selection Chips */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-3">Sex</label>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 rounded-lg border-2 border-primary bg-primary-container text-on-primary-container font-label-bold text-label-bold transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]" data-icon="female">female</span> Female
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-lg border border-outline-variant hover:border-primary text-on-surface-variant font-label-bold text-label-bold transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]" data-icon="male">male</span> Male
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-px bg-outline-variant w-full my-stack-lg" />
          {/* Member Entry Row 2 (Template for Add) */}
          <div className="mb-stack-lg opacity-60">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">Member 2</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="w-full p-4 rounded-xl border border-dashed border-outline text-on-surface-variant flex items-center justify-center gap-2 hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined" data-icon="add">add</span>
                <span className="font-label-bold">Add Household Member</span>
              </button>
              <div className="hidden sm:block" />
            </div>
          </div>
          {/* Prediction Module Hint */}
          <div className="bg-[#FFF9F0] border border-[#FFB142]/30 p-4 rounded-xl mb-stack-lg">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-secondary" data-icon="lightbulb">lightbulb</span>
              <p className="text-label-bold text-on-secondary-fixed-variant leading-tight">
                Knowing your household size helps our Smart Inventory predict when you'll run out of staples like milk or bread.
              </p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/setup/budget" className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-md text-headline-md shadow-md active:scale-95 transition-transform duration-150 flex items-center justify-center">
              Next
            </Link>
            <Link href="/setup/budget" className="w-full py-2 text-on-surface-variant font-label-bold text-label-bold hover:text-primary transition-colors flex items-center justify-center">
              Skip for now
            </Link>
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* Bottom Navigation suppressed per Destination Rule as this is a focused Journey/Transactional Wizard */}
</div>

    </>
  );
}
