"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, Zap, PenLine, Puzzle, GraduationCap, GitBranch, TrendingUp, Repeat } from "lucide-react";

const FEATURES = [
  {
    href: "/quiz",
    title: "Quiz / Simulado",
    description: "Responda simulados de múltipla escolha no estilo VUNESP, FGV e CEBRASPE, misturando os tempos verbais que quiser.",
    icon: Zap,
    iconBg: "bg-gradient-to-tr from-brand-purple/20 to-brand-cyan/20 border-brand-purple/30",
    iconColor: "text-brand-purple-light",
    shadow: "shadow-brand-purple/10",
    border: "hover:border-brand-purple/30 border-dark-border",
  },
  {
    href: "/conjugacao",
    title: "Conjugação Prática",
    description: "Escreva a conjugação correta de um verbo — sem múltipla escolha. A IA avalia sua resposta e explica o erro.",
    icon: PenLine,
    iconBg: "bg-gradient-to-tr from-brand-purple/20 to-purple-400/20 border-brand-purple/30",
    iconColor: "text-brand-purple-light",
    shadow: "shadow-brand-purple/10",
    border: "hover:border-brand-purple/30 border-dark-border",
  },
  {
    href: "/complete-frase",
    title: "Complete a Frase",
    description: "Preencha a lacuna de uma frase com a conjugação correta do verbo indicado, considerando o contexto.",
    icon: Puzzle,
    iconBg: "bg-gradient-to-tr from-teal-500/20 to-sky-400/20 border-teal-500/30",
    iconColor: "text-teal-400",
    shadow: "shadow-teal-500/10",
    border: "hover:border-teal-500/30 border-dark-border",
  },
  {
    href: "/correlacao-verbal",
    title: "Correlação Verbal",
    description: "Domine os pares de tempos verbais que combinam entre si — indicativo e subjuntivo — em frases condicionais e temporais.",
    icon: GitBranch,
    iconBg: "bg-gradient-to-tr from-fuchsia-500/20 to-violet-400/20 border-fuchsia-500/30",
    iconColor: "text-fuchsia-400",
    shadow: "shadow-fuchsia-500/10",
    border: "hover:border-fuchsia-500/30 border-dark-border",
  },
  {
    href: "/verbos-derivados",
    title: "Verbos Derivados",
    description: "Pratique repor, manter, intervir, prever e outros derivados de pôr, ter, vir e ver — todos seguem o padrão do verbo primitivo.",
    icon: Repeat,
    iconBg: "bg-gradient-to-tr from-emerald-500/20 to-lime-400/20 border-emerald-500/30",
    iconColor: "text-emerald-400",
    shadow: "shadow-emerald-500/10",
    border: "hover:border-emerald-500/30 border-dark-border",
  },
  {
    href: "/revisao",
    title: "Área de Revisão",
    description: "Consulte definições, tabelas de conjugação, exemplos e pegadinhas de concurso para os 7 tempos verbais.",
    icon: GraduationCap,
    iconBg: "bg-gradient-to-tr from-amber-500/20 to-orange-400/20 border-orange-500/30",
    iconColor: "text-orange-400",
    shadow: "shadow-orange-500/10",
    border: "hover:border-orange-500/30 border-dark-border",
  },
  {
    href: "/progresso",
    title: "Meu Progresso",
    description: "Veja o que você já domina e quais verbos/tempos merecem revisão, com repetição espaçada salva no navegador.",
    icon: TrendingUp,
    iconBg: "bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 border-brand-cyan/30",
    iconColor: "text-brand-cyan",
    shadow: "shadow-brand-cyan/10",
    border: "hover:border-brand-cyan/30 border-dark-border",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col animate-slide-up">
          {/* Intro */}
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-dark-border text-xs text-zinc-400 font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-brand-purple" />
              <span>Foco em Concursos Públicos</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-500 leading-tight">
              Domine a conjugação verbal de forma{" "}
              <span className="bg-gradient-to-r from-brand-purple-light via-brand-cyan to-brand-green bg-clip-text text-transparent">
                inteligente e dinâmica
              </span>
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Escolha um modo de estudo abaixo para começar.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className={`flex flex-col p-6 rounded-2xl border bg-dark-card transition-all cursor-pointer group shadow-lg ${feature.shadow} ${feature.border}`}
                >
                  <div
                    className={`p-3 rounded-xl border self-start mb-4 ${feature.iconBg}`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-extrabold text-zinc-100 text-lg mb-1.5 group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-grow">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-cyan">
                    Começar
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
