"use client";

import { Camera, Mail, ArrowRight, MapPin, MoveRight } from 'lucide-react';
import { motion } from 'motion/react';
import SubHero from '@/src/components/SubHero';
import { useContent } from '@/src/context/ContentContext';
import SEOHead from '@/src/components/SEOHead';
import ScrollReveal from '@/src/components/ScrollReveal';

export default function DigiEurasia() {
  const { content } = useContent();
  const c = content.digieurasia;
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <SEOHead
        title="DigiEurasia"
        description="DigiEurasia — IERF's digital heritage initiative capturing the living fabric of India-Eurasia civilizational connections through community photography and regional documentation."
        path="/digieurasia"
      />
      <SubHero 
        title="DigiEurasia" 
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'DigiEurasia' }]}
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20">
          
          {/* ── HERO GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <ScrollReveal className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Digital Heritage</h2>
              <h3 className="text-4xl md:text-6xl font-black text-[#0A192F] mb-8 tracking-tighter leading-tight font-display">
                Capturing the living <span className="text-[#E87722]">fabric</span> of our civilizations.
              </h3>
              <p className="text-gray-500 text-lg font-medium leading-relaxed italic border-l-4 border-[#E87722] pl-6 mb-10 bg-white p-6 rounded-r-3xl shadow-sm">
                "{c.quote}"
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-4 bg-white rounded-full shadow-sm border border-gray-100 flex items-center gap-3 hover:border-[#E87722] transition-colors">
                  <Camera size={18} className="text-[#E87722]" />
                  <span className="text-[10px] font-black text-[#0A192F] uppercase tracking-[0.2em]">Community Focus</span>
                </div>
                <div className="px-6 py-4 bg-white rounded-full shadow-sm border border-gray-100 flex items-center gap-3 hover:border-[#E87722] transition-colors">
                  <MapPin size={18} className="text-[#E87722]" />
                  <span className="text-[10px] font-black text-[#0A192F] uppercase tracking-[0.2em]">Regional Archive</span>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="lg:col-span-7">
               <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="space-y-4 h-full flex flex-col">
                     <div className="rounded-[2.5rem] overflow-hidden flex-grow shadow-lg hover:shadow-2xl transition-all group">
                       <img src="/images/digieurasia/landscape-1.webp" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Architecture" />
                     </div>
                     <div className="rounded-[2.5rem] overflow-hidden h-40 shadow-lg hover:shadow-2xl transition-all group">
                       <img src="/images/digieurasia/landscape-3.webp" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Motifs" />
                     </div>
                  </div>
                  <div className="space-y-4 pt-12 h-full flex flex-col">
                     <div className="rounded-[2.5rem] overflow-hidden h-40 shadow-lg hover:shadow-2xl transition-all group">
                       <img src="/images/digieurasia/landscape-2.webp" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Detail" />
                     </div>
                     <div className="rounded-[2.5rem] overflow-hidden flex-grow shadow-lg hover:shadow-2xl transition-all group">
                       <img src="/images/digieurasia/landscape-4.webp" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Aerial" />
                     </div>
                  </div>
               </div>
            </ScrollReveal>
          </div>

          {/* ── GALLERY BENTO ── */}
          <div className="mb-24">
             <div className="text-center mb-12">
                 <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Curated Exhibition</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter font-display">Featured Works</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {c.images?.map((img: any, idx: number) => (
                 <ScrollReveal key={idx} delay={idx * 0.1}>
                   <div className="group relative rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                     <div className="aspect-[4/3] w-full overflow-hidden">
                        <img 
                           src={img.url} 
                           loading="lazy"
                           className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                           alt={img.caption} 
                        />
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                     {/* Static Info Bar below image (visible when not hovered) */}
                     <div className="p-6 bg-white group-hover:bg-[#0A192F] transition-colors duration-500 flex justify-between items-center">
                        <div>
                           <p className="text-[#0A192F] group-hover:text-white font-bold tracking-tight mb-1 transition-colors">{img.caption}</p>
                           <p className="text-gray-400 text-[10px] uppercase tracking-widest flex items-center gap-1 group-hover:text-[#E87722] transition-colors"><MapPin size={10} /> {img.location}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#E87722] group-hover:text-white transition-all">
                           <MoveRight size={16} />
                        </div>
                     </div>
                   </div>
                 </ScrollReveal>
               ))}
             </div>
          </div>

          {/* ── CALL TO ACTION ── */}
          <div className="max-w-5xl mx-auto">
             <ScrollReveal>
               <div className="bg-[#0A192F] rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E87722]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                  
                  <div className="md:w-3/5 relative z-10 text-center md:text-left">
                     <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter font-display leading-tight">{c.ctaHeading}</h3>
                     <p className="text-white/60 text-lg font-medium leading-relaxed mb-8">
                       {c.ctaBody}
                     </p>
                     <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-full w-max mx-auto md:mx-0">
                        <Mail size={16} className="text-[#E87722]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{c.submissionEmail}</span>
                     </div>
                  </div>
                  
                  <div className="md:w-2/5 relative z-10 flex justify-center md:justify-end">
                     <a 
                       href="mailto:submissions@indiaeurasia.org" 
                       className="group flex flex-col items-center justify-center w-48 h-48 bg-[#E87722] text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-[0_0_40px_rgba(232,119,34,0.3)] hover:scale-105"
                     >
                       <span className="mb-2">Submit Work</span>
                       <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                     </a>
                  </div>
               </div>
             </ScrollReveal>
          </div>

        </div>
      </section>
    </div>
  );
}
