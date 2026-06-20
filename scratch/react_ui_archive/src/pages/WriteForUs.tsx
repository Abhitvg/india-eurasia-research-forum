import { Mail, Edit3, BookOpen, Globe2, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import SubHero from '../components/SubHero';
import { useContent } from '../context/ContentContext';
import SEOHead from '../components/SEOHead';

export default function WriteForUs() {
  const { content } = useContent();
  const c = content?.writeForUs || ({} as any);

  const categoryIcons = [<BookOpen size={32} />, <FileText size={32} />, <Globe2 size={32} />];
  const categoryColors = ['bg-blue-500', 'bg-[#E87722]', 'bg-purple-500'];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="Write For Us"
        description="Submit your research papers, commentaries, and policy briefs on India-Eurasia relations. IERF welcomes scholarly contributions on geopolitics, connectivity, and strategic studies."
        path="/write-for-us"
      />
      <SubHero 
        title="Write For Us" 
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'Write For Us' }]}
      />

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-[#1B3B5F]">Submission Categories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {c.categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col p-8 transition-all bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-2xl hover:shadow-[#E87722]/10 hover:border-[#E87722]/30"
              >
                <div className={`w-12 h-12 rounded-xl ${categoryColors[idx % categoryColors.length]} text-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(232,119,34,0.4)] transition-all duration-500`}>
                  {categoryIcons[idx % categoryIcons.length]}
                </div>
                <h4 className="text-3xl font-black text-[#1B3B5F] mb-4 tracking-tighter group-hover:text-[#E87722] transition-colors">{cat.title}</h4>
                <div className="text-[#E87722] text-[10px] font-black uppercase tracking-[0.3em] mb-8 pb-1 border-b border-[#E87722]/20 w-max">
                  {cat.limit}
                </div>
                <p className="text-gray-500 text-base leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-0"
            >
              <h3 className="text-3xl font-black text-[#1B3B5F] mb-10 tracking-tighter">Submission Guidelines</h3>
              <ul className="space-y-6">
                {c.guidelines.map((guide, idx) => (
                  <li key={idx} className="flex items-start group">
                    <div className="w-8 h-8 rounded-full bg-[#E87722]/5 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:bg-[#E87722] transition-all">
                      <CheckCircle2 size={16} className="text-[#E87722] group-hover:text-white" />
                    </div>
                    <span className="text-gray-600 font-bold text-base leading-relaxed">{guide}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-0 flex flex-col justify-center"
            >
              <h3 className="text-4xl font-black mb-8 tracking-tighter text-[#1B3B5F]">{c.ctaHeading}</h3>
              <p className="text-gray-500 text-lg mb-10 font-medium leading-relaxed italic border-l-4 border-[#E87722] pl-8">
                {c.ctaBody}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a 
                  href="mailto:submissions@indiaeurasia.org" 
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#E87722] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-[#E87722]/20 hover:shadow-[0_0_25px_rgba(232,119,34,0.4)] hover:-translate-y-1"
                >
                  Submit via Email
                  <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </a>
                <div className="text-[#1B3B5F]/40 text-[10px] font-black uppercase tracking-widest text-center sm:text-left">
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
