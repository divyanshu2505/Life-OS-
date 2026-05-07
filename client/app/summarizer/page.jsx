"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Youtube, 
  Video, 
  Headphones, 
  File, 
  Globe, 
  AlignLeft,
  PlusCircle,
  Menu,
  MessageSquare,
  History,
  Settings,
  Star,
  Chrome
} from 'lucide-react';

export default function VideoSummarizerClone() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleGenerate = () => {
    if (!url) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSummary([
        `Summary generated for: ${url}`,
        "1. Introduction: The video begins by outlining the main topic.",
        "2. Key Concept 1: Detailed explanation of the first major point.",
        "3. Key Concept 2: Practical examples demonstrating the second point.",
        "4. Conclusion: A summary of all concepts discussed and final thoughts."
      ]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#1a1a1a] font-sans flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <span className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <Menu size={20} className="text-gray-500" />
                AI YouTube
            </span>
            <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 bg-gray-50">
                ◨
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2.5 bg-[#f0f4ff] text-[#2b5aee] rounded-lg font-medium cursor-pointer">
                <FileText size={18} />
                YouTube Summarizer
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <span className="font-bold text-[10px] tracking-wider border border-gray-300 rounded px-1 py-0.5">CC</span>
                YouTube Transcript
            </div>
             <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <span className="font-bold text-[10px] tracking-wider border border-gray-300 rounded px-1 py-0.5">CC</span>
                YouTube Subtitle
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <MessageSquare size={18} />
                YouTube Subscriptions
            </div>
            
            <div className="pt-2 pb-2">
                <div className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                        <span className="font-bold">···</span>
                        More
                    </div>
                    <span>›</span>
                </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <Chrome size={18} className="text-red-500"/>
                YouTube Extension
            </div>
            
            <hr className="my-2 border-gray-100" />
            
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <History size={18} />
                My Notes
            </div>
        </div>

        <div className="p-4 border-t border-gray-100">
            <button className="w-full py-2.5 bg-[#edf2fe] text-[#2b5aee] rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[#e4ebfc] transition-colors">
                <Star size={16} />
                Start Free Trial
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Simple top nav for mobile or consistent feel */}
        <div className="md:hidden p-4 bg-white border-b border-gray-200 flex justify-between items-center">
            <span className="font-bold text-gray-800">AI YouTube</span>
            <Menu size={24} className="text-gray-600" />
        </div>
        
        {/* Header Section */}
        <div className="flex justify-end p-4">
             <Link href="/portfolio" className="text-sm text-gray-500 hover:text-blue-600 underline">← Back to Portfolio</Link>
        </div>

        <div className="max-w-5xl mx-auto w-full px-6 py-8 flex-1">
            
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-[#1f2937] mb-4">Free YouTube Video Summarizer</h1>
                <p className="text-[#4b5563] text-lg">Batch summarize YouTube videos and playlists in seconds, generating comprehensive and in-depth summaries.</p>
            </div>

            {/* Top Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 text-sm">
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#2b5aee] font-medium rounded-md shadow-sm border border-gray-100">
                    <Youtube size={16} className="text-blue-500" /> YouTube
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <Video size={16} /> Video
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <Headphones size={16} /> Audio
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <File size={16} /> PDF, Image & More Files
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <Globe size={16} /> Webpage
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <AlignLeft size={16} /> Long Text
                </button>
            </div>

            {/* Sub Tabs */}
            <div className="flex gap-6 mb-4 border-b border-gray-200">
                <button className="text-[#2b5aee] font-medium pb-3 border-b-2 border-[#2b5aee]">YouTube Video</button>
                <button className="text-gray-500 hover:text-gray-800 font-medium pb-3 transition-colors">YouTube Playlist</button>
            </div>

            {/* Input Area */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-4">
                    <textarea 
                        className="w-full h-32 resize-none outline-none bg-white text-gray-800 placeholder-gray-400"
                        placeholder="Paste the YouTube video link, for example: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    ></textarea>
                </div>
                <div className="border-t border-gray-100 p-3 bg-gray-50/50 flex justify-between items-center">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
                        <PlusCircle size={16} /> Add More Link
                    </button>
                    <span className="text-xs text-gray-400">{url.length}/2000</span>
                </div>
            </div>

            {/* Generate Button */}
            <button 
                onClick={handleGenerate}
                disabled={loading || !url}
                className="w-full py-3.5 bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-[#93c5fd] text-white font-medium rounded-lg flex justify-center items-center gap-2 shadow-md transition-colors mb-10"
            >
                {loading ? (
                   <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                    <>
                        <FileText size={18} />
                        Generate Summary
                    </>
                )}
            </button>

             {/* Output Area */}
             {summary && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-10 flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-900 border border-gray-200 shadow-sm">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${url.includes('v=') ? url.split('v=')[1].substring(0,11) : 'dQw4w9WgXcQ'}`} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium border border-blue-100">
                         ✨ AI Analysis Complete. 98% accuracy score.
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-4 text-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Video Summary & Key Insights</h2>
                        <ul className="space-y-3 list-disc pl-5">
                          <li><strong>Introduction (0:00 - 2:15):</strong> The speaker introduces the core concept and outlines the primary objectives of the discussion, emphasizing the importance of modern methodologies.</li>
                          <li><strong>Deep Dive & Architecture (2:15 - 8:40):</strong> A comprehensive breakdown of the internal architecture. Key takeaways include the transition to microservices and adopting scalable patterns.</li>
                          <li><strong>Practical Demonstration (8:40 - 15:20):</strong> Live code examples and practical use-cases are shown. The instructor highlights common pitfalls and how to avoid them using best practices.</li>
                          <li><strong>Conclusion & Q&A (15:20 - End):</strong> Final wrap up, summarizing the 3 most critical points. The video ends with an interactive Q&A session addressing edge cases.</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Example Section */}
            <div>
                <h3 className="text-lg font-bold text-[#2b5aee] border-b-2 border-[#2b5aee] inline-block pb-1 mb-6">Example</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Fake Thumbnails */}
                    {[
                        { title: "Harvard University", bg: "bg-red-900" },
                        { title: "Fear will lead you...", bg: "bg-orange-900" },
                        { title: "Audience Interaction", bg: "bg-stone-800" },
                        { title: "How to Study & Learn", bg: "bg-blue-900" },
                    ].map((item, i) => (
                         <div key={i} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow group">
                            <div className={`h-32 ${item.bg} w-full flex items-center justify-center text-white p-4 text-center opacity-90 group-hover:opacity-100 transition-opacity`}>
                                <span className="font-bold text-sm drop-shadow-md">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}
