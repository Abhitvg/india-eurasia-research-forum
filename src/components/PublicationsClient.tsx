"use client";

import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowRight, Search, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import SubHero from '../components/SubHero';
import { useContent } from '../context/ContentContext';
import ScrollReveal from '../components/ScrollReveal';


export default function PublicationsClient() {
  const { content } = useContent();
  const searchParams = useSearchParams();
  const router = useRouter();
  const c = content?.publications || ({} as any);
  const pubs = content?.publications || [];
  const categories = ['All', 'Perspectives', 'Commentary', 'Stories from Eurasia', 'Research Notes'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const regionFilter = searchParams.get('region');

  // Sync region filter with search query or state if needed, 
  // but for now let's just add it to the filter logic
  
  const filteredPubs = pubs.filter(pub => {
    // Category Filter
    const pubType = pub.type.toLowerCase();
    const activeLower = activeCategory.toLowerCase();
    let matchesCategory = activeCategory === 'All';
    if (!matchesCategory) {
      if (activeCategory === 'Research Notes') {
        matchesCategory = pubType.includes('research note') || pubType.includes('working paper');
      } else {
        matchesCategory = pubType === activeLower;
      }
    }

    // Region Filter (from Map)
    const matchesRegion = !regionFilter || pub.region === regionFilter;

    // Search Filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchLower) || 
      pub.description.toLowerCase().includes(searchLower) || 
      pub.author.toLowerCase().includes(searchLower) ||
      (pub.content && pub.content.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch && matchesRegion;
  });

  const clearRegionFilter = () => {
    router.replace('/research');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24 overflow-x-hidden">
      
      <SubHero 
        title="Research and Analysis" 
        subtitle="Insights and analysis from our research network on the shifting dynamics of India-Eurasia relations."
        breadcrumb={[{ label: 'Research and Analysis' }]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-10 relative z-20 w-full">
        
        {/* Active Region Filter Badge */}
        {regionFilter && (
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#E87722]/10 border border-[#E87722]/20 rounded-full text-[#E87722] text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-500">
              <Globe size={14} /> Showing Region: {regionFilter.replace('-', ' ')}
              <button 
                onClick={clearRegionFilter}
                className="ml-2 p-1 hover:bg-[#E87722]/20 rounded-full transition-colors"
                title="Clear region filter"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Search & Filter Bar - De-boxed */}
        <div className="p-4 sm:p-6 mb-10 sm:mb-16 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#E87722] transition-colors" size={22} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research papers, notes, and analysis..." 
              className="w-full pl-16 pr-6 py-5 bg-white rounded-2xl outline-none focus:ring-4 focus:ring-[#E87722]/10 transition-all border border-gray-100 focus:border-[#E87722]/40 text-lg font-medium shadow-sm hover:shadow-md hover:border-[#E87722]/20"
            />
          </div>
          <div className="relative w-full lg:w-auto">
            <div className="flex gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-8 py-3.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-[0.2em] shadow-sm transform hover:-translate-y-0.5 ${activeCategory === category ? 'bg-[#1B3B5F] text-white shadow-xl shadow-blue-900/20' : 'bg-white border border-gray-100 text-gray-400 hover:text-[#E87722] hover:border-[#E87722]/30 hover:shadow-md hover:shadow-[#E87722]/5'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredPubs.length === 0 ? (
          <div className="py-32 text-center bg-white rounded-[3rem] border border-gray-100 shadow-sm px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
               <Search className="text-gray-200" size={40} />
            </div>
            <h3 className="text-3xl font-black text-[#1B3B5F] mb-4">No results found</h3>
            <p className="text-gray-500 font-medium text-lg max-w-md mx-auto mb-10">
              We couldn't find any research matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                clearRegionFilter();
              }}
              className="px-10 py-4 bg-[#1B3B5F] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#E87722] transition-all shadow-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {filteredPubs.map((pub, index) => (
            <ScrollReveal 
              key={pub.id}
              delay={(index % 3) * 0.1}
            >
              <div 
                className="group flex flex-col h-full transition-all duration-500 p-4 hover:bg-[#E87722]/5 rounded-[2.5rem] hover:shadow-2xl hover:shadow-[#E87722]/10 border border-transparent hover:border-[#E87722]/10"
              >
                <div className="h-64 relative overflow-hidden rounded-3xl mb-8">
                  <img 
                    src={pub.image} 
                    alt={pub.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B5F]/40 to-[#1B3B5F]/0 opacity-40"></div>
                  <div className="absolute top-6 left-6 z-20">
                     <span className="bg-white/90 backdrop-blur-md text-[#1B3B5F] text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg">
                       {pub.type}
                     </span>
                  </div>
                </div>
                
                <div className="px-4 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <span className="flex items-center"><Calendar size={14} className="mr-2 text-[#E87722] font-bold"/> {pub.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1 uppercase"><Globe size={12} className="text-[#E87722]"/> {pub.region?.replace('-', ' ') || 'General'}</span>
                  </div>
                  
                  <Link href={`/research/${pub.id}`}>
                    <h3 className="text-2xl font-black text-[#1B3B5F] mb-6 hover:text-[#E87722] transition-colors leading-[1.3] tracking-tight">
                      {pub.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-500 text-base leading-relaxed mb-10 font-medium line-clamp-3">
                    {pub.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                    <span className="text-[10px] font-black text-[#1B3B5F]/40 uppercase tracking-[0.2em]">{pub.author}</span>
                      <Link 
                        href={`/research/${pub.id}`} 
                        className="text-[#1B3B5F] hover:text-[#E87722] font-black text-sm flex items-center transition-colors group"
                      >
                        READ FULL ARTICLE <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
          </div>
        )}
        
        {/* Load More */}
        <div className="mt-20 text-center">
           <button className="inline-flex items-center justify-center px-10 py-5 bg-white border border-gray-200 text-[#1B3B5F] text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#E87722] hover:text-white hover:border-[#E87722] transition-all shadow-xl hover:shadow-[0_0_20px_rgba(232,119,34,0.3)] hover:-translate-y-1 group">
              LOAD MORE INSIGHTS <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
}
