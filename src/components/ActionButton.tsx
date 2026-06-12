"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ActionButtonProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export default function ActionButton({ label, href, icon = <ArrowRight size={18} className="text-[#0A192F]" /> }: ActionButtonProps) {
  return (
    <Link href={href} className="group inline-flex items-center bg-white rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-all duration-300 shadow-md">
      <span className="font-medium text-[#0A192F] mr-4">{label}</span>
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#E87722] transition-colors duration-300">
        <div className="group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
    </Link>
  );
}
