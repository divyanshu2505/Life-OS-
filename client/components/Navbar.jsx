"use client";
import React from 'react';
import { motion } from 'framer-motion';

import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="mx-auto max-w-7xl glass-panel rounded-2xl px-6 py-3 flex items-center justify-between glow-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-neon-blue animate-pulse-slow"></div>
          <span className="font-display font-bold text-xl tracking-wide text-white">LifeOS<span className="text-neon-blue">.ai</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#solution" className="hover:text-white transition-colors">Platform</a>
          <Link href="/job-portal" className="hover:text-white transition-colors text-cyan-400">Jobs</Link>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-white hover:text-neon-pink transition-colors">
            Log in
          </Link>
          <Link href="/login" className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
