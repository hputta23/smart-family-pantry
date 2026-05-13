'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let nextId = 0;

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = ++nextId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const icons: Record<string, string> = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
  };
  const colors: Record<string, string> = {
    success: 'bg-primary text-on-primary',
    error: 'bg-error text-on-error',
    info: 'bg-inverse-surface text-inverse-on-surface',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`${colors[toast.type]} px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 pointer-events-auto animate-slide-in min-w-[280px]`}
          >
            <span className="material-symbols-outlined text-[20px]">{icons[toast.type]}</span>
            <span className="font-label-bold text-label-bold">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
