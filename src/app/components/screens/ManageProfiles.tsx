'use client';

import React, { useState, useEffect } from 'react';
import { getFamilyProfiles, addProfile } from '@/app/actions';
import Link from 'next/link';

export default function ManageProfiles() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Member');

  const fetchProfiles = async () => {
    setIsLoading(true);
    const result = await getFamilyProfiles();
    if (result.success && result.data) {
      setProfiles(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleAddProfile = async () => {
    if (!newName) return;
    setIsLoading(true);
    await addProfile(newName, newType);
    setIsAdding(false);
    setNewName('');
    fetchProfiles();
  };

  return (
    <>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16">
        <header className="mb-section-gap flex flex-col gap-6">
          <Link href="/settings" className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors w-fit group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="font-label-md text-label-md">Settings</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-display text-on-surface mb-2">Family Profiles</h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">Manage who has access to your pantry board. Admins can invite others and modify settings.</p>
            </div>
          </div>
        </header>

        <section className="mb-section-gap">
          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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

        <section>
          {isLoading && profiles.length === 0 ? (
            <p className="animate-pulse">Loading profiles...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map(profile => (
                <div key={profile.id} className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer flex flex-col justify-between min-h-[160px]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full text-3xl shadow-inner border border-surface-variant">
                      {profile.type === 'Admin' ? '👩‍🍳' : '👨‍💻'}
                    </div>
                    <span className="bg-surface-variant text-on-surface-variant font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">{profile.type || 'Member'}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">{profile.name}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">{profile.type === 'Admin' ? 'Primary Organizer' : 'Member'}</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">edit</span>
                  </div>
                </div>
              ))}

              {isAdding ? (
                <div className="border-2 border-primary bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-center min-h-[160px] gap-3">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)}
                    className="w-full bg-white border border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-3 py-2 outline-none"
                    autoFocus
                  />
                  <select 
                    value={newType} 
                    onChange={e => setNewType(e.target.value)}
                    className="w-full bg-white border border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-3 py-2 outline-none"
                  >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                    <option value="Child">Child</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <button onClick={handleAddProfile} className="flex-1 bg-primary text-on-primary py-2 rounded-lg font-label-bold text-sm">Save</button>
                    <button onClick={() => setIsAdding(false)} className="flex-1 bg-surface-container text-on-surface py-2 rounded-lg font-label-bold text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div onClick={() => setIsAdding(true)} className="border-2 border-dashed border-outline-variant bg-transparent rounded-xl p-6 hover:bg-surface-container-highest/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[160px] group">
                  <div className="w-12 h-12 bg-surface-variant text-on-surface-variant rounded-full flex items-center justify-center mb-3 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <span className="material-symbols-outlined" style={{fontVariationSettings: '"wght" 600'}}>add</span>
                  </div>
                  <h3 className="font-label-md text-label-md text-on-surface font-semibold">Add Profile</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Create a new local member</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
