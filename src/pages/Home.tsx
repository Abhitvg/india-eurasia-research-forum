import { ArrowRight, Globe, BookOpen, Users, Calendar, ChevronRight, Send, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import ScrollReveal from '../components/ScrollReveal';
import GangaLogo from '../components/GangaLogo';
import EurasiaMap from '../components/EurasiaMap';
import SEOHead from '../components/SEOHead';

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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="India Eurasia Research Forum (IERF) | Connecting India and Eurasia"
        description="India Eurasia Research Forum (IERF) is a premier academic platform promoting research, dialogue, and trans-regional connectivity between India and the Eurasian region."
        path="/"
      />
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Cinematic Background Slider */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.05], 
              filter: 'blur(0px)'
            }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
            transition={{ 
              opacity: { duration: 2, ease: "easeOut" },
              scale: { duration: 8, ease: "linear" }, // Cinematic slow zoom
              filter: { duration: 1.5 }
            }}
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 contrast-[1.1] brightness-[0.7] saturate-[1.2]"
            style={{ backgroundImage: `url("${heroImages[currentImageIndex]}")` }}
          />
        </AnimatePresence>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B3B5F]/40 via-[#1B3B5F]/0 to-[#1B3B5F]/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.4)_100%)]"></div>
          {/* Internal Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] font-black uppercase tracking-[0.4em] mb-10 shadow-2xl">
              <Globe size={12} className="text-[#E87722]" /> India-Eurasian Research Forum
            </div>
            <h1
              className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight mb-10 leading-[1] max-w-6xl mx-auto"
              style={{ 
                fontFamily: '"Playfair Display", Georgia, serif',
                textShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}
            >
              Researching <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E87722] to-orange-400">Eurasia</span>, <br className="hidden sm:block" />
              Bridging <span className="text-white/80 italic font-medium">Continents.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/90 mb-16 max-w-3xl mx-auto font-medium leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            {c.heroSubtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/our-people" 
              className="shimmer-btn group relative inline-flex items-center justify-center px-12 py-5 text-sm font-black text-white bg-[#E87722] rounded-full transition-all shadow-2xl hover:shadow-[#E87722]/40 uppercase tracking-widest"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center"
              >
                {c.heroButton1}
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
            <Link 
              to="/research" 
              className="px-12 py-5 text-sm font-black text-white border border-white/30 rounded-full hover:bg-white/10 backdrop-blur-md transition-all uppercase tracking-widest"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {c.heroButton2}
              </motion.div>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-40 bg-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1B3B5F]/5 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <ScrollReveal direction="right">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#E87722]/10 text-[#E87722] text-[10px] font-black tracking-[0.3em] uppercase mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E87722] animate-pulse"></span>
                  {c.visionBadge}
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#1B3B5F] mb-10 leading-[1.1] tracking-tighter">
                  Advancing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3B5F] to-blue-900">Strategic</span> <br />
                  Vision for <span className="italic font-medium serif text-[#E87722]">Eurasia</span>
                </h2>
                <p className="text-gray-500 text-xl leading-relaxed mb-12 font-medium max-w-xl">
                  {c.visionBody}
                </p>
                <div className="relative p-10 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] mb-12">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#E87722] rounded-l-full"></div>
                  <p className="text-[#1B3B5F] text-lg leading-relaxed italic font-serif opacity-80">
                    "{c.visionQuote}"
                  </p>
                </div>
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-3 text-sm font-black text-[#1B3B5F] uppercase tracking-[0.2em] group border-b-2 border-transparent hover:border-[#1B3B5F] transition-all pb-1"
                >
                  Learn Our History <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <ScrollReveal direction="left" delay={0.2}>
                <div className="relative pb-12 pr-12">
                  <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#E87722]/5 rounded-3xl border border-[#E87722]/10 -z-10 rotate-6"></div>
                  <div className="relative rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl group border-4 md:border-8 border-white">
                    <img src={c.welcomeImage} alt="Strategic analysis" loading="lazy" className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-[4s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B5F]/40 to-[#1B3B5F]/0 mix-blend-multiply opacity-60"></div>
                  </div>
                  <div className="absolute -top-10 -right-4 md:-right-10 glass-luxe p-8 rounded-[2rem] w-48 text-center animate-bounce-slow">
                    <div className="text-4xl font-black text-[#1B3B5F] mb-1">{c.stat1Value}</div>
                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{c.stat1Label}</div>
                  </div>
                  <div className="absolute bottom-10 -left-6 md:-left-12 glass-luxe-dark p-8 rounded-[2rem] w-52 text-center text-white shadow-2xl">
                    <div className="text-4xl font-black text-[#E87722] mb-1">{c.stat2Value}</div>
                    <div className="text-[9px] font-black text-white/60 uppercase tracking-widest">{c.stat2Label}</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Mapping Section */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#1B3B5F]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <ScrollReveal>
          <EurasiaMap />
        </ScrollReveal>
      </section>

      {/* Focus Areas */}
      <section id="focus-areas" className="py-20 md:py-40 bg-[#F4F6F8] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E87722]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-24">
              <h3 className="text-4xl md:text-6xl font-black text-[#1B3B5F] mb-6 tracking-tighter">Strategic <span className="text-[#E87722]">Pillars</span></h3>
              <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto uppercase tracking-widest leading-loose">
                Mapping the civilizational, economic, and security <br /> architecture of Greater Eurasia.
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#E87722]/0 via-[#E87722] to-[#E87722]/0 mx-auto mt-12 rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ScrollReveal className="lg:col-span-2">
              <div className="p-8 md:p-10 group h-full relative overflow-hidden transition-all bg-white hover:bg-[#1B3B5F] rounded-3xl md:rounded-[4rem] border border-gray-100 hover:border-[#1B3B5F] shadow-xl hover:shadow-[#1B3B5F]/20">
                <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:opacity-[0.07] scale-150 rotate-12 transition-all duration-700 group-hover:rotate-0 text-[#E87722]">
                  <Globe size={250} />
                </div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gray-50 group-hover:bg-[#E87722] rounded-[2rem] flex items-center justify-center text-[#E87722] group-hover:text-white mb-10 transition-all duration-500 shadow-inner group-hover:shadow-[#E87722]/40 scale-110">
                    <Globe size={36} />
                  </div>
                  <h4 className="text-4xl font-black text-[#1B3B5F] group-hover:text-white mb-10 transition-colors">Core Research <span className="text-[#E87722]">Domains</span></h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {c.focusAreas.map((area, idx) => (
                      <div key={idx} className="flex items-center space-x-5 group/item cursor-default">
                        <div className="w-3 h-3 rounded-full border-2 border-[#E87722] group-hover/item:bg-[#E87722] transition-all duration-300"></div>
                        <span className="text-gray-500 group-hover:text-white/80 font-bold text-sm tracking-tight transition-colors">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-8 md:p-10 flex flex-col h-full bg-white group relative overflow-hidden transition-all hover:bg-[#E87722] rounded-3xl md:rounded-[4rem] border border-gray-100 hover:border-[#E87722] shadow-xl hover:shadow-[#E87722]/30">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-[#1B3B5F]/5 group-hover:bg-white/20 rounded-2xl flex items-center justify-center text-[#1B3B5F] group-hover:text-white mb-12 group-hover:scale-110 transition-transform duration-500">
                    <BookOpen size={32} />
                  </div>
                  <h4 className="text-4xl font-black text-[#1B3B5F] group-hover:text-white mb-8 tracking-tighter transition-colors">Insights Archive</h4>
                  <p className="text-gray-500 group-hover:text-white/80 text-lg leading-relaxed mb-12 font-medium italic border-l-3 border-[#E87722] group-hover:border-white/30 pl-8 py-2">
                    "Bridging the gap between scholarly rigour and regional strategic insights."
                  </p>
                  <div className="mt-auto">
                    <Link to="/research" className="shimmer-btn inline-flex items-center gap-4 px-10 py-5 bg-[#1B3B5F] group-hover:bg-white text-white group-hover:text-[#E87722] rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-2xl">
                      Browse Papers <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Volga Section */}
      <section id="volga-to-ganga" className="py-20 md:py-32 bg-[#1B3B5F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1B3B5F] via-[#1B3B5F] to-blue-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="right">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#E87722]/20 rounded-full blur-[100px] transition-all duration-700 group-hover:bg-[#E87722]/30"></div>
                <div className="relative rounded-[3rem] md:rounded-[5rem] bg-white/5 backdrop-blur-3xl p-10 md:p-16 border border-white/10 shadow-3xl flex flex-col items-center justify-center min-h-[360px] md:min-h-[480px] transform transition-all duration-1000 hover:rotate-2 hover:scale-[1.02]">
                  <GangaLogo className="w-64 md:w-80 h-auto" />
                  <div className="mt-8 inline-block px-8 py-3 rounded-full bg-[#E87722] text-white text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl">
                    Global Flagship
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2}>
              <div className="text-white">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E87722] text-xs font-black tracking-widest uppercase mb-10">
                   Civilizational Dialogue
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-[1.05]">
                  {c.volgaTeaserHeading}
                </h2>
                <p className="text-white/70 text-2xl leading-relaxed mb-16 font-light italic">
                  {c.volgaTeaserBody}
                </p>
                <Link to="/events/volga-to-ganga" className="shimmer-btn group inline-flex items-center gap-5 px-12 py-6 bg-[#E87722] text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-2xl hover:shadow-[#E87722]/50 hover:-translate-y-1">
                  Join the Dialogue <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-32">
          <ScrollReveal>
            <h2 className="text-[#E87722] font-black text-sm uppercase tracking-[0.5em] mb-6">{c.ierfWayTitle}</h2>
            <h3 className="text-5xl md:text-7xl font-black text-[#1B3B5F] tracking-tighter">The IERF <span className="text-gray-200">Ethos</span></h3>
          </ScrollReveal>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.ierfWayPillars.map((pill, idx) => {
              const icons = [
                <BookOpen className="text-blue-600" size={32} />, 
                <Users className="text-[#E87722]" size={32} />, 
                <Globe className="text-green-600" size={32} />, 
                <Camera className="text-purple-600" size={32} />
              ];
              return (
                <ScrollReveal key={idx} delay={idx * 0.15}>
                  <div className="p-8 md:p-12 h-full bg-gray-50/50 hover:bg-white transition-all duration-500 rounded-3xl md:rounded-[3rem] border border-transparent hover:border-gray-100 hover:shadow-2xl flex flex-col items-center text-center group">
                    <div className="w-24 h-24 rounded-[2rem] bg-white shadow-sm flex items-center justify-center mb-10 group-hover:-translate-y-4 group-hover:rotate-6 transition-all duration-1000 group-hover:shadow-2xl">
                       {icons[idx % icons.length]}
                    </div>
                    <h4 className="text-2xl font-black text-[#1B3B5F] mb-6 group-hover:text-[#E87722] transition-colors">{pill.title}</h4>
                    <p className="text-gray-500 text-base leading-relaxed font-medium group-hover:text-gray-700 transition-colors">{pill.body}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* DigiEurasia Section */}
      <section className="py-20 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E87722]/5 rounded-full blur-[100px] -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1B3B5F]/5 rounded-full blur-[100px] translate-y-24 -translate-x-24"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-gray-100 text-[#E87722] text-xs font-black tracking-widest uppercase mb-10 mx-auto shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#E87722] animate-pulse"></div>
                Integrated Digital Initiative
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-[#1B3B5F] mb-10 tracking-tighter leading-[0.9]">
                Digi<span className="text-[#E87722]">Eurasia</span>
              </h2>
              <p className="text-gray-500 text-2xl leading-relaxed mb-16 font-medium max-w-3xl mx-auto">
                {c.digiTeaserBody}
              </p>
              <div className="relative group max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1B3B5F] to-blue-900 rounded-3xl md:rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="p-8 md:p-16 bg-white border border-white/50 backdrop-blur-3xl rounded-3xl md:rounded-[3rem] shadow-2xl relative">
                   <div className="w-20 h-20 bg-[#F8FAFC] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <Camera className="text-[#E87722]" size={32} />
                   </div>
                   <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 text-center">Community Repository</p>
                   <h4 className="text-2xl font-black text-[#1B3B5F]">Advancing Digital Heritage</h4>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision / Call to Action */}
      <section className="relative py-24 md:py-48 bg-[#1B3B5F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/yk_opt.webp')] bg-cover bg-fixed brightness-[0.4] contrast-[1.2] transition-transform duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B3B5F]/0 via-[#1B3B5F]/40 to-[#1B3B5F]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal>
            <div className="inline-block px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E87722] text-xs font-black uppercase tracking-[0.5em] mb-12">
              The Path Forward
            </div>
            <h2 className="text-5xl md:text-9xl font-black mb-12 leading-[1] tracking-tighter">
              Inspiring <br /> <span className="text-[#E87722] italic font-medium serif">Dialogue.</span>
            </h2>
            <p className="text-2xl text-white/70 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
              {c.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link to="/contact" className="shimmer-btn px-16 py-7 bg-white text-[#1B3B5F] rounded-full font-black text-sm tracking-[0.2em] hover:bg-[#E87722] hover:text-white transition-all shadow-3xl hover:-translate-y-2 uppercase">
                JOIN THE DIALOGUE
              </Link>
              <Link to="/write-for-us" className="px-16 py-7 bg-transparent border-2 border-white/30 rounded-full font-black text-sm tracking-[0.2em] text-white hover:bg-white/10 transition-all uppercase">
                SUBMIT ANALYSIS
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
