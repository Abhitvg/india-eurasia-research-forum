import PublicationDetailClient from '@/src/components/PublicationDetailClient';
import { publications } from '@/src/data/publications';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const publication = publications.find(p => p.id === resolvedParams.id);
  
  if (!publication) {
    return {
      title: 'Publication Not Found | IERF',
    };
  }

  return {
    title: `${publication.title} | IERF Research`,
    description: publication.description,
    openGraph: {
      title: publication.title,
      description: publication.description,
      images: [
        {
          url: publication.image,
          width: 1200,
          height: 630,
          alt: publication.title,
        },
      ],
      type: 'article',
      publishedTime: new Date(publication.date).toISOString(),
      authors: [publication.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: publication.title,
      description: publication.description,
      images: [publication.image],
    },
  };
}

export async function generateStaticParams() {
  return publications.map((pub) => ({
    id: pub.id,
  }));
}

export default async function PublicationDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const publication = publications.find(p => p.id === resolvedParams.id);

  if (!publication) {
    return <PublicationDetailClient />;
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: publication.title,
    image: [
      publication.image || 'https://www.indiaeurasia.org/og-image.webp'
    ],
    datePublished: new Date(publication.date).toISOString(),
    dateModified: new Date(publication.date).toISOString(),
    author: [{
      '@type': 'Person',
      name: publication.author,
      url: 'https://www.indiaeurasia.org/our-people'
    }],
    publisher: {
      '@type': 'Organization',
      name: 'India Eurasia Research Forum',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.indiaeurasia.org/ierf-logo.svg'
      }
    },
    description: publication.description
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PublicationDetailClient />
    </>
  );
}
