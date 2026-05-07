"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden perspective-[1000px]">
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 relative w-full flex justify-center"
        >
          {/* Mock Abstract Chrome Spikey Logo */}
          <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto animate-float">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <path 
                d="M100 20 C120 50, 180 30, 150 80 C190 90, 160 120, 180 160 C130 140, 120 180, 100 150 C80 180, 70 140, 20 160 C40 120, 10 90, 50 80 C20 30, 80 50, 100 20 Z" 
                fill="none" 
                stroke="#fff" 
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 10px rgba(0,255,255,0.5))" }}
              />
              <path 
                d="M100 40 C110 60, 150 50, 130 80 C160 90, 140 110, 150 140 C120 120, 110 150, 100 130 C90 150, 80 120, 50 140 C60 110, 40 90, 70 80 C50 50, 90 60, 100 40 Z" 
                fill="none" 
                stroke="#aaa" 
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-6 leading-tight uppercase"
        >
          LifeOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500">System</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-400 mb-10 max-w-2xl font-mono uppercase tracking-widest text-sm"
        >
          [ INITIALIZING CORE... ] UNIFIED WORKSPACE DEPLOYED.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/portfolio" className="glow-border px-8 py-4 bg-white text-black font-bold text-lg flex items-center gap-2 hover:bg-gray-200 transition-colors rounded-xl uppercase tracking-wider">
            View Projects <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/login" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg flex items-center gap-2 hover:bg-white/10 transition-colors rounded-xl uppercase tracking-wider">
            Login
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
