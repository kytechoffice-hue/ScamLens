"use client";

import React, { useState } from "react";
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Copy,
  Check
} from "lucide-react";
import RiskGauge from "./RiskGauge";
import { SAMPLE_CHECKS, InspectionResult } from "@/data/mockData";

interface ThreatScannerProps {
  initialQuery?: string;
  isCompact?: boolean;
}

export default function ThreatScanner({ initialQuery = "", isCompact = false }: ThreatScannerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>("");
  const [result, setResult] = useState<InspectionResult | null>(
    initialQuery && SAMPLE_CHECKS[initialQuery] ? SAMPLE_CHECKS[initialQuery] : null
  );
  const [copied, setCopied] = useState(false);

  // Run simulated heuristic scan
  const handleScan = (searchVal?: string) => {
    const target = (searchVal ?? query).trim();
    if (!target) return;

    setIsScanning(true);
    setResult(null);

    const steps = [
      "Connecting to Global Threat Intelligence Feeds...",
      "Inspecting TLS/SSL & Domain Registration Records...",
      "Analyzing Typosquatting & Visual Heuristics...",
      "Cross-referencing 92 Global Anti-Phishing Blacklists...",
      "Compiling ScamLens Risk Assessment...",
    ];

    let current = 0;
    setScanStep(steps[0]);

    const stepInterval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setScanStep(steps[current]);
      } else {
        clearInterval(stepInterval);
        setIsScanning(false);

        // Check if query matches known mock data
        const normalized = target.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");
        if (SAMPLE_CHECKS[target]) {
          setResult(SAMPLE_CHECKS[target]);
        } else if (SAMPLE_CHECKS[normalized]) {
          setResult(SAMPLE_CHECKS[normalized]);
        } else {
          // Dynamic simulated result for custom queries
          const isSuspicious = target.includes("free") || target.includes("bonus") || target.includes("verify") || target.includes("login") || target.includes(".xyz") || target.includes(".top") || target.includes(".cc");
          const score = isSuspicious ? 82 : 12;
          const level = isSuspicious ? "DANGEROUS" : "SAFE";

          setResult({
            query: target,
            type: target.startsWith("+") || /^\d+$/.test(target) ? "phone" : target.startsWith("0x") ? "crypto" : "domain",
            riskScore: score,
            riskLevel: level,
            verdict: isSuspicious ? "Suspicious Risk Patterns Identified" : "Clean Heuristic Profile Observed",
            summary: isSuspicious 
              ? "This entity displays suspicious patterns matching recent phishing & social engineering campaigns. Avoid entering credentials or payments." 
              : "No malicious signatures or active blacklists recorded in verified threat intelligence feeds. Always exercise safe digital habits.",
            metrics: [
              { label: "SSL / Encryption", value: "Verified Standard", status: "good" },
              { label: "Blacklist Status", value: isSuspicious ? "4 Engines Flagged" : "0 Clean", status: isSuspicious ? "warning" : "good" },
              { label: "Community Rating", value: isSuspicious ? "High Suspicion" : "Trusted", status: isSuspicious ? "warning" : "good" },
              { label: "Registration Age", value: isSuspicious ? "Recent (< 30d)" : "Established", status: isSuspicious ? "danger" : "good" },
            ],
            threatFactors: isSuspicious 
              ? ["Keywords match typical phishing triggers", "Recently registered top-level domain", "Anonymous WHOIS registrant"] 
              : [],
            safetyChecklist: [
              { check: "Valid Security Certificate", passed: true, detail: "Standard TLS encryption present." },
              { check: "Not listed in active malware databases", passed: !isSuspicious, detail: isSuspicious ? "Flagged for aggressive redirects" : "Clean across major registries" },
              { check: "Reputable Domain Host", passed: true, detail: "Standard commercial hosting provider." },
            ],
          });
        }
      }
    }, 450);
  };

  const copyResults = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `[ScamLens Report] Target: ${result.query} | Risk Score: ${result.riskScore}/100 (${result.riskLevel}) | Verdict: ${result.verdict}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Scanner Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-slate-200/90 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleScan();
          }}
          className="space-y-4"
        >
          <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-amber-500" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter suspicious URL, domain (e.g. chase-login-update.cc), phone, or crypto address..."
                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 text-sm sm:text-base font-mono transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isScanning || !query.trim()}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#0a2540] to-[#1e3a8a] hover:from-[#081f36] hover:to-[#172e6f] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-slate-900/10 cursor-pointer shrink-0"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Analyze Safety</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-500 font-medium">Try quick test presets:</span>
            <button
              type="button"
              onClick={() => {
                setQuery("chase-auth-security-update9.cc");
                handleScan("chase-auth-security-update9.cc");
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all font-mono font-medium cursor-pointer"
            >
              Fake Chase Phishing (.cc)
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("apex-yield-ai-finance.top");
                handleScan("apex-yield-ai-finance.top");
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-all font-mono font-medium cursor-pointer"
            >
              ApexAI Crypto Ponzi
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("+1 (888) 492-3819");
                handleScan("+1 (888) 492-3819");
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all font-mono font-medium cursor-pointer"
            >
              +1 (888) Smishing Gateway
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("google.com");
                handleScan("google.com");
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all font-mono font-medium cursor-pointer"
            >
              google.com (Safe)
            </button>
          </div>
        </form>

        {/* Live scanning progress */}
        {isScanning && (
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#0a2540] font-mono font-medium">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                {scanStep}
              </span>
              <span className="text-slate-500">Heuristic Engine Active...</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-amber-500 via-blue-600 to-[#0a2540] animate-pulse w-4/5 rounded-full transition-all duration-300" />
            </div>
          </div>
        )}
      </div>

      {/* Result Card */}
      {result && !isScanning && (
        <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl relative animate-in fade-in-50 duration-300">
          {/* Header Verdict Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start sm:items-center gap-5">
              <RiskGauge score={result.riskScore} size="lg" />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Audit Target:
                  </span>
                  <span className="font-mono text-slate-900 text-sm sm:text-base font-bold bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {result.query}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1.5 flex items-center gap-2">
                  {result.verdict}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Share / Copy Result */}
            <div className="shrink-0 flex sm:flex-col items-center gap-2 w-full sm:w-auto">
              <button
                onClick={copyResults}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-semibold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? "Report Copied" : "Share Verdict"}</span>
              </button>
            </div>
          </div>

          {/* Heuristics & Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-slate-100">
            {result.metrics.map((metric, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 font-mono block mb-1">
                  {metric.label}
                </span>
                <span className={`text-sm font-bold font-mono ${
                  metric.status === "good" 
                    ? "text-emerald-700" 
                    : metric.status === "warning" 
                    ? "text-amber-700" 
                    : "text-rose-700"
                }`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Threat Factors & Heuristic Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {/* Critical Red Flags */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-slate-700 mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Detected Risk Signatures
              </h4>
              {result.threatFactors.length > 0 ? (
                <ul className="space-y-2">
                  {result.threatFactors.map((factor, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-rose-800 p-2.5 rounded-xl bg-rose-50 border border-rose-200 font-medium">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center gap-2 text-xs text-emerald-800 p-3 rounded-xl bg-emerald-50 border border-emerald-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No malicious signatures or credential interception scripts detected.</span>
                </div>
              )}
            </div>

            {/* Safety Verification Checklist */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-slate-700 mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Security Verification Checklist
              </h4>
              <div className="space-y-2">
                {result.safetyChecklist.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    {item.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className={`text-xs font-bold block ${item.passed ? "text-slate-800" : "text-rose-700"}`}>
                        {item.check}
                      </span>
                      <span className="text-[11px] text-slate-500 leading-normal block">
                        {item.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
