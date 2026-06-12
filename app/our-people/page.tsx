"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, ChevronDown } from 'lucide-react';
import SubHero from '@/src/components/SubHero';
import { useContent } from '@/src/context/ContentContext';
import { PersonData } from '@/src/data/siteContent';
import SEOHead from '@/src/components/SEOHead';
import ScrollReveal from '@/src/components/ScrollReveal';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

function ProfileCard({ person, large = false }: { person: PersonData; large?: boolean; key?: string | number }) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get initials for fallback
  const initials = person.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
      className={`bg-white rounded-xl border border-gray-100 shadow-sm transition-all group relative overflow-hidden hover:border-[#E87722]/30 hover:shadow-2xl flex flex-col h-full ${
        large ? 'p-8 sm:p-12' : 'p-6 sm:p-8'
      }`}
    >
      <div className={`flex flex-col ${large ? 'items-center text-center' : 'items-center text-center'} gap-6 relative z-10 flex-grow`}>
        <div 
          className={`${large ? 'w-48 h-48 sm:w-56 sm:h-56' : 'w-32 h-32'} rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-md group-hover:shadow-xl transition-all duration-500 flex items-center justify-center bg-gray-50 group-hover:scale-105`}
        >
          {!imageError ? (
            <img 
              src={person.image} 
              alt={person.name} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 grayscale group-hover:grayscale-0" 
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-[#0A192F] text-white ${large ? 'text-5xl' : 'text-3xl'} font-black tracking-tighter`}>
              {initials}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center flex-grow w-full">
          <h4 className={`${large ? 'text-3xl sm:text-4xl' : 'text-2xl'} font-black text-[#0A192F] leading-tight tracking-tight mb-4 group-hover:text-[#E87722] transition-colors font-display`}>
            {person.name}
          </h4>
          
          {person.linkedin && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-sm mb-6"
            >
              <Linkedin size={16} fill="currentColor" />
            </motion.a>
          )}

          {/* Expandable Bio Section */}
          <div className="w-full mt-auto">
             <button
               onClick={() => setExpanded(!expanded)}
               className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-[#0A192F] uppercase tracking-[0.2em] hover:text-[#E87722] transition-colors bg-gray-50 hover:bg-orange-50 px-4 py-3 rounded-xl border border-gray-100"
             >
               {expanded ? 'Hide Bio' : 'Read Bio'}
               <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
             </button>
             
             <AnimatePresence>
               {expanded && (
                 <motion.div
                   initial={{ height: 0, opacity: 0, marginTop: 0 }}
                   animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                   exit={{ height: 0, opacity: 0, marginTop: 0 }}
                   transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                   className="overflow-hidden"
                 >
                   <div className="pt-4 pb-2 space-y-4 text-left border-t border-gray-100">
                     {person.bio.split('\n\n').map((p, i) => (
                       <p key={i} className="text-gray-500 text-sm leading-relaxed font-medium">{p}</p>
                     ))}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const { content } = useContent();
  const leadershipData = content.team.leadership;
  const technicalTeamData = content.team.technicalTeam;
  const advisorData = content.team.advisor;
  const scholarlyNetworkData = content.team.scholarlyNetwork;
  
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <SEOHead
        title="Our People"
        description="Meet the leadership, research advisors, scholarly network, and digital strategy team behind the India Eurasia Research Forum."
        path="/our-people"
      />
      <SubHero
        title="Our People"
        subtitle="A network of excellence spanning academia, policy, and technology."
        breadcrumb={[{ label: 'Our People' }]}
      />

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16">

          {/* Leadership */}
          <div className="mb-32">
            <ScrollReveal>
               <div className="text-center mb-16">
                 <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Core Team</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter font-display">Leadership</h3>
               </div>
            </ScrollReveal>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {leadershipData.map((person) => (
                <ProfileCard key={person.name} person={person} large />
              ))}
            </motion.div>
          </div>

          {/* Research Advisor */}
          <div className="mb-32">
            <ScrollReveal>
               <div className="text-center mb-16">
                 <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Advisory Board</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter font-display">Research Advisor</h3>
               </div>
            </ScrollReveal>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-2xl mx-auto"
            >
              <ProfileCard person={advisorData} large />
            </motion.div>
          </div>

          {/* Scholarly Network */}
          <div className="mb-32">
            <ScrollReveal>
               <div className="text-center mb-16">
                 <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Experts</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter font-display">Scholarly Network</h3>
               </div>
            </ScrollReveal>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {scholarlyNetworkData.map((person) => (
                <ProfileCard key={person.name} person={person} />
              ))}
            </motion.div>
          </div>

          {/* Technical Team */}
          <div className="mb-12">
            <ScrollReveal>
               <div className="text-center mb-16">
                 <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Technology</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter font-display">Digital Strategy</h3>
               </div>
            </ScrollReveal>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {technicalTeamData.map((person) => (
                <ProfileCard key={person.name} person={person} />
              ))}
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
