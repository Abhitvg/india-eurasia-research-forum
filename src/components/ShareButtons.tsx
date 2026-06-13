"use client";

import { Share2, Printer, Download } from 'lucide-react';

export default function ShareButtons({ title }: { title: string }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-end gap-3 mb-12 pb-8 border-b border-gray-100">
      <button 
        onClick={handleShare}
        className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#0A192F] hover:text-white transition-all shadow-sm" title="Share Article"
      >
        <Share2 size={18} />
      </button>
      <button onClick={handlePrint} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#0A192F] hover:text-white transition-all shadow-sm" title="Print">
        <Printer size={18} />
      </button>
      <button onClick={handlePrint} className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#E87722] text-white hover:bg-orange-600 transition-colors shadow-lg shadow-[#E87722]/30 font-bold text-sm tracking-wide">
        <Download size={18} /> <span>Save PDF</span>
      </button>
    </div>
  );
}
