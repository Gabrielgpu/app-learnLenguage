"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/lib/store";
import { Check, X, ArrowRight, HelpCircle, AlertCircle, RefreshCw, Cpu, Database, BookOpen } from "lucide-react";
import VerbReferenceDrawer from "./VerbReferenceDrawer";

export default function QuizView() {
  const {
    currentQuestion,
    currentQuestionSource,
    answers,
    loading,
    error,
    currentQuestionTense,
    verbTenses,
    submitAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuizStore();
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [prevQuestionText, setPrevQuestionText] = useState<string | null>(null);

  // Reset local state when a new question is loaded
  const currentQuestionText = currentQuestion?.question || null;
  if (currentQuestionText !== prevQuestionText) {
    setPrevQuestionText(currentQuestionText);
    setSelectedOption(null);
    setIsSubmitted(false);
  }

  if (loading && !currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] animate-fade-in">
        <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-brand-purple animate-spin mb-4" />
        <p className="text-zinc-400 text-sm font-medium">
          Gerando questão inédita via Inteligência Artificial...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] animate-fade-in text-center">
        <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-brand-red rounded-2xl mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-zinc-100 mb-2">Ops! Ocorreu um erro</h3>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{error}</p>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => { resetQuiz(); router.push("/"); }}
            className="flex-1 py-3 border border-dark-border bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-medium rounded-xl text-sm transition-all cursor-pointer"
          >
            Voltar ao Menu
          </button>
          <button
            onClick={nextQuestion}
            className="flex-1 py-3 bg-brand-purple hover:bg-brand-purple-light text-zinc-950 font-bold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const currentNumber = answers.length + (isSubmitted ? 0 : 1);
  const totalQuestions = 5;
  const progressPercent = (currentNumber / totalQuestions) * 100;

  const handleConfirm = () => {
    if (!selectedOption || isSubmitted) return;
    setIsSubmitted(true);
    submitAnswer(selectedOption);
  };

  const handleNext = () => {
    nextQuestion();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10 flex flex-col animate-slide-up">
      {/* Progress & Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-zinc-400">
          Questão <span className="text-brand-cyan">{currentNumber}</span> de {totalQuestions}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dark-border bg-zinc-900/40 text-[10px] text-zinc-400 font-medium">
          {currentQuestionSource === "grok" ? (
            <>
              <Cpu className="w-3 h-3 text-brand-purple" />
              <span>Grok AI</span>
            </>
          ) : currentQuestionSource === "gemini" ? (
            <>
              <Cpu className="w-3 h-3 text-brand-cyan" />
              <span>Gemini AI</span>
            </>
          ) : currentQuestionSource === "openai" ? (
            <>
              <Cpu className="w-3 h-3 text-brand-green" />
              <span>OpenAI</span>
            </>
          ) : currentQuestionSource === "cache" ? (
            <>
              <Database className="w-3 h-3 text-brand-cyan" />
              <span>Biblioteca</span>
            </>
          ) : (
            <>
              <Database className="w-3 h-3 text-amber-500" />
              <span>Banco Local</span>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="border border-dark-border bg-dark-card rounded-2xl p-5 md:p-6 shadow-xl mb-6">
        <div className="flex gap-3 items-start mb-4">
          <div className="p-1.5 bg-zinc-900 rounded-lg text-zinc-500 shrink-0 mt-0.5">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <span className="text-xs font-bold tracking-wider text-brand-purple uppercase">
            {currentQuestionTense}
          </span>
        </div>
        <p className="text-zinc-100 text-sm md:text-base font-semibold leading-relaxed whitespace-pre-wrap">
          {currentQuestion.question}
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((opt, index) => {
          const letter = ["A", "B", "C", "D", "E"][index];
          const isSelected = selectedOption === letter;
          const isCorrect = currentQuestion.correctAnswer === letter;

          // Clean up prefix if the option already contains it to avoid duplication (e.g. "A) ...")
          const cleanOption = (text: string, ltr: string) => {
            const prefixRegex = new RegExp(`^\\s*${ltr}\\s*\\)?\\s*[-.:]?\\s*`, "i");
            return text.replace(prefixRegex, "");
          };
          const optionText = `${letter}) ${cleanOption(opt, letter)}`;

          let btnClass = "border-dark-border hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/80 text-zinc-300";
          let iconElement = null;

          if (isSubmitted) {
            if (isCorrect) {
              btnClass = "border-brand-green bg-brand-green/10 text-brand-green font-semibold";
              iconElement = <Check className="w-4 h-4 shrink-0 text-brand-green stroke-[3]" />;
            } else if (isSelected) {
              btnClass = "border-brand-red bg-brand-red/10 text-brand-red font-semibold";
              iconElement = <X className="w-4 h-4 shrink-0 text-brand-red stroke-[3]" />;
            } else {
              btnClass = "border-dark-border bg-zinc-900/20 text-zinc-500 opacity-60";
            }
          } else if (isSelected) {
            btnClass = "border-brand-purple bg-brand-purple/5 text-zinc-100 font-semibold ring-1 ring-brand-purple";
          }

          return (
            <button
              key={letter}
              disabled={isSubmitted}
              onClick={() => setSelectedOption(letter)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm transition-all ${
                !isSubmitted ? "cursor-pointer active:scale-[0.99]" : ""
              } ${btnClass}`}
            >
              <span className="leading-relaxed">{optionText}</span>
              {iconElement}
            </button>
          );
        })}
      </div>

      {/* Explanation & Action Panel */}
      {isSubmitted ? (
        <div className="space-y-6 animate-fade-in">
          {/* Explanation Card */}
          <div className="border border-dark-border bg-zinc-900/40 rounded-2xl p-5 md:p-6 text-sm">
            <h4 className="font-bold text-zinc-200 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full bg-brand-cyan" />
              Explicação Gramatical:
            </h4>
            <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
              {currentQuestion.explanation}
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-95 active:scale-95 text-zinc-950 font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-xl shadow-brand-purple/5"
          >
            {answers.length >= totalQuestions ? "Ver Resultado" : "Próxima Questão"}
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleConfirm}
          disabled={!selectedOption}
          className="w-full py-4 bg-zinc-100 hover:bg-zinc-200 active:scale-95 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
        >
          Confirmar Resposta
        </button>
      )}

      {/* Floating Action Button to Review Conjugations */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-zinc-900/90 border border-dark-border hover:border-brand-purple/40 hover:bg-zinc-800 text-zinc-100 font-extrabold text-xs rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md animate-fade-in"
      >
        <BookOpen className="w-4 h-4 text-brand-purple-light" />
        <span>Revisar Conjugação</span>
      </button>

      {/* Conjugation Review Drawer */}
      <VerbReferenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedTenses={verbTenses}
      />
    </div>
  );
}
