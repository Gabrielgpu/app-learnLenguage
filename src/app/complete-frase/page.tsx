"use client";

import { useFillBlankStore } from "@/lib/fillBlankStore";
import { useMounted } from "@/lib/useMounted";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppSkeleton from "@/components/AppSkeleton";
import FillBlankStartView from "@/components/fillblank/FillBlankStartView";
import FillBlankView from "@/components/fillblank/FillBlankView";
import FillBlankResult from "@/components/fillblank/FillBlankResult";

export default function CompleteFrasePage() {
  const { phase } = useFillBlankStore();
  const mounted = useMounted();

  if (!mounted) return <AppSkeleton />;

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12">
        {phase === "home" && <FillBlankStartView />}
        {phase === "fillblank-exercise" && <FillBlankView />}
        {phase === "fillblank-result" && <FillBlankResult />}
      </main>
      <Footer />
    </div>
  );
}
