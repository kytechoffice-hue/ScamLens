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
  Search
} from "lucide-react";
import ThreatScanner from "@/components/ThreatScanner";

function ScannerContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialTab = searchParams.get("tab") || "url";

  const [activeType, setActiveType] = useState(initialTab);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono mb-3 font-semibold">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>DOMAIN & URL SAFETY AUDIT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0a2540] tracking-tight mb-4">
          Check Website Safety
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Search any domain, website link, phone sender, or crypto wallet address to analyze hidden threats, phishing signatures, and domain age.
        </p>
      </div>

      {/* Target Type Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
        {[
          { id: "url", label: "Website URL / Domain", icon: Globe },
          { id: "phone", label: "Phone / SMS Sender", icon: Smartphone },
          { id: "crypto", label: "Crypto Wallet Address", icon: Coins },
          { id: "email", label: "Phishing Email Address", icon: Mail },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0a2540] text-white shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Threat Scanner Container */}
      <div className="mb-16">
        <ThreatScanner initialQuery={initialQuery} />
      </div>

      {/* Forensic Deep-Dive Indicators Explanation */}
      <div className="border-t border-slate-200 pt-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0a2540] mb-2">
            What ScamLens Inspects In Real-Time
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Our multi-vector analyzer evaluates dozens of hidden indicators before delivering a risk score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Domain & Infrastructure</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              WHOIS registration age, registrar reputation, fast-flux DNS IP hopping, bulletproof hosting detection, and nameserver anonymity.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Code & Content Heuristics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Obfuscated Javascript, fake brand favicon matching, credential harvest endpoints, iframe cloaking, and unauthorized payment gateways.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Global Threat Blacklists</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
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
      <div className="min-h-screen flex items-center justify-center text-amber-600 font-mono text-sm">
        Loading Website Safety Scanner...
      </div>
    }>
      <ScannerContent />
    </Suspense>
  );
}
