"use client";

import { motion } from 'motion/react';
import { Calendar, Quote, ArrowRight, Anchor } from 'lucide-react';
import SubHero from '@/src/components/SubHero';
import { useContent } from '@/src/context/ContentContext';
import React from 'react';
import SEOHead from '@/src/components/SEOHead';
import ScrollReveal from '@/src/components/ScrollReveal';

export default function VolgaToGanga() {
  const { content } = useContent();
  const c = content.volgaToGanga;
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <SEOHead
        title="Volga to Ganga"
        description="IERF's flagship civilizational dialogue series connecting the historical and cultural narratives flowing from the Volga to the Ganga, exploring shared heritage and future partnerships."
        path="/events/volga-to-ganga"
      />
      <SubHero 
        title="Volga to Ganga" 
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'Volga to Ganga' }]}
      />

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16">
          <ScrollReveal>
             <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl shadow-[#0A192F]/5 border border-gray-100 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E87722]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="flex justify-center mb-20 relative z-10">
                  <div className="w-64 md:w-96 h-64 md:h-96 flex items-center justify-center mix-blend-multiply">
                    <img src="/volga_to_ganga_final.png" alt="Volga to Ganga Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <div className="relative mb-20 z-10 text-center max-w-4xl mx-auto">
                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-gray-100 shadow-sm">
                      <Anchor size={32} className="text-[#E87722]" />
                   </div>
                   <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-8">Civilizational Dialogue</h2>
                   <p className="text-[#0A192F] text-3xl md:text-5xl leading-tight font-black tracking-tighter font-display mb-10">
                    "{c.mainQuote}"
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-500 font-medium leading-relaxed text-lg max-w-5xl mx-auto mb-24 z-10 relative">
                  {c.paragraphs?.map((p: string, i: number) => (
                    <div key={i} className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                      <p>{p}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center relative z-10">
                   <div className="bg-[#0A192F] text-white p-16 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden w-full max-w-3xl text-center group">
                      <div className="absolute inset-0 bg-[#E87722] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                      <h3 className="text-[#E87722] text-[10px] font-black uppercase tracking-[0.4em] mb-6">{c.ctaPhase}</h3>
                      <h4 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter font-display">{c.ctaHeading}</h4>
                      <p className="text-gray-400 text-lg max-w-md mx-auto mb-12 font-medium leading-relaxed">
                        {c.ctaBody}
                      </p>
                      <a href="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-[#E87722] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-[0_8px_30px_rgba(232,119,34,0.4)] hover:-translate-y-1">
                         Express Interest <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                      </a>
                   </div>
                </div>
             </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
