import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

// 🔥 QUICK SPEED BOOST: Lazy Loading components below the fold
const ProblemSolution = dynamic(() => import('../components/ProblemSolution'));
const Features = dynamic(() => import('../components/Sections').then((mod) => mod.Features));
const UserFlow = dynamic(() => import('../components/Sections').then((mod) => mod.UserFlow));
const TechStack = dynamic(() => import('../components/Sections').then((mod) => mod.TechStack));
const Pricing = dynamic(() => import('../components/Sections').then((mod) => mod.Pricing));
const FutureVision = dynamic(() => import('../components/Sections').then((mod) => mod.FutureVision));
const CTA = dynamic(() => import('../components/Sections').then((mod) => mod.CTA));

export default function Home() {
  return (
    <main className="relative bg-[#050505] text-white min-h-screen overflow-hidden font-sans">
      {/* KVS Style CRT & Orange Border overlays */}
      <div className="fuzzy-blue-border"></div>
      <div className="crt-overlay"></div>

      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProblemSolution />
        <Features />
        <UserFlow />
        <TechStack />
        <Pricing />
        <FutureVision />
        <CTA />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 text-center text-gray-500">
        <p>© {new Date().getFullYear()} LifeOS AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
