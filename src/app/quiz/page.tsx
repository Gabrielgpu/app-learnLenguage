"use client";

import { useQuizStore } from "@/lib/store";
import { useMounted } from "@/lib/useMounted";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppSkeleton from "@/components/AppSkeleton";
import QuizStartView from "@/components/QuizStartView";
import QuizView from "@/components/QuizView";
import ResultView from "@/components/ResultView";

export default function QuizPage() {
  const { phase } = useQuizStore();
  const mounted = useMounted();

  if (!mounted) return <AppSkeleton />;

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12">
        {phase === "home" && <QuizStartView />}
        {phase === "quiz" && <QuizView />}
        {phase === "result" && <ResultView />}
      </main>
      <Footer />
    </div>
  );
}
