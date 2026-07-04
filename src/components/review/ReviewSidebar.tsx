"use client";

import React from "react";
import { BookOpen, Layers, MessageSquare, AlertTriangle, Target } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const sidebarItems: SidebarItem[] = [
  { id: "summary", label: "Resumo", icon: BookOpen },
  { id: "conjugation", label: "Conjugação", icon: Layers },
  { id: "examples", label: "Exemplos", icon: MessageSquare },
  { id: "traps", label: "Pegadinhas", icon: AlertTriangle },
  { id: "contest", label: "Dicas para Concurso", icon: Target },
];

interface ReviewSidebarProps {
  activeItem: string;
  onSelect: (item: string) => void;
}

export default function ReviewSidebar({ activeItem, onSelect }: ReviewSidebarProps) {
  return (
    <nav className="flex flex-col gap-1 w-full">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
              isActive
                ? "bg-brand-purple text-zinc-950 shadow-lg shadow-brand-purple/10 scale-[1.01]"
                : "text-zinc-400 hover:text-zinc-200 bg-zinc-900/10 hover:bg-zinc-900/40 border border-transparent hover:border-dark-border/60"
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-zinc-950" : "text-zinc-500"}`} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
