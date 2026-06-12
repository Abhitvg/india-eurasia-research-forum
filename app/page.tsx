"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, BookOpen, Users, Calendar, ChevronRight, Camera, MoveRight, Map, LineChart, MessageSquare } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <SEOHead
        title="India Eurasia Research Forum (IERF) | Connecting India and Eurasia"
        description="India Eurasia Research Forum (IERF) is a premier academic platform promoting research, dialogue, and trans-regional connectivity between India and the Eurasian region."
        path="/"
      />

      {/* ── HERO SECTION (Ultra Modern) ── */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] m-2 md:m-4 mt-0 bg-[#0A192F]">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.5 }, scale: { duration: 8, ease: "linear" } }}
            className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.6] contrast-[1.1] saturate-[0.8]"
            style={{ backgroundImage: `url("${heroImages[currentImageIndex]}")` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent opacity-80" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row items-center md:items-end justify-between pb-12 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="md:max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#E87722] animate-pulse"></span>
              Strategic Research & Dialogue
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[100px] font-black text-white leading-[0.95] tracking-tight mb-8">
              Mapping <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E87722] to-amber-400">Eurasia</span>.<br />
              Connecting <span className="italic font-medium text-white/80 font-serif">Worlds.</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto md:mx-0 mb-10">
              {c.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href="/research" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#E87722] text-white rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-[0_8px_25px_rgba(232,119,34,0.4)] hover:-translate-y-1">
                {c.heroButton2 || "Explore Research"} <ArrowRight size={18} />
              </Link>
              <Link href="/our-people" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-sm hover:bg-white/20 transition-all">
                {c.heroButton1 || "Meet Our Experts"}
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="hidden lg:flex flex-col items-end text-white/50 space-y-4"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-white/0 via-white/40 to-white/0 mb-2"></div>
            <div className="text-[10px] font-black uppercase tracking-widest rotate-90 translate-y-10">Scroll to Explore</div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / VISION BENTO GRID ── */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-[#E87722] font-black text-xs uppercase tracking-[0.4em] mb-4">{c.visionBadge || "Our Vision"}</h2>
            <h3 className="text-4xl md:text-6xl font-black text-[#0A192F] tracking-tighter">Strategic Depth.<br />Global Perspective.</h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          {/* Main Vision Box */}
          <ScrollReveal className="md:col-span-8 group">
            <div className="h-full bg-white rounded-[2rem] p-10 md:p-14 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#0A192F]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 group-hover:bg-[#E87722]/5 transition-colors"></div>
              <div className="relative z-10 flex flex-col h-full justify-center">
                <Globe className="text-[#E87722] mb-8" size={48} />
                <p className="text-[#0A192F] text-2xl md:text-3xl font-medium leading-snug mb-8">
                  {c.visionBody}
                </p>
                <div className="mt-auto pt-8 border-t border-gray-100">
                  <p className="text-gray-500 italic font-serif text-xl">"{c.visionQuote}"</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Image Box */}
          <ScrollReveal className="md:col-span-4" delay={0.1}>
            <div className="h-full bg-[#0A192F] rounded-[2rem] overflow-hidden relative group">
              <img src={c.welcomeImage} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2s]" alt="Strategic Analysis" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <Link href="/about" className="flex items-center justify-between w-full text-white bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl hover:bg-white/20 transition-all">
                  <span className="font-bold text-sm tracking-wide">Learn Our History</span>
                  <MoveRight size={20} />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Stat Boxes */}
          <ScrollReveal className="md:col-span-6" delay={0.2}>
            <div className="h-full bg-gradient-to-br from-[#0A192F] to-blue-950 rounded-[2rem] p-10 flex items-center justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-3">{c.stat1Label}</div>
                <div className="text-6xl font-black text-white">{c.stat1Value}</div>
              </div>
              <Map className="text-white/20 group-hover:text-[#E87722] transition-colors duration-500" size={80} />
            </div>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-6" delay={0.3}>
            <div className="h-full bg-white rounded-[2rem] border border-gray-100 p-10 flex items-center justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{c.stat2Label}</div>
                <div className="text-6xl font-black text-[#E87722]">{c.stat2Value}</div>
              </div>
              <LineChart className="text-gray-100 group-hover:text-[#0A192F] transition-colors duration-500" size={80} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="bg-white py-20 border-y border-gray-100 relative overflow-hidden">
        <ScrollReveal>
          <EurasiaMap />
        </ScrollReveal>
      </section>

      {/* ── STRATEGIC PILLARS ── */}
      <section className="py-24 md:py-32 bg-[#FAFAFA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="text-[#E87722] font-black text-xs uppercase tracking-[0.4em] mb-4">Strategic Pillars</h2>
              <h3 className="text-4xl md:text-6xl font-black text-[#0A192F] tracking-tighter mb-8">
                Core Research <br /> Domains
              </h3>
              <div className="space-y-6">
                {c.focusAreas?.map((area: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-[#E87722] group-hover:bg-[#E87722] group-hover:text-white transition-all duration-300">
                      <BookOpen size={20} />
                    </div>
                    <span className="text-lg font-bold text-[#0A192F]">{area}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link href="/research" className="inline-flex items-center gap-3 px-8 py-4 bg-[#0A192F] text-white rounded-full font-bold text-sm shadow-xl hover:bg-blue-900 transition-all hover:-translate-y-1">
                  Browse Publications <MoveRight size={18} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2} className="relative">
               <div className="absolute inset-0 bg-[#E87722]/10 rounded-[3rem] blur-[60px] -z-10"></div>
               <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-2xl relative overflow-hidden group">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-[#E87722] mb-10 group-hover:scale-110 transition-transform duration-500">
                    <BookOpen size={40} />
                  </div>
                  <h4 className="text-3xl font-black text-[#0A192F] mb-6">Insights Archive</h4>
                  <p className="text-gray-500 text-lg leading-relaxed mb-8">"Bridging the gap between scholarly rigour and regional strategic insights."</p>
                  <img src="/images/publications/StockImage_SpecialResearchNote.jpeg" className="w-full h-64 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700" alt="Archive" />
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── VOLGA TO GANGA ── */}
      <section className="py-24 md:py-32 m-2 md:m-4 bg-[#0A192F] rounded-[3rem] md:rounded-[5rem] overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E87722]/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
               <ScrollReveal className="lg:col-span-5 order-2 lg:order-1">
                  <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 flex flex-col items-center justify-center min-h-[400px] hover:bg-white/10 transition-all duration-500 shadow-2xl">
                     <img src="/volga_to_ganga_final.png" alt="Volga to Ganga" className="w-64 md:w-80 object-contain drop-shadow-2xl" />
                  </div>
               </ScrollReveal>
               <ScrollReveal direction="left" delay={0.2} className="lg:col-span-7 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-[#E87722] text-xs font-black tracking-[0.2em] uppercase mb-8">
                     Global Flagship Dialogue
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.05]">
                    {c.volgaTeaserHeading}
                  </h2>
                  <p className="text-white/70 text-2xl font-light italic leading-relaxed mb-12">
                    {c.volgaTeaserBody}
                  </p>
                  <Link href="/events/volga-to-ganga" className="inline-flex items-center gap-4 px-10 py-5 bg-[#E87722] text-white rounded-full font-black text-sm tracking-widest hover:bg-orange-600 transition-all shadow-[0_8px_30px_rgba(232,119,34,0.4)] hover:-translate-y-1">
                    Discover More <ArrowRight size={20} />
                  </Link>
               </ScrollReveal>
            </div>
         </div>
      </section>

      {/* ── DIGIEURASIA & ETHOS BENTO ── */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* DigiEurasia Card */}
            <ScrollReveal className="group h-full">
               <div className="h-full bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-start relative overflow-hidden">
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#E87722]/10 rounded-full blur-[60px] group-hover:bg-[#E87722]/20 transition-all"></div>
                  <div className="w-20 h-20 rounded-[2rem] bg-gray-50 flex items-center justify-center text-[#E87722] mb-10 group-hover:scale-110 transition-transform duration-500">
                     <Camera size={36} />
                  </div>
                  <h2 className="text-[#0A192F] font-black text-[10px] tracking-[0.4em] uppercase mb-4">Integrated Digital Initiative</h2>
                  <h3 className="text-5xl font-black text-[#0A192F] tracking-tighter mb-6">Digi<span className="text-[#E87722]">Eurasia</span></h3>
                  <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">{c.digiTeaserBody}</p>
                  <Link href="/digieurasia" className="mt-auto inline-flex items-center gap-2 text-[#E87722] font-bold tracking-wide hover:gap-4 transition-all">
                    View Gallery <MoveRight size={20} />
                  </Link>
               </div>
            </ScrollReveal>

            {/* Ethos Grid */}
            <ScrollReveal delay={0.2} className="h-full">
               <div className="h-full bg-[#0A192F] rounded-[3rem] p-10 md:p-14 flex flex-col justify-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\\'6\\' height=\\'6\\' viewBox=\\'0 0 6 6\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.05\\' fill-rule=\\'evenodd\\'%3E%3Cpath d=\\'M5 0h1L0 5V4zM6 5v1H5z\\'/\\%3E%3C/g\\%3E%3C/svg\\%3E')] opacity-50"></div>
                  <h2 className="text-[#E87722] font-black text-[10px] tracking-[0.4em] uppercase mb-4 relative z-10">{c.ierfWayTitle}</h2>
                  <h3 className="text-4xl font-black text-white tracking-tighter mb-10 relative z-10">The IERF Ethos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                     {c.ierfWayPillars?.slice(0,4).map((pill: any, idx: number) => (
                        <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                           <h4 className="text-white font-bold mb-2">{pill.title}</h4>
                           <p className="text-white/60 text-sm">{pill.body}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>
         </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 md:py-32 text-center max-w-4xl mx-auto px-4 relative z-10 mb-20">
         <ScrollReveal>
            <h2 className="text-5xl md:text-8xl font-black text-[#0A192F] tracking-tighter leading-tight mb-8">
               Inspiring <span className="text-[#E87722] font-display italic">Dialogue.</span>
            </h2>
            <p className="text-xl text-gray-500 mb-12 font-medium">
               {c.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <Link href="/contact" className="px-10 py-5 bg-[#0A192F] text-white rounded-full font-bold shadow-xl hover:bg-[#E87722] transition-colors uppercase tracking-widest text-xs w-full sm:w-auto">
                 Join the Dialogue
               </Link>
               <Link href="/write-for-us" className="px-10 py-5 bg-white text-[#0A192F] border border-gray-200 rounded-full font-bold shadow-sm hover:border-[#0A192F] transition-colors uppercase tracking-widest text-xs w-full sm:w-auto">
                 Submit Analysis
               </Link>
            </div>
         </ScrollReveal>
      </section>

    </div>
  );
}
