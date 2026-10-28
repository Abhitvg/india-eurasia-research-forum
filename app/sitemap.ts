import { MetadataRoute } from 'next';
import { defaultContent } from '@/src/data/siteContent';

function parseSafeDate(dateStr?: string): Date {
  if (!dateStr) return new Date();
  const cleanStr = dateStr.replace(/(\d+)(st|nd|rd|th)/gi, '$1');
  const d = new Date(cleanStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.indiaeurasia.org';
  
  const routes = [
    '',
    '/about',
    '/research',
    '/digieurasia',
    '/events/volga-to-ganga',
    '/events/ierf-talks',
    '/our-people',
    '/write-for-us',
    '/contact'
  ];

  const sitemapRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const publicationRoutes: MetadataRoute.Sitemap = defaultContent.publications.map((pub) => ({
    url: `${baseUrl}/research/${pub.id}`,
    lastModified: parseSafeDate(pub.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...sitemapRoutes, ...publicationRoutes];
}
