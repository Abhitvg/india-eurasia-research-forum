"use client";

import { motion } from 'motion/react';
import { Calendar, Quote, ArrowRight } from 'lucide-react';
import SubHero from '../components/SubHero';
import { useContent } from '../context/ContentContext';
import React from 'react';


export default function VolgaToGangaClient() {
  const { content } = useContent();
  const c = content.volgaToGanga;
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      
      <SubHero 
        title="Volga to Ganga" 
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'Events', href: '/events' }, { label: 'Volga to Ganga' }]}
      />

      <section className="py-24 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E87722] opacity-[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B3B5F]/40 via-[#1B3B5F]/0 to-[#1B3B5F]/60 z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1B3B5F] opacity-[0.03] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl shadow-blue-900/10 border border-gray-100 text-center"
          >
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="flex justify-center mb-16"
            >
              <div className="w-full h-full p-4 md:p-8 flex items-center justify-center">
                <img src="/volga_to_ganga_final.png" alt="Volga to Ganga Logo" className="w-full h-full object-contain" />
              </div>
            </motion.div>
            
            <div className="relative mb-16">
               <Quote className="absolute -top-10 -left-6 text-gray-100 w-24 h-24 -z-10" />
               <p className="text-[#1B3B5F] text-xl md:text-2xl leading-relaxed italic font-medium">
                {c.mainQuote}
               </p>
            </div>

            <div className="text-left space-y-8 text-gray-500 font-medium leading-[2] text-lg max-w-3xl mx-auto mb-20">
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <motion.div 
              whileHover={{ scale: 1.02, borderColor: '#E87722', boxShadow: '0 0 35px rgba(232,119,34,0.4)' }}
              className="inline-flex flex-col items-center bg-[#1B3B5F] text-white p-12 rounded-[3rem] shadow-2xl shadow-[#1B3B5F]/30 border-b-8 border-white/20 transition-all"
            >
              <h3 className="text-[#E87722] text-xs font-black uppercase tracking-[0.4em] mb-4">{c.ctaPhase}</h3>
              <h4 className="text-3xl font-black mb-6 tracking-tight">{c.ctaHeading}</h4>
              <p className="text-white/60 text-sm max-w-sm mx-auto mb-8 font-bold uppercase tracking-widest leading-relaxed">
                {c.ctaBody}
              </p>
              <div className="h-10 w-px bg-white/20 mb-8"></div>
              <a href="/contact" className="flex items-center text-xs font-black uppercase tracking-widest hover:text-[#E87722] transition-colors group">
                 Join the Waitlist <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
