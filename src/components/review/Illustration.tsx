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
