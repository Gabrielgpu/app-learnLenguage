"use client";

import { useConjugationStore } from "@/lib/conjugationStore";
import { useMounted } from "@/lib/useMounted";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppSkeleton from "@/components/AppSkeleton";
import ConjugationStartView from "@/components/conjugation/ConjugationStartView";
import ConjugationView from "@/components/conjugation/ConjugationView";
import ConjugationResult from "@/components/conjugation/ConjugationResult";

export default function ConjugacaoPage() {
  const { phase } = useConjugationStore();
  const mounted = useMounted();

  if (!mounted) return <AppSkeleton />;

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12">
        {phase === "home" && <ConjugationStartView />}
        {phase === "conjugation-exercise" && <ConjugationView />}
        {phase === "conjugation-result" && <ConjugationResult />}
      </main>
      <Footer />
    </div>
  );
}
