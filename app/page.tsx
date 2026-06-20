import React from 'react';
import HomeClient from '@/src/components/HomeClient';

export const metadata = {
  title: 'India Eurasia Research Forum | IERF',
  description: 'Advancing research, policy dialogue, and strategic analysis on India-Eurasia relations, regional connectivity, and geopolitical dynamics.',
};

export default function Home() {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'India Eurasia Research Forum',
    url: 'https://www.indiaeurasia.org/',
    description: 'Advancing research, policy dialogue, and strategic analysis on India-Eurasia relations.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
