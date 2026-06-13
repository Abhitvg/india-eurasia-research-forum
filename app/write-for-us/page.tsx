import { Mail, Edit3, BookOpen, Globe2, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import SubHero from '@/src/components/SubHero';
import { defaultContent } from '@/src/data/siteContent';
import ScrollReveal from '@/src/components/ScrollReveal';

export const metadata = {
  title: 'Write For Us | IERF',
  description: 'Submit your research papers, commentaries, and policy briefs on India-Eurasia relations. IERF welcomes scholarly contributions on geopolitics, connectivity, and strategic studies.',
};

export default function WriteForUs() {
  const c = defaultContent?.writeForUs || ({} as any);

  const categoryIcons = [<BookOpen size={32} key="1" />, <FileText size={32} key="2" />, <Globe2 size={32} key="3" />];
  const categoryColors = ['text-blue-500', 'text-[#E87722]', 'text-emerald-500'];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <SubHero 
        title="Write For Us" 
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'Write For Us' }]}
      />

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
          <ScrollReveal>
             <div className="text-center mb-16">
               <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Submission Types</h2>
               <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] font-display tracking-tighter">Categories</h3>
             </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {c.categories?.map((cat: any, idx: number) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                 <div className="group h-full flex flex-col p-10 bg-white border border-gray-100 rounded-xl hover:shadow-2xl hover:shadow-[#0A192F]/5 transition-all duration-500 relative overflow-hidden">
                   <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:bg-[#0A192F] group-hover:text-white transition-all duration-500">
                     <span className={`group-hover:text-white transition-colors ${categoryColors[idx % categoryColors.length]}`}>
                        {categoryIcons[idx % categoryIcons.length]}
                     </span>
                   </div>
                   <h4 className="text-3xl font-black text-[#0A192F] mb-4 tracking-tighter font-display">{cat.title}</h4>
                   <div className="text-[#E87722] text-[10px] font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-[#E87722]/20 w-max">
                     {cat.limit}
                   </div>
                   <p className="text-gray-500 text-base leading-relaxed font-medium">
                     {cat.desc}
                   </p>
                 </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <ScrollReveal className="lg:col-span-7">
               <div className="bg-white rounded-xl p-10 md:p-16 border border-gray-100 shadow-sm h-full">
                  <h3 className="text-3xl font-black text-[#0A192F] mb-10 tracking-tighter font-display flex items-center gap-4">
                     <Edit3 className="text-[#E87722]" size={32} /> Submission Guidelines
                  </h3>
                  <ul className="space-y-6">
                    {c.guidelines?.map((guide: string, idx: number) => (
                      <li key={idx} className="flex items-start group">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-4 mt-1 flex-shrink-0 group-hover:bg-[#E87722] group-hover:shadow-[0_0_10px_rgba(232,119,34,0.4)] transition-all">
                          <CheckCircle2 size={12} className="text-gray-400 group-hover:text-white" />
                        </div>
                        <span className="text-gray-600 font-medium text-lg leading-relaxed">{guide}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-5 flex flex-col justify-center">
               <div className="bg-[#0A192F] rounded-xl p-12 text-white relative overflow-hidden shadow-2xl h-full flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E87722]/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                  <h3 className="text-[#E87722] text-[10px] font-black uppercase tracking-[0.4em] mb-4 relative z-10">Contribute</h3>
                  <h4 className="text-4xl font-black mb-8 tracking-tighter font-display relative z-10 leading-tight">{c.ctaHeading}</h4>
                  <p className="text-gray-400 text-lg mb-12 font-medium leading-relaxed italic border-l-2 border-[#E87722] pl-6 relative z-10">
                    {c.ctaBody}
                  </p>
                  
                  <div className="relative z-10 mt-auto">
                    <a 
                      href="mailto:submissions@indiaeurasia.org" 
                      className="group flex items-center justify-center w-full px-8 py-5 bg-[#E87722] text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-[0_8px_30px_rgba(232,119,34,0.4)] hover:-translate-y-1 mb-4"
                    >
                      <Mail size={16} className="mr-3" />
                      Submit via Email
                      <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
                    </a>
                    <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] text-center">
                      {c.submissionEmail}
                    </div>
                  </div>
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
