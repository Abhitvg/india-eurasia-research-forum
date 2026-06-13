import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { defaultContent } from '@/src/data/siteContent';
import ScrollReveal from '@/src/components/ScrollReveal';
import ReadingProgressBar from '@/src/components/ReadingProgressBar';
import ShareButtons from '@/src/components/ShareButtons';
import { Metadata } from 'next';

export const dynamicParams = false;

export async function generateStaticParams() {
  return defaultContent.publications.map((pub) => ({
    id: pub.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const publication = defaultContent.publications.find(p => p.id === id);
  
  if (!publication) {
    return { title: 'Not Found' };
  }

  return {
    title: `${publication.title} | IERF`,
    description: publication.description,
    openGraph: {
      type: 'article',
      title: publication.title,
      description: publication.description,
      publishedTime: new Date(publication.date).toISOString(),
      authors: [publication.author],
      tags: [publication.type],
    }
  };
}

export default async function PublicationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const publication = defaultContent.publications.find(p => p.id === id);
  
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

  const bio = publication.authorBio;
  const authorImg = publication.authorImage;
  const words = publication.content ? publication.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length : 0;
  const readingTime = Math.ceil(words / 200) || 1;

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: publication.title,
    description: publication.description,
    image: publication.image?.startsWith('http') ? publication.image : `https://www.indiaeurasia.org${publication.image}`,
    author: {
      '@type': 'Person',
      name: publication.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'India Eurasia Research Forum',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.indiaeurasia.org/images/logo_final.png',
      },
    },
    datePublished: new Date(publication.date).toISOString(),
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgressBar />

      {/* Detail Header */}
      <section className="bg-[#0A192F] pt-24 md:pt-32 pb-16 md:pb-24 text-white relative overflow-hidden rounded-b-[3rem] md:rounded-b-[4rem] m-2 md:m-4 mt-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E87722] opacity-[0.05] rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 opacity-[0.03] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.02\\' fill-rule=\\'evenodd\\'%3E%3Cpath d=\\'M0 40L40 0H20L0 20M40 40V20L20 40\\'/\\%3E%3C/g\\%3E%3C/svg\\%3E')] pointer-events-none opacity-50"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <ScrollReveal direction="up" delay={0}>
            <div className="mb-10">
              <Link href="/research" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-[10px] font-black tracking-[0.2em] uppercase group bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Research
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
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
          </ScrollReveal>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24 relative z-40 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-xl shadow-2xl shadow-[#0A192F]/5 overflow-hidden border border-gray-100">
          {/* Featured Image */}
          <div className="h-[300px] md:h-[500px] w-full relative">
            <Image 
              src={publication.image} 
              alt={publication.title}
              fill
              className="object-cover"
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
            <ShareButtons title={publication.title} />

            {/* Main Text Content */}
            <div 
              className="prose prose-lg md:prose-xl prose-slate max-w-none text-gray-700 leading-relaxed marker:text-[#E87722]"
              dangerouslySetInnerHTML={{ __html: publication.content }}
            />

            {/* Author Bio Section */}
            {(bio || authorImg) && (
              <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-50 rounded-xl p-8 md:p-10">
                 {authorImg && (
                   <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 shadow-md">
                      <Image 
                        src={authorImg} 
                        alt={publication.author} 
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500" 
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
