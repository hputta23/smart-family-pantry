
import React from 'react';

export default function ManageProfiles() {
  return (
    <>
      {/* Main Content Canvas */}
<main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16">
  {/* Header Section (Task-focused, so no global nav shell) */}
  <header className="mb-section-gap flex flex-col gap-6">
    <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors w-fit group">
      <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
      <span className="font-label-md text-label-md">Settings</span>
    </button>
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="font-display text-display text-on-surface mb-2">Family Profiles</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">Manage who has access to your pantry board. Admins can invite others and modify settings.</p>
      </div>
    </div>
  </header>
  {/* Family Code Card (Tactile Pinned Note style) */}
  <section className="mb-section-gap">
    <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      {/* Decorative background subtle element */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="z-10">
        <h2 className="font-label-caps text-label-caps text-secondary uppercase tracking-wider mb-2">Invite to Household</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">Share this code with family members so they can sync with this pantry.</p>
        <div className="flex items-center gap-4 bg-surface px-4 py-3 rounded-lg border border-surface-variant w-fit">
          <span className="font-headline-md text-headline-md tracking-widest text-on-surface">PANTRY-8821-K</span>
        </div>
      </div>
      <button className="z-10 flex items-center justify-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm">
        <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>content_copy</span>
        Copy Invite Link
      </button>
    </div>
  </section>
  {/* Profiles Grid (Bento style) */}
  <section>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Profile Card: Admin */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer flex flex-col justify-between min-h-[160px]">
        <div className="flex justify-between items-start mb-4">
          <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full text-3xl shadow-inner border border-surface-variant">
            👩‍🍳
          </div>
          <span className="bg-secondary-container text-on-secondary-container font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">Admin</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Sarah</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Primary Organizer</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">edit</span>
        </div>
      </div>
      {/* Profile Card: Member */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer flex flex-col justify-between min-h-[160px]">
        <div className="flex justify-between items-start mb-4">
          <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full text-3xl shadow-inner border border-surface-variant">
            👨‍💻
          </div>
          <span className="bg-surface-variant text-on-surface-variant font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">Member</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Mark</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Shopper</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">edit</span>
        </div>
      </div>
      {/* Profile Card: Member (Kid) */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer flex flex-col justify-between min-h-[160px]">
        <div className="flex justify-between items-start mb-4">
          <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full text-3xl shadow-inner border border-surface-variant">
            👧
          </div>
          <span className="bg-surface-variant text-on-surface-variant font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">Member</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Leo</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Snack Requestor</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">edit</span>
        </div>
      </div>
      {/* Add Profile Action Card */}
      <div className="border-2 border-dashed border-outline-variant bg-transparent rounded-xl p-6 hover:bg-surface-container-highest/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[160px] group">
        <div className="w-12 h-12 bg-surface-variant text-on-surface-variant rounded-full flex items-center justify-center mb-3 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
          <span className="material-symbols-outlined" style={{fontVariationSettings: '"wght" 600'}}>add</span>
        </div>
        <h3 className="font-label-md text-label-md text-on-surface font-semibold">Add Profile</h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Create a new local member</p>
      </div>
    </div>
  </section>
</main>

    </>
  );
}
