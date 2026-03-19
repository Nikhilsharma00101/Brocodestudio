/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, User, MessageSquare, 
  ArrowUpRight, Terminal,
  Cpu, Zap, ShieldCheck
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ChatWidget() {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {/* ── Futuristic Pulse Toggle ──────────────────────── */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 w-16 rounded-[22px] flex items-center justify-center shadow-2xl transition-all duration-500 group relative overflow-hidden bg-zinc-950 border border-white/10",
          isOpen ? "rotate-90" : ""
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="text-white"
            >
              <X size={24} strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="relative flex items-center justify-center text-white"
            >
              <MessageSquare size={24} strokeWidth={1.5} />
              
              {/* Outer Energy Ring */}
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-4px] border border-blue-500/30 rounded-[24px]" 
              />
              {/* Scanning Ray effect */}
              <motion.div
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] opacity-40"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Main Command Center ──────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-24 right-0 w-[94vw] sm:w-[380px] h-[65vh] sm:h-[540px] flex flex-col"
          >
            {/* Dark Glass Container */}
            <div className="flex-1 flex flex-col bg-zinc-950/95 backdrop-blur-3xl border border-white/5 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.9)] relative group overflow-hidden overscroll-contain" data-lenis-prevent>
              
              {/* Background Atmosphere Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10 rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -z-10 rounded-full" />

              {/* Header: Simplified Studio Interface */}
              <div className="px-8 py-6 border-b border-white/5 relative z-10 bg-white/[0.01]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-2xl relative overflow-hidden">
                        <Cpu size={20} className="relative z-10 text-cyan-400" />
                        <motion.div 
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(34,211,238,0.1),transparent)]"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center p-[2px]">
                        <div className="w-full h-full rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-tight leading-none bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Studio Core</h2>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.1em]">Agent Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Terminal Area */}
              <div 
                ref={scrollRef} 
                data-lenis-prevent
                className="flex-1 overflow-y-auto px-8 py-8 space-y-8 scrollbar-none relative z-10 overscroll-contain"
              >
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-start justify-center text-left space-y-6 px-2">
                    <motion.div
                       initial={{ opacity: 0, x: -15 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="space-y-4"
                    >
                       <Zap size={24} className="text-cyan-400 opacity-60" />
                       <h4 className="text-white font-bold text-2xl tracking-tight leading-tight italic">How can we assist?</h4>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 gap-2 w-full pt-4">
                      {["How does the vault work?", "What is the revision policy?"].map((q, i) => (
                        <motion.button 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          key={q}
                          onClick={() => { setInput(q); }}
                          className="text-left px-5 py-3.5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-xs font-bold text-white/50 hover:text-white transition-all flex items-center justify-between group"
                        >
                          {q}
                          <ArrowUpRight size={14} className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-all" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, idx: number) => (
                  <motion.div
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    key={m.id || idx}
                    className={cn(
                      "flex gap-4 group items-start",
                      m.role === 'user' ? "flex-row-reverse" : ""
                    )}
                  >
                    {/* Role Icon Node */}
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-700 relative overflow-hidden",
                      m.role === 'user' 
                        ? "bg-zinc-900 border-white/5 text-zinc-600" 
                        : "bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    )}>
                      {m.role === 'user' ? <User size={12} /> : <Terminal size={12} />}
                      {m.role !== 'user' && (
                        <motion.div 
                           animate={{ y: [-10, 30] }}
                           transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                           className="absolute top-0 left-0 w-full h-[1px] bg-blue-400/40 blur-[1px]"
                        />
                      )}
                    </div>
                    
                    <div className={cn(
                      "max-w-[88%] relative transition-all duration-500",
                      m.role === 'user' ? "text-right" : "text-left"
                    )}>
                      {/* Meta info for AI responses */}
                      {m.role !== 'user' && (
                        <div className="flex items-center gap-2 mb-2 px-1">
                           <span className="text-[8px] font-black text-blue-500/60 uppercase tracking-[0.2em] font-mono">Entry_{idx.toString().padStart(3, '0')}</span>
                           <div className="h-[1px] w-8 bg-blue-500/20" />
                        </div>
                      )}

                      <div className={cn(
                        "px-5 py-4 rounded-2xl text-[14px] leading-relaxed relative overflow-hidden transition-all duration-500",
                        m.role === 'user' 
                          ? "bg-zinc-900/40 text-white border border-white/5 rounded-tr-none shadow-xl" 
                          : "bg-white/[0.02] border-l-2 border-blue-500/40 border-y border-white/5 border-r border-white/5 text-stone-300 rounded-tl-none group-hover:bg-white/[0.04] shadow-[10px_10px_30px_rgba(0,0,0,0.2)]"
                      )}>
                        {/* Futuristic Scanning Line Overlay (AI only) */}
                        {m.role !== 'user' && (
                          <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-blue-500/[0.03] to-transparent pointer-events-none" />
                        )}

                        <div className="whitespace-pre-wrap opacity-100 font-medium tracking-tight text-white">
                          {(() => {
                            const msg = m as any;
                            let content = '';
                            if (typeof msg.content === 'string') {
                              content = msg.content;
                            } else if (msg.content?.text) {
                              content = msg.content.text;
                            } else if (Array.isArray(msg.parts)) {
                              content = msg.parts.map((p: any) => p.text || '').join('');
                            } else if (Array.isArray(msg.content)) {
                              content = msg.content.map((p: any) => p.text || (typeof p === 'string' ? p : '')).join('');
                            }

                            if (msg.role !== 'user' && content) {
                               const parts = content.split(/(\bThe Vault\b|\bCinema Mode\b|\bReview Room\b|\bZero-Touch\b)/g);
                               return parts.map((part: string, i: number) => 
                                 ['The Vault', 'Cinema Mode', 'Review Room', 'Zero-Touch'].includes(part) 
                                   ? <span key={i} className="font-mono text-xs font-bold bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">{part}</span>
                                   : part
                               );
                            }
                            return content;
                          })()}
                        </div>

                        {/* Transmission Status (AI only) */}
                        {m.role !== 'user' && (
                           <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                              <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-[0.1em]">Signal_Stable</span>
                              <div className="flex gap-0.5">
                                 {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-blue-500/20" />)}
                              </div>
                           </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-400/20">
                       <BotLoadingIcon />
                    </div>
                    <div className="flex flex-col gap-2">
                       <span className="text-[8px] text-cyan-500 font-black uppercase tracking-[0.3em] animate-pulse">Establishing Nexus...</span>
                       <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden relative">
                          <motion.div 
                             animate={{ x: [-128, 128] }}
                             transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                             className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                          />
                       </div>
                    </div>
                  </div>
                )}
                
                {/* Scroll Anchor */}
                <div ref={messagesEndRef} className="h-px w-full" />
              </div>

              {/* Input Area: Streamlined Command Line */}
              <div className="p-8 bg-black/20 border-t border-white/5 relative z-20">
                <form onSubmit={handleSubmit} className="relative flex items-center group">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter inquiry..."
                    className="w-full bg-white/[0.05] hover:bg-white/[0.08] focus:bg-zinc-900 text-white rounded-2xl py-5 pl-6 pr-16 text-[14px] focus:outline-none focus:ring-1 focus:ring-cyan-500/30 border border-white/10 transition-all placeholder:text-zinc-600 font-medium tracking-tight"
                  />
                  <button
                    type="submit"
                    disabled={!input || isLoading}
                    className="absolute right-2.5 p-3.5 bg-white text-zinc-950 rounded-xl disabled:opacity-5 transition-all hover:bg-cyan-400 active:scale-95 group overflow-hidden"
                  >
                    <Send size={18} />
                  </button>
                </form>
                
                <div className="mt-5 flex items-center justify-between px-3">
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] text-zinc-800 uppercase tracking-[0.2em] font-black italic">Secured Portal</span>
                  </div>
                  <div className="flex gap-2">
                     <ShieldCheck size={10} className="text-zinc-800" />
                     <span className="text-[9px] text-zinc-800 font-bold uppercase font-mono">End-to-End</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Atmosphere Elements */}
            <div className="absolute -z-20 -bottom-10 -right-10 w-[300px] h-[300px] bg-cyan-600/10 blur-[80px] rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BotLoadingIcon() {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
           key={i}
           animate={{ height: [4, 12, 4], opacity: [0.3, 1, 0.3] }}
           transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
           className="w-[2px] bg-cyan-400 rounded-full"
        />
      ))}
    </div>
  );
}
