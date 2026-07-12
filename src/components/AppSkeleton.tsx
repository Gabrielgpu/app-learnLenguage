import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function AppSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-zinc-100 font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-12" />
      <Footer />
    </div>
  );
}
