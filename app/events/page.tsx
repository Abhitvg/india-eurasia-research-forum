"use client";

import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

import { useContent } from '@/src/context/ContentContext';
import SEOHead from '@/src/components/SEOHead';

export default function Events() {
  const { content } = useContent();
  const events = content.events.items;

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F8]">
      <SEOHead
        title="Events & Dialogues"
        description="Explore IERF's events, conferences, dialogues, and academic seminars on India-Eurasia relations, including the flagship Volga to Ganga series."
        path="/events"
      />
      {/* Page Header */}
      <section className="bg-[#1B3B5F] py-20 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Events & Dialogues
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-24 h-1 bg-[#E87722] mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto font-light"
          >
            {content.events.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
