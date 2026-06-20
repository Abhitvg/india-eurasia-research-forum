import { Suspense } from 'react';
import PublicationsClient from '@/src/components/PublicationsClient';

export const metadata = {
  title: 'Research & Analysis | IERF',
  description: 'Explore in-depth publications, strategic briefs, and geopolitical analysis on India-Eurasia relations.',
};

export default function Research() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-20"><div className="w-8 h-8 border-4 border-[#1B3B5F] border-t-transparent rounded-full animate-spin"></div></div>}>
      <PublicationsClient />
    </Suspense>
  );
}
