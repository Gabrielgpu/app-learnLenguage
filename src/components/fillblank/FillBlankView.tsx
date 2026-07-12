"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFillBlankStore } from "@/lib/fillBlankStore";
import { AlertCircle, RefreshCw, Cpu, Database, Puzzle } from "lucide-react";
import { BLANK_PLACEHOLDER } from "@/lib/fillBlankTypes";
import FillBlankFeedback from "./FillBlankFeedback";

const TOTAL_EXERCISES = 5;

export default function FillBlankView() {
  const {
    currentExercise,
    currentExerciseSource,
    answers,
    loading,
    error,
    submitFillBlank,
    nextFillBlank,
    resetFillBlank,
  } = useFillBlankStore();
  const router = useRouter();

  const [userInput, setUserInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [prevSentence, setPrevSentence] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentSentence = currentExercise?.sentence ?? null;
  if (currentSentence !== prevSentence) {
    setPrevSentence(currentSentence);
    setUserInput("");
    setIsSubmitted(false);
  }

  useEffect(() => {
    if (currentExercise && !isSubmitted) {
      inputRef.current?.focus();
    }
  }, [currentExercise, isSubmitted]);

  const handleSubmit = async () => {
    if (!userInput.trim() || isSubmitted) return;
    setIsSubmitted(true);
    await submitFillBlank(userInput.trim());
  };

  const handleNext = () => {
    nextFillBlank();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSubmitted) {
      handleSubmit();
    }
  };

  const currentNumber = answers.length + (isSubmitted ? 0 : 1);
  const progressPercent = (currentNumber / TOTAL_EXERCISES) * 100;
  const lastAnswer = isSubmitted ? answers[answers.length - 1] : null;

  if (loading && !currentExercise) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] animate-fade-in">
        <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-brand-purple animate-spin mb-4" />
        <p className="text-zinc-400 text-sm font-medium">
          Gerando exercício de Complete a Frase...
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
            onClick={() => { resetFillBlank(); router.push("/"); }}
            className="flex-1 py-3 border border-dark-border bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-medium rounded-xl text-sm transition-all cursor-pointer"
          >
            Voltar ao Menu
          </button>
          <button
            onClick={nextFillBlank}
            className="flex-1 py-3 bg-brand-purple hover:bg-brand-purple-light text-zinc-950 font-bold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!currentExercise) return null;

  const [before, after] = currentExercise.sentence.split(BLANK_PLACEHOLDER);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 flex flex-col animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-zinc-400">
          Exercício <span className="text-brand-cyan">{currentNumber}</span> de {TOTAL_EXERCISES}
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dark-border bg-zinc-900/40 text-[10px] text-zinc-400 font-medium">
          {currentExerciseSource === "grok" ? (
            <>
              <Cpu className="w-3 h-3 text-brand-purple" />
              <span>Grok AI</span>
            </>
          ) : currentExerciseSource === "gemini" ? (
            <>
              <Cpu className="w-3 h-3 text-brand-cyan" />
              <span>Gemini AI</span>
            </>
          ) : currentExerciseSource === "openai" ? (
            <>
              <Cpu className="w-3 h-3 text-brand-green" />
              <span>OpenAI</span>
            </>
          ) : (
            <>
              <Database className="w-3 h-3 text-amber-500" />
              <span>Banco Local</span>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="border border-dark-border bg-dark-card rounded-2xl p-6 shadow-xl mb-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-1.5 bg-zinc-900 rounded-lg text-zinc-500 shrink-0">
            <Puzzle className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold tracking-wider text-brand-purple uppercase">
            Complete a frase
          </span>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
              Verbo
            </p>
            <p className="text-lg font-black tracking-tight text-zinc-100 font-mono">
              {currentExercise.verb.toUpperCase()}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
              Tempo Verbal
            </p>
            <p className="text-sm font-bold text-brand-cyan text-right leading-tight">
              {currentExercise.tense}
            </p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed mb-6 p-4 rounded-xl bg-zinc-900/60 border border-dark-border">
          {before}
          <span className="inline-block min-w-[80px] border-b-2 border-brand-purple text-transparent select-none">
            {BLANK_PLACEHOLDER}
          </span>
          {after}
        </p>

        {!isSubmitted ? (
          <div className="space-y-4">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite a conjugação que preenche a lacuna..."
              className="w-full px-4 py-4 rounded-xl border border-dark-border bg-zinc-900/60 text-zinc-100 font-mono text-lg font-bold placeholder:text-zinc-600 placeholder:font-normal outline-none focus:border-brand-purple/60 focus:ring-1 focus:ring-brand-purple/30 transition-all"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />

            <button
              onClick={handleSubmit}
              disabled={!userInput.trim() || loading}
              className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 active:scale-95 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-zinc-600 border-t-zinc-300 animate-spin" />
              ) : (
                "Verificar"
              )}
            </button>
          </div>
        ) : null}
      </div>

      {isSubmitted && lastAnswer && (
        <FillBlankFeedback
          answer={lastAnswer}
          onNext={handleNext}
          questionNumber={currentNumber}
          totalQuestions={TOTAL_EXERCISES}
        />
      )}
    </div>
  );
}
