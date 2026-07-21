"use client";

import React, { useState } from "react";
import { VerbTenseInfo } from "@/data/types";

import QuickTipCard from "./QuickTipCard";

interface ConjugationTableProps {
  info: VerbTenseInfo;
}

export default function ConjugationTable({ info }: ConjugationTableProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Derive quick tip based on the verb tense
  let quickTip = "";
  if (info.id === "Presente do Indicativo") {
    quickTip = "Verbos terminados em -ear (como passear, nomear) também ganham um 'i' nas formas rizotônicas (Eu passeio, ele passeia, eles passeiam), mas não se confundem com a regra do M.A.R.I.O. dos verbos terminados em -iar.";
  } else if (info.id === "Pretérito Perfeito") {
    quickTip = "O radical da 2ª pessoa do plural (Vós) sempre se apoia no radical da 2ª pessoa do singular (Tu) adicionando-se um 's' no final (Tu cantaste + s = Vós cantastes; Tu fizeste + s = Vós fizestes).";
  } else if (info.id === "Pretérito Imperfeito") {
    quickTip = "As desinências -ávamos e -áveis da 1ª conjugação, assim como -íamos e -íeis da 2ª/3ª conjugação, são SEMPRE acentuadas graficamente por serem proparoxítonas ou paroxítonas terminadas em ditongo.";
  } else if (info.id === "Pretérito Mais-que-perfeito") {
    quickTip = "As formas de 1ª e 2ª pessoa do plural (Nós e Vós) do Pretérito Mais-que-perfeito simples do Indicativo são proparoxítonas e por isso sempre levam acento gráfico (áramos/áreis, êramos/êreis, íramos/íreis).";
  } else if (info.id === "Futuro do Presente") {
    quickTip = "As terminações do Futuro do Presente (-rei, -rás, -rá, -remos, -reis, -rão) são sempre adicionadas ao infinitivo COMPLETO do verbo, e não ao radical — por isso são idênticas nas três conjugações.";
  } else if (info.id === "Futuro do Pretérito") {
    quickTip = "Assim como no Futuro do Presente, as terminações (-ria, -rias, -ria, -ríamos, -ríeis, -riam) somam-se ao infinitivo completo. Os mesmos verbos irregulares (dizer, fazer, trazer) mantêm o radical contraído: diria, faria, traria.";
  } else if (info.id === "Futuro do Subjuntivo") {
    quickTip = "Para formar o Futuro do Subjuntivo, parta da 3ª pessoa do plural do Pretérito Perfeito e retire o '-am' (fizeram → fizer-, trouxeram → trouxer-, vieram → vier-) antes de acrescentar as desinências -, -es, -, -mos, -des, -em.";
  } else {
    quickTip = "Revise as desinências regulares antes de realizar exercícios práticos para fixar as terminações padrão.";
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-3">
        {/* Tabs header */}
        <div className="flex bg-zinc-900/60 p-1 rounded-xl border border-dark-border">
          {info.groups.map((group, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === idx
                  ? "bg-brand-purple text-zinc-950 shadow-md shadow-brand-purple/10 scale-[1.02]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {group.conjugation.split(" ")[0]} {/* Ex: "-AR" */}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-zinc-900/30 border border-dark-border/50 rounded-xl overflow-hidden shadow-inner">
          <div className="bg-zinc-900/50 px-4 py-2 border-b border-dark-border/50 text-[10px] uppercase font-bold tracking-wider text-zinc-500 flex justify-between">
            <span>Pessoa</span>
            <span>{info.id === "Futuro do Subjuntivo" ? "Exemplo com 'Se'" : "Terminação regular"}</span>
          </div>
          <div className="divide-y divide-dark-border/30">
            {info.groups[activeTab].endings.map((ending, idx) => (
              <div
                key={idx}
                className="px-4 py-3 flex justify-between items-center text-xs sm:text-sm hover:bg-zinc-900/20 transition-colors"
              >
                <span className="font-semibold text-zinc-300">{ending.person}</span>
                <span className="font-mono text-brand-cyan bg-zinc-900/80 px-2 py-0.5 rounded border border-dark-border/50 font-bold">
                  {ending.ending}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Tip Card */}
      <QuickTipCard tip={quickTip} />
    </div>
  );
}
