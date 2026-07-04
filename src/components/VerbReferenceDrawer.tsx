"use client";

import React, { useState, useEffect } from "react";
import { X, BookOpen } from "lucide-react";
import { verbTenseReferences } from "@/data";
import VerbReferenceCard from "./VerbReferenceCard";

interface VerbReferenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTenses: string[]; // Tenses selected for the current quiz or study
}

export default function VerbReferenceDrawer({
  isOpen,
  onClose,
  selectedTenses,
}: VerbReferenceDrawerProps) {
  // If no tenses are selected, default to all available tenses
  const tensesToDisplay =
    selectedTenses.length > 0
      ? selectedTenses.filter((t) => verbTenseReferences[t])
      : Object.keys(verbTenseReferences);

  const [selectedTenseTab, setSelectedTenseTab] = useState<string | null>(null);

  const activeTenseTab = (selectedTenseTab && tensesToDisplay.includes(selectedTenseTab))
    ? selectedTenseTab
    : (tensesToDisplay.length > 0 ? tensesToDisplay[0] : "");

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTenseInfo = verbTenseReferences[activeTenseTab];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer content sliding in from the right */}
      <div className="relative w-full max-w-lg h-full bg-dark-bg border-l border-dark-border flex flex-col shadow-2xl z-10 animate-slide-up sm:animate-none sm:translate-x-0 transition-transform duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-dark-border flex items-center justify-between bg-dark-card/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-purple" />
            <h2 className="font-bold text-zinc-100 text-sm sm:text-base">
              Painel de Consulta
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-dark-border bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            title="Fechar Painel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verb Tense Selection Tab Bar if multiple tenses */}
        {tensesToDisplay.length > 1 && (
          <div className="px-4 py-2 border-b border-dark-border bg-zinc-900/20 flex gap-2 overflow-x-auto no-scrollbar">
            {tensesToDisplay.map((tense) => (
              <button
                key={tense}
                onClick={() => setSelectedTenseTab(tense)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTenseTab === tense
                    ? "bg-zinc-800 text-zinc-100 border border-brand-purple/40 shadow-inner"
                    : "bg-zinc-900/40 border border-dark-border/40 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tense}
              </button>
            ))}
          </div>
        )}

        {/* Active Verb Tense Reference Card */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-dark-bg">
          {currentTenseInfo ? (
            <div className="h-full">
              <VerbReferenceCard info={currentTenseInfo} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500 p-6">
              <BookOpen className="w-12 h-12 stroke-[1.5] mb-2 text-zinc-600" />
              <p className="text-xs">Selecione um tempo verbal para revisar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
