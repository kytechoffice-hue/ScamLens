"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home,
  Search, 
  Globe,
  PlusCircle, 
  BookOpen,
  LogIn,
  Menu, 
  X, 
  Radio,
  ShieldAlert,
  Database
} from "lucide-react";
import { MOCK_RECENT_TICKER } from "@/data/mockData";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Cycle threat ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % MOCK_RECENT_TICKER.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Scam Directory", href: "/scams", icon: Search },
    { name: "Check Website", href: "/check", icon: Globe },
    { name: "Learn", href: "/learn", icon: BookOpen },
  ];

  const currentTicker = MOCK_RECENT_TICKER[tickerIndex];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/95 border-b border-slate-200/80 shadow-xs transition-colors">
      {/* Top Threat Alert Ticker (Light style) */}
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-semibold tracking-wider uppercase text-[10px] text-red-400 flex items-center gap-1 font-mono">
              <Radio className="w-3 h-3 animate-pulse" /> Live Threat Feed
            </span>
          </div>

          <div className="truncate text-slate-300 transition-all duration-500 flex-1 text-center font-mono text-[11px] sm:text-xs">
            <span className="text-amber-400 font-semibold mr-1.5">[{currentTicker.time}]</span>
            <span>{currentTicker.text}</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 shrink-0 font-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>All Heuristic Engines Online</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Official Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full bg-white p-0.5 shadow-md shadow-slate-200 border-2 border-amber-500/30 flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-amber-500 transition-all">
              <Image 
                src="/logo.png" 
                alt="ScamLens Official Logo" 
                width={40} 
                height={40} 
                className="w-full h-full object-contain rounded-full"
                priority
              />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-[#0a2540] flex items-center gap-1.5">
                Scam<span className="text-amber-500">Lens</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                  OFFICIAL
                </span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide hidden sm:block">
                See it. Report it. Stop it.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-amber-50 text-amber-700 font-semibold border border-amber-200/80 shadow-2xs"
                      : "text-slate-600 hover:text-[#0a2540] hover:bg-slate-100/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-600" : "text-slate-400"}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* 🚨 Report a Scam CTA */}
            <Link
              href="/report"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 via-rose-600 to-amber-600 text-white font-semibold text-xs shadow-md shadow-red-500/15 hover:opacity-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report a Scam</span>
            </Link>

            {/* 🔑 Login */}
            <Link
              href="/login"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                pathname === "/login"
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <LogIn className="w-4 h-4 text-amber-500" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-600 hover:text-[#0a2540] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-amber-50 text-amber-800 font-semibold border border-amber-200"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4 text-amber-500" />
                {link.name}
              </Link>
            );
          })}
          
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200"
          >
            <LogIn className="w-4 h-4 text-amber-500" />
            Sign In / Login
          </Link>

          <div className="pt-2">
            <Link
              href="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold shadow-md shadow-red-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              Report a Scam
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
