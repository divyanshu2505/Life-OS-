"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LayoutDashboard, Smartphone, Monitor, Database, Youtube, Wallet, Map, Bot } from 'lucide-react';

export default function ProblemSolution() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const chaosOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const chaosScale = useTransform(scrollYProgress, [0.1, 0.3], [1, 0.8]);
  const solutionOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const solutionScale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);

  const chaosIcons = [
    { Icon: Youtube, color: "text-red-500", x: "-30%", y: "-40%" },
    { Icon: Wallet, color: "text-green-500", x: "30%", y: "-20%" },
    { Icon: Map, color: "text-yellow-500", x: "-20%", y: "40%" },
    { Icon: Bot, color: "text-blue-500", x: "40%", y: "30%" },
  ];

  return (
    <section ref={containerRef} className="py-32 relative min-h-[150vh]">
      <div className="sticky top-1/2 -translate-y-1/2 max-w-7xl mx-auto px-6 h-[80vh] flex flex-col items-center justify-center">
        
        {/* Chaos Phase */}
        <motion.div 
          style={{ opacity: chaosOpacity, scale: chaosScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The Chaos of Multiple Apps</h2>
          <p className="text-xl text-gray-400 max-w-2xl mb-12">Too many tabs. Constant context switching. Time wasted jumping between disconnected tools.</p>
          
          <div className="relative w-full max-w-2xl h-64 mx-auto">
            {chaosIcons.map((item, i) => (
              <motion.div
                key={i}
                animate={{ 
                  x: ["-5%", "5%", "-5%"], 
                  y: ["-5%", "5%", "-5%"],
                  rotate: [-10, 10, -10]
                }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
                className={`absolute left-1/2 top-1/2 glass-panel p-6 rounded-2xl ${item.color}`}
                style={{ marginLeft: item.x, mt: item.y }}
              >
                <item.Icon className="w-12 h-12" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solution Phase */}
        <motion.div 
          style={{ opacity: solutionOpacity, scale: solutionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
        >
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-blue">
            The One System You Need
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mb-12">LifeOS AI unifies your workflow into one seamless, intelligent dashboard.</p>
          
          <div className="relative w-full max-w-4xl perspective-[1200px]">
            <motion.div 
              initial={{ rotateX: 45, rotateZ: -10, y: 50 }}
              whileInView={{ rotateX: 10, rotateZ: 0, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="glass-panel border border-white/10 rounded-2xl p-4 shadow-neon overflow-hidden"
            >
              <div className="w-full h-[400px] rounded-xl bg-[#0a0a12] border border-white/5 flex flex-col overflow-hidden relative">
                {/* LifeOS Top Nav */}
                <div className="bg-[#0d0d18] px-4 py-2.5 flex items-center gap-4 text-white text-sm border-b border-white/5">
                  <div className="font-bold text-lg tracking-tight flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-[10px]">⚡</span>
                    <span>LifeOS<span className="text-purple-400"> AI</span></span>
                  </div>
                  <div className="flex-1 flex rounded-lg overflow-hidden h-7 bg-white/5 border border-white/10 ml-4">
                    <input type="text" className="flex-1 px-3 bg-transparent text-white/60 outline-none text-xs" placeholder="Search modules..." readOnly />
                    <div className="px-2 flex items-center text-white/30 text-xs">⌘K</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-[10px]">● Online</span>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">D</div>
                  </div>
                </div>
                {/* Dashboard Content */}
                <div className="flex-1 p-3 relative overflow-hidden flex flex-col gap-3">
                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: '🤖', val: '24', label: 'AI Chats', change: '+12%', color: 'from-purple-500/20 to-purple-500/5' },
                      { icon: '💰', val: '$340', label: 'Earnings', change: '+8 new', color: 'from-green-500/20 to-green-500/5' },
                      { icon: '🎥', val: '7', label: 'Videos', change: '3hrs saved', color: 'from-cyan-500/20 to-cyan-500/5' },
                      { icon: '📚', val: '3', label: 'Books', change: '+2 this wk', color: 'from-pink-500/20 to-pink-500/5' },
                    ].map((s, i) => (
                      <div key={i} className={`bg-gradient-to-br ${s.color} rounded-lg p-2 border border-white/5`}>
                        <div className="text-sm mb-0.5">{s.icon}</div>
                        <div className="text-white font-bold text-sm">{s.val}</div>
                        <div className="text-white/40 text-[9px]">{s.label}</div>
                        <div className="text-green-400 text-[8px] mt-0.5">↑ {s.change}</div>
                      </div>
                    ))}
                  </div>
                  {/* Module Cards */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {['💬 Ask AI', '💡 Earn', '⚡ Video', '📖 Book', '🗺️ Navigate', '🚀 Jobs'].map((m, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-2 text-center border border-white/5 hover:border-purple-500/30 transition-colors cursor-pointer">
                        <div className="text-xs">{m.split(' ')[0]}</div>
                        <div className="text-[9px] text-white/50 mt-0.5">{m.split(' ').slice(1).join(' ')}</div>
                      </div>
                    ))}
                  </div>
                  {/* Activity & Progress */}
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="bg-white/[0.03] rounded-lg p-2 border border-white/5">
                      <div className="text-[10px] text-white/60 font-semibold mb-1.5">📊 Weekly Progress</div>
                      {['AI Chat', 'Earning', 'Videos', 'Books'].map((l, i) => (
                        <div key={i} className="mb-1">
                          <div className="flex justify-between text-[8px] text-white/40 mb-0.5"><span>{l}</span><span>{[75,45,60,30][i]}%</span></div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" style={{ width: `${[75,45,60,30][i]}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-2 border border-white/5">
                      <div className="text-[10px] text-white/60 font-semibold mb-1.5">🕐 Recent Activity</div>
                      {[
                        { icon: '🤖', text: 'AI Chat — Freelancing tips', time: '2m ago' },
                        { icon: '💰', text: 'Earned: Content Writing', time: '1h ago' },
                        { icon: '🎥', text: 'Summarized: React crash course', time: '3h ago' },
                      ].map((a, i) => (
                        <div key={i} className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-xs">{a.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[9px] text-white/70 truncate">{a.text}</div>
                            <div className="text-[7px] text-white/30">{a.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
