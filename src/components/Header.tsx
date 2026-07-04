"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, Settings, Cpu, Database } from "lucide-react";
import SettingsModal from "./SettingsModal";

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeAPI, setActiveAPI] = useState<"grok" | "gemini" | "openai" | "mock">("mock");

  // Poll or set up listener for API key changes in localStorage
  const checkAPIKeys = () => {
    if (typeof window !== "undefined") {
      const grokKey = localStorage.getItem("grok_api_key");
      const geminiKey = localStorage.getItem("gemini_api_key");
      const openaiKey = localStorage.getItem("openai_api_key");
      if (grokKey) {
        setActiveAPI("grok");
      } else if (geminiKey) {
        setActiveAPI("gemini");
      } else if (openaiKey) {
        setActiveAPI("openai");
      } else {
        setActiveAPI("mock");
      }
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(checkAPIKeys, 0);
    return () => window.clearTimeout(timeoutId);
  }, [isSettingsOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-dark-bg/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan p-0.5 flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-brand-cyan" />
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight leading-none">
                Gabaritando <span className="bg-gradient-to-r from-brand-purple-light to-brand-cyan bg-clip-text text-transparent">Verbos</span>
              </h1>
              <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                IA Grammar Trainer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dark-border bg-zinc-900/60 text-xs">
              {activeAPI === "grok" ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                  <span className="text-zinc-300 font-medium flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-brand-purple" />
                    xAI Grok
                  </span>
                </>
              ) : activeAPI === "gemini" ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="text-zinc-300 font-medium flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-brand-cyan" />
                    Gemini API
                  </span>
                </>
              ) : activeAPI === "openai" ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-zinc-300 font-medium flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-brand-green" />
                    OpenAI API
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="text-zinc-400 font-medium flex items-center gap-1">
                    <Database className="w-3.5 h-3.5 text-amber-500/80" />
                    Modo Demo (Local)
                  </span>
                </>
              )}
            </div>

            {/* Settings button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 border border-dark-border bg-zinc-900/40 hover:bg-zinc-800 hover:border-zinc-700 active:scale-95 text-zinc-300 hover:text-zinc-100 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="Configurações de API"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden xs:inline">APIs</span>
            </button>
          </div>
        </div>
      </header>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
