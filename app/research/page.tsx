"use client";

import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowRight, Search, Globe, MoveRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';

import SubHero from '@/src/components/SubHero';
import { useContent } from '@/src/context/ContentContext';
import ScrollReveal from '@/src/components/ScrollReveal';
import SEOHead from '@/src/components/SEOHead';

function PublicationsContent() {
  const { content } = useContent();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pubs = content?.publications || [];
  const categories = ['All', 'Perspectives', 'Commentary', 'Stories from Eurasia', 'Research Notes'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const regionFilter = searchParams.get('region');
  
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
      pub.author.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch && matchesRegion;
  });

  const clearRegionFilter = () => {
    router.push('/research');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 overflow-x-hidden">
      <SEOHead
        title="Research and Analysis"
        description="Read IERF's latest research papers, policy commentaries, perspectives, and strategic analysis on India-Eurasia relations, Central Asian geopolitics, and trans-regional connectivity."
        path="/research"
      />
      <SubHero 
        title="Research & Analysis" 
        subtitle="Insights and analysis from our network on the shifting dynamics of Eurasia."
        breadcrumb={[{ label: 'Research' }]}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20 w-full">
        
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

        {/* ── Search & Filter Bar ── */}
        <div className="mb-16 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E87722] transition-colors" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search publications, topics, authors..." 
              className="w-full pl-14 pr-6 py-4 bg-white rounded-full outline-none transition-all border border-gray-200 focus:border-[#E87722] text-sm font-bold shadow-sm hover:shadow-md text-[#0A192F] placeholder:text-gray-400"
            />
          </div>
          <div className="relative w-full lg:w-auto">
            <div className="flex gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full text-[11px] font-black whitespace-nowrap transition-all uppercase tracking-widest ${activeCategory === category ? 'bg-[#0A192F] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:text-[#0A192F] hover:border-[#0A192F] hover:bg-gray-50'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Publications Grid ── */}
        {filteredPubs.length === 0 ? (
          <div className="py-32 text-center bg-white rounded-xl border border-gray-100 shadow-sm px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-8 shadow-inner">
               <Search className="text-gray-300" size={32} />
            </div>
            <h3 className="text-3xl font-black text-[#0A192F] mb-4 font-display">No results found</h3>
            <p className="text-gray-500 font-medium text-lg max-w-md mx-auto mb-10">
              We couldn't find any research matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                clearRegionFilter();
              }}
              className="px-8 py-4 bg-[#E87722] text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-[0_8px_20px_rgba(232,119,34,0.3)]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPubs.map((pub, index) => (
            <ScrollReveal 
              key={pub.id}
              delay={(index % 3) * 0.1}
            >
              <div 
                className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-gray-200 transition-all duration-500 overflow-hidden"
              >
                <div className="h-56 relative overflow-hidden">
                  <Image 
                    src={pub.image} 
                    alt={pub.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 z-20">
                     <span className="bg-white/90 backdrop-blur-md text-[#0A192F] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-sm">
                       {pub.type}
                     </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center space-x-3 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <span className="flex items-center"><Calendar size={14} className="mr-1.5 text-[#E87722]"/> {pub.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1 uppercase"><Globe size={12} className="text-[#E87722]"/> {pub.region?.replace('-', ' ') || 'General'}</span>
                  </div>
                  
                  <Link href={`/research/${pub.id}`}>
                    <h3 className="text-2xl font-black text-[#0A192F] mb-6 hover:text-[#E87722] transition-colors leading-[1.2] tracking-tight font-display">
                      {pub.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                    {pub.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-[10px] font-black text-[#0A192F]/60 uppercase tracking-[0.2em]">{pub.author}</span>
                    <Link 
                      href={`/research/${pub.id}`}
                      className="flex items-center gap-2 text-[10px] font-black text-[#E87722] uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
                    >
                      Read <MoveRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
          </div>
        )}
        
        {/* Load More */}
        {filteredPubs.length > 0 && (
          <div className="mt-20 text-center">
             <button className="inline-flex items-center justify-center px-10 py-5 bg-white border border-gray-200 text-[#0A192F] text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
                Load More Insights <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Publications() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] pb-24" />}>
      <PublicationsContent />
    </React.Suspense>
  );
}
