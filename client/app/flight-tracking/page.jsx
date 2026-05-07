"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Plane, Search, ArrowRight, Bot, Calendar } from 'lucide-react';

export default function FlightTracking() {
  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('JFK');
  const [isSearching, setIsSearching] = useState(false);

  const [flights, setFlights] = useState([
    { id: 'AI 101', airline: 'Air India', type: 'B77W', dep: '02:30 AM', arr: '08:00 AM', status: 'In Air', statusColor: 'text-green-400' },
    { id: 'AA 293', airline: 'American Airlines', type: 'B772', dep: '04:15 AM', arr: '10:10 AM', status: 'Scheduled', statusColor: 'text-blue-400' },
    { id: 'UA 83', airline: 'United Airlines', type: 'B789', dep: '11:45 PM', arr: '05:30 AM', status: 'Delayed', statusColor: 'text-yellow-400' },
    { id: 'DL 21', airline: 'Delta Air Lines', type: 'A359', dep: '06:00 AM', arr: '12:15 PM', status: 'Scheduled', statusColor: 'text-blue-400' },
  ]);

  const [aiSuggestions, setAiSuggestions] = useState(null);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate loading AI insights
    setTimeout(() => {
      setIsSearching(false);
      setAiSuggestions([
        { id: 'EK 501 ➔ EK 201', via: 'DXB', reason: 'Cheaper & arrives 2 hours earlier. Only 1h 30m layover.' },
        { id: 'QR 23 ➔ QR 701', via: 'DOH', reason: 'Top-rated business class. Departs at 08:00 AM. 90% on-time.' }
      ]);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1014] text-white font-sans">
      <Navbar />
      
      {/* Search Header */}
      <div className="mt-16 bg-[#1a1b26] border-b border-white/5 pt-8 pb-8 px-4 md:px-8 shadow-xl relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-6 flex items-center gap-3 tracking-tight">
            <Plane className="text-secondary" /> Route Search & Tracking
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center bg-[#0f1014] p-4 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex-1 w-full relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] font-bold tracking-widest">ORIGIN</span>
              <input 
                type="text" 
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                className="w-full bg-[#1a1b26] border border-white/5 rounded-xl py-4 pl-20 pr-4 text-xl font-bold uppercase tracking-wider focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-600"
                placeholder="e.g. DEL"
              />
            </div>
            
            <div className="w-12 h-12 rounded-full bg-[#1a1b26] border border-white/5 flex items-center justify-center shrink-0 shadow-lg">
              <ArrowRight className="text-gray-400" size={20} />
            </div>

            <div className="flex-1 w-full relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] font-bold tracking-widest">DEST</span>
              <input 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                className="w-full bg-[#1a1b26] border border-white/5 rounded-xl py-4 pl-20 pr-4 text-xl font-bold uppercase tracking-wider focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-600"
                placeholder="e.g. JFK"
              />
            </div>

            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full md:w-auto px-8 py-4 bg-secondary hover:bg-secondary/80 rounded-xl font-bold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
            >
              {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={20} />}
              Search Flights
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Flight Board */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-200">
              <Calendar size={20} className="text-gray-400" />
              Scheduled Flights for {origin} ➔ {destination}
            </h2>
            <span className="text-sm font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">Showing {flights.length} results</span>
          </div>

          <div className="bg-[#1a1b26] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0f1014] text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                    <th className="p-5 font-semibold">Ident</th>
                    <th className="p-5 font-semibold">Type</th>
                    <th className="p-5 font-semibold">Departure</th>
                    <th className="p-5 font-semibold">Arrival</th>
                    <th className="p-5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {flights.map((f, i) => (
                    <tr key={i} className="hover:bg-white/[0.03] transition-colors cursor-pointer group">
                      <td className="p-5">
                        <div className="font-bold text-secondary group-hover:text-blue-400 transition-colors text-base">{f.id}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{f.airline}</div>
                      </td>
                      <td className="p-5 text-gray-400 font-mono text-xs">{f.type}</td>
                      <td className="p-5">
                        <div className="font-bold text-gray-200">{f.dep}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{origin}</div>
                      </td>
                      <td className="p-5">
                        <div className="font-bold text-gray-200">{f.arr}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{destination}</div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold border border-current/20 bg-current/10 shadow-sm ${f.statusColor}`}>
                          {f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: AI Insights */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-[#1a1b26] to-[#0f1014] rounded-2xl border border-white/10 p-6 relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Bot size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">AI Flight Insights</h3>
                <p className="text-[10px] text-primary font-bold tracking-widest mt-1">SMART SUGGESTIONS</p>
              </div>
            </div>

            {!aiSuggestions ? (
              <div className="text-gray-400 text-sm leading-relaxed relative z-10 p-4 bg-black/20 rounded-xl border border-white/5">
                Click "Search Flights" to analyze the route. I will scan for better alternatives, upcoming flights, and cost-saving layovers to optimize your journey.
              </div>
            ) : (
              <div className="space-y-4 relative z-10">
                <p className="text-sm text-gray-300 font-medium">I found some interesting alternatives for your trip:</p>
                
                {aiSuggestions.map((sug, i) => (
                  <div key={i} className="bg-black/40 border border-primary/30 rounded-xl p-4 hover:border-primary transition-all hover:-translate-y-1 cursor-pointer group shadow-lg hover:shadow-[0_4px_20px_rgba(139,92,246,0.2)]">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-bold text-white group-hover:text-primary transition-colors text-base">{sug.id}</div>
                      <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded text-gray-300">via {sug.via}</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {sug.reason}
                    </p>
                  </div>
                ))}

                <button className="w-full mt-4 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all hover:shadow-lg text-white">
                  Ask AI for more options
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
