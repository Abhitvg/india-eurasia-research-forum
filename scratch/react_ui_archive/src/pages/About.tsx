import { motion } from 'motion/react';
import { Search, BookOpen, MessageCircle, Handshake, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubHero from '../components/SubHero';
import { useContent } from '../context/ContentContext';
import SEOHead from '../components/SEOHead';

const pillarIcons = [
  <Search size={28} />,
  <MessageCircle size={28} />,
  <Handshake size={28} />,
  <Target size={28} />,
];
const pillarColors = ['from-blue-500 to-blue-700', 'from-[#E87722] to-orange-700', 'from-emerald-500 to-emerald-700', 'from-purple-500 to-purple-700'];

export default function About() {
  const { content } = useContent();
  const c = content.about;
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 w-full">

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 mb-12 bg-white/50 backdrop-blur-sm rounded-[3rem] transition-all hover:bg-white"
        >
          <h2 className="text-3xl font-black text-[#1B3B5F] mb-8 tracking-tighter">Who We Are</h2>
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
             {c.whoWeAre}
          </p>
        </motion.section>

        {/* What We Do — Four Pillars */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B3B5F] mb-4 tracking-tight">What We Do</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              {c.whatWeDoIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillarColors[index % pillarColors.length]} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                  {pillarIcons[index % pillarIcons.length]}
                </div>
                <h3 className="text-xl font-black text-[#1B3B5F] mb-3">{pillar.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1B3B5F] to-[#0A192F] rounded-2xl sm:rounded-[2.5rem] shadow-xl p-6 sm:p-10 lg:p-14 mb-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B3B5F]/60 via-[#1B3B5F]/0 to-[#1B3B5F]/80 z-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E87722]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-2xl sm:text-3xl font-black mb-6 tracking-tight relative z-10">Our Vision</h2>
          {c.visionParagraphs.map((p, i) => (
            <p key={i} className={`text-white/80 text-base sm:text-lg leading-relaxed relative z-10 ${i < c.visionParagraphs.length - 1 ? 'mb-6' : ''}`}>
              {p}
            </p>
          ))}
        </motion.section>

        {/* Focus Areas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 mb-12"
        >
          <h2 className="text-3xl font-black text-[#1B3B5F] mb-10 tracking-tighter">Focus Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white hover:bg-[#E87722]/5 transition-all group"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#E87722] mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-gray-700 text-base font-bold leading-relaxed">{area}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why IERF */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 mb-12 bg-white/50 backdrop-blur-sm rounded-[3rem] transition-all hover:bg-white"
        >
          <h2 className="text-3xl font-black text-[#1B3B5F] mb-8 tracking-tighter">Why IERF</h2>
          {c.whyIerfParagraphs.map((p, i) => (
            <p key={i} className={`text-gray-600 text-lg leading-relaxed font-medium ${i < c.whyIerfParagraphs.length - 1 ? 'mb-6' : ''}`}>
              {p}
            </p>
          ))}
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/our-people"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#1B3B5F] text-white text-sm font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#E87722] transition-all shadow-xl hover:-translate-y-1 group"
            >
              Meet Our People <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/research"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#1B3B5F] border border-gray-200 text-sm font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1 group"
            >
              Read Research <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
