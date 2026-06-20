import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import '../src/index.css';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import MainWrapper from '../src/components/MainWrapper';
import { ContentProvider } from '../src/context/ContentContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1B3B5F',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.indiaeurasia.org'),
  alternates: {
    canonical: '/',
  },
  title: 'India Eurasia Research Forum (IERF) | Connecting India and Eurasia',
  description: 'India Eurasia Research Forum (IERF) is a premier academic platform promoting research, dialogue, and trans-regional connectivity between India and the Eurasian region.',
  keywords: ['India Eurasia', 'IERF', 'Geopolitics', 'Central Asia', 'Connectivity', 'Research Forum', 'Volga to Ganga', 'India Russia Relations', 'Eurasian Studies'],
  openGraph: {
    title: 'India Eurasia Research Forum (IERF)',
    description: 'Connecting India and Eurasia through research, dialogue, and collaborative engagement.',
    url: 'https://indiaeurasia.org',
    siteName: 'India Eurasia Research Forum (IERF)',
    images: [
      {
        url: 'https://indiaeurasia.org/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'India Eurasia Research Forum logo and branding',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Eurasia Research Forum (IERF)',
    description: 'Connecting India and Eurasia through research, dialogue, and collaborative engagement.',
    images: ['https://indiaeurasia.org/og-image.webp'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'India Eurasia Research Forum',
    alternateName: 'IERF',
    url: 'https://www.indiaeurasia.org',
    logo: 'https://www.indiaeurasia.org/ierf-logo.svg',
    sameAs: [
      'https://x.com/IndiaEurasia',
      'https://linkedin.com/company/india-eurasia-research-forum'
    ]
  };

  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="font-sans text-slate-900 bg-[#FAFAFA] min-h-screen flex flex-col antialiased selection:bg-[#E87722] selection:text-white overflow-x-hidden">
        <ContentProvider>
          <Header />
          <MainWrapper>
            {children}
          </MainWrapper>
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}
