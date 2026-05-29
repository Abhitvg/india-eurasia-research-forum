import { Camera, Mail, ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import SubHero from '../components/SubHero';
import { useContent } from '../context/ContentContext';
import SEOHead from '../components/SEOHead';

const galleryImages = [
  {
    url: '/images/digieurasia/landscape-1.webp',
    caption: 'Modern Architecture of Nur-Sultan, Kazakhstan',
    location: 'Kazakhstan'
  },
  {
    url: '/images/digieurasia/landscape-2.webp',
    caption: 'The heart of Central Asia - Architectural detail',
    location: 'Nur-Sultan'
  },
  {
    url: '/images/digieurasia/landscape-3.webp',
    caption: 'Ancient motifs in a modern capital',
    location: 'Kazakhstan'
  },
  {
    url: '/images/digieurasia/landscape-4.webp',
    caption: 'Aerial view of the Rashtrapati Bhawan',
    location: 'New Delhi, India'
  }
];

export default function DigiEurasia() {
  const { content } = useContent();
  const c = content.digieurasia;
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-black text-[#1B3B5F] mb-10 tracking-tighter leading-tight">
                Capturing the living <span className="text-[#E87722]">fabric</span> of our civilizations.
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed italic border-l-4 border-[#E87722] pl-8 mb-10">
                {c.quote}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <Camera size={18} className="text-[#E87722]" />
                  <span className="text-sm font-black text-[#1B3B5F] uppercase tracking-widest">Community Focused</span>
                </div>
                <div className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                  <MapPin size={18} className="text-[#E87722]" />
                  <span className="text-sm font-black text-[#1B3B5F] uppercase tracking-widest">Regional Repository</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 grid grid-cols-2 gap-4"
            >
               <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden h-40 md:h-64 shadow-2xl">
                    <img src="/images/digieurasia/landscape-1.webp" loading="lazy" className="w-full h-full object-cover" alt="Modern architecture in Nur-Sultan, Kazakhstan" />
                  </div>
                  <div className="rounded-3xl overflow-hidden h-32 md:h-48 shadow-xl">
                    <img src="/images/digieurasia/landscape-3.webp" loading="lazy" className="w-full h-full object-cover" alt="Ancient motifs in Central Asian architecture" />
                  </div>
               </div>
               <div className="space-y-4 pt-12">
                  <div className="rounded-3xl overflow-hidden h-32 md:h-48 shadow-xl">
                    <img src="/images/digieurasia/landscape-2.webp" loading="lazy" className="w-full h-full object-cover" alt="Architectural detail in Nur-Sultan" />
                  </div>
                  <div className="rounded-3xl overflow-hidden h-40 md:h-64 shadow-2xl">
                    <img src="/images/digieurasia/landscape-4.webp" loading="lazy" className="w-full h-full object-cover" alt="Aerial view of Rashtrapati Bhawan, New Delhi" />
                  </div>
               </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
            {c.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/3] group-hover:shadow-[0_0_35px_rgba(232,119,34,0.3)] transition-all duration-500">
                   <img 
                      src={img.url} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" 
                      alt="" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <div className="absolute bottom-10 left-10 right-10 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex items-center gap-2 text-[#E87722] text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                        <MapPin size={14} /> {img.location}
                      </div>
                      <p className="text-white text-xl font-black tracking-tight">{img.caption}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-[#1B3B5F] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl"
             >
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Camera size={200} />
                </div>
                
                <h3 className="text-4xl font-black mb-8 tracking-tighter">{c.ctaHeading}</h3>
                <p className="text-white/60 text-lg mb-12 font-medium leading-relaxed max-w-2xl">
                  {c.ctaBody}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <a 
                    href="mailto:submissions@indiaeurasia.org" 
                    className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#E87722] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-[#E87722]/20 hover:shadow-[0_0_25px_rgba(232,119,34,0.4)] hover:-translate-y-1"
                  >
                    <Mail size={18} className="mr-3" />
                    Submit via Email
                    <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </a>
                  <div className="text-white/40 text-[10px] font-black uppercase tracking-widest text-center sm:text-left">
                    {c.submissionEmail}
                  </div>
                </div>
             </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
