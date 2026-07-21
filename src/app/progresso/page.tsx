"use client";

import React from "react";
import { PenLine, Puzzle, GitBranch, Repeat, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppSkeleton from "@/components/AppSkeleton";
import ProgressOverview from "@/components/progress/ProgressOverview";
import ModeProgressCard from "@/components/progress/ModeProgressCard";
import { useMounted } from "@/lib/useMounted";
import { useProgressStore } from "@/lib/progress/progressStore";

export default function ProgressoPage() {
  const mounted = useMounted();
  const items = useProgressStore((s) => s.items);
  const hasHydrated = useProgressStore((s) => s.hasHydrated);
  const resetProgress = useProgressStore((s) => s.resetProgress);

  if (!mounted || !hasHydrated) return <AppSkeleton />;

  const allEntries = Object.values(items);
  const byMode = {
    conjugacao: allEntries.filter((e) => e.mode === "conjugacao"),
    "complete-frase": allEntries.filter((e) => e.mode === "complete-frase"),
    "correlacao-verbal": allEntries.filter((e) => e.mode === "correlacao-verbal"),
    "verbos-derivados": allEntries.filter((e) => e.mode === "verbos-derivados"),
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12">
        <div className="py-8 md:py-12 animate-slide-up">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100">
                Meu Progresso
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Acompanhe o que você já domina e o que precisa revisar.
              </p>
            </div>
            {allEntries.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Isso vai apagar todo o histórico de progresso salvo neste navegador. Continuar?")) {
                    resetProgress();
                  }
                }}
                className="px-3 py-2 border border-dark-border bg-zinc-900/40 hover:bg-zinc-800 hover:border-zinc-700 active:scale-95 text-zinc-300 hover:text-zinc-100 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resetar progresso
              </button>
            )}
          </div>

          <ProgressOverview entries={allEntries} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ModeProgressCard
              title="Conjugação Prática"
              icon={PenLine}
              entries={byMode.conjugacao}
              iconBg="bg-gradient-to-tr from-brand-purple/20 to-purple-400/20 border-brand-purple/30"
              iconColor="text-brand-purple-light"
              barColor="bg-gradient-to-t from-brand-purple to-purple-400"
            />
            <ModeProgressCard
              title="Complete a Frase"
              icon={Puzzle}
              entries={byMode["complete-frase"]}
              iconBg="bg-gradient-to-tr from-teal-500/20 to-sky-400/20 border-teal-500/30"
              iconColor="text-teal-400"
              barColor="bg-gradient-to-t from-teal-500 to-sky-400"
            />
            <ModeProgressCard
              title="Correlação Verbal"
              icon={GitBranch}
              entries={byMode["correlacao-verbal"]}
              iconBg="bg-gradient-to-tr from-fuchsia-500/20 to-violet-400/20 border-fuchsia-500/30"
              iconColor="text-fuchsia-400"
              barColor="bg-gradient-to-t from-fuchsia-500 to-violet-400"
            />
            <ModeProgressCard
              title="Verbos Derivados"
              icon={Repeat}
              entries={byMode["verbos-derivados"]}
              iconBg="bg-gradient-to-tr from-emerald-500/20 to-lime-400/20 border-emerald-500/30"
              iconColor="text-emerald-400"
              barColor="bg-gradient-to-t from-emerald-500 to-lime-400"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
