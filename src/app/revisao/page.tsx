"use client";

import { useState } from "react";
import { useMounted } from "@/lib/useMounted";
import { ALL_TENSE_IDS } from "@/lib/tenseOptions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppSkeleton from "@/components/AppSkeleton";
import ReviewSection from "@/components/review/ReviewSection";

export default function RevisaoPage() {
  const mounted = useMounted();
  const [activeTense, setActiveTense] = useState<string>(ALL_TENSE_IDS[0]);

  if (!mounted) return <AppSkeleton />;

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12 pt-8">
        <ReviewSection
          selectedTenses={ALL_TENSE_IDS}
          activeTense={activeTense}
          onSelectTense={setActiveTense}
        />
      </main>
      <Footer />
    </div>
  );
}
