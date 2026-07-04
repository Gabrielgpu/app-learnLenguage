"use client";

import React from "react";
import { VerbTenseInfo } from "@/data/types";
import Illustration from "./Illustration";
import SummaryCard from "./SummaryCard";
import ConjugationTable from "./ConjugationTable";
import ExamplesPanel from "./ExamplesPanel";
import TipsPanel from "./TipsPanel";
import ContestTipsPanel from "./ContestTipsPanel";

interface ReviewContentProps {
  activeItem: string;
  info: VerbTenseInfo;
}

export default function ReviewContent({ activeItem, info }: ReviewContentProps) {
  // Render corresponding subcomponent
  const renderActivePanel = () => {
    switch (activeItem) {
      case "summary":
        return <SummaryCard info={info} />;
      case "conjugation":
        return <ConjugationTable info={info} />;
      case "examples":
        return <ExamplesPanel info={info} />;
      case "traps":
        return <TipsPanel info={info} />;
      case "contest":
        return <ContestTipsPanel info={info} />;
      default:
        return <SummaryCard info={info} />;
    }
  };

  return (
    <div className="space-y-6 w-full flex flex-col h-full">
      {/* Hero Card */}
      <div className="relative p-5 sm:p-6 bg-gradient-to-br from-zinc-900/90 to-zinc-950/95 border border-dark-border rounded-2xl shadow-xl flex items-center justify-between gap-6 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Hero text */}
        <div className="space-y-1.5 flex-1 relative z-10">
          <h3 className="text-base sm:text-lg font-extrabold text-zinc-100 bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text">
            {info.title}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
            {info.description}
          </p>
        </div>

        {/* Hero illustration (~20% width) */}
        <div className="w-[20%] shrink-0 flex justify-end items-center relative z-10">
          <Illustration tenseId={info.id} />
        </div>
      </div>

      {/* Active panel content */}
      <div className="flex-1 w-full bg-dark-card border border-dark-border rounded-2xl p-5 sm:p-6 shadow-2xl">
        {renderActivePanel()}
      </div>
    </div>
  );
}
