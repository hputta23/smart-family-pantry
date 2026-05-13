
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginFamily } from '@/app/actions';
import { useToast } from '@/app/components/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await loginFamily(email, password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Failed to log in');
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex-grow flex items-center justify-center px-container-padding py-stack-lg">
  <div className="max-w-md w-full">
    {/* Brand Anchor Section */}
    <div className="text-center mb-stack-lg">
      <div className="inline-flex items-center justify-center p-4 bg-primary-container rounded-xl mb-4 board-shadow">
        <span className="material-symbols-outlined text-white text-4xl" data-icon="pantry" style={{fontVariationSettings: '"FILL" 1'}}>grocery</span>
      </div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">Smart Family Pantry</h1>
      <p className="font-body-md text-on-surface-variant">Your household's digital kitchen board.</p>
    </div>
    {/* Login Card (The Board) */}
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 board-shadow space-y-stack-md">
      <form onSubmit={handleLogin} className="space-y-stack-md">
        {error && (
          <div className="bg-error/10 text-error px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        {/* Email Field */}
        <div className="space-y-stack-sm">
          <label className="font-label-bold text-label-bold text-on-surface-variant block" htmlFor="email">Email Address</label>
          <div className="relative">
            <input 
              className="w-full bg-white border-2 border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-4 py-3 text-body-md transition-all outline-none" 
              id="email" 
              placeholder="e.g. mom@kitchen.com" 
              required 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        {/* Password Field */}
        <div className="space-y-stack-sm">
          <div className="flex justify-between items-center">
            <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor="password">Password</label>
            <Link className="font-label-sm text-label-sm text-primary hover:underline transition-all" href="#">Forgot Password?</Link>
          </div>
          <div className="relative">
            <input 
              className="w-full bg-white border-2 border-outline-variant focus:border-primary focus:ring-0 rounded-lg px-4 py-3 text-body-md transition-all outline-none" 
              id="password" 
              placeholder="••••••••" 
              required 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {/* Inline Validation Simulation (Subtle Note) */}
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span>
          <span className="font-label-sm text-label-sm">Secure connection active</span>
        </div>
        {/* Actions */}
        <div className="pt-2 space-y-3">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary text-on-primary font-label-bold text-body-md py-4 rounded-lg board-shadow hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isLoading ? 'Logging In...' : 'Log In'}</span>
            <span className="material-symbols-outlined text-lg" data-icon="login">login</span>
          </button>
          <Link href="/setup/stores" className="w-full bg-surface-container-high text-primary border border-primary font-label-bold text-body-md py-4 rounded-lg hover:bg-primary hover:text-on-primary transition-all active:scale-[0.98] flex items-center justify-center">
            Start a Family Account
          </Link>
        </div>
      </form>
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-surface-container-lowest px-4 font-label-sm text-on-surface-variant">OR</span>
        </div>
      </div>
      {/* Join a Family Section (Code Input) */}
      <div className="bg-secondary-container bg-opacity-10 border border-secondary border-dashed rounded-lg p-6 space-y-4">
        <div className="text-center">
          <h3 className="font-label-bold text-label-bold text-on-secondary-container">Join an existing Family</h3>
          <p className="text-label-sm text-on-surface-variant mt-1">Enter the 6-character pantry code</p>
        </div>
        <div className="flex justify-center gap-2">
          <input className="w-10 h-12 border-2 border-outline-variant rounded-lg text-center font-headline-md text-primary bg-white focus:border-secondary focus:ring-0 transition-all uppercase" maxLength={1} type="text" />
          <input className="w-10 h-12 border-2 border-outline-variant rounded-lg text-center font-headline-md text-primary bg-white focus:border-secondary focus:ring-0 transition-all uppercase" maxLength={1} type="text" />
          <input className="w-10 h-12 border-2 border-outline-variant rounded-lg text-center font-headline-md text-primary bg-white focus:border-secondary focus:ring-0 transition-all uppercase" maxLength={1} type="text" />
          <div className="flex items-center text-outline-variant">-</div>
          <input className="w-10 h-12 border-2 border-outline-variant rounded-lg text-center font-headline-md text-primary bg-white focus:border-secondary focus:ring-0 transition-all uppercase" maxLength={1} type="text" />
          <input className="w-10 h-12 border-2 border-outline-variant rounded-lg text-center font-headline-md text-primary bg-white focus:border-secondary focus:ring-0 transition-all uppercase" maxLength={1} type="text" />
          <input className="w-10 h-12 border-2 border-outline-variant rounded-lg text-center font-headline-md text-primary bg-white focus:border-secondary focus:ring-0 transition-all uppercase" maxLength={1} type="text" />
        </div>
        <button onClick={() => showToast('Family code join coming soon!', 'info')} className="w-full font-label-bold text-label-bold text-secondary hover:text-on-secondary-container transition-all py-2">
          Verify Code &amp; Join
        </button>
      </div>
    </div>
    {/* Footer Graphic / Contextual Image */}
    <div className="mt-stack-lg rounded-xl overflow-hidden border border-outline-variant board-shadow aspect-video relative group">
      <img alt="Organized Pantry" className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700" data-alt="A professionally organized modern kitchen pantry with labeled glass jars and woven baskets on white wooden shelves. The lighting is soft and warm, reflecting a bright morning sun through a nearby window. The aesthetic is minimalist and high-fidelity, matching a calm domestic atmosphere with a palette of whites, light woods, and subtle teal accents. The composition feels serene, clean, and extremely orderly." src="https://lh3.googleusercontent.com/aida-public/AB6AXuADZDTDNec6DKXWtUu1-eyzfgNlpBlW-qLMhYqSMRXCs8bmELVY1GP_PAiG_Br_dU1GfZJ6L8REnVgofMPfTJdsa09Kdvhi_EYIchjVfgV4BFN4MeEVlz5XVpyfqorHipCXxL6Ds9NRo7Rq-d6m3ZSN9dflIbZDyVwUGDrSZpWbfIczfzY4uBkd1ZKt8SHMgymTtWB0QhGqU1ZHnGdoUQP5Ff0O4VqOWQgMFX4KFrq0b7T3k3fhZw3e2GXrJb_aCRudQWcv6sdBFeiG" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
        <p className="font-label-sm text-on-surface italic">"A place for everything, and everything in its place."</p>
      </div>
    </div>
    {/* Copyright/Links */}
    <footer className="mt-stack-md flex justify-center gap-4">
      <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary" href="#">Privacy Policy</Link>
      <span className="text-outline-variant">•</span>
      <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary" href="#">Terms of Service</Link>
      <span className="text-outline-variant">•</span>
      <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary" href="#">Help Center</Link>
    </footer>
  </div>
</main>

    </>
  );
}
