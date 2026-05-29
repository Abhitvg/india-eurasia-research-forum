import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { Calendar, User, ArrowLeft, Download, Share2, Printer, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { defaultContent } from '../data/siteContent';
import SEOHead from '../components/SEOHead';

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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Publication Not Found</h2>
          <Link to="/publications" className="text-[#1B3B5F] hover:text-[#E87722] font-semibold flex items-center justify-center">
            <ArrowLeft size={18} className="mr-2" /> Back to Publications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F8]">
      <SEOHead
        title={publication.title}
        description={publication.description}
        path={`/publications/${publication.id}`}
        type="article"
        image={publication.image?.startsWith('http') ? publication.image : `https://indiaeurasia.org${publication.image}`}
      />
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#E87722] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Detail Header */}
      <section className="bg-[#1B3B5F] pt-20 md:pt-28 pb-10 md:pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 drop-shadow-lg"
          >
            <Link to="/publications" className="inline-flex items-center bg-black/25 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-black/40 transition-colors font-bold text-sm tracking-wide group border border-white/10 shadow-lg">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO PUBLICATIONS
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="drop-shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-block bg-[#E87722] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                {publication.type}
              </span>
              <span className="flex items-center gap-1.5 text-white/60 text-[10px] font-black uppercase tracking-widest">
                <Clock size={12} className="text-[#E87722]" /> {readingTime} min read
              </span>
            </div>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-black mb-8 md:mb-10 leading-tight text-white drop-shadow-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              {publication.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-200 text-sm font-semibold drop-shadow-md">
              <div className="flex items-center">
                <User size={16} className="mr-2 text-[#E87722]" />
                <span className="font-bold text-white">{publication.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-[#E87722]" />
                {publication.date}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 relative z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Featured Image */}
            <div className="h-64 md:h-96 w-full relative">
              <img 
                src={publication.image} 
                alt={publication.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {publication.imageRef && (
              <div className="px-8 pt-4 pb-0 flex flex-col items-end">
                <p className="text-[10px] text-gray-400 font-medium italic">
                  {publication.imageRef.startsWith('http') ? (
                    <a href={publication.imageRef} target="_blank" rel="noopener noreferrer" className="hover:text-[#E87722] transition-all underline decoration-gray-200">
                      View Image Source
                    </a>
                  ) : (
                    publication.imageRef
                  )}
                </p>
                {publication.imageFootnote && (
                  <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-wider">
                    {publication.imageFootnote}
                  </p>
                )}
              </div>
            )}

            <div className="p-6 md:p-12">
              {/* Share & Actions */}
              <div className="flex justify-end gap-3 mb-10 pb-6 border-b border-gray-100">
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
                  className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-[#1B3B5F] hover:text-white transition-all shadow-sm" title="Share Article"
                >
                  <Share2 size={18} />
                </button>
                <button onClick={() => window.print()} className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-[#1B3B5F] hover:text-white transition-all shadow-sm" title="Print">
                  <Printer size={18} />
                </button>
                <button onClick={() => window.print()} className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#1B3B5F] text-white hover:bg-[#E87722] transition-colors shadow-md font-bold text-sm">
                  <Download size={18} /> <span>PDF</span>
                </button>
              </div>

              {/* Main Text Content */}
              <div 
                className="prose prose-lg prose-slate max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: publication.content }}
              />

              {/* Author Bio Section */}
              {(bio || authorImg) && (
                <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col items-center md:items-start gap-8">
                   <div className="w-full">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center">
                         <span className="w-8 h-[1px] bg-gray-200 mr-4"></span>
                         About the Author
                      </h5>
                   </div>
                   <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                   {authorImg && (
                     <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-2 border-gray-100 shadow-sm">
                        <img 
                          src={authorImg} 
                          alt={publication.author} 
                          loading="lazy"
                          className="w-full h-full object-cover" 
                        />
                     </div>
                   )}
                   <div className="text-center md:text-left">
                      <h4 className="text-lg font-bold text-[#1B3B5F] mb-2">{publication.author}</h4>
                      {bio && (
                        <p 
                          className="text-gray-500 text-sm italic leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: bio }}
                        />
                      )}
                   </div>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 text-center">
            <Link to="/publications" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B3B5F] font-bold rounded-xl border-2 border-[#1B3B5F] hover:bg-[#1B3B5F] hover:text-white transition-all shadow-sm">
              <ArrowLeft size={18} className="mr-2" /> SEE ALL PUBLICATIONS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
