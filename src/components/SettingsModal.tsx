"use client";

import React, { useState, useEffect } from "react";
import { X, Key, Info, Check, ShieldAlert } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [grokKey, setGrokKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGrokKey(localStorage.getItem("grok_api_key") || "");
      setGeminiKey(localStorage.getItem("gemini_api_key") || "");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("grok_api_key", grokKey.trim());
      localStorage.setItem("gemini_api_key", geminiKey.trim());
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    setGrokKey("");
    setGeminiKey("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("grok_api_key");
      localStorage.removeItem("gemini_api_key");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md border border-dark-border bg-dark-card rounded-2xl p-6 shadow-2xl animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg p-1 hover:bg-zinc-800"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-brand-purple/10 rounded-xl text-brand-purple">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Configuração de APIs</h2>
            <p className="text-xs text-zinc-400">Opcional para geração em tempo real</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              Grok (xAI) API Key
            </label>
            <input
              type="password"
              placeholder="xai-..."
              value={grokKey}
              onChange={(e) => setGrokKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-dark-border bg-dark-bg text-sm text-zinc-100 placeholder-zinc-600 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              Gemini API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-dark-border bg-dark-bg text-sm text-zinc-100 placeholder-zinc-600 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all"
            />
          </div>

          <div className="p-3.5 bg-zinc-900/60 border border-dark-border rounded-xl flex gap-3 text-xs text-zinc-400 leading-relaxed">
            <Info className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
            <div>
              <p>
                As chaves de API são armazenadas localmente no seu navegador e enviadas apenas para as rotas de backend do seu app para autenticar as requisições com os servidores de IA.
              </p>
              <p className="mt-1 font-semibold text-brand-cyan">
                Caso nenhuma chave seja informada, o sistema usará o banco de questões locais (Modo Demo).
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:bg-zinc-900 transition-all flex-1 cursor-pointer text-center"
            >
              Limpar Chaves
            </button>
            <button
              type="submit"
              disabled={saved}
              className="px-4 py-2.5 bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 active:scale-95 disabled:opacity-50 text-zinc-950 font-bold rounded-xl text-sm transition-all flex-1 flex items-center justify-center gap-1 cursor-pointer"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  Salvo!
                </>
              ) : (
                "Salvar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
