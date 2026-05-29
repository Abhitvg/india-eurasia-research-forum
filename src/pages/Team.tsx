import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, ChevronDown } from 'lucide-react';
import SubHero from '../components/SubHero';
import { useContent } from '../context/ContentContext';
import { PersonData } from '../data/siteContent';
import SEOHead from '../components/SEOHead';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
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
      whileHover={{ y: -10, transition: { duration: 0.3, ease: 'easeOut' } }}
      className={`bg-white/80 backdrop-blur-xl ${
        large 
          ? 'rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_-15px_rgba(27,59,95,0.15)] border-white/60' 
          : 'rounded-2xl p-6 shadow-[0_10px_30px_-10px_rgba(27,59,95,0.1)] border-white/40'
      } border border-white/60 transition-all group relative overflow-hidden hover:border-[#E87722]/30 hover:shadow-2xl hover:shadow-[#E87722]/10`}
    >
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#E87722]/5 rounded-full blur-3xl group-hover:bg-[#E87722]/10 transition-colors duration-500" />
      
      <div className={`flex ${large ? 'flex-col items-center text-center' : 'items-center'} gap-6 relative z-10`}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`${large ? 'w-40 h-40 sm:w-48 sm:h-48' : 'w-20 h-20'} rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-xl group-hover:shadow-2xl group-hover:border-[#E87722]/30 transition-all duration-300 flex items-center justify-center bg-gray-50`}
        >
          {!imageError ? (
            <img 
              src={person.image} 
              alt={person.name} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1B3B5F] to-[#2A528A] text-white ${large ? 'text-4xl' : 'text-xl'} font-black tracking-tighter`}>
              {initials}
            </div>
          )}
        </motion.div>
        
        <div className={large ? 'mt-4' : 'flex-1 min-w-0'}>
          <h4 className={`${large ? 'text-3xl' : 'text-xl'} font-black text-[#1B3B5F] leading-tight tracking-tight mb-2 group-hover:text-[#E87722] transition-colors`}>
            {person.name}
          </h4>
          
          {person.linkedin && (
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: '#E87722', color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 text-gray-400 hover:text-white transition-all duration-300 shadow-sm"
            >
              <Linkedin size={12} fill="currentColor" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Expandable Bio Section */}
      <div className="mt-8 relative z-10">
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[10px] font-black text-[#1B3B5F]/60 uppercase tracking-[0.2em] hover:text-[#E87722] transition-colors bg-gray-50/50 hover:bg-[#E87722]/5 px-4 py-2 rounded-lg"
        >
          {expanded ? 'Collapse Details' : 'View Full Profile'}
          <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </motion.button>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-4 border-t border-gray-100/50">
                {person.bio.split('\n\n').map((p, i) => (
                  <p key={i} className="text-gray-500 text-[13px] leading-[1.8] font-medium">{p}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
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

      <section className="py-20 sm:py-32 relative overflow-hidden">
        {/* Subtle page-level decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/20 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/4" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Leadership */}
          <div className="mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-4xl sm:text-5xl font-black text-[#1B3B5F] mb-16 tracking-tighter"
            >
              Leadership
            </motion.h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              {leadershipData.map((person) => (
                <ProfileCard key={person.name} person={person} large />
              ))}
            </motion.div>
          </div>

          {/* Research Advisor */}
          <div className="mb-32">
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center text-4xl sm:text-5xl font-black text-[#1B3B5F] mb-16 tracking-tighter"
            >
              Research Advisor
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-3xl mx-auto"
            >
              <ProfileCard person={advisorData} large />
            </motion.div>
          </div>

          {/* Scholarly Network */}
          <div className="mb-32">
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center text-4xl sm:text-5xl font-black text-[#1B3B5F] mb-16 tracking-tighter"
            >
              Scholarly Network
            </motion.h2>
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
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center text-4xl sm:text-5xl font-black text-[#1B3B5F] mb-16 tracking-tighter"
            >
              Digital Strategy
            </motion.h2>
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
