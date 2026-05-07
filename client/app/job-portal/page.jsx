"use client";
import React, { useState, useEffect } from 'react';
import { Briefcase, Play, Pause, Settings, Terminal, CheckCircle, BarChart, Plus, Trash2, Search, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function JobPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  // Mock logs for the terminal effect
  const MOCK_LOGS = [
    "[INFO] Initializing Auto Job Applier LinkedIn...",
    "[INFO] Loading configuration from config.yaml",
    "[INFO] Opening Chrome webdriver...",
    "[INFO] Navigating to LinkedIn Login...",
    "[SUCCESS] Logged in successfully as Divyanshu Mishra",
    "[INFO] Starting search loop: 'Frontend Developer' in 'Remote'",
    "[INFO] Found 145 jobs matching criteria",
    "[INFO] Applying to Job: 'React Developer at TechCorp'...",
    "[SUCCESS] Application submitted successfully (1/145)",
    "[INFO] Applying to Job: 'Next.js Engineer at Webify'...",
    "[WARNING] Required question not in database, skipping...",
    "[INFO] Applying to Job: 'Frontend Dev at StartupX'...",
    "[SUCCESS] Application submitted successfully (2/145)",
  ];

  useEffect(() => {
    if (isRunning) {
      setLogs(["[INFO] Initializing Auto Job Applier LinkedIn..."]);
      let i = 1;
      const interval = setInterval(() => {
        if (i < MOCK_LOGS.length) {
          setLogs(prev => [...prev, MOCK_LOGS[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Briefcase className="text-cyan-400" size={32} />
              Auto Job Applier
            </h1>
            <p className="text-gray-400 mt-2">Automate your LinkedIn job search. Inspired by LoopCV & GodsScion's Repo.</p>
          </div>
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              isRunning 
                ? 'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20' 
                : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
            }`}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? 'Stop Bot' : 'Start Auto-Apply'}
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-gray-800 mb-8">
          {['dashboard', 'campaigns', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-colors relative ${
                activeTab === tab ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-cyan-400" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Applied', value: '342', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10' },
                { label: 'Interviews', value: '12', icon: BarChart, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                { label: 'Active Loops', value: '3', icon: Play, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
                { label: 'Skipped (Missing Info)', value: '84', icon: Trash2, color: 'text-red-400', bg: 'bg-red-400/10' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon className={stat.color} size={24} />
                    </div>
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <h3 className="text-gray-400 font-medium">{stat.label}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Terminal View */}
              <div className="lg:col-span-2 bg-[#0d0d0d] border border-gray-800 rounded-2xl overflow-hidden flex flex-col h-[400px]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#161616]">
                  <div className="flex items-center gap-2">
                    <Terminal size={16} className="text-gray-400" />
                    <span className="text-sm font-mono text-gray-400">bot_terminal.log</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm overflow-y-auto flex-1 space-y-2">
                  {!isRunning && logs.length === 0 ? (
                    <div className="text-gray-600 h-full flex items-center justify-center">
                      Bot is currently offline. Click "Start Auto-Apply" to begin.
                    </div>
                  ) : (
                    logs.map((log, idx) => (
                      <div key={idx} className={`
                        ${log.includes('[SUCCESS]') ? 'text-green-400' : ''}
                        ${log.includes('[WARNING]') ? 'text-yellow-400' : ''}
                        ${log.includes('[INFO]') ? 'text-cyan-400' : ''}
                      `}>
                        {log}
                      </div>
                    ))
                  )}
                  {isRunning && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-4 bg-cyan-400 animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Campaigns Summary */}
              <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Play className="text-cyan-400" size={18} />
                  Active Campaigns
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Frontend React Developer", location: "Remote US", status: "Running", jobs: 145 },
                    { title: "Full Stack Engineer", location: "India (Remote)", status: "Paused", jobs: 0 },
                    { title: "Python Automation", location: "Worldwide", status: "Running", jobs: 42 },
                  ].map((camp, idx) => (
                     <div key={idx} className="p-4 rounded-xl bg-black/40 border border-gray-800/50">
                       <div className="flex justify-between items-start mb-2">
                         <h4 className="font-semibold text-sm">{camp.title}</h4>
                         <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold ${camp.status === 'Running' ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                           {camp.status}
                         </span>
                       </div>
                       <div className="text-xs text-gray-500 flex items-center gap-3">
                         <span className="flex items-center gap-1"><MapPin size={12}/> {camp.location}</span>
                         {camp.status === 'Running' && <span className="flex items-center gap-1 text-cyan-500"><CheckCircle size={12}/> {camp.jobs} jobs</span>}
                       </div>
                     </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
             <div className="flex justify-between items-center bg-[#1e1e1e] border border-gray-800 rounded-2xl p-6">
               <div>
                 <h2 className="text-xl font-bold">Search Configurations</h2>
                 <p className="text-sm text-gray-400 mt-1">Configure parameters mapped to the Auto_job_applier_linkedIn config.yaml</p>
               </div>
               <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 transition-all">
                 <Plus size={18} /> New Config
               </button>
             </div>

             <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-6">
               <form className="space-y-6 max-w-3xl">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Search size={16}/> Job Titles</label>
                     <input type="text" defaultValue="Frontend Developer, React Developer, Full Stack" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><MapPin size={16}/> Locations</label>
                     <input type="text" defaultValue="Remote, United States, India" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" />
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><FileText size={16}/> Resume File</label>
                   <div className="w-full border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer bg-black/20">
                     <FileText className="mx-auto text-gray-500 mb-3" size={32} />
                     <p className="text-gray-300 font-medium">Click to upload Divyanshu_Mishra_Resume.pdf</p>
                     <p className="text-xs text-gray-500 mt-1">PDF max 5MB</p>
                   </div>
                 </div>

                 <div className="flex justify-end gap-3 pt-4">
                   <button type="button" className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
                   <button type="button" className="px-5 py-2.5 rounded-xl font-medium bg-white text-black hover:bg-gray-200 transition-colors shadow-lg">Save Configuration</button>
                 </div>
               </form>
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-[#1e1e1e] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Settings className="text-cyan-400" /> API & Secrets
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn Email</label>
                <input type="email" defaultValue="mishradivyanshu532@gmail.com" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn Password</label>
                <input type="password" defaultValue="********" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all" />
              </div>
              <div className="pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Note: Your credentials are encrypted and stored locally. The bot uses these to securely log in via Chrome WebDriver to apply to easy-apply jobs. We highly recommend using 2FA and app passwords if applicable.
                </p>
                <button className="px-5 py-2.5 rounded-xl font-medium bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all">Clear Credentials</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
