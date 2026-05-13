"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/fridge', icon: 'format_list_bulleted', label: 'List' },
    { href: '/scan', icon: 'receipt_long', label: 'Scan' },
    { href: '/inventory', icon: 'inventory_2', label: 'Pantry', fillIcon: true },
    { href: '/budget', icon: 'payments', label: 'Budget' },
    { href: '/settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface-container-lowest border-t border-outline-variant shadow-sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center px-4 py-1 transition-all duration-200 ${
              isActive
                ? 'bg-primary-container text-on-primary-container rounded-full'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span
              className="material-symbols-outlined"
              data-icon={item.icon}
              style={item.fillIcon && isActive ? { fontVariationSettings: '"FILL" 1' } : undefined}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-label-sm">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
