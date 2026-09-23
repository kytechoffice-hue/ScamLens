"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname === "/" || pathname === "/dashboard";

  if (isDashboardRoute) {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  return (
    <div className="relative z-10 flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
