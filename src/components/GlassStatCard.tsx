"use client";

import React from 'react';

interface GlassStatCardProps {
  metric: string;
  label: string;
}

export default function GlassStatCard({ metric, label }: GlassStatCardProps) {
  return (
    <div className="glass-panel rounded-xl p-5 w-48 text-left transition-transform duration-300 hover:scale-105">
      <div className="text-3xl font-bold text-white mb-1 tracking-tight">{metric}</div>
      <div className="text-sm text-white/60 font-medium">{label}</div>
    </div>
  );
}
