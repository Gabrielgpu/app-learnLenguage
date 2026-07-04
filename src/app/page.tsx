"use client";

import React, { useState, useEffect } from "react";
import { useQuizStore } from "@/lib/store";
import { useConjugationStore } from "@/lib/conjugationStore";
import Header from "@/components/Header";
import HomeView from "@/components/HomeView";
import QuizView from "@/components/QuizView";
import ResultView from "@/components/ResultView";
import ConjugationView from "@/components/conjugation/ConjugationView";
import ConjugationResult from "@/components/conjugation/ConjugationResult";

export default function Home() {
  const { phase: quizPhase } = useQuizStore();
  const { phase: conjugationPhase } = useConjugationStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timeoutId);
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

  // Conjugation mode takes priority when active
  const isConjugationActive = conjugationPhase !== "home";

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12">
        {isConjugationActive ? (
          <>
            {conjugationPhase === "conjugation-exercise" && <ConjugationView />}
            {conjugationPhase === "conjugation-result" && <ConjugationResult />}
          </>
        ) : (
          <>
            {quizPhase === "home" && <HomeView />}
            {quizPhase === "quiz" && <QuizView />}
            {quizPhase === "result" && <ResultView />}
          </>
        )}
      </main>

      <footer className="py-6 border-t border-dark-border bg-dark-bg text-center text-xs text-zinc-600">
        <p>
          Gabaritando Verbos &copy; {new Date().getFullYear()} &mdash; Treinamento Inteligente de Tempos Verbais.
        </p>
      </footer>
    </div>
  );
}
