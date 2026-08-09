"use client";

import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MainWrapper from './MainWrapper';

/**
 * Conditionally renders Header, MainWrapper, and Footer ONLY for non-admin routes.
 * On /admin routes, renders children directly so the admin panel gets a clean full-viewport layout.
 */
export default function AdminLayoutGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </>
  );
}
