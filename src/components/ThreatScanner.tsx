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
      "Connecting to India & Global Threat Intelligence Feeds...",
      "Inspecting TLS/SSL & Domain Registration Records...",
      "Analyzing Typosquatting & Netbanking Heuristics...",
      "Cross-referencing 92 Global Anti-Phishing Blacklists & UPI Registry...",
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
          const isSuspicious = 
            target.includes("free") || 
            target.includes("bonus") || 
            target.includes("verify") || 
            target.includes("login") || 
            target.includes(".xyz") || 
            target.includes(".top") || 
            target.includes(".cc") ||
            target.includes("kyc") ||
            target.includes("yono") ||
            target.includes("refund");

          const score = isSuspicious ? 86 : 14;
          const level = isSuspicious ? "DANGEROUS" : "SAFE";

          setResult({
            query: target,
            type: target.startsWith("+") || /^\d+$/.test(target) ? "phone" : target.startsWith("0x") ? "crypto" : "domain",
            riskScore: score,
            riskLevel: level,
            verdict: isSuspicious ? "Suspicious Risk Patterns Identified" : "Clean Heuristic Profile Observed",
            summary: isSuspicious 
              ? "This entity displays deceptive patterns matching recent phishing, fake KYC updates, or UPI fraud campaigns. Never input banking credentials or authorize collect requests." 
              : "No malicious signatures or active blacklists recorded in verified threat intelligence feeds. Always exercise safe digital habits.",
            metrics: [
              { label: "SSL / Encryption", value: "Verified Standard", status: "good" },
              { label: "Blacklist Status", value: isSuspicious ? "5 Engines Flagged" : "0 Clean", status: isSuspicious ? "warning" : "good" },
              { label: "Community Rating", value: isSuspicious ? "High Suspicion" : "Trusted", status: isSuspicious ? "warning" : "good" },
              { label: "Registration Age", value: isSuspicious ? "Recent (< 15d)" : "Established", status: isSuspicious ? "danger" : "good" },
            ],
            threatFactors: isSuspicious 
              ? ["Keywords match high-volume phishing triggers", "Recently registered bulletproof top-level domain", "Anonymous WHOIS registrant"] 
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
      <div className="bg-[#0c131f]/95 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-800 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

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
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Search className="w-5 h-5 text-cyan-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter suspicious URL, domain, phone (+91), UPI ID, or crypto address..."
                className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 text-xs sm:text-sm font-mono transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isScanning || !query.trim()}
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20 cursor-pointer shrink-0"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Audit Safety</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
            <span className="text-slate-400 font-semibold">Test Presets:</span>
            <button
              type="button"
              onClick={() => {
                setQuery("sbi-pan-kyc-verify-portal.top");
                handleScan("sbi-pan-kyc-verify-portal.top");
              }}
              className="px-2.5 py-1 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-800/80 hover:bg-rose-900 transition-colors"
            >
              SBI KYC Phishing (.top)
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("chase-auth-security-update9.cc");
                handleScan("chase-auth-security-update9.cc");
              }}
              className="px-2.5 py-1 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-800/80 hover:bg-rose-900 transition-colors"
            >
              Chase Phishing (.cc)
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("paytm-refund-desk@ybl");
                handleScan("paytm-refund-desk@ybl");
              }}
              className="px-2.5 py-1 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-800/80 hover:bg-amber-900 transition-colors"
            >
              UPI Autopay Trap
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("google.com");
                handleScan("google.com");
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900 transition-colors"
            >
              google.com (Safe)
            </button>
          </div>
        </form>

        {/* Live scanning progress bar */}
        {isScanning && (
          <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                {scanStep}
              </span>
              <span className="text-slate-500 font-semibold">92 Threat Feeds Active</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse rounded-full w-full" />
            </div>
          </div>
        )}

        {/* Result Container */}
        {result && !isScanning && (
          <div className="mt-6 border-t border-slate-800 pt-6 animate-in fade-in-50 duration-300 space-y-6">
            {/* Top Verdict Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="flex items-center gap-4">
                <RiskGauge score={result.riskScore} size="md" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-mono font-black px-2 py-0.5 rounded border ${
                        result.riskLevel === "DANGEROUS"
                          ? "bg-rose-950 text-rose-300 border-rose-800/80"
                          : result.riskLevel === "SUSPICIOUS"
                          ? "bg-amber-950 text-amber-300 border-amber-800/80"
                          : "bg-emerald-950 text-emerald-300 border-emerald-800/80"
                      }`}
                    >
                      {result.riskLevel} VERDICT
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Score: {result.riskScore}/100
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {result.verdict}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 break-all mt-0.5">
                    Target: <span className="text-cyan-400">{result.query}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <button
                  type="button"
                  onClick={copyResults}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-mono border border-slate-750 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Incident Summary */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              {result.summary}
            </p>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {result.metrics.map((m) => (
                <div key={m.label} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                    {m.label}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold block ${
                      m.status === "good"
                        ? "text-emerald-400"
                        : m.status === "warning"
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Threat Factors If Any */}
            {result.threatFactors.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-900/60 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>IDENTIFIED FRAUD VECTORS</span>
                </div>
                <ul className="space-y-1 text-xs font-mono text-rose-200">
                  {result.threatFactors.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
