import type { Metadata } from 'next';
import { Inter, Playfair_Display, Outfit } from 'next/font/google';
import '../src/index.css';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import { ContentProvider } from '../src/context/ContentContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
      <body className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
        <ContentProvider>
          <Header />
          <main className="flex-grow flex flex-col relative text-gray-900 bg-white min-h-[60vh]">
            <div className="absolute top-0 left-0 w-full h-[500px] z-40 pointer-events-none bg-gradient-to-b from-white from-[96px] via-white/40 via-[250px] to-white/0"></div>
            {children}
          </main>
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}
