"use client";

import { motion } from 'motion/react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SubHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function SubHero({ title, subtitle, breadcrumb }: SubHeroProps) {
  return (
    <section className="relative pt-40 pb-20 bg-[#0A192F] overflow-hidden m-2 md:m-4 mt-0 rounded-b-[3rem] md:rounded-b-[4rem]">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E87722] opacity-[0.05] rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 opacity-[0.03] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.02\\' fill-rule=\\'evenodd\\'%3E%3Cpath d=\\'M0 40L40 0H20L0 20M40 40V20L20 40\\'/\\%3E%3C/g\\%3E%3C/svg\\%3E')] pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 mb-10"
          >
            <Link href="/" className="text-gray-400 hover:text-[#E87722] text-[10px] font-black transition-colors uppercase tracking-[0.2em] bg-white/5 px-3 py-1.5 rounded-full border border-white/10">Home</Link>
            {breadcrumb.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <ChevronRight size={12} className="text-gray-500" />
                {item.href ? (
                  <Link href={item.href} className="text-gray-400 hover:text-[#E87722] text-[10px] font-black transition-colors uppercase tracking-[0.2em] bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#E87722] text-[10px] font-black uppercase tracking-[0.2em] bg-[#E87722]/10 px-3 py-1.5 rounded-full border border-[#E87722]/20">{item.label}</span>
                )}
              </div>
            ))}
          </motion.nav>
        )}

        {/* Title & Subtitle */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-tight font-display">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-2xl text-gray-400 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
