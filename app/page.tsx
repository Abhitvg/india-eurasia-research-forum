"use client";

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/src/context/ContentContext';
import ScrollReveal from '@/src/components/ScrollReveal';
import ActionButton from '@/src/components/ActionButton';
import GlassStatCard from '@/src/components/GlassStatCard';
import { ArrowRight, BookOpen, Globe, Users, Target, MoveRight, Layers, BarChart, Shield, Activity } from 'lucide-react';

export default function Home() {
  const { content } = useContent();
  const c = content?.home || ({} as any);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F4F5] pb-24">
      {/* ── 1. HERO SECTION ── */}
      <section className="px-4 pt-4">
        <div className="relative h-[92vh] min-h-[700px] rounded-[2.5rem] bg-[#0A192F] overflow-hidden flex items-center grain-overlay">
          {/* Background Image & Gradient */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
            style={{ backgroundImage: 'url("/images/hero1_new_opt.webp")' }}
          />
          <div className="absolute inset-0 gradient-overlay" />
          
          {/* Massive Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
            <h1 className="text-[22vw] font-black text-white opacity-5 blur-sm select-none leading-none tracking-tighter">
              EURASIA
            </h1>
          </div>

          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Typography Block */}
            <div className="lg:col-span-8 animate-fade-in-up">
              <div className="inline-flex items-center px-3 py-1 rounded-full glass-panel border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-6">
                Strategic Research Platform
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Mapping <span className="text-[#E87722]">Eurasia</span>.<br />
                Connecting Worlds.
              </h1>
              <p className="text-xl text-white/60 font-light max-w-2xl mb-10 leading-relaxed">
                {c.heroSubtitle || "A sophisticated platform for trans-regional analysis and geopolitical foresight."}
              </p>
              <div className="flex flex-wrap gap-4">
                <ActionButton label={c.heroButton2 || "Explore Research"} href="/research" />
                <Link href="/about" className="inline-flex items-center px-8 py-4 rounded-full text-white font-medium border border-white/20 hover:bg-white/10 transition-colors">
                  {c.heroButton1 || "Our Vision"}
                </Link>
              </div>
            </div>

            {/* Right Vertical Glass Stack */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-end space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <GlassStatCard metric="25+" label="Research Domains" />
              <GlassStatCard metric="10k+" label="Global Readers" />
              <GlassStatCard metric="50+" label="Policy Papers" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURE GRID (Core Mission) ── */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <h2 className="text-[#E87722] label-text mb-4">Core Focus</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6">Strategic Intelligence & Research.</h3>
            <p className="text-lg text-zinc-500 mb-12">
              {c.visionBody || "Bridging the gap between scholarly rigour and regional strategic insights."}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {[
                { icon: <BookOpen className="text-[#0A192F]" size={24} />, title: "Publications" },
                { icon: <Globe className="text-[#0A192F]" size={24} />, title: "Geopolitics" },
                { icon: <Users className="text-[#0A192F]" size={24} />, title: "Dialogues" },
                { icon: <Target className="text-[#0A192F]" size={24} />, title: "Strategy" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-3 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-zinc-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-zinc-900">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Display Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-2xl group border border-zinc-100">
              <div 
                className="w-full h-[600px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("/images/publications/StockImage_SpecialResearchNote.jpeg")' }}
              />
              
              {/* Internal Floating Glass Component */}
              <div className="absolute bottom-8 right-8 glass-panel rounded-2xl p-6 w-72 shadow-2xl backdrop-blur-xl bg-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#E87722] flex items-center justify-center">
                    <Activity size={16} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-sm">Research Output</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-white/80 mb-1">
                      <span>Geopolitics</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E87722] w-[85%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-white/80 mb-1">
                      <span>Economics</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[60%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DARK PRODUCTIVITY BLOCK (Volga to Ganga) ── */}
      <section className="bg-[#071120] grain-overlay relative overflow-hidden py-32 rounded-[2.5rem] mx-4 border border-white/5 shadow-2xl">
        {/* Grayscale Grid Lineart Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M0 0h40v40H0V0zm1 1h38v38H1V1z\\' fill=\\'%23ffffff\\' fill-opacity=\\'0.02\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left List */}
            <div>
              <div className="inline-flex px-3 py-1 bg-[#E87722]/10 border border-[#E87722]/20 rounded-full text-[#E87722] label-text mb-8">
                Flagship Dialogue
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {c.volgaTeaserHeading || "Volga to Ganga"}
              </h2>
              <p className="text-lg text-white/60 mb-12 max-w-lg">
                {c.volgaTeaserBody || "Explore our premier interactive dialogue connecting two great civilizational regions."}
              </p>

              <div className="space-y-6">
                {[
                  { num: "01", title: "Strategic Forums", desc: "High-level bilateral discussions and policy roundtables." },
                  { num: "02", title: "Cultural Connectivity", desc: "Tracing historical ties and modern cultural exchanges." },
                  { num: "03", title: "Economic Synergies", desc: "Mapping trade routes, connectivity, and investments." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-[#E87722] font-display font-bold text-xl">{step.num}</span>
                    <div>
                      <h4 className="text-white font-bold mb-1">{step.title}</h4>
                      <p className="text-white/50 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 3D Mockup Window */}
            <div className="relative perspective-1000 hidden md:block">
              <div className="transform rotate-y-[-5deg] rotate-x-[5deg] bg-gradient-to-br from-[#1E293B] to-[#0A192F] rounded-2xl border border-white/10 p-2 shadow-2xl">
                <div className="bg-[#0F172A] rounded-xl overflow-hidden border border-white/5 h-[500px] relative flex flex-col">
                   {/* Window Controls */}
                   <div className="h-8 bg-[#1E293B] flex items-center px-4 gap-2 border-b border-white/5">
                     <div className="w-3 h-3 rounded-full bg-red-500/80" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                     <div className="w-3 h-3 rounded-full bg-green-500/80" />
                   </div>
                   
                   {/* Internal Content (Code Snippet visual) */}
                   <div className="p-8 font-mono text-sm text-white/70 space-y-4">
                     <p><span className="text-blue-400">import</span> {'{'} Dialogue {'}'} <span className="text-blue-400">from</span> '@ierf/volga-ganga';</p>
                     <p><span className="text-blue-400">const</span> summit = <span className="text-[#E87722]">new</span> Dialogue({'{'}</p>
                     <p className="pl-4">regions: ['India', 'Eurasia'],</p>
                     <p className="pl-4">focus: 'Strategic Connectivity',</p>
                     <p className="pl-4">participants: 500+</p>
                     <p>{'}'});</p>
                     <br />
                     <p>await summit.initiate();</p>
                     <p className="text-green-400 animate-pulse">// Connection established successfully.</p>
                   </div>
                </div>

                {/* Bouncing Status Tag */}
                <div className="absolute -bottom-6 -right-6 glass-panel bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl flex items-center gap-2 animate-bounce-subtle">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white font-bold text-sm">Dialogue Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. BENTO GRID (Research Pillars) ── */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-32">
        <div className="text-center mb-16">
          <h2 className="text-[#E87722] label-text mb-4">Research Domains</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#0A192F]">Core Disciplines</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Geopolitics & Security", img: "/images/hero3_new_opt.webp", desc: "In-depth analysis of regional security architectures, alliances, and geopolitical shifts." },
            { title: "Economic Connectivity", img: "/images/hero2_new_opt.webp", desc: "Mapping trade corridors, energy frameworks, and infrastructure investments." },
            { title: "Civilizational Ties", img: "/images/publications/StockImage_IssueBrief.png", desc: "Exploring shared heritage, cultural exchanges, and historical linkages." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
              {/* Top Half Image */}
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h4 className="absolute bottom-4 left-6 text-white font-bold text-xl">{item.title}</h4>
              </div>
              
              {/* Bottom Half Content */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-zinc-500 mb-8 flex-grow">{item.desc}</p>
                <Link href="/research" className="w-full bg-[#0A192F] text-white text-center py-3 rounded-full font-semibold hover:bg-[#E87722] transition-colors">
                  View Publications
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="text-center pb-20">
         <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6">
               Inspiring <span className="text-[#E87722]">Dialogue.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
               <ActionButton label="Join the Dialogue" href="/contact" />
            </div>
         </ScrollReveal>
      </section>
    </div>
  );
}
