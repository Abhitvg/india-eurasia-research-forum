import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import '../src/index.css';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import { ContentProvider } from '../src/context/ContentContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
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
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans text-slate-900 bg-[#FAFAFA] min-h-screen flex flex-col antialiased selection:bg-[#E87722] selection:text-white">
        <ContentProvider>
          <Header />
          <main className="flex-grow flex flex-col relative min-h-[60vh] mt-20">
            {children}
          </main>
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}
