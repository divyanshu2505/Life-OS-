"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const PROJECTS = [
  {
    date: "Apr 2025",
    name: "AI Chat Assistant",
    role: "Full Stack Developer",
    desc: "Built a real-time ChatGPT-style conversational AI interface with message history, typing indicators, and context-aware responses powered by Ollama.",
    stack: ["Next.js", "Ollama", "FastAPI", "WebSockets"],
    href: "/chat",
  },
  {
    date: "Mar 2025",
    name: "AI Revenue Generator",
    role: "Python Developer",
    desc: "Developed an intelligent freelancing hub that curates and ranks the top income platforms for developers. Aggregated 100+ freelancing sites with smart filtering.",
    stack: ["Python", "BeautifulSoup", "Next.js", "FastAPI"],
    href: "/revenue",
  },
  {
    date: "Feb 2025",
    name: "Video Summarizer",
    role: "AI Developer",
    desc: "Engineered a YouTube video summarizer that takes 50-minute videos and extracts the top 5 key insights using AI. Built the full pipeline from URL to structured output.",
    stack: ["Python", "Whisper", "Ollama", "Next.js"],
    href: "/summarizer",
  },
  {
    date: "Jan 2025",
    name: "Book Generator",
    role: "AI Developer",
    desc: "Created an AI-powered book generation engine. Users provide a topic prompt and receive a complete, structured book available as a PDF or for online reading.",
    stack: ["Python", "LLM", "PDFKit", "Next.js"],
    href: "/book-generator",
  },
  {
    date: "Dec 2024",
    name: "Smart Navigation",
    role: "Frontend Developer",
    desc: "Built a Google Maps-style intelligent navigation interface with a real-time location sidebar, saved destinations, and traffic status overlays.",
    stack: ["Next.js", "OpenStreetMap", "Leaflet.js", "Tailwind CSS"],
    href: "/navigation",
  },
  {
    date: "Nov 2024",
    name: "Flight Tracking System",
    role: "Full Stack Developer",
    desc: "Developed a Flightradar24-inspired real-time flight radar with an embedded map, clickable flight markers, and a live sidebar featuring Jewar International Airport.",
    stack: ["Next.js", "OpenStreetMap", "Lucide Icons", "Tailwind CSS"],
    href: "/flight-tracking",
  },
  {
    date: "May 2025",
    name: "Where Is My Cargo",
    role: "Full Stack Developer",
    desc: "Built a cinematic, Steam-inspired cargo logistics tracking platform with real-time Indian freight rail mapping, AI-powered route optimization, and a premium dark dashboard UI.",
    stack: ["Next.js", "Leaflet.js", "GSAP", "Framer Motion", "Vercel"],
    href: "https://where-is-my-cargo.vercel.app",
    external: true,
  },
  {
    date: "May 2025",
    name: "AI Jobs Board",
    role: "Full Stack Developer",
    desc: "Built a curated AI-powered tech jobs board featuring openings from top Indian startups like Zerodha, Razorpay, CRED, Google India & more — with smart filtering by role, mode, and type.",
    stack: ["React", "GSAP", "Vite", "Framer Motion", "Vercel"],
    href: "https://where-is-my-cargo.vercel.app/jobs",
    external: true,
  },
  {
    date: "May 2025",
    name: "AI Gym & Fitness Workspace",
    role: "AI Developer",
    desc: "Designed an AI-powered fitness assistant with workout planning, calorie tracking, diet suggestions, and an interactive AI coach — featuring a cyberpunk-inspired neon UI with animated progress visuals.",
    stack: ["Next.js", "Python", "Ollama", "Chart.js", "Framer Motion"],
    href: "#",
  },
];

const CAPABILITIES = [
  { id: "01", title: "Backend Architecture", desc: "Scalable APIs with FastAPI, Django, Flask. Built for performance and maintainability." },
  { id: "02", title: "AI & ML Integration", desc: "Integrating local LLMs (Ollama), OpenAI, and custom ML models into production systems." },
  { id: "03", title: "Automation & Scripting", desc: "Python-first automation: from CLI tools to web scrapers to scheduled data pipelines." },
  { id: "04", title: "Full Stack Development", desc: "End-to-end apps with React / Next.js frontend and Python-powered backends." },
  { id: "05", title: "Data Processing", desc: "Pandas, NumPy, and custom ETL pipelines for clean, meaningful data outputs." },
];

function TypeWriter({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}<span className="animate-pulse">_</span></span>;
}

export default function Portfolio() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(v => !v); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#fafafa] font-mono selection:bg-cyan-400/20 selection:text-cyan-300">

      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-zinc-800/60 bg-black/90 backdrop-blur">
        <span className="text-zinc-500 text-xs tracking-widest">divyanshu.mishra</span>
        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <a href="#work" className="hover:text-cyan-400 transition-colors">Work</a>
          <a href="#capabilities" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          <a href="https://github.com/divyanshu2505" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
          <button onClick={() => setCmdOpen(true)} className="border border-zinc-700 px-3 py-1 rounded text-zinc-500 hover:border-cyan-500 hover:text-cyan-400 transition-all">Ctrl+K</button>
        </div>
      </nav>

      {/* Command Palette */}
      {cmdOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-start justify-center pt-32" onClick={() => setCmdOpen(false)}>
          <div className="w-full max-w-xl bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center px-4 py-3 border-b border-zinc-800">
              <span className="text-cyan-400 mr-2">➜</span>
              <input autoFocus placeholder="Type a command or search..." className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-600" />
            </div>
            <div className="p-2">
              {['#work', '#capabilities', '#contact'].map(s => (
                <a href={s} key={s} onClick={() => setCmdOpen(false)} className="block px-3 py-2 rounded text-zinc-400 hover:bg-zinc-800 hover:text-cyan-400 transition-colors text-sm">{s}</a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Integrity Badge */}
      <div className="fixed bottom-4 left-4 z-40 text-[10px] text-zinc-600 hidden md:block">
        integrity_check: <span className="text-green-500">passed</span>
      </div>

      {/* --- HERO --- */}
      <section className="pt-40 pb-24 px-6 max-w-4xl mx-auto">
        <div className="mb-2 text-xs text-zinc-600 tracking-widest">INIT_SYSTEM --mode=terminal</div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6 font-sans">
          <TypeWriter text="Life-OS" speed={80} />
        </h1>
        <div className="text-lg md:text-xl text-zinc-400 mb-4 font-sans">
          Python Developer <span className="text-zinc-700">·</span> AI Builder <span className="text-zinc-700">·</span> Full Stack Engineer
        </div>
        <p className="text-zinc-500 max-w-xl text-sm leading-relaxed">
          I build scalable AI-powered systems, automate workflows with Python, and ship full-stack applications that solve real problems.
        </p>
        <div className="mt-8 flex gap-4 text-xs">
          <a href="https://github.com/divyanshu2505" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline underline-offset-4">github.com/divyanshu2505</a>
          <span className="text-zinc-700">·</span>
          <a href="mailto:mishradivyanshu532@gmail.com" className="text-zinc-400 hover:text-cyan-400 transition-colors">mishradivyanshu532@gmail.com</a>
        </div>
      </section>

      {/* --- SELECTED WORK --- */}
      <section id="work" className="px-6 max-w-4xl mx-auto py-16 border-t border-zinc-900">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-cyan-400">➜</span>
          <span className="text-zinc-500 text-xs">SELECTED_WORK</span>
        </div>
        <div className="text-zinc-700 text-xs mb-10">--limit=9</div>

        <div className="space-y-10">
          {PROJECTS.map((p, i) => (
            <div key={i} className="group border-l-2 border-zinc-800 hover:border-cyan-500 pl-6 transition-colors duration-300">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                <h3 className="text-lg font-bold font-sans group-hover:text-cyan-400 transition-colors">{p.name}</h3>
                <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">{p.role}</span>
              </div>
              <p className="text-sm text-zinc-400 mb-3 max-w-2xl">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.stack.map(s => (
                  <span key={s} className="text-[10px] border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">{s}</span>
                ))}
              </div>
              <Link href={p.href} {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-[10px] text-zinc-600 hover:text-cyan-400 transition-colors underline underline-offset-2">
                {p.external ? 'open_platform' : 'view_project'} →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a href="https://github.com/divyanshu2505" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 hover:text-cyan-400 transition-colors underline underline-offset-4">
            view_all_work →
          </a>
        </div>
      </section>

      {/* --- FEATURED PROJECT --- */}
      <section className="px-6 max-w-4xl mx-auto py-16 border-t border-zinc-900">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-cyan-400">➜</span>
          <span className="text-zinc-500 text-xs">FEATURED_PRODUCT</span>
        </div>
        <div className="text-zinc-700 text-xs mb-10">--highlight=lifeos_ai</div>

        <div className="border border-zinc-800 rounded-lg p-6 hover:border-cyan-500/40 transition-colors">
          <div className="text-xs text-zinc-500 mb-2">Shipped Product</div>
          <h2 className="text-2xl font-bold font-sans mb-2">LifeOS AI</h2>
          <p className="text-zinc-400 text-sm max-w-xl mb-4">
            All-in-one AI Super App. Chat assistant, video summarizer, book generator, flight tracker and freelancing hub — all in one unified dashboard.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {["Next.js", "FastAPI", "Ollama", "PostgreSQL", "Framer Motion"].map(s => (
              <span key={s} className="text-[10px] border border-zinc-700 text-zinc-500 px-2 py-0.5 rounded">{s}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-green-400 border border-green-500/30 px-2 py-0.5 rounded">Live</span>
            <span className="text-zinc-700">|</span>
            <Link href="/" className="text-zinc-500 hover:text-cyan-400 transition-colors underline underline-offset-2">view_product</Link>
          </div>
        </div>
      </section>

      {/* --- CORE CAPABILITIES --- */}
      <section id="capabilities" className="px-6 max-w-4xl mx-auto py-16 border-t border-zinc-900">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-cyan-400">➜</span>
          <span className="text-zinc-500 text-xs">CORE_CAPABILITIES</span>
        </div>
        <div className="text-zinc-700 text-xs mb-10">--modules=5</div>

        <div className="grid md:grid-cols-2 gap-4">
          {CAPABILITIES.map(c => (
            <div key={c.id} className="group border border-zinc-900 rounded-lg p-5 hover:border-zinc-700 transition-colors">
              <div className="text-xs text-zinc-700 mb-2">[{c.id}]</div>
              <h3 className="text-sm font-bold font-sans mb-1 group-hover:text-cyan-400 transition-colors">{c.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="px-6 max-w-4xl mx-auto py-16 border-t border-zinc-900">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-cyan-400">➜</span>
          <span className="text-zinc-500 text-xs">INIT_CONTACT</span>
        </div>
        <div className="text-zinc-700 text-xs mb-10">--protocol=direct</div>

        <p className="text-zinc-400 text-sm max-w-xl mb-6">
          Open to collaborations, freelance Python projects, and full-time opportunities. If you have something interesting, reach out directly.
        </p>
        <a href="mailto:mishradivyanshu532@gmail.com" className="inline-block text-sm border border-zinc-700 px-5 py-2.5 rounded hover:border-cyan-500 hover:text-cyan-400 transition-all">
          mishradivyanshu532@gmail.com →
        </a>
        <div className="mt-8 flex gap-6 text-xs text-zinc-600">
          <a href="https://github.com/divyanshu2505" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
          <span>·</span>
          <a href="mailto:mishradivyanshu532@gmail.com" className="hover:text-cyan-400 transition-colors">Email</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-6 py-8 max-w-4xl mx-auto flex items-center justify-between text-[10px] text-zinc-700">
        <span>© {new Date().getFullYear()} Divyanshu Mishra</span>
        <span>integrity_check: <span className="text-green-500">passed</span></span>
      </footer>
    </div>
  );
}
