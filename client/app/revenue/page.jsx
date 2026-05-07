"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import { ExternalLink } from 'lucide-react';

const sites = [
  { name: "Upwork", desc: "The world's largest freelancing platform. Best for large projects and experienced freelancers.", url: "https://www.upwork.com", category: "General" },
  { name: "Fiverr", desc: "Best for quick tasks and starting out. Offer services starting at $5 to global clients.", url: "https://www.fiverr.com", category: "General" },
  { name: "Toptal", desc: "Only the top 3% of freelancers get accepted. Best for senior developers and designers.", url: "https://www.toptal.com", category: "Premium" },
  { name: "Freelancer.com", desc: "Millions of employers and freelancers. Massive variety of global projects available.", url: "https://www.freelancer.com", category: "General" },
  { name: "Guru", desc: "Best for experienced professionals and agencies looking for long-term client relationships.", url: "https://www.guru.com", category: "Professional" },
  { name: "PeoplePerHour", desc: "UK-based platform popular in India. Great for getting European clients.", url: "https://www.peopleperhour.com", category: "General" },
  { name: "99designs", desc: "The go-to platform for graphic designers. Run design contests and get paid per project.", url: "https://99designs.com", category: "Design" },
  { name: "Designhill", desc: "India-friendly design platform with contests and direct client projects.", url: "https://www.designhill.com", category: "Design" },
  { name: "Truelancer", desc: "India-based freelancing platform. Great for beginners — lower competition than global sites.", url: "https://www.truelancer.com", category: "India" },
  { name: "Internshala", desc: "Best for students and freshers. Internships + freelance gigs across India.", url: "https://internshala.com", category: "India" },
  { name: "Flexjobs", desc: "Curated remote and flexible job listings. Every listing is verified — no spam.", url: "https://www.flexjobs.com", category: "Remote" },
  { name: "Contra", desc: "Commission-free freelancing for independent professionals. Modern and beautifully designed.", url: "https://contra.com", category: "Modern" },
  { name: "Workana", desc: "Popular across Asia. Good for developers, writers, and marketing professionals.", url: "https://www.workana.com", category: "General" },
  { name: "LinkedIn ProFinder", desc: "Leverage your LinkedIn network to find high-quality freelance and consulting work.", url: "https://www.linkedin.com/profinder", category: "Network" },
  { name: "GitHub Community", desc: "For developers — find open source bounties and paid open-source contribution work.", url: "https://github.com", category: "Developer" },
];

export default function RevenueGenerator() {
  const [active, setActive] = React.useState('All');
  const categories = [...new Set(sites.map(s => s.category))];
  const filtered = active === 'All' ? sites : sites.filter(s => s.category === active);

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-black font-sans pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-28 px-6">
        {/* Header */}
        <div className="mb-3 inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
          AI Revenue Generator
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a1a1a] leading-tight">
          100 Best Freelance Websites<br />in India (2025)
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">D</div>
          <span>By <strong className="text-black">Divyanshu Mishra</strong></span>
          <span>•</span>
          <span>Updated: April 2025</span>
          <span>•</span>
          <span>{sites.length} platforms listed</span>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          Are you looking for the best freelance websites in India to start earning online? You've landed on the right page. Freelancing has boomed and these platforms are actively looking for talent.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive('All')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${active === 'All' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-black'}`}
          >
            All ({sites.length})
          </button>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${active === c ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-black'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Site Cards */}
        <div className="space-y-5">
          {filtered.map((site, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-orange-300 transition-all group">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-400 font-mono">#{i + 1}</span>
                    <h3 className="text-xl font-bold text-[#1a1a1a] group-hover:text-orange-600 transition-colors">{site.name}</h3>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{site.category}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{site.desc}</p>
                </div>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors shadow-sm"
                >
                  Visit <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="mt-16 p-6 bg-orange-50 border border-orange-200 rounded-xl">
          <h3 className="font-bold text-lg mb-2">💡 Pro Tip from Divyanshu</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Start with <strong>Truelancer or Fiverr</strong> as a beginner, build your portfolio with real projects, then move to <strong>Upwork or Toptal</strong> for premium rates. Consistency always wins.
          </p>
          <a
            href="mailto:mishradivyanshu532@gmail.com"
            className="mt-4 inline-block text-sm text-orange-600 hover:underline font-medium"
          >
            Contact me for mentorship →
          </a>
        </div>
      </div>
    </div>
  );
}
