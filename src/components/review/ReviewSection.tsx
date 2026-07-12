"use client";

import React, { useState } from "react";
import { verbTenseReferences } from "@/data";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import ReviewSidebar, { sidebarItems } from "./ReviewSidebar";
import ReviewContent from "./ReviewContent";
import SummaryCard from "./SummaryCard";
import ConjugationTable from "./ConjugationTable";
import ExamplesPanel from "./ExamplesPanel";
import TipsPanel from "./TipsPanel";
import ContestTipsPanel from "./ContestTipsPanel";

interface ReviewSectionProps {
  selectedTenses: string[];
  activeTense: string;
  onSelectTense: (tense: string) => void;
}

// Full tense names are too long to fit side by side as tabs, but abbreviating
// to just the first word makes tenses that share a prefix (e.g. the three
// "Pretérito" tenses) look identical. These short forms stay distinguishable.
const TENSE_TAB_LABELS: Record<string, string> = {
  "Presente do Indicativo": "Presente",
  "Pretérito Perfeito": "Pret. Perfeito",
  "Pretérito Imperfeito": "Pret. Imperfeito",
  "Pretérito Mais-que-perfeito": "Mais-que-perfeito",
  "Futuro do Presente": "Fut. Presente",
  "Futuro do Pretérito": "Fut. Pretérito",
  "Futuro do Subjuntivo": "Fut. Subjuntivo",
};

export default function ReviewSection({
  selectedTenses,
  activeTense,
  onSelectTense,
}: ReviewSectionProps) {
  const [activeItem, setActiveItem] = useState<string>("summary");
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>("summary");

  const info = verbTenseReferences[activeTense];

  if (!info) return null;

  const toggleAccordion = (id: string) => {
    if (expandedAccordion === id) {
      setExpandedAccordion(null);
    } else {
      setExpandedAccordion(id);
    }
  };

  // Render content block for accordion on mobile
  const renderAccordionContent = (id: string) => {
    switch (id) {
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
        return null;
    }
  };

  return (
    <div className="w-full space-y-6 animate-slide-up">
      {/* Visual Separation Divider */}
      <div className="space-y-4">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          {/* Header text */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-purple" />
            <h3 className="font-extrabold text-sm sm:text-base text-zinc-200 tracking-tight uppercase">
              Área de Revisão
            </h3>
          </div>

          {/* Active Verb Tense Selector Tabs if multiple selected */}
          {selectedTenses.length > 1 && (
            <div className="flex flex-wrap gap-1 bg-zinc-900/60 p-1 rounded-xl border border-dark-border self-start sm:self-auto">
              {selectedTenses.map((tense) => (
                <button
                  key={tense}
                  onClick={() => onSelectTense(tense)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTense === tense
                      ? "bg-zinc-800 text-zinc-100 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {TENSE_TAB_LABELS[tense] ?? tense}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="w-full">
        {/* Desktop Split Layout (md and up) */}
        <div className="hidden md:grid grid-cols-12 gap-6 items-start">
          {/* Left Sidebar (25% width) */}
          <div className="col-span-3 sticky top-20">
            <ReviewSidebar activeItem={activeItem} onSelect={setActiveItem} />
          </div>

          {/* Right Content Panel (75% width) */}
          <div className="col-span-9">
            <ReviewContent activeItem={activeItem} info={info} />
          </div>
        </div>

        {/* Mobile / Tablet Accordion Layout (below md) */}
        <div className="block md:hidden space-y-3">
          {/* Header Card (Hero) at the top of the mobile section */}
          <div className="p-4 bg-gradient-to-br from-zinc-900/90 to-zinc-950/95 border border-dark-border rounded-2xl flex items-center justify-between gap-4 overflow-hidden mb-2">
            <div className="space-y-1 flex-1">
              <h3 className="text-sm font-extrabold text-zinc-100">
                {info.title}
              </h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-semibold">
                {info.description}
              </p>
            </div>
            <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-zinc-900/50 rounded-xl border border-dark-border">
              <BookOpen className="w-5 h-5 text-brand-purple" />
            </div>
          </div>

          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedAccordion === item.id;

            return (
              <div
                key={item.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "bg-dark-card border-brand-purple/40 shadow-lg shadow-brand-purple/5"
                    : "bg-dark-card/50 border-dark-border hover:border-zinc-800"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between p-4 text-xs font-bold text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg border transition-all ${
                        isExpanded
                          ? "bg-brand-purple/10 border-brand-purple/20 text-brand-purple-light"
                          : "bg-zinc-900/50 border-dark-border text-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <span className={isExpanded ? "text-zinc-100" : "text-zinc-300"}>
                      {item.label}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>

                {/* Accordion Expanded Content */}
                {isExpanded && (
                  <div className="p-4 border-t border-dark-border/40 bg-zinc-950/20 animate-fade-in">
                    {renderAccordionContent(item.id)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
