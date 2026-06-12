"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const pathname = usePathname() || '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getLangFromCookie = (): 'EN' | 'HI' | 'RU' => {
    if (typeof document === 'undefined') return 'EN';
    const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
    if (!match) return 'EN';
    if (match[1] === 'hi') return 'HI';
    if (match[1] === 'ru') return 'RU';
    return 'EN';
  };
  
  const [lang, setLang] = useState<'EN' | 'HI' | 'RU'>(getLangFromCookie);

  const switchLanguage = (l: 'EN' | 'HI' | 'RU') => {
    setLang(l);
    const langMap: Record<string, string> = { EN: 'en', HI: 'hi', RU: 'ru' };
    const target = langMap[l];

    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (combo) {
      combo.value = target;
      combo.dispatchEvent(new Event('change'));
      return;
    }

    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${target};path=/;domain=${domain}`;
    document.cookie = `googtrans=/en/${target};path=/`;
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/ierf_normal.png"
                alt="IERF Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="font-display font-black tracking-wide text-[#0A192F] text-lg uppercase leading-tight">
                India Eurasia<br/><span className="text-[#E87722] text-xs tracking-widest">Research Forum</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLink to="/" label="Home" active={pathname === '/'} />
            <NavLink to="/about" label="About Us" active={pathname === '/about'} />

            {/* Events Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsEventsOpen(true)}
              onMouseLeave={() => setIsEventsOpen(false)}
            >
              <button className={`flex items-center gap-1 font-semibold text-sm transition-colors ${pathname.includes('/events') ? 'text-[#E87722]' : 'text-[#0A192F] hover:text-[#E87722]'}`}>
                Events <ChevronDown size={14} className={`transition-transform ${isEventsOpen ? 'rotate-180 text-[#E87722]' : ''}`} />
              </button>
              <AnimatePresence>
                {isEventsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden flex flex-col"
                  >
                    <Link href="/events/volga-to-ganga" className="px-4 py-3 text-sm text-[#0A192F] hover:bg-gray-50 hover:text-[#E87722] transition-colors border-b border-gray-50">Volga to Ganga</Link>
                    <Link href="/events/ierf-talks" className="px-4 py-3 text-sm text-[#0A192F] hover:bg-gray-50 hover:text-[#E87722] transition-colors">IERF Talks</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Research Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsResearchOpen(true)}
              onMouseLeave={() => setIsResearchOpen(false)}
            >
              <button className={`flex items-center gap-1 font-semibold text-sm transition-colors ${pathname.includes('/research') || pathname.includes('/digieurasia') ? 'text-[#E87722]' : 'text-[#0A192F] hover:text-[#E87722]'}`}>
                Research <ChevronDown size={14} className={`transition-transform ${isResearchOpen ? 'rotate-180 text-[#E87722]' : ''}`} />
              </button>
              <AnimatePresence>
                {isResearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden flex flex-col"
                  >
                    <Link href="/research" className="px-4 py-3 text-sm text-[#0A192F] hover:bg-gray-50 hover:text-[#E87722] transition-colors border-b border-gray-50">Publications</Link>
                    <Link href="/digieurasia" className="px-4 py-3 text-sm text-[#0A192F] hover:bg-gray-50 hover:text-[#E87722] transition-colors">DigiEurasia</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/our-people" label="Our People" active={pathname === '/our-people'} />
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-md p-1">
              {(['EN', 'HI', 'RU'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLanguage(l)}
                  className={`px-2 py-1 text-xs font-bold rounded transition-colors ${lang === l ? 'bg-white text-[#0A192F] shadow-sm' : 'text-gray-500 hover:text-[#0A192F]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link href="/write-for-us" className="text-sm font-semibold text-[#0A192F] hover:text-[#E87722] transition-colors">Write for Us</Link>
            <Link href="/contact" className="bg-[#E87722] text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-[#0A192F] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#E87722]"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
              <MobileNavLink to="/" label="Home" active={pathname === '/'} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/about" label="About Us" active={pathname === '/about'} onClick={() => setIsMenuOpen(false)} />
              
              <div className="py-2">
                <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Events</p>
                <div className="pl-4 space-y-1">
                  <MobileNavLink to="/events/volga-to-ganga" label="Volga to Ganga" active={pathname.includes('/events/volga-to-ganga')} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/events/ierf-talks" label="IERF Talks" active={pathname.includes('/events/ierf-talks')} onClick={() => setIsMenuOpen(false)} />
                </div>
              </div>

              <div className="py-2">
                <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Research</p>
                <div className="pl-4 space-y-1">
                  <MobileNavLink to="/research" label="Publications" active={pathname === '/research'} onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/digieurasia" label="DigiEurasia" active={pathname === '/digieurasia'} onClick={() => setIsMenuOpen(false)} />
                </div>
              </div>

              <MobileNavLink to="/our-people" label="Our People" active={pathname === '/our-people'} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/write-for-us" label="Write for Us" active={pathname === '/write-for-us'} onClick={() => setIsMenuOpen(false)} />
              
              <div className="pt-4 pb-2 border-t border-gray-100 mt-2">
                <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Language</p>
                <div className="flex px-3 space-x-2">
                  {(['EN', 'HI', 'RU'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLanguage(l)}
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${lang === l ? 'bg-[#0A192F] text-white shadow-md' : 'bg-gray-100 text-[#0A192F] hover:bg-gray-200'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 px-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-[#E87722] text-white px-4 py-3 rounded-md text-sm font-bold hover:bg-orange-600 transition-colors shadow-md"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      href={to}
      className={`text-sm font-semibold transition-colors ${
        active ? 'text-[#E87722]' : 'text-[#0A192F] hover:text-[#E87722]'
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
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
        active ? 'text-[#E87722] bg-[#E87722]/10' : 'text-[#0A192F] hover:bg-gray-50 hover:text-[#E87722]'
      }`}
    >
      {label}
    </Link>
  );
}
