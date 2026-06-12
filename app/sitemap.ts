import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://indiaeurasia.org';
  
  // You can dynamically fetch publications from Firebase if you want,
  // but for a static sitemap, we define the main routes.
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

  return sitemapRoutes;
}
