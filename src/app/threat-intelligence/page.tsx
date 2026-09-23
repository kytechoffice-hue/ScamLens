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
  BookOpen,
  Filter
} from "lucide-react";
import ThreatScanner from "@/components/ThreatScanner";
import ScamCard from "@/components/ScamCard";
import { MOCK_CATEGORIES, MOCK_SCAMS, MOCK_STATS, ScamReport } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

export default function ThreatIntelligencePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedScamForModal, setSelectedScamForModal] = useState<ScamReport | null>(null);

  const filteredScams = selectedCategory === "all"
    ? MOCK_SCAMS
    : MOCK_SCAMS.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Section with Search + Introduction */}
      <section className="relative text-center max-w-4xl mx-auto pt-4">
        {/* Emblem & Cyber Badge */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900 p-1 shadow-2xl border-2 border-cyan-500/40 hover:border-cyan-400 hover:scale-105 transition-all">
            <Image
              src="/logo.png"
              alt="ScamLens Emblem"
              width={112}
              height={112}
              className="w-full h-full object-contain rounded-full"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mt-4 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold">SCAMLENS INTELLIGENCE CENTER</span>
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-slate-300">HEURISTIC CRAWLER MATRIX</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-[1.15]">
          Expose Online Scams <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
            Before They Strike
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          ScamLens is the community-powered threat radar. Instantly audit suspicious URLs, domains, phone senders, and UPI IDs against our verified database of fraudulent campaigns.
        </p>

        {/* Live Threat Scanner Component */}
        <div className="max-w-4xl mx-auto text-left">
          <ThreatScanner />
        </div>

        {/* Highlight Stats Bar (Dark SOC Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12 pt-8 border-t border-slate-800">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              {MOCK_STATS.totalScamsIndexed}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 uppercase font-mono font-medium">
              Scams Cataloged
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              {MOCK_STATS.financialLossPrevented}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 uppercase font-mono font-medium">
              Losses Prevented
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">
              {MOCK_STATS.communityMembers}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 uppercase font-mono font-medium">
              Active Watchdogs
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
              {MOCK_STATS.detectionAccuracy}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 uppercase font-mono font-medium">
              Detection Accuracy
            </div>
          </div>
        </div>
      </section>

      {/* Threat Intelligence Matrix & Active Fraud Vectors */}
      <section className="py-8 border-t border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
              THREAT INTELLIGENCE MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Top Active Fraud Vectors
            </h2>
          </div>
          <Link
            href="/scams"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-semibold hover:underline"
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
              className="bg-[#0c131f]/85 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all block group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60">
                  Trend {cat.threatTrend}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                {cat.description}
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  {cat.reportedCount.toLocaleString()} incidents
                </span>
                <span className="text-rose-400 font-bold">
                  {formatCurrency(cat.totalLoss)} loss
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured / Trending Scam Reports */}
      <section className="py-8 border-t border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase mb-1 font-bold">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>LIVE INCIDENT STREAM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Recently Flagged Community Scams
            </h2>
          </div>

          {/* Filter Tabs */}
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedCategory === f.val
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
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

        {/* Directory Link */}
        <div className="text-center mt-10">
          <Link
            href="/scams"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-750 text-white text-xs font-mono font-bold shadow-xs transition-all"
          >
            <span>Open Global Scam Directory ({MOCK_STATS.totalScamsIndexed} Reports)</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </section>

      {/* Verification Pipeline */}
      <section className="py-8 border-t border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
            VERIFICATION PIPELINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How ScamLens Protects You
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            From citizen incident spotting to global threat neutralization across all browsers and networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0c131f]/90 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-800/60 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              1. Citizen Incident Reporting
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Users submit suspicious URLs, SMS texts, and fake store links. Identity and evidence files can be fully anonymized.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c131f]/90 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              2. Automated Heuristics & Audit
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Domain age, TLS encryption, typosquatting, and smart contracts are evaluated against 92 global threat feeds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c131f]/90 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              3. Instant Community Defense
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Confirmed threats are immediately indexed into the public database, alerting visitors and preventing financial losses.
            </p>
          </div>
        </div>
      </section>

      {/* Community Defense CTA Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a1828] to-slate-900 border border-slate-800 text-center shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
            <FileWarning className="w-3.5 h-3.5" />
            Citizen Defense Initiative
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Encountered a Phishing Site or Fraudster?
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Your 2-minute report can stop dozens of others from losing their savings. Submissions can be completely anonymous.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/report"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Report a Scam Incident</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/check"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-mono text-xs font-semibold border border-slate-700 transition-all"
            >
              Search a Domain
            </Link>
          </div>
        </div>
      </section>

      {/* Forensic Detail Modal */}
      {selectedScamForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50 duration-200">
          <div className="bg-[#0e1624] border border-slate-750 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl text-slate-200">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold">
                  {selectedScamForModal.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  {selectedScamForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedScamForModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white text-xs font-mono cursor-pointer"
              >
                [Close ✕]
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 font-mono text-xs text-rose-300 break-all font-semibold">
                Suspect Target: {selectedScamForModal.targetDomainOrEntity}
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold mb-1">Incident Summary:</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedScamForModal.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-mono">Reported Loss</span>
                  <span className="text-base font-extrabold font-mono text-rose-400">
                    {formatCurrency(selectedScamForModal.reportedLoss)}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-mono">Victim Complaints</span>
                  <span className="text-base font-extrabold font-mono text-cyan-400">
                    {selectedScamForModal.reportCount} Verified Reports
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold mb-2">Technical Indicators:</h4>
                <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
                  {selectedScamForModal.indicators.domainAge && (
                    <li>• Domain Age: <span className="text-rose-400 font-semibold">{selectedScamForModal.indicators.domainAge}</span></li>
                  )}
                  <li>• SSL Status: <span className="text-amber-400 font-semibold">{selectedScamForModal.indicators.sslStatus}</span></li>
                  <li>• Threat Engines: <span className="text-rose-400 font-semibold">{selectedScamForModal.indicators.blacklistedCount} Engines Flagged</span></li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Scam ID: {selectedScamForModal.id}
              </span>
              <Link
                href={`/check?q=${encodeURIComponent(selectedScamForModal.targetDomainOrEntity)}`}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-mono font-bold hover:bg-cyan-400 transition-all flex items-center gap-1.5"
              >
                <span>Launch Live Heuristic Scan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
