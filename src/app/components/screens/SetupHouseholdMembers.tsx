'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AGE_RANGES = ['Adult (18-64)', 'Senior (65+)', 'Teen (13-17)', 'Child (3-12)', 'Infant (0-2)'];
const SEXES = [
  { value: 'female', label: 'Female', icon: 'female' },
  { value: 'male', label: 'Male', icon: 'male' },
];

interface Member {
  id: number;
  ageRange: string;
  sex: string;
}

export default function SetupHouseholdMembers() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([
    { id: 1, ageRange: 'Adult (18-64)', sex: 'female' }
  ]);

  // Load saved state
  useEffect(() => {
    try {
      const saved = localStorage.getItem('setup_members');
      if (saved) setMembers(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem('setup_members', JSON.stringify(members));
  }, [members]);

  const updateMember = (id: number, field: keyof Member, value: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addMember = () => {
    const nextId = Math.max(...members.map(m => m.id), 0) + 1;
    setMembers(prev => [...prev, { id: nextId, ageRange: '', sex: '' }]);
  };

  const removeMember = (id: number) => {
    if (members.length <= 1) return;
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleNext = () => {
    localStorage.setItem('setup_members', JSON.stringify(members));
    router.push('/setup/budget');
  };

  return (
    <>
      <div>
        <header className="bg-background w-full top-0 z-50">
          <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Smart Family Pantry</h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-gutter py-stack-lg min-h-[calc(100vh-140px)] flex flex-col justify-center">
          {/* Progress Bar */}
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-stack-lg overflow-hidden max-w-md mx-auto">
            <div className="bg-primary h-full w-2/3 rounded-full transition-all duration-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg">
            {/* Left Side */}
            <div className="md:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-bold text-label-sm">Step 2 of 3</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-background mb-4 leading-tight">Who&apos;s in your household?</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">Tell us about your family. This helps calculate portion sizes and nutrient needs.</p>
              <div className="hidden md:block rounded-xl overflow-hidden kitchen-board-shadow border border-outline-variant">
                <img className="w-full h-64 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0gj-e1JDXmnv4WxG7QhHz8HWfmQ65HAzMmgja3k4XRMalhBnKEm_G0h3QL0h1OCdVVSzVmMbkOy1TnIDqInr-sQqT7Ym0bKtDb-qvyN93oC_iCzkZVAl9vjhJQyl1IhrMR5MO94XNL3__Zahe_9tecEyuauPrzgr39ii-uwXLJLeEoKHDYrMbqWGvWBQKcoqF0kCNPb8aa27o4SrKqjmhZtFuOsZfUjAaB8FcyGvXYGKQJAjzxPGRwv7FhX8JyeKG5qRz2iug4KeQ" alt="Kitchen" />
              </div>
            </div>

            {/* Right Side: Interactive Board */}
            <div className="md:col-span-7">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 kitchen-board-shadow">
                {members.map((member, idx) => (
                  <div key={member.id} className="mb-stack-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-label-bold text-label-bold text-primary uppercase tracking-wider">
                        Member {idx + 1} {idx === 0 ? '(You)' : ''}
                      </span>
                      {idx > 0 && (
                        <button onClick={() => removeMember(member.id)} className="text-error hover:bg-error/10 p-1 rounded-full transition-colors">
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      )}
                    </div>
                    <div className="space-y-6">
                      {/* Age Selection */}
                      <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-3">Age Range</label>
                        <div className="flex flex-wrap gap-2">
                          {AGE_RANGES.map(age => (
                            <button
                              key={age}
                              onClick={() => updateMember(member.id, 'ageRange', age)}
                              className={`px-4 py-2 rounded-full font-label-bold text-label-bold transition-all ${
                                member.ageRange === age
                                  ? 'border-2 border-primary bg-primary text-on-primary'
                                  : 'border border-outline-variant hover:border-primary text-on-surface-variant'
                              }`}
                            >
                              {age}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Sex Selection */}
                      <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-3">Sex</label>
                        <div className="flex gap-2">
                          {SEXES.map(sex => (
                            <button
                              key={sex.value}
                              onClick={() => updateMember(member.id, 'sex', sex.value)}
                              className={`flex-1 px-4 py-2 rounded-lg font-label-bold text-label-bold transition-all flex items-center justify-center gap-2 ${
                                member.sex === sex.value
                                  ? 'border-2 border-primary bg-primary-container text-on-primary-container'
                                  : 'border border-outline-variant hover:border-primary text-on-surface-variant'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[20px]">{sex.icon}</span> {sex.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {idx < members.length - 1 && <div className="h-px bg-outline-variant w-full my-stack-lg" />}
                  </div>
                ))}

                {/* Add Member Button */}
                {members.length < 10 && (
                  <>
                    <div className="h-px bg-outline-variant w-full my-stack-lg" />
                    <button
                      onClick={addMember}
                      className="w-full p-4 rounded-xl border border-dashed border-outline text-on-surface-variant flex items-center justify-center gap-2 hover:bg-surface-container hover:border-primary transition-all"
                    >
                      <span className="material-symbols-outlined">add</span>
                      <span className="font-label-bold">Add Household Member</span>
                    </button>
                  </>
                )}

                {/* Smart Hint */}
                <div className="bg-[#FFF9F0] border border-[#FFB142]/30 p-4 rounded-xl mt-stack-lg">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary">lightbulb</span>
                    <p className="text-label-bold text-on-secondary-fixed-variant leading-tight">
                      Knowing your household size ({members.length} {members.length === 1 ? 'person' : 'people'}) helps our Smart Inventory predict when you&apos;ll run out of staples like milk or bread.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-6">
                  <button
                    onClick={handleNext}
                    className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-md text-headline-md shadow-md active:scale-95 transition-transform duration-150 flex items-center justify-center"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => router.push('/setup/budget')}
                    className="w-full py-2 text-on-surface-variant font-label-bold text-label-bold hover:text-primary transition-colors flex items-center justify-center"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
