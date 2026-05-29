import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubHero from '../components/SubHero';
import { useContent } from '../context/ContentContext';
import SEOHead from '../components/SEOHead';

export default function IERFTalks() {
  const { content } = useContent();
  const c = content.ierfTalks;
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="IERF Talks"
        description="IERF Talks — a platform for expert-led discussions on India-Eurasia geopolitics, connectivity, and emerging strategic partnerships."
        path="/events/ierf-talks"
      />
      <SubHero 
        title="IERF Talks" 
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'Events', href: '/events' }, { label: 'IERF Talks' }]}
      />

      <section className="flex-1 flex items-center justify-center py-24 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full bg-white rounded-[2.5rem] p-12 text-center shadow-[0_20px_50px_-15px_rgba(27,59,95,0.1)] border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B3B5F]/40 via-[#1B3B5F]/0 to-[#1B3B5F]/60"></div>
          
          <div className="w-20 h-20 bg-[#E87722]/10 rounded-2xl flex items-center justify-center text-[#E87722] mx-auto mb-8 shadow-sm scale-110">
            <MessageSquare size={40} />
          </div>

          <h2 className="text-3xl font-black text-[#1B3B5F] mb-4 tracking-tight">{c.heading}</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            {c.body}
          </p>

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-black text-[#E87722] uppercase tracking-widest hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
