import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
}

const BASE_URL = 'https://indiaeurasia.org';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.webp`;
const SITE_NAME = 'India Eurasia Research Forum (IERF)';

export default function SEOHead({ title, description, path, type = 'website', image }: SEOHeadProps) {
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta
    setMeta('name', 'description', description);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'en_US');

    // Twitter
    setMeta('property', 'twitter:card', 'summary_large_image');
    setMeta('property', 'twitter:title', fullTitle);
    setMeta('property', 'twitter:description', description);
    setMeta('property', 'twitter:url', canonicalUrl);
    setMeta('property', 'twitter:image', ogImage);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

  }, [fullTitle, description, canonicalUrl, type, ogImage]);

  return null;
}
