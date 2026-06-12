"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { motion, useScroll, useSpring } from 'motion/react';
import { Calendar, User, ArrowLeft, Download, Share2, Printer, Clock } from 'lucide-react';
import { useContent } from '@/src/context/ContentContext';
import { defaultContent } from '@/src/data/siteContent';
import SEOHead from '@/src/components/SEOHead';

export default function PublicationDetail() {
  const { content } = useContent();
  const { id } = useParams<{ id: string }>();
  const [readingTime, setReadingTime] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Get publication from current state
  const publication = content.publications.find(p => p.id === id);
  
  // Robust data fallback
  const defaultPub = defaultContent.publications.find(p => p.id === id);
  const bio = publication?.authorBio || defaultPub?.authorBio;
  const authorImg = publication?.authorImage || defaultPub?.authorImage;

  useEffect(() => {
    if (publication?.content) {
      const words = publication.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
      const time = Math.ceil(words / 200); // Average 200 wpm
      setReadingTime(time);
    }
  }, [publication]);

  if (!publication) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0A192F] mb-4">Publication Not Found</h2>
          <Link href="/research" className="text-[#E87722] hover:text-orange-600 font-bold flex items-center justify-center">
            <ArrowLeft size={18} className="mr-2" /> Back to Research
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <SEOHead
        title={publication.title}
        description={publication.description}
        path={`/research/${publication.id}`}
        type="article"
        image={publication.image?.startsWith('http') ? publication.image : `https://indiaeurasia.org${publication.image}`}
        articleData={{
          publishedTime: new Date(publication.date).toISOString() || new Date().toISOString(),
          author: publication.author,
          section: publication.type
        }}
      />
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#E87722] z-[100] origin-left shadow-[0_0_10px_rgba(232,119,34,0.5)]"
        style={{ scaleX }}
      />

      {/* Detail Header */}
      <section className="bg-[#0A192F] pt-24 md:pt-32 pb-16 md:pb-24 text-white relative overflow-hidden rounded-b-[3rem] md:rounded-b-[4rem] m-2 md:m-4 mt-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E87722] opacity-[0.05] rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 opacity-[0.03] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.02\\' fill-rule=\\'evenodd\\'%3E%3Cpath d=\\'M0 40L40 0H20L0 20M40 40V20L20 40\\'/\\%3E%3C/g\\%3E%3C/svg\\%3E')] pointer-events-none opacity-50"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Link href="/research" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-[10px] font-black tracking-[0.2em] uppercase group bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Research
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="inline-block bg-[#E87722] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                {publication.type}
              </span>
              <span className="flex items-center gap-1.5 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <Clock size={12} className="text-[#E87722]" /> {readingTime} min read
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-10 leading-[1.1] text-white tracking-tighter font-display">
              {publication.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm font-medium">
              <div className="flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <User size={14} className="mr-2 text-[#E87722]" />
                <span className="font-bold text-white">{publication.author}</span>
              </div>
              <div className="flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Calendar size={14} className="mr-2 text-[#E87722]" />
                {publication.date}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24 relative z-40 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-xl shadow-2xl shadow-[#0A192F]/5 overflow-hidden border border-gray-100">
          {/* Featured Image */}
          <div className="h-[300px] md:h-[500px] w-full relative">
            <img 
              src={publication.image} 
              alt={publication.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/20 to-transparent"></div>
          </div>
          
          {publication.imageRef && (
            <div className="px-8 pt-4 pb-0 flex flex-col items-end">
              <p className="text-[10px] text-gray-400 font-medium italic">
                {publication.imageRef.startsWith('http') ? (
                  <a href={publication.imageRef} target="_blank" rel="noopener noreferrer" className="hover:text-[#E87722] transition-all underline decoration-gray-200">
                    Image Source
                  </a>
                ) : (
                  publication.imageRef
                )}
              </p>
              {publication.imageFootnote && (
                <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-[0.2em]">
                  {publication.imageFootnote}
                </p>
              )}
            </div>
          )}

          <div className="p-8 md:p-16">
            {/* Share & Actions */}
            <div className="flex justify-end gap-3 mb-12 pb-8 border-b border-gray-100">
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: publication.title,
                      url: window.location.href,
                    }).catch(console.error);
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#0A192F] hover:text-white transition-all shadow-sm" title="Share Article"
              >
                <Share2 size={18} />
              </button>
              <button onClick={() => window.print()} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#0A192F] hover:text-white transition-all shadow-sm" title="Print">
                <Printer size={18} />
              </button>
              <button onClick={() => window.print()} className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#E87722] text-white hover:bg-orange-600 transition-colors shadow-lg shadow-[#E87722]/30 font-bold text-sm tracking-wide">
                <Download size={18} /> <span>Save PDF</span>
              </button>
            </div>

            {/* Main Text Content */}
            <div 
              className="prose prose-lg md:prose-xl prose-slate max-w-none text-gray-700 leading-relaxed marker:text-[#E87722]"
              dangerouslySetInnerHTML={{ __html: publication.content }}
            />

            {/* Author Bio Section */}
            {(bio || authorImg) && (
              <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-50 rounded-xl p-8 md:p-10">
                 {authorImg && (
                   <div className="w-24 h-24 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 shadow-md">
                      <img 
                        src={authorImg} 
                        alt={publication.author} 
                        loading="lazy"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                      />
                   </div>
                 )}
                 <div className="text-center md:text-left">
                    <h5 className="text-[10px] font-black text-[#E87722] uppercase tracking-[0.3em] mb-2">
                       Author
                    </h5>
                    <h4 className="text-2xl font-black text-[#0A192F] mb-4 font-display">{publication.author}</h4>
                    {bio && (
                      <p 
                        className="text-gray-500 text-sm leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{ __html: bio }}
                      />
                    )}
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 text-center">
          <Link href="/research" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0A192F] font-black text-[10px] uppercase tracking-[0.2em] rounded-full border border-gray-200 hover:border-[#0A192F] hover:bg-gray-50 transition-all shadow-sm hover:shadow-md group">
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-1 transition-transform" /> View More Research
          </Link>
        </div>
      </section>
    </div>
  );
}
