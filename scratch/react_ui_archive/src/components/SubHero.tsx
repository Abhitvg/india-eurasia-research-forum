import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface SubHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function SubHero({ title, subtitle, breadcrumb }: SubHeroProps) {
  return (
    <section className="relative pt-64 pb-24 bg-[#1B3B5F] overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/yk_opt.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B3B5F]/80 via-[#1B3B5F] to-[#1B3B5F]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E87722] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 mb-8"
          >
            <Link to="/" className="text-gray-400 hover:text-[#E87722] text-xs font-bold transition-colors uppercase tracking-widest">Home</Link>
            {breadcrumb.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <ChevronRight size={12} className="text-gray-600" />
                {item.href ? (
                  <Link to={item.href} className="text-gray-400 hover:text-[#E87722] text-xs font-bold transition-colors uppercase tracking-widest">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#E87722] text-xs font-bold uppercase tracking-widest">{item.label}</span>
                )}
              </div>
            ))}
          </motion.nav>
        )}

        {/* Title & Subtitle */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6 }}
        >
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: '-0.01em' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-normal leading-relaxed" style={{ fontFamily: '"Outfit", sans-serif' }}>
              {subtitle}
            </p>
          )}
        </motion.div>
        
        {/* Decorative Divider */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1.5 bg-[#E87722] mx-auto mt-10 rounded-full shadow-[0_0_15px_rgba(232,119,34,0.5)]"
        ></motion.div>
      </div>
    </section>
  );
}
