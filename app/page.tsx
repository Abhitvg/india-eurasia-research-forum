"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, BookOpen, MoveRight, Camera, Map, LineChart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '@/src/context/ContentContext';
import ScrollReveal from '@/src/components/ScrollReveal';
import EurasiaMap from '@/src/components/EurasiaMap';
import SEOHead from '@/src/components/SEOHead';

const heroImages = [
  '/images/hero1_new_opt.webp',
  '/images/hero2_new_opt.webp',
  '/images/hero3_new_opt.webp'
];

export default function Home() {
  const { content } = useContent();
  const c = content?.home || ({} as any);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEOHead
        title="India Eurasia Research Forum (IERF) | Connecting India and Eurasia"
        description="India Eurasia Research Forum (IERF) is a premier academic platform promoting research, dialogue, and trans-regional connectivity between India and the Eurasian region."
        path="/"
      />

      {/* ── HERO SECTION ── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0A192F] pt-16">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.5 }, scale: { duration: 8, ease: "linear" } }}
            className="absolute inset-0 z-0 bg-cover bg-center brightness-50"
            style={{ backgroundImage: `url("${heroImages[currentImageIndex]}")` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 z-[1] bg-[#0A192F]/60" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pb-12 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
              Strategic Research & Dialogue
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Mapping <span className="text-[#E87722]">Eurasia</span>.<br />
              Connecting Worlds.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              {c.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/research" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#E87722] text-white rounded font-bold text-sm hover:bg-orange-600 transition-colors">
                {c.heroButton2 || "Explore Research"} <ArrowRight size={18} />
              </Link>
              <Link href="/our-people" className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-white text-[#0A192F] rounded font-bold text-sm hover:bg-gray-100 transition-colors">
                {c.heroButton1 || "Meet Our Experts"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / VISION SECTION ── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-[#E87722] font-bold text-sm uppercase tracking-widest mb-3">{c.visionBadge || "Our Vision"}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-6">Strategic Depth. Global Perspective.</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {c.visionBody}
              </p>
              <p className="text-gray-500 italic font-serif text-xl border-l-4 border-[#E87722] pl-6 py-2 text-left bg-gray-50/50">
                "{c.visionQuote}"
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <ScrollReveal>
              <img src={c.welcomeImage} className="w-full rounded-lg shadow-xl object-cover h-[400px]" alt="Strategic Analysis" />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                   <div className="mt-1 bg-[#E87722]/10 p-3 rounded text-[#E87722]">
                     <Map size={24} />
                   </div>
                   <div>
                     <h4 className="text-xl font-bold text-[#0A192F] mb-2">{c.stat1Label}</h4>
                     <p className="text-gray-600">Bridging geographical and cultural divides through comprehensive trans-regional research and continuous dialogue frameworks.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="mt-1 bg-[#E87722]/10 p-3 rounded text-[#E87722]">
                     <LineChart size={24} />
                   </div>
                   <div>
                     <h4 className="text-xl font-bold text-[#0A192F] mb-2">{c.stat2Label}</h4>
                     <p className="text-gray-600">Driving empirical insights and data-led strategic studies to uncover real-world geopolitical implications across Eurasia.</p>
                   </div>
                </div>
                <Link href="/about" className="inline-flex items-center gap-2 text-[#E87722] font-bold mt-4 hover:underline">
                  Learn Our History <MoveRight size={18} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="bg-gray-50 py-16 border-b border-gray-200 overflow-hidden">
        <ScrollReveal>
          <EurasiaMap />
        </ScrollReveal>
      </section>

      {/* ── STRATEGIC PILLARS ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-[#E87722] font-bold text-sm uppercase tracking-widest mb-3">Strategic Pillars</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-6">
                Core Research Domains
              </h3>
              <div className="space-y-4 mb-8">
                {c.focusAreas?.map((area: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded border border-gray-100">
                    <BookOpen size={20} className="text-[#E87722]" />
                    <span className="text-base font-semibold text-[#0A192F]">{area}</span>
                  </div>
                ))}
              </div>
              <Link href="/research" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A192F] text-white rounded font-bold hover:bg-blue-900 transition-colors">
                Browse Publications <MoveRight size={18} />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="relative">
               <img src="/images/publications/StockImage_SpecialResearchNote.jpeg" className="w-full h-[400px] object-cover rounded-lg shadow-lg" alt="Archive" />
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded shadow-xl border border-gray-100 max-w-sm hidden sm:block">
                  <h4 className="text-xl font-bold text-[#0A192F] mb-2">Insights Archive</h4>
                  <p className="text-gray-500 text-sm">"Bridging the gap between scholarly rigour and regional strategic insights."</p>
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── VOLGA TO GANGA ── */}
      <section className="py-16 md:py-24 bg-[#0A192F] text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <ScrollReveal className="order-2 lg:order-1 flex justify-center lg:justify-start">
                  <img src="/volga_to_ganga_final.png" alt="Volga to Ganga" className="w-64 md:w-80 object-contain bg-white/5 p-8 rounded-lg border border-white/10" />
               </ScrollReveal>
               <ScrollReveal delay={0.2} className="order-1 lg:order-2">
                  <div className="inline-block px-3 py-1 rounded bg-[#E87722]/20 text-[#E87722] text-xs font-bold tracking-widest uppercase mb-4 border border-[#E87722]/30">
                     Global Flagship Dialogue
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    {c.volgaTeaserHeading}
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    {c.volgaTeaserBody}
                  </p>
                  <Link href="/events/volga-to-ganga" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E87722] text-white rounded font-bold hover:bg-orange-600 transition-colors">
                    Discover More <ArrowRight size={18} />
                  </Link>
               </ScrollReveal>
            </div>
         </div>
      </section>

      {/* ── DIGIEURASIA & ETHOS ── */}
      <section className="py-16 md:py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* DigiEurasia Card */}
               <ScrollReveal>
                  <div className="bg-white rounded-lg p-8 md:p-10 border border-gray-200 shadow-sm h-full">
                     <Camera size={32} className="text-[#E87722] mb-6" />
                     <h2 className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-2">Integrated Digital Initiative</h2>
                     <h3 className="text-3xl font-bold text-[#0A192F] mb-4">Digi<span className="text-[#E87722]">Eurasia</span></h3>
                     <p className="text-gray-600 leading-relaxed mb-8">{c.digiTeaserBody}</p>
                     <Link href="/digieurasia" className="inline-flex items-center gap-2 text-[#E87722] font-bold hover:underline">
                       View Gallery <MoveRight size={18} />
                     </Link>
                  </div>
               </ScrollReveal>

               {/* Ethos Card */}
               <ScrollReveal delay={0.2}>
                  <div className="bg-white rounded-lg p-8 md:p-10 border border-gray-200 shadow-sm h-full">
                     <h2 className="text-sm font-bold text-[#E87722] tracking-widest uppercase mb-2">{c.ierfWayTitle}</h2>
                     <h3 className="text-3xl font-bold text-[#0A192F] mb-6">The IERF Ethos</h3>
                     <div className="space-y-6">
                        {c.ierfWayPillars?.slice(0,3).map((pill: any, idx: number) => (
                           <div key={idx}>
                              <h4 className="text-[#0A192F] font-bold mb-1">{pill.title}</h4>
                              <p className="text-gray-600 text-sm">{pill.body}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </ScrollReveal>
            </div>
         </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-20 bg-white text-center border-t border-gray-100">
         <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6">
               Inspiring <span className="text-[#E87722]">Dialogue.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
               {c.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link href="/contact" className="w-full sm:w-auto px-8 py-3 bg-[#0A192F] text-white rounded font-bold hover:bg-[#E87722] transition-colors">
                 Join the Dialogue
               </Link>
               <Link href="/write-for-us" className="w-full sm:w-auto px-8 py-3 bg-white text-[#0A192F] border border-gray-300 rounded font-bold hover:border-[#0A192F] hover:bg-gray-50 transition-colors">
                 Submit Analysis
               </Link>
            </div>
         </ScrollReveal>
      </section>

    </div>
  );
}
