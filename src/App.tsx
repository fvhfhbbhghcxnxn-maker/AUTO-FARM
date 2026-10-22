/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, MessageSquare, User, Check, Copy, ArrowLeft, Ghost, Flame, ShieldCheck } from 'lucide-react';

const SCRIPT_STRING = 'loadstring(game:HttpGet("https://star-scripts.com/api/run/CAX6ndry8K_0wUu3g1Mzqlh6MH2du3UG"))()';
const DISCORD_LINK = 'https://discord.gg/fNJfsqvCS';

type ViewState = 'home' | 'script-details';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Attempt modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(SCRIPT_STRING);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (err) {
        console.error('Modern copy failed:', err);
      }
    }

    // Fallback: execCommand('copy')
    try {
      const textArea = document.createElement("textarea");
      textArea.value = SCRIPT_STRING;
      // Ensure it's not visible but part of the DOM
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error('execCommand copy unsuccessful');
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      alert('Kopyalama başarısız oldu. Lütfen metni manuel olarak seçip kopyalayın.');
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Background Hero */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/images/mm2_mystery_atmosphere_1792712220040.jpg"
          alt="Murder Mystery 2 Background"
          className="w-full h-full object-cover opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060606]/70 to-[#060606]" />
      </div>

      <header className="relative z-20 flex items-center justify-between gap-8 px-6 py-6 border-b border-white/5 backdrop-blur-md">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-emerald-400 transition-colors">STAR SCRIPTS</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <button onClick={() => setView('home')} className="hover:text-white transition-colors">Home</button>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">Creator</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
            <User size={20} />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <Ghost size={14} className="text-emerald-400" />
                <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">New Release</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
                Murder Mystery 2 <br />
                <span className="text-emerald-500">Ultimate Scripts.</span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">
                Dominate the game with our premium scripts. Safe, fast, and completely free.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Script Button */}
                <button
                  onClick={() => setView('script-details')}
                  className="group relative flex flex-col items-center justify-center gap-4 p-8 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Code2 size={32} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-1">Scripts</h3>
                    <p className="text-sm text-slate-500">View MM2 Scripts</p>
                  </div>
                  <div className="mt-4 px-3 py-1 bg-emerald-500/10 rounded-full text-[10px] font-bold text-emerald-400">
                    ACTIVE
                  </div>
                </button>

                {/* Discord Button */}
                <a
                  href={DISCORD_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center gap-4 p-8 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-indigo-500/50 transition-all duration-300 text-center"
                >
                  <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                    <MessageSquare size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Discord</h3>
                    <p className="text-sm text-slate-500">Join Community</p>
                  </div>
                  <div className="mt-4 px-3 py-1 bg-indigo-500/10 rounded-full text-[10px] font-bold text-indigo-400">
                    JOIN NOW
                  </div>
                </a>

                {/* Creator Button */}
                <button
                  className="group flex flex-col items-center justify-center gap-4 p-8 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-amber-500/50 transition-all duration-300"
                >
                  <div className="p-4 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                    <User size={32} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-1">Creator</h3>
                    <p className="text-sm text-slate-500">Meet the Team</p>
                  </div>
                  <div className="mt-4 px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-500">
                    COMING SOON
                  </div>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="script-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Back to Home
              </button>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] font-bold rounded">HALLOWEEN</span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">VERIFIED</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                      MM2 BEST HALLOWEEN <br />
                      AUTO FARM CANDY SCRIPT
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 text-xs font-mono">
                    <div className="flex items-center gap-1"><Flame size={14} className="text-orange-500" /> 1.2k Views</div>
                    <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> Safe</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-black/40 border border-white/5 rounded-2xl font-mono text-sm break-all text-slate-300 relative group">
                    <div className="absolute top-4 right-4 flex gap-2">
                       <button 
                        onClick={handleCopy}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                        title="Copy Script"
                       >
                         {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                       </button>
                    </div>
                    <code className="block pr-12 leading-relaxed">
                      {SCRIPT_STRING}
                    </code>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Instructions</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        1. Copy the script above.<br />
                        2. Open your executor of choice.<br />
                        3. Paste and execute while in game.
                      </p>
                    </div>
                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Features</h4>
                      <p className="text-sm text-emerald-400/80 leading-relaxed font-medium">
                        • Anti-Detection System<br />
                        • Instant Candy Pickup<br />
                        • Auto Halloween Farm
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={handleCopy}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-emerald-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    {copied ? (
                      <>
                        <Check size={20} />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy size={20} />
                        Copy Full Script
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-16 px-6 mt-20 bg-black/40">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold tracking-tighter text-white">STAR SCRIPTS</span>
            <p className="text-sm text-slate-500 mt-4 max-w-sm">
              Providing the highest quality gaming scripts since 2024. Join our community for more updates.
            </p>
          </div>
          <div className="flex justify-center md:justify-end gap-12 text-sm font-medium">
            <div className="flex flex-col gap-3">
              <span className="text-white text-xs font-bold uppercase tracking-widest opacity-50">Product</span>
              <button onClick={() => setView('home')} className="text-slate-500 hover:text-white transition-colors text-left">Scripts</button>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Executors</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white text-xs font-bold uppercase tracking-widest opacity-50">Support</span>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-600 tracking-widest uppercase">
           <span>© 2026 STAR SCRIPTS ALL RIGHTS RESERVED</span>
           <div className="flex gap-6">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
