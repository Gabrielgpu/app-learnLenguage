import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 border-t border-dark-border bg-dark-bg text-center text-xs text-zinc-600">
      <p>
        Gabaritando Verbos &copy; {new Date().getFullYear()} &mdash; Treinamento Inteligente de Tempos Verbais.
      </p>
    </footer>
  );
}
