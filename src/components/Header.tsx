"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const pathname = usePathname() || '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <header className={`transition-all duration-300 w-full max-w-5xl ${scrolled ? 'glass-navbar shadow-2xl bg-[#0A192F]/80 text-white' : 'glass-navbar bg-[#0A192F]/40 text-white'}`}>
        <div className="flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
              <img src="/ierf_normal.png" alt="IERF Logo" className="w-7 h-7 object-contain" />
            </div>
            <span className="font-display font-bold tracking-wide text-white text-base uppercase leading-tight hidden sm:block">
              India Eurasia<span className="text-[#E87722]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" label="Home" active={pathname === '/'} />
            <NavLink to="/about" label="About" active={pathname === '/about'} />
            <NavLink to="/research" label="Research" active={pathname === '/research' || pathname.includes('/digieurasia')} />
            <NavLink to="/events/volga-to-ganga" label="Events" active={pathname.includes('/events')} />
            <NavLink to="/our-people" label="People" active={pathname === '/our-people'} />
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/contact" className="bg-[#E87722] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-orange-600 transition-colors shadow-md hover:scale-105">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-white hover:bg-white/10 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-20 left-4 right-4 bg-[#0A192F]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="px-4 py-6 space-y-2">
              <MobileNavLink to="/" label="Home" active={pathname === '/'} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/about" label="About Us" active={pathname === '/about'} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/events/volga-to-ganga" label="Events" active={pathname.includes('/events')} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/research" label="Research" active={pathname.includes('/research')} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/our-people" label="Our People" active={pathname === '/our-people'} onClick={() => setIsMenuOpen(false)} />
              <div className="pt-4 mt-4 border-t border-white/10">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-[#E87722] text-white py-3 rounded-full font-bold">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      href={to}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-white/10 text-white'
          : 'glass-nav-link text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ to, label, active, onClick }: { to: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
        active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}
