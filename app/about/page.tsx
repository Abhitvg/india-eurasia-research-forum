"use client";

import { motion } from 'motion/react';
import { Search, BookOpen, MessageCircle, Handshake, Target, ArrowRight, MoveRight, Compass } from 'lucide-react';
import Link from 'next/link';

import SubHero from '@/src/components/SubHero';
import { useContent } from '@/src/context/ContentContext';
import SEOHead from '@/src/components/SEOHead';
import ScrollReveal from '@/src/components/ScrollReveal';

export default function About() {
  const { content } = useContent();
  const c = content.about;
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24">
      <SEOHead
        title="About Us"
        description="Learn about IERF's mission to bridge India and Eurasia through academic research, strategic dialogue, and collaborative engagement across civilizational, economic, and security domains."
        path="/about"
      />
      <SubHero
        title="About Us"
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'About Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20 w-full space-y-24">

        {/* ── WHO WE ARE ── */}
        <section>
          <ScrollReveal>
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12 items-center hover:shadow-xl transition-all duration-500">
               <div className="md:w-1/3">
                  <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter leading-tight font-display mb-4">
                     Who We <br/><span className="text-[#E87722]">Are.</span>
                  </h2>
                  <div className="w-16 h-2 bg-[#E87722] rounded-full"></div>
               </div>
               <div className="md:w-2/3">
                  <p className="text-gray-500 text-xl leading-relaxed font-medium">
                     {c.whoWeAre}
                  </p>
               </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── WHAT WE DO (BENTO) ── */}
        <section>
          <ScrollReveal>
            <div className="text-center mb-12">
               <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Core Mission</h2>
               <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter font-display mb-6">What We Do</h3>
               <p className="text-gray-500 text-lg max-w-3xl mx-auto font-medium">
                  {c.whatWeDoIntro}
               </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.pillars?.map((pillar: any, index: number) => {
              const icons = [
                <Search size={32} className="text-blue-500" />,
                <MessageCircle size={32} className="text-[#E87722]" />,
                <Handshake size={32} className="text-emerald-500" />,
                <Target size={32} className="text-purple-500" />
              ];
              return (
                <ScrollReveal key={pillar.title} delay={index * 0.1}>
                   <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group h-full flex flex-col">
                      <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                         {icons[index % icons.length]}
                      </div>
                      <h3 className="text-2xl font-black text-[#0A192F] mb-4">{pillar.title}</h3>
                      <p className="text-gray-500 leading-relaxed font-medium">{pillar.description}</p>
                   </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ── OUR VISION ── */}
        <section>
          <ScrollReveal>
             <div className="bg-[#0A192F] rounded-[3rem] p-10 md:p-16 lg:p-20 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E87722]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                   <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-10 border border-white/20">
                      <Compass size={36} className="text-[#E87722]" />
                   </div>
                   <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter font-display">Our Vision</h2>
                   <div className="space-y-8 text-white/80 text-xl md:text-2xl leading-relaxed font-medium">
                     {c.visionParagraphs?.map((p: string, i: number) => (
                       <p key={i}>{p}</p>
                     ))}
                   </div>
                </div>
             </div>
          </ScrollReveal>
        </section>

        {/* ── FOCUS AREAS ── */}
        <section>
           <ScrollReveal>
              <div className="text-center mb-12">
                 <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Research Domains</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter font-display mb-6">Focus Areas</h3>
              </div>
           </ScrollReveal>
           <div className="flex flex-wrap justify-center gap-4">
              {c.focusAreas?.map((area: string, index: number) => (
                 <ScrollReveal key={index} delay={index * 0.05}>
                    <div className="bg-white px-8 py-4 rounded-full border border-gray-200 shadow-sm font-bold text-[#0A192F] hover:border-[#E87722] hover:text-[#E87722] hover:-translate-y-1 transition-all cursor-default">
                       {area}
                    </div>
                 </ScrollReveal>
              ))}
           </div>
        </section>

        {/* ── WHY IERF ── */}
        <section>
           <ScrollReveal>
             <div className="bg-gradient-to-br from-gray-50 to-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm">
                <div className="max-w-4xl mx-auto">
                   <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter font-display mb-10 text-center">Why IERF</h2>
                   <div className="space-y-8 text-gray-600 text-lg md:text-xl leading-relaxed font-medium text-center">
                     {c.whyIerfParagraphs?.map((p: string, i: number) => (
                       <p key={i}>{p}</p>
                     ))}
                   </div>
                </div>
             </div>
           </ScrollReveal>
        </section>

        {/* ── CTA ── */}
        <section className="text-center">
           <ScrollReveal>
             <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter font-display mb-10">Connect With Us</h3>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/our-people"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#E87722] text-white text-sm font-black uppercase tracking-[0.2em] rounded-full hover:bg-orange-600 transition-all shadow-[0_8px_30px_rgba(232,119,34,0.3)] hover:-translate-y-1 group"
                >
                  Meet Our People <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  href="/research"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#0A192F] border border-gray-200 text-sm font-black uppercase tracking-[0.2em] rounded-full hover:border-[#0A192F] transition-all shadow-sm hover:-translate-y-1 group"
                >
                  Read Research <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
             </div>
           </ScrollReveal>
        </section>

      </div>
    </div>
  );
}
