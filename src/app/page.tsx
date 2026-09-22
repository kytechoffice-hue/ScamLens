"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Lock, 
  Globe, 
  CheckCircle2, 
  Users, 
  Radio, 
  FileWarning, 
  ExternalLink,
  Zap,
  Activity,
  ChevronRight,
  BookOpen
} from "lucide-react";
import ThreatScanner from "@/components/ThreatScanner";
import ScamCard from "@/components/ScamCard";
import { MOCK_CATEGORIES, MOCK_SCAMS, MOCK_STATS, ScamReport } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedScamForModal, setSelectedScamForModal] = useState<ScamReport | null>(null);

  const filteredScams = selectedCategory === "all"
    ? MOCK_SCAMS
    : MOCK_SCAMS.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Search + Introduction */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Official Emblem */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white p-2 shadow-xl shadow-slate-200 border-3 border-amber-500/40 hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="ScamLens Official Emblem"
                width={144}
                height={144}
                className="w-full h-full object-contain rounded-full"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono mt-4 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              <span className="font-bold">SCAMLENS</span>
              <span className="text-slate-400">•</span>
              <span className="font-semibold">SEE IT. REPORT IT. STOP IT.</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0a2540] mb-6 leading-[1.1]">
            Expose Online Scams <br />
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-blue-700 bg-clip-text text-transparent">
              Before They Strike
            </span>
          </h1>

          {/* Introduction & Value Proposition */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            ScamLens is the community-powered threat radar. Instantly check any suspicious website URL, search our verified database of fraudulent campaigns, and report scams in real time.
          </p>
        </div>

        {/* Live Interactive Search / Threat Scanner */}
        <div className="max-w-4xl mx-auto">
          <ThreatScanner />
        </div>

        {/* Highlight Stats Bar (Light Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-14 pt-10 border-t border-slate-200">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0a2540]">
              {MOCK_STATS.totalScamsIndexed}
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase font-mono font-medium">
              Scams Cataloged
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600">
              {MOCK_STATS.financialLossPrevented}
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase font-mono font-medium">
              Losses Prevented
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600">
              {MOCK_STATS.communityMembers}
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase font-mono font-medium">
              Active Watchdogs
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-600">
              {MOCK_STATS.detectionAccuracy}
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase font-mono font-medium">
              Detection Accuracy
            </div>
          </div>
        </div>
      </section>

      {/* Threat Categories Matrix */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold block mb-2">
                THREAT INTELLIGENCE MATRIX
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] tracking-tight">
                Top Active Fraud Vectors
              </h2>
            </div>
            <Link
              href="/scams"
              className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1.5"
            >
              <span>Explore All Verified Reports in Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/scams?category=${encodeURIComponent(cat.slug)}`}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-300 transition-all block group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    Trend {cat.threatTrend}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">
                    {cat.reportedCount.toLocaleString()} incidents
                  </span>
                  <span className="text-rose-600 font-bold">
                    {formatCurrency(cat.totalLoss)} loss
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Trending Scam Reports */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-mono uppercase mb-2 font-bold">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>LIVE INCIDENT STREAM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] tracking-tight">
              Recently Flagged Community Scams
            </h2>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "All Threats", val: "all" },
              { label: "Phishing", val: "phishing" },
              { label: "Crypto", val: "crypto" },
              { label: "Job Scams", val: "job" },
              { label: "Fake Stores", val: "e-commerce" },
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setSelectedCategory(f.val)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === f.val
                    ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScams.map((scam) => (
            <ScamCard
              key={scam.id}
              scam={scam}
              onSelect={(s) => setSelectedScamForModal(s)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/scams"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-sm font-bold shadow-xs transition-all"
          >
            <span>Open Global Scam Directory ({MOCK_STATS.totalScamsIndexed} Reports)</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>
      </section>

      {/* How ScamLens Works - Verification Pipeline */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold block mb-2">
              VERIFICATION PIPELINE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight">
              How ScamLens Protects You
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              From the moment a citizen spots fraud to global threat neutralization across all browsers and networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-mono font-bold text-lg mb-5">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                1. Citizen Incident Reporting
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Users submit suspicious URLs, SMS texts, and fake store links. Identity and evidence files can be fully anonymized.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-mono font-bold text-lg mb-5">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                2. Automated Heuristics & Audit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Domain age, TLS encryption, typosquatting, and smart contracts are evaluated against 92 global threat feeds.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-mono font-bold text-lg mb-5">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                3. Instant Community Defense
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Confirmed threats are immediately indexed into the public database, alerting visitors and preventing financial losses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Report Call To Action Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-[#0a2540] to-slate-900 text-white border border-slate-800 text-center shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4 font-semibold">
              <FileWarning className="w-3.5 h-3.5" />
              Community Defense Initiative
            </span>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Encountered a Phishing Site or Fraudster?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Your 2-minute report can stop dozens of others from losing their savings. Submissions can be completely anonymous.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/report"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 via-rose-600 to-amber-600 text-white font-bold text-sm shadow-lg shadow-red-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Report a Scam Incident</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/check"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-semibold transition-all"
              >
                Search a Domain
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Forensic Detail Modal (Light Theme) */}
      {selectedScamForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50 duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                  {selectedScamForModal.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {selectedScamForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedScamForModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 text-xs font-mono cursor-pointer"
              >
                [Close ✕]
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 font-mono text-xs text-rose-800 break-all font-semibold">
                Suspect Target: {selectedScamForModal.targetDomainOrEntity}
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-500 font-bold mb-1">Incident Summary:</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedScamForModal.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Reported Loss</span>
                  <span className="text-base font-extrabold font-mono text-rose-700">
                    {formatCurrency(selectedScamForModal.reportedLoss)}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Victim Complaints</span>
                  <span className="text-base font-extrabold font-mono text-[#0a2540]">
                    {selectedScamForModal.reportCount} Verified Reports
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-500 font-bold mb-2">Technical Indicators:</h4>
                <ul className="space-y-1.5 text-xs text-slate-600 font-mono">
                  {selectedScamForModal.indicators.domainAge && (
                    <li>• Domain Age: <span className="text-rose-700 font-semibold">{selectedScamForModal.indicators.domainAge}</span></li>
                  )}
                  <li>• SSL Status: <span className="text-amber-700 font-semibold">{selectedScamForModal.indicators.sslStatus}</span></li>
                  <li>• Threat Engines: <span className="text-rose-700 font-semibold">{selectedScamForModal.indicators.blacklistedCount} Engines Flagged</span></li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Scam ID: {selectedScamForModal.id}
              </span>
              <Link
                href={`/check?q=${encodeURIComponent(selectedScamForModal.targetDomainOrEntity)}`}
                className="px-4 py-2 rounded-xl bg-[#0a2540] text-white text-xs font-bold hover:bg-[#1e3a8a] transition-all flex items-center gap-1.5"
              >
                <span>Launch Live Heuristic Scan</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
