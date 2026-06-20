"use client";

import { usePathname } from 'next/navigation';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const isAdmin = pathname.startsWith('/admin');
  const isHomePage = pathname === '/';

  return (
    <main className={`flex-grow flex flex-col relative min-h-[60vh] ${isAdmin || isHomePage ? '' : 'mt-20'}`}>
      {children}
    </main>
  );
}
