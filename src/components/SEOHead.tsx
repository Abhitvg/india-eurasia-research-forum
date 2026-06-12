"use client";

import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
  keywords?: string;
  articleData?: {
    publishedTime: string;
    author: string;
    section: string;
  };
}

const BASE_URL = 'https://indiaeurasia.org';
const DEFAULT_IMAGE = `${BASE_URL}/ierf_normal.png`;
const SITE_NAME = 'India Eurasia Research Forum (IERF)';

export default function SEOHead({ title, description, path, type = 'website', image, keywords, articleData }: SEOHeadProps) {
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
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    } else {
      setMeta('name', 'keywords', 'India Eurasia, IERF, Geopolitics, Central Asia, Connectivity, Research Forum, Volga to Ganga, India Russia Relations, Eurasian Studies, International Relations, South Asia, Foreign Policy, Strategic Studies');
    }

    // GEO Tags for local/geographic search relevance
    setMeta('name', 'geo.region', 'IN-DL');
    setMeta('name', 'geo.placename', 'New Delhi');
    setMeta('name', 'geo.position', '28.6139;77.2090');
    setMeta('name', 'ICBM', '28.6139, 77.2090');

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

    // Dynamic JSON-LD Breadcrumb List for search engines
    const pathSegments = path.split('/').filter(Boolean);
    const breadcrumbList = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      }
    ];

    let cumulativePath = BASE_URL;
    pathSegments.forEach((segment, index) => {
      cumulativePath += `/${segment}`;
      // Make it readable (e.g. "write-for-us" -> "Write For Us")
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbList.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": cumulativePath
      });
    });

    let breadcrumbLdJson = document.querySelector('script[id="breadcrumb-ld-json"]') as HTMLScriptElement | null;
    if (!breadcrumbLdJson) {
      breadcrumbLdJson = document.createElement('script');
      breadcrumbLdJson.setAttribute('type', 'application/ld+json');
      breadcrumbLdJson.setAttribute('id', 'breadcrumb-ld-json');
      document.head.appendChild(breadcrumbLdJson);
    }
    breadcrumbLdJson.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbList
    });

    // Article Specific Meta & JSON-LD Schema
    if (type === 'article' && articleData) {
      setMeta('property', 'article:published_time', articleData.publishedTime);
      setMeta('property', 'article:author', articleData.author);
      setMeta('property', 'article:section', articleData.section);

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
        "headline": title,
        "image": [ogImage],
        "datePublished": articleData.publishedTime,
        "author": [{
            "@type": "Person",
            "name": articleData.author
        }],
        "publisher": {
          "@type": "ResearchOrganization",
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

  }, [fullTitle, title, description, keywords, canonicalUrl, type, ogImage, articleData, path]);

  return null;
}

