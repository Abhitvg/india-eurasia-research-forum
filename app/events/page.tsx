import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { defaultContent } from '@/src/data/siteContent';
import ScrollReveal from '@/src/components/ScrollReveal';

export const metadata = {
  title: 'Events & Dialogues | IERF',
  description: "Explore IERF's events, conferences, dialogues, and academic seminars on India-Eurasia relations, including the flagship Volga to Ganga series.",
};

export default function Events() {
  const events = defaultContent.events.items;

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F8]">
      {/* Page Header */}
      <section className="bg-[#1B3B5F] py-20 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal direction="up" delay={0}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Events & Dialogues
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="w-24 h-1 bg-[#E87722] mx-auto mb-6"></div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              {defaultContent.events.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <ScrollReveal delay={index * 0.1} key={index}>
                <div 
                  className={`bg-white rounded-2xl p-8 border ${event.featured ? 'border-[#E87722] shadow-[0_0_25px_rgba(232,119,34,0.15)] relative overflow-hidden' : 'border-gray-100 shadow-sm'} hover:shadow-xl hover:shadow-[#E87722]/10 hover:border-[#E87722]/30 transition-all flex flex-col h-full group`}
                >
                  {event.featured && (
                    <div className="absolute top-0 right-0 bg-[#E87722] text-white text-[9px] font-black px-4 py-1 rounded-bl-lg uppercase tracking-wider shadow-lg">
                      Flagship Series
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-[#E87722] font-bold text-sm mb-4 uppercase tracking-wider">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#1B3B5F] mb-4 group-hover:text-[#E87722] transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-gray-500 text-sm mb-6">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{event.type}</span>
                    <span className="flex items-center"><MapPin size={14} className="mr-1"/> {event.location}</span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed flex-grow mb-8">
                    {event.description}
                  </p>
                  
                  <Link 
                    href={event.link} 
                    className="inline-flex items-center font-black text-sm uppercase tracking-widest text-[#1B3B5F] hover:text-[#E87722] transition-colors mt-auto group/link"
                  >
                    {event.featured ? 'Explore Platform' : 'View Details'} <ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
