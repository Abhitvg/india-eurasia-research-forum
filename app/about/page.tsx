import { Search, BookOpen, MessageCircle, Handshake, Target, ArrowRight, Compass } from 'lucide-react';
import Link from 'next/link';

import SubHero from '@/src/components/SubHero';
import { defaultContent } from '@/src/data/siteContent';
import ScrollReveal from '@/src/components/ScrollReveal';

export const metadata = {
  title: 'About Us | IERF',
  description: "Learn about IERF's mission to bridge India and Eurasia through academic research, strategic dialogue, and collaborative engagement across civilizational, economic, and security domains.",
};

export default function About() {
  const c = defaultContent.about;
  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      <SubHero
        title="About Us"
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'About Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20 w-full space-y-24">

        {/* ── WHO WE ARE ── */}
        <section>
          <ScrollReveal>
            <div className="bg-gray-50 rounded-lg p-10 md:p-16 border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
               <div className="md:w-1/3">
                  <h2 className="text-3xl md:text-5xl font-bold text-[#0A192F] leading-tight mb-4">
                     Who We <br/><span className="text-[#E87722]">Are.</span>
                  </h2>
                  <div className="w-16 h-1.5 bg-[#E87722] rounded-full"></div>
               </div>
               <div className="md:w-2/3">
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                     {c.whoWeAre}
                  </p>
               </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── WHAT WE DO ── */}
        <section>
          <ScrollReveal>
            <div className="text-center mb-12">
               <h2 className="text-[#E87722] font-bold text-sm uppercase tracking-widest mb-3">Core Mission</h2>
               <h3 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-6">What We Do</h3>
               <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  {c.whatWeDoIntro}
               </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.pillars?.map((pillar: any, index: number) => {
              const icons = [
                <Search size={32} className="text-blue-500" />,
                <MessageCircle size={32} className="text-[#E87722]" />,
                <Handshake size={32} className="text-emerald-500" />,
                <Target size={32} className="text-purple-500" />
              ];
              return (
                <ScrollReveal key={pillar.title} delay={index * 0.1}>
                   <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="mb-6">
                         {icons[index % icons.length]}
                      </div>
                      <h3 className="text-xl font-bold text-[#0A192F] mb-3">{pillar.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                   </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ── OUR VISION ── */}
        <section>
          <ScrollReveal>
             <div className="bg-[#0A192F] rounded-lg p-10 md:p-16 lg:p-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E87722]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                   <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
                      <Compass size={32} className="text-[#E87722]" />
                   </div>
                   <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Vision</h2>
                   <div className="space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed">
                     {c.visionParagraphs?.map((p: string, i: number) => (
                       <p key={i}>{p}</p>
                     ))}
                   </div>
                </div>
             </div>
          </ScrollReveal>
        </section>

        {/* ── FOCUS AREAS ── */}
        <section>
           <ScrollReveal>
              <div className="text-center mb-10">
                 <h2 className="text-[#E87722] font-bold text-sm uppercase tracking-widest mb-3">Research Domains</h2>
                 <h3 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-6">Focus Areas</h3>
              </div>
           </ScrollReveal>
           <div className="flex flex-wrap justify-center gap-4">
              {c.focusAreas?.map((area: string, index: number) => (
                 <ScrollReveal key={index} delay={index * 0.05}>
                    <div className="bg-gray-50 px-6 py-3 rounded text-sm font-bold text-[#0A192F] border border-gray-200">
                       {area}
                    </div>
                 </ScrollReveal>
              ))}
           </div>
        </section>

        {/* ── WHY IERF ── */}
        <section>
           <ScrollReveal>
             <div className="bg-white rounded-lg p-10 md:p-16 border border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto">
                   <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-8 text-center">Why IERF</h2>
                   <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-center">
                     {c.whyIerfParagraphs?.map((p: string, i: number) => (
                       <p key={i}>{p}</p>
                     ))}
                   </div>
                </div>
             </div>
           </ScrollReveal>
        </section>

        {/* ── CTA ── */}
        <section className="text-center pt-8 border-t border-gray-100">
           <ScrollReveal>
             <h3 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-8">Connect With Us</h3>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/our-people"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E87722] text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-orange-600 transition-colors"
                >
                  Meet Our People <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0A192F] border border-gray-300 text-sm font-bold uppercase tracking-wider rounded hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  Contact Us
                </Link>
             </div>
           </ScrollReveal>
        </section>

      </div>
    </div>
  );
}
