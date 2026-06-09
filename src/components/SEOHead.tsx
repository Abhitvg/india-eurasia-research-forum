import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
  articleData?: {
    publishedTime: string;
    author: string;
    section: string;
  };
}

const BASE_URL = 'https://indiaeurasia.org';
const DEFAULT_IMAGE = `${BASE_URL}/ierf_normal.png`;
const SITE_NAME = 'India Eurasia Research Forum (IERF)';

export default function SEOHead({ title, description, path, type = 'website', image, articleData }: SEOHeadProps) {
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

    // Article Specific Meta
    if (type === 'article' && articleData) {
      setMeta('property', 'article:published_time', articleData.publishedTime);
      setMeta('property', 'article:author', articleData.author);
      setMeta('property', 'article:section', articleData.section);

      // JSON-LD Structured Data for Articles
      let ldJson = document.querySelector('script[id="article-ld-json"]') as HTMLScriptElement | null;
      if (!ldJson) {
        ldJson = document.createElement('script');
        ldJson.setAttribute('type', 'application/ld+json');
        ldJson.setAttribute('id', 'article-ld-json');
        document.head.appendChild(ldJson);
      }
      ldJson.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": fullTitle,
        "image": [ogImage],
        "datePublished": articleData.publishedTime,
        "author": [{
            "@type": "Person",
            "name": articleData.author
        }],
        "publisher": {
          "@type": "Organization",
          "name": SITE_NAME,
          "logo": {
            "@type": "ImageObject",
            "url": DEFAULT_IMAGE
          }
        },
        "description": description
      });
    } else {
      const ldJson = document.querySelector('script[id="article-ld-json"]');
      if (ldJson) ldJson.remove();
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

  }, [fullTitle, description, canonicalUrl, type, ogImage, articleData]);

  return null;
}
