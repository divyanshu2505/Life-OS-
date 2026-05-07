"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { Loader2, Fingerprint, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Fake login simulation for portfolio demo
    setTimeout(() => {
      setLoading(false);
      router.push("/portfolio");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-neon">
              <Fingerprint className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-display mb-2">LifeOS AI</h1>
            <p className="text-gray-400">Authenticate to access your super-app.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm text-gray-400 pl-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-500 transition-colors"
                  placeholder="admin@lifeos.ai"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm text-gray-400">Password</label>
                <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-neon transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Secure Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            No account yet? <Link href="/portfolio" className="text-cyan-400 font-medium hover:underline">Request Access</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
