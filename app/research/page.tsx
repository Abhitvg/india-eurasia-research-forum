import React from 'react';
import SubHero from '@/src/components/SubHero';
import { defaultContent } from '@/src/data/siteContent';
import ResearchClient from '@/src/components/ResearchClient';

export const metadata = {
  title: 'Research and Analysis | IERF',
  description: 'Read IERF\'s latest research papers, policy commentaries, perspectives, and strategic analysis on India-Eurasia relations, Central Asian geopolitics, and trans-regional connectivity.',
};

export default function Publications() {
  const pubs = defaultContent?.publications || [];
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 overflow-x-hidden">
      <SubHero 
        title="Research & Analysis" 
        subtitle="Insights and analysis from our network on the shifting dynamics of Eurasia."
        breadcrumb={[{ label: 'Research' }]}
      />
      <React.Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] pb-24" />}>
        <ResearchClient pubs={pubs} />
      </React.Suspense>
    </div>
  );
}
