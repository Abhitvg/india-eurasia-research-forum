import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ContentProvider, useContent } from './context/ContentContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AutoUpdateCheck from './components/AutoUpdateCheck';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

// Lazy load secondary pages
const WriteForUs = lazy(() => import('./pages/WriteForUs'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));
const VolgaToGanga = lazy(() => import('./pages/VolgaToGanga'));
const Events = lazy(() => import('./pages/Events'));
const Publications = lazy(() => import('./pages/Publications'));
const PublicationDetail = lazy(() => import('./pages/PublicationDetail'));
const IERFTalks = lazy(() => import('./pages/IERFTalks'));
const DigiEurasia = lazy(() => import('./pages/DigiEurasia'));
const Admin = lazy(() => import('./pages/Admin'));

function PageLoader() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[60vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 border-4 border-[#E87722]/20 border-t-[#E87722] rounded-full"
      />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            type: "spring",
            stiffness: 80,
            damping: 18,
            mass: 0.8,
          }}
          className="flex-grow flex flex-col relative"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/write-for-us" element={<WriteForUs />} />
            <Route path="/our-people" element={<Team />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/volga-to-ganga" element={<VolgaToGanga />} />
            <Route path="/events/ierf-talks" element={<IERFTalks />} />
            <Route path="/research" element={<Publications />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/publications/:id" element={<PublicationDetail />} />
            <Route path="/digieurasia" element={<DigiEurasia />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}

function AppLayout() {
  const { loading } = useContent();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/admin';
  const isHome = location.pathname === '/';
  
  if (loading) {
    return <PageLoader />;
  }
  
  if (isAdmin) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Admin />
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow flex flex-col relative text-gray-900 bg-white min-h-[60vh]">
        {!isHome && (
          <div className="absolute top-0 left-0 w-full h-[500px] z-40 pointer-events-none bg-gradient-to-b from-white from-[96px] via-white/40 via-[250px] to-white/0"></div>
        )}
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
        <AutoUpdateCheck />
      </Router>
    </ContentProvider>
  );
}

