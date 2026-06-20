import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import eurasiaPaths from '../data/eurasia_paths.json';

const regions = [
  {
    id: 'russia',
    name: 'Russia & Arctic',
    path: eurasiaPaths.russia,
    description: 'The vast northern frontier, serving as Eurasia\'s primary land bridge and a critical theatre for Arctic geopolitics.',
    countries: ['Russia', 'Arctic Circle'],
    labelPos: { x: 450, y: 150 }
  },
  {
    id: 'central-asia',
    name: 'Central Asia',
    path: eurasiaPaths['central-asia'],
    description: 'The strategic heartland, vital for continental connectivity and energy security across the Silk Road corridors.',
    countries: ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan'],
    labelPos: { x: 460, y: 320 }
  },
  {
    id: 'south-asia',
    name: 'South Asia & India',
    path: eurasiaPaths['south-asia'],
    description: 'Deep analysis of India\'s central role in the Indian Ocean Region and its expanding footprint in the Eurasian landmass.',
    countries: ['India', 'Afghanistan', 'Pakistan', 'Iran', 'Himalayan States'],
    labelPos: { x: 480, y: 550 }
  },
  {
    id: 'east-asia',
    name: 'East Asia',
    path: eurasiaPaths['east-asia'],
    description: 'Economic powerhouses and maritime strategic hubs driving the global shift towards the Indo-Pacific century.',
    countries: ['China', 'Mongolia', 'Japan', 'Korean Peninsula', 'ASEAN Frontier'],
    labelPos: { x: 780, y: 400 }
  },
  {
    id: 'caucasus-caspian',
    name: 'Caucasus & Caspian',
    path: eurasiaPaths['caucasus-caspian'],
    description: 'The essential energy and transit corridor linking the Black Sea to the heart of the Eurasian continent.',
    countries: ['Armenia', 'Azerbaijan', 'Georgia', 'Turkey', 'Caspian Littoral'],
    labelPos: { x: 330, y: 380 }
  }
];

function EurasiaMapComponent() {
  const [hoveredRegion, setHoveredRegion] = useState<typeof regions[0] | null>(null);
  const navigate = useNavigate();

  const handleRegionClick = (regionId: string) => {
    navigate(`/research?region=${regionId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 md:py-24 px-4">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3B5F]/5 text-[#1B3B5F] text-[10px] font-black uppercase tracking-[0.3em] mb-6"
        >
          <Globe size={14} className="text-[#E87722]" /> Strategic Geography
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-[#1B3B5F] mb-6 tracking-tighter"
        >
          Visualizing <span className="text-[#E87722]">Eurasian</span> Dynamics
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg font-medium max-w-2xl mx-auto"
        >
          Our regional expertise covers the critical geopolitical blocks of the landmass. Click a region to explore our deep-dive research.
        </motion.p>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Map Container */}
        <div className="lg:col-span-8 relative aspect-[5/4] bg-gray-50 rounded-[3rem] border border-gray-200/50 shadow-2xl overflow-hidden p-4 flex items-center justify-center group/map">
          <svg 
            viewBox="0 0 1000 800" 
            className="w-full h-full preserve-3d"
            style={{ filter: 'drop-shadow(0 20px 50px rgba(27, 59, 95, 0.1))' }}
          >
            {/* Base layer for depth */}
            {regions.map((region) => (
              <path
                key={`base-${region.id}`}
                d={region.path}
                fill="#1B3B5F"
                opacity="0.03"
                transform="translate(2, 2)"
              />
            ))}
            
            {regions.map((region) => (
              <motion.path
                key={region.id}
                d={region.path}
                fill={hoveredRegion?.id === region.id ? '#E87722' : '#1B3B5F'}
                stroke="none"
                opacity={hoveredRegion ? (hoveredRegion.id === region.id ? 1 : 0.4) : 0.8}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: hoveredRegion?.id === region.id ? 1.02 : 1,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
                className="cursor-pointer transition-colors duration-500 ease-out"
                onHoverStart={() => setHoveredRegion(region)}
                onHoverEnd={() => setHoveredRegion(null)}
                onClick={() => handleRegionClick(region.id)}
              />
            ))}

            {/* Labels - only visible on map hover or specific region hover */}
            {regions.map((region) => (
              <motion.g 
                key={`label-${region.id}`} 
                className="pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredRegion?.id === region.id ? 1 : (hoveredRegion ? 0 : 0.4)
                }}
              >
                <text
                  x={region.labelPos.x}
                  y={region.labelPos.y}
                  textAnchor="middle"
                  className="fill-white text-[12px] font-black uppercase tracking-widest drop-shadow-md"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {region.name}
                </text>
              </motion.g>
            ))}
          </svg>

          {/* Luxury Overlay Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white bg-gray-200"></div>
              ))}
            </div>
            <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Data Polling</span>
          </div>
        </div>

        {/* Info Box */}
        <div className="lg:col-span-4 h-full">
          <AnimatePresence mode="wait">
            {hoveredRegion ? (
              <motion.div
                key={hoveredRegion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col justify-center p-12 bg-white border border-gray-100 rounded-[3rem] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E87722]/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
                
                <div className="mb-6">
                  <span className="text-[10px] font-black text-[#E87722] uppercase tracking-[0.3em] block mb-2">Regional Focus</span>
                  <h3 className="text-4xl font-black text-[#1B3B5F] mb-4 tracking-tighter leading-none">{hoveredRegion.name}</h3>
                </div>

                <p className="text-gray-500 mb-10 font-medium leading-relaxed text-lg italic border-l-4 border-[#E87722]/20 pl-6">
                  "{hoveredRegion.description}"
                </p>
                
                <div className="mb-12">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Strategic Interest Areas</span>
                  <div className="flex flex-wrap gap-2">
                    {hoveredRegion.countries.map(c => (
                      <span key={c} className="px-4 py-1.5 bg-gray-50 text-[11px] font-bold text-[#1B3B5F] rounded-full border border-gray-100 transition-colors hover:bg-[#1B3B5F]/5 cursor-default">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handleRegionClick(hoveredRegion.id)}
                  className="mt-auto group flex items-center justify-between w-full p-4 rounded-2xl bg-[#1B3B5F] text-white transition-all hover:bg-[#E87722] hover:shadow-xl hover:shadow-[#E87722]/20"
                >
                  <span className="text-xs font-black uppercase tracking-widest pl-2">Access Intelligence Archive</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col justify-center p-12 bg-gray-50/50 border border-dashed border-gray-200 rounded-[3rem] text-center">
                <motion.div 
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                  }}
                  className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-gray-100"
                >
                  <Globe className="text-[#1B3B5F]/20" size={40} />
                </motion.div>
                <h4 className="text-[#1B3B5F] font-black text-xl mb-4 tracking-tighter uppercase">Interactive Geographic Discovery</h4>
                <p className="text-gray-400 font-medium leading-relaxed">
                  The Eurasian landmass is a complex matrix of emerging corridors and strategic competition. <br/><br/>
                  <span className="text-[#E87722]/60 font-bold">Select a region to initialize the strategic analysis module.</span>
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const EurasiaMap = React.memo(EurasiaMapComponent);
export default EurasiaMap;
