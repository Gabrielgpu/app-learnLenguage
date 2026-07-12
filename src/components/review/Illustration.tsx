"use client";

import React from "react";

interface IllustrationProps {
  tenseId: string;
}

export default function Illustration({ tenseId }: IllustrationProps) {
  // Render clean inline SVG based on the verb tense
  if (tenseId === "Presente do Indicativo") {
    // Open book with glowing pages representing present study/facts
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto text-brand-purple max-w-[80px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="book-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8257e5" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>
        </defs>
        {/* Book pages outline */}
        <path
          d="M12,85 C30,85 45,75 50,70 C55,75 70,85 88,85 L88,25 C70,25 55,20 50,15 C45,20 30,25 12,25 Z"
          stroke="url(#book-grad)"
          strokeWidth="3"
        />
        {/* Center binder */}
        <line x1="50" y1="15" x2="50" y2="70" stroke="#8257e5" />
        {/* Page lines */}
        <path d="M22,38 H38 M22,48 H38 M22,58 H34" opacity="0.6" strokeWidth="2" />
        <path d="M62,38 H78 M62,48 H78 M62,58 H74" opacity="0.6" strokeWidth="2" />
        {/* Sparkle/Glow dots */}
        <circle cx="50" cy="82" r="3" fill="#00e5ff" opacity="0.8" />
        <circle cx="28" cy="18" r="2" fill="#8257e5" opacity="0.8" />
        <circle cx="72" cy="16" r="2.5" fill="#00e5ff" opacity="0.8" />
      </svg>
    );
  }

  if (tenseId === "Pretérito Perfeito") {
    // Certificate/diploma with a ribbon representing completed actions
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto text-brand-cyan max-w-[80px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="cert-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#04d361" />
          </linearGradient>
        </defs>
        {/* Diploma roll shape */}
        <rect
          x="18"
          y="15"
          width="64"
          height="54"
          rx="4"
          stroke="url(#cert-grad)"
          strokeWidth="3"
        />
        {/* Lines inside */}
        <path d="M30,28 H70 M30,38 H70 M30,48 H58" opacity="0.6" strokeWidth="2" />
        {/* Seal circle */}
        <circle cx="70" cy="58" r="8" fill="#04d361" opacity="0.2" stroke="#04d361" strokeWidth="2" />
        {/* Seal ribbons */}
        <path d="M68,66 L64,85 L70,80 L76,85 L72,66" stroke="#04d361" strokeWidth="2" />
        {/* Sparkles */}
        <circle cx="25" cy="78" r="2" fill="#04d361" opacity="0.8" />
        <circle cx="82" cy="25" r="2.5" fill="#00e5ff" opacity="0.8" />
      </svg>
    );
  }

  if (tenseId === "Pretérito Mais-que-perfeito") {
    // Hourglass/Chronology timeline representing actions before other actions
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto text-amber-500 max-w-[80px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="past-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        {/* Timeline Horizontal Line */}
        <line x1="15" y1="50" x2="85" y2="50" stroke="url(#past-grad)" strokeWidth="3" />
        <path d="M80,45 L85,50 L80,55" stroke="url(#past-grad)" strokeWidth="3" />
        
        {/* Two events on the timeline */}
        <circle cx="35" cy="50" r="7" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2.5" />
        <circle cx="35" cy="50" r="2.5" fill="#ef4444" />
        <path d="M35,38 L35,25" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
        
        <circle cx="65" cy="50" r="7" fill="#f59e0b" opacity="0.3" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="65" cy="50" r="2.5" fill="#f59e0b" />
        <path d="M65,38 L65,25" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />

        {/* Curved arrow from later event back to earlier event */}
        <path d="M65,20 C55,10 45,10 35,20" stroke="url(#past-grad)" strokeWidth="2" />
        <path d="M40,20 L35,20 L35,15" stroke="url(#past-grad)" strokeWidth="2" />

        {/* Sparkle */}
        <circle cx="80" cy="25" r="2" fill="#f59e0b" opacity="0.8" />
      </svg>
    );
  }

  if (tenseId === "Futuro do Presente") {
    // Rocket/arrow launching forward representing certain future facts
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto text-emerald-500 max-w-[80px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="future-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        {/* Ascending arrow path */}
        <path d="M15,80 L45,50 L60,65 L85,20" stroke="url(#future-grad)" strokeWidth="3" />
        {/* Arrowhead */}
        <path d="M68,18 L85,20 L83,37" stroke="url(#future-grad)" strokeWidth="3" />
        {/* Trail dots */}
        <circle cx="45" cy="50" r="3" fill="#10b981" opacity="0.6" />
        <circle cx="60" cy="65" r="3" fill="#22c55e" opacity="0.6" />
        {/* Sparkle */}
        <circle cx="22" cy="30" r="2" fill="#22c55e" opacity="0.8" />
        <circle cx="80" cy="45" r="2" fill="#10b981" opacity="0.8" />
      </svg>
    );
  }

  if (tenseId === "Futuro do Pretérito") {
    // Thought bubble with a question mark representing hypothesis/condition
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto text-indigo-500 max-w-[80px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="cond-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {/* Thought bubble */}
        <ellipse cx="52" cy="38" rx="34" ry="26" stroke="url(#cond-grad)" strokeWidth="3" />
        {/* Trailing bubbles */}
        <circle cx="28" cy="70" r="5" stroke="#6366f1" strokeWidth="2.5" />
        <circle cx="18" cy="82" r="2.5" fill="#a78bfa" opacity="0.7" />
        {/* Question mark inside */}
        <path d="M44,30 C44,22 60,22 60,30 C60,36 52,36 52,44" strokeWidth="3" />
        <circle cx="52" cy="52" r="1.8" fill="currentColor" />
      </svg>
    );
  }

  if (tenseId === "Futuro do Subjuntivo") {
    // Forked path representing conditional/subordinate future clauses
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto text-teal-500 max-w-[80px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="fork-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        {/* Trunk */}
        <path d="M50,88 L50,55" stroke="url(#fork-grad)" strokeWidth="3" />
        {/* Fork branches */}
        <path d="M50,55 C50,40 30,40 25,20" stroke="url(#fork-grad)" strokeWidth="3" />
        <path d="M50,55 C50,40 70,40 75,20" stroke="url(#fork-grad)" strokeWidth="3" />
        {/* Nodes */}
        <circle cx="50" cy="88" r="4" fill="#14b8a6" />
        <circle cx="25" cy="20" r="4" fill="#38bdf8" opacity="0.8" />
        <circle cx="75" cy="20" r="4" fill="#38bdf8" opacity="0.8" />
        {/* Sparkle */}
        <circle cx="60" cy="65" r="2" fill="#14b8a6" opacity="0.8" />
      </svg>
    );
  }

  // Pretérito Imperfeito: Quill/feather drawing a wavy line (habits/duration)
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-auto text-pink-500 max-w-[80px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="quill-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#8257e5" />
        </linearGradient>
      </defs>
      {/* Quill feather path */}
      <path
        d="M75,20 C65,30 45,60 40,75 C42,76 44,76 45,74 C60,65 85,40 90,25 C92,20 80,15 75,20 Z"
        stroke="url(#quill-grad)"
        strokeWidth="3"
      />
      {/* Center line of feather */}
      <path d="M78,22 C67,35 50,55 42,70" stroke="#f43f5e" />
      {/* Tip pointing down-left */}
      <path d="M40,75 L30,85" stroke="#f43f5e" strokeWidth="2.5" />
      {/* Continuous wavy line drawn on the ground */}
      <path
        d="M10,85 C20,80 30,90 45,85"
        stroke="url(#quill-grad)"
        strokeWidth="2"
        strokeDasharray="1,1"
        opacity="0.8"
      />
      <path
        d="M10,85 Q25,75 35,85"
        stroke="url(#quill-grad)"
        strokeWidth="2"
        opacity="0.9"
      />
      {/* Little star */}
      <path d="M18,30 L22,34 L26,30 L22,26 Z" fill="#8257e5" opacity="0.6" />
    </svg>
  );
}
