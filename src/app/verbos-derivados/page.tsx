"use client";

import { useDerivedVerbStore } from "@/lib/derivedVerbStore";
import { useMounted } from "@/lib/useMounted";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppSkeleton from "@/components/AppSkeleton";
import DerivedVerbStartView from "@/components/derived-verb/DerivedVerbStartView";
import DerivedVerbView from "@/components/derived-verb/DerivedVerbView";
import DerivedVerbResult from "@/components/derived-verb/DerivedVerbResult";

export default function VerbosDerivadosPage() {
  const { phase } = useDerivedVerbStore();
  const mounted = useMounted();

  if (!mounted) return <AppSkeleton />;

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12">
        {phase === "home" && <DerivedVerbStartView />}
        {phase === "derived-verb-exercise" && <DerivedVerbView />}
        {phase === "derived-verb-result" && <DerivedVerbResult />}
      </main>
      <Footer />
    </div>
  );
}
