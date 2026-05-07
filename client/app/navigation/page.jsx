"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { 
  Search, Menu, Navigation as NavIcon, MapPin, 
  Car, Train, PersonStanding, Bike, ArrowLeft, ArrowRightLeft,
  Coffee, Fuel, Utensils, Hotel, Plus, Minus, Layers
} from 'lucide-react';

export default function Navigation() {
  const [query, setQuery] = useState('');
  const [mapUrl, setMapUrl] = useState('https://www.openstreetmap.org/export/embed.html?bbox=-122.51,37.70,-122.36,37.81&layer=mapnik');
  const [isDirectionsMode, setIsDirectionsMode] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState('car'); // car, train, walk, bike

  const handleSearch = () => {
    if (!query) return;
    const encodedQuery = encodeURIComponent(query);
    setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik&marker=&q=${encodedQuery}`);
  };

  const handleDirectionsSearch = () => {
    if (!origin || !destination) return;
    setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik&marker=&q=${encodeURIComponent(destination)}`);
  };

  const chips = [
    { icon: <Utensils size={14} />, label: 'Restaurants' },
    { icon: <Hotel size={14} />, label: 'Hotels' },
    { icon: <Coffee size={14} />, label: 'Coffee' },
    { icon: <Fuel size={14} />, label: 'Gas' },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#202124] text-white overflow-hidden font-sans">
      <Navbar />
      
      <div className="flex-1 relative flex h-full">
        {/* The Map */}
        <div className="absolute inset-0 z-0">
           <iframe 
             width="100%" 
             height="100%" 
             frameBorder="0" 
             scrolling="no" 
             marginHeight="0" 
             marginWidth="0" 
             src={mapUrl} 
             style={{ filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(100%)' }} // Dark mode map
             className="w-full h-full border-none pointer-events-auto"
           ></iframe>
        </div>

        {/* Google Maps Style Left Panel */}
        <div className="absolute top-24 left-4 z-10 w-[400px] flex flex-col gap-2 max-h-[calc(100vh-7rem)]">
          
          {/* Main Search or Directions Panel */}
          <div className="bg-[#202124] rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.8)] overflow-hidden">
            {!isDirectionsMode ? (
              <div className="flex flex-col">
                <div className="flex items-center p-2">
                  <button className="p-3 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                    <Menu size={20} />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Search Google Maps" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 bg-transparent border-none outline-none text-white px-2 py-2 text-[15px] placeholder:text-gray-400 font-medium"
                  />
                  <div className="flex items-center gap-1 pr-1">
                    <button onClick={handleSearch} className="p-2.5 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                      <Search size={20} />
                    </button>
                    <div className="w-[1px] h-6 bg-white/20 mx-1"></div>
                    <button 
                      onClick={() => setIsDirectionsMode(true)}
                      className="p-2.5 hover:bg-blue-500/10 rounded-full transition-colors text-blue-400 group"
                    >
                      <div className="w-8 h-8 bg-[#8ab4f8] rounded-full flex items-center justify-center group-hover:bg-[#aecbfa] transition-colors shadow-sm">
                        <ArrowRightLeft size={16} className="text-[#202124] rotate-45" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#202124] p-4">
                <div className="flex items-center gap-4 mb-4">
                  <button 
                    onClick={() => setIsDirectionsMode(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-300"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  {/* Transport Modes */}
                  <div className="flex items-center gap-6 text-gray-400">
                    <button onClick={() => setTransportMode('car')} className={`p-2 transition-colors ${transportMode === 'car' ? 'text-[#8ab4f8]' : 'hover:text-white'}`}><Car size={20} /></button>
                    <button onClick={() => setTransportMode('train')} className={`p-2 transition-colors ${transportMode === 'train' ? 'text-[#8ab4f8]' : 'hover:text-white'}`}><Train size={20} /></button>
                    <button onClick={() => setTransportMode('walk')} className={`p-2 transition-colors ${transportMode === 'walk' ? 'text-[#8ab4f8]' : 'hover:text-white'}`}><PersonStanding size={20} /></button>
                    <button onClick={() => setTransportMode('bike')} className={`p-2 transition-colors ${transportMode === 'bike' ? 'text-[#8ab4f8]' : 'hover:text-white'}`}><Bike size={20} /></button>
                  </div>
                </div>

                {/* Inputs */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center mt-3 gap-1">
                    <div className="w-3.5 h-3.5 border-[2px] border-gray-400 rounded-full"></div>
                    <div className="w-0.5 h-7 bg-gray-600 rounded-full"></div>
                    <MapPin size={18} className="text-red-500 mt-0.5" fill="currentColor" />
                  </div>
                  <div className="flex-1 space-y-3 relative">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Choose starting point" 
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full bg-[#303134] border border-transparent focus:border-[#8ab4f8] rounded-lg px-3 py-2.5 text-[15px] text-white outline-none transition-colors placeholder:text-gray-400"
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Choose destination" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-[#303134] border border-transparent focus:border-[#8ab4f8] rounded-lg px-3 py-2.5 text-[15px] text-white outline-none transition-colors placeholder:text-gray-400"
                      />
                    </div>
                    <button className="absolute right-[-44px] top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors">
                       <ArrowRightLeft size={18} className="rotate-90" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Chips */}
          {!isDirectionsMode && (
            <div className="flex gap-2 mt-2 overflow-x-auto hide-scrollbar pb-2">
              {chips.map((chip, i) => (
                <button key={i} className="flex items-center gap-2 px-4 py-2 bg-[#202124] hover:bg-[#303134] rounded-full border border-white/10 text-sm font-medium text-gray-200 transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.5)] whitespace-nowrap">
                  {chip.icon} {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Results Sidebar Example (Only shows when search/directions active) */}
          <div className="flex-1 overflow-y-auto mt-2 space-y-2 hide-scrollbar pb-4">
            {!isDirectionsMode && query && (
              <div className="bg-[#202124] rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="h-48 w-full bg-[#303134]">
                   <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-90" alt="Location" />
                </div>
                <div className="p-5">
                  <h2 className="text-2xl font-bold mb-1 text-white">{query}</h2>
                  <p className="text-gray-400 text-sm mb-5">City in Example Region</p>
                  <div className="flex gap-3">
                    <button onClick={() => setIsDirectionsMode(true)} className="flex-1 flex flex-col items-center justify-center gap-2 p-2 hover:bg-white/5 rounded-xl text-[#8ab4f8] transition-colors">
                      <div className="w-12 h-12 bg-[#8ab4f8] rounded-full flex items-center justify-center text-[#202124] shadow-md"><ArrowRightLeft size={20} className="rotate-45" /></div>
                      <span className="text-[13px] font-semibold mt-1">Directions</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center justify-center gap-2 p-2 hover:bg-white/5 rounded-xl text-[#8ab4f8] transition-colors">
                      <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-gray-200"><MapPin size={20} /></div>
                      <span className="text-[13px] font-semibold mt-1">Save</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center justify-center gap-2 p-2 hover:bg-white/5 rounded-xl text-[#8ab4f8] transition-colors">
                      <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-gray-200"><NavIcon size={20} /></div>
                      <span className="text-[13px] font-semibold mt-1">Nearby</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {isDirectionsMode && origin && destination && (
              <div className="bg-[#202124] rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.8)] overflow-hidden p-2">
                 <div className="p-4 rounded-xl cursor-pointer bg-[#303134] border border-transparent transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-bold text-green-400">45 min</h3>
                      <span className="text-sm text-gray-400 mt-1">22.5 km</span>
                    </div>
                    <p className="text-gray-200 text-sm font-medium">via Main Highway Route</p>
                    <p className="text-gray-400 text-xs mt-2">Fastest route now due to traffic conditions</p>
                 </div>
                 <div className="p-4 hover:bg-[#303134] rounded-xl cursor-pointer transition-colors mt-1 border border-transparent">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-bold text-gray-300">55 min</h3>
                      <span className="text-sm text-gray-400 mt-1">25.1 km</span>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">via Alternative Express</p>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Right Floating Controls */}
        <div className="absolute bottom-8 right-6 z-10 flex flex-col gap-3">
           <button className="w-10 h-10 bg-[#202124] hover:bg-[#303134] rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-gray-300 transition-colors mb-4 group">
             <NavIcon size={18} className="text-gray-300 group-hover:text-white transition-colors" />
           </button>
           
           <div className="bg-[#202124] rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col">
             <button className="w-10 h-10 hover:bg-[#303134] flex items-center justify-center text-gray-300 transition-colors border-b border-white/10">
               <Plus size={20} />
             </button>
             <button className="w-10 h-10 hover:bg-[#303134] flex items-center justify-center text-gray-300 transition-colors">
               <Minus size={20} />
             </button>
           </div>
        </div>
        
        {/* Top Right Layers */}
        <div className="absolute top-24 right-6 z-10">
           <button className="w-12 h-12 bg-[#202124] hover:bg-[#303134] rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center text-gray-300 transition-colors">
             <Layers size={22} />
           </button>
        </div>

      </div>
    </div>
  );
}
