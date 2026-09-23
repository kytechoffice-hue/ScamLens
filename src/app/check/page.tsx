"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Globe, 
  Smartphone, 
  Coins, 
  Mail, 
  Server, 
  FileCode, 
  ShieldCheck, 
  Search,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import ThreatScanner from "@/components/ThreatScanner";

function ScannerContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialTab = searchParams.get("tab") || "url";

  const [activeType, setActiveType] = useState(initialTab);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 font-semibold">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>CYBER FRAUD & INDICATOR AUDIT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
          Check Website & Threat Indicators
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Audit any domain, netbanking portal, phone sender (+91), UPI ID, or crypto wallet address to analyze hidden threats, phishing signatures, and malicious DNS infrastructure.
        </p>
      </div>

      {/* Target Type Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: "url", label: "Website URL / Domain", icon: Globe },
          { id: "phone", label: "Phone / SMS Sender (+91)", icon: Smartphone },
          { id: "crypto", label: "Crypto Wallet Address", icon: Coins },
          { id: "email", label: "Phishing Email Address", icon: Mail },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Threat Scanner Container */}
      <div>
        <ThreatScanner initialQuery={initialQuery} />
      </div>

      {/* Forensic Deep-Dive Indicators Explanation */}
      <div className="border-t border-slate-800 pt-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            What ScamLens Inspects In Real-Time
          </h2>
          <p className="text-xs text-slate-400">
            Our multi-vector analyzer evaluates dozens of hidden indicators before delivering a risk score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0c131f]/90 rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-800/60 flex items-center justify-center text-blue-400">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Domain & Infrastructure</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              WHOIS registration age, registrar reputation, fast-flux DNS IP hopping, bulletproof hosting detection, and nameserver anonymity.
            </p>
          </div>

          <div className="bg-[#0c131f]/90 rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Code & Content Heuristics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Obfuscated Javascript, fake brand favicon matching, credential harvest endpoints, iframe cloaking, and unauthorized payment gateways.
            </p>
          </div>

          <div className="bg-[#0c131f]/90 rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Global Threat Blacklists</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Live synchronization with Google Safe Browsing, PhishTank, Spamhaus, URLhaus, OpenPhish, and ScamLens verified community reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center text-cyan-400 font-mono text-xs">
        Loading Website Safety Scanner...
      </div>
    }>
      <ScannerContent />
    </Suspense>
  );
}
