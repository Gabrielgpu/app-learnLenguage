"use client";

import React, { useState, useEffect } from "react";
import { useQuizStore } from "@/lib/store";
import Header from "@/components/Header";
import HomeView from "@/components/HomeView";
import QuizView from "@/components/QuizView";
import ResultView from "@/components/ResultView";

export default function Home() {
  const { phase } = useQuizStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
        <Header />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12" />
        <footer className="py-6 border-t border-dark-border bg-dark-bg text-center text-xs text-zinc-600">
          <p>
            Gabaritando Verbos &copy; {new Date().getFullYear()} &mdash; Treinamento Inteligente de Tempos Verbais.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12">
        {phase === "home" && <HomeView />}
        {phase === "quiz" && <QuizView />}
        {phase === "result" && <ResultView />}
      </main>

      <footer className="py-6 border-t border-dark-border bg-dark-bg text-center text-xs text-zinc-600">
        <p>
          Gabaritando Verbos &copy; {new Date().getFullYear()} &mdash; Treinamento Inteligente de Tempos Verbais.
        </p>
      </footer>
    </div>
  );
}
