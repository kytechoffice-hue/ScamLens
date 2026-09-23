"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Sliders, 
  Key, 
  FileText, 
  Database, 
  Server, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Eye, 
  EyeOff, 
  Copy, 
  Check,
  AlertTriangle,
  FolderGit2
} from "lucide-react";
import { APP_CONFIG, AppConfig } from "@/config/appConfig";
import { encryptPayload, decryptPayload, EncryptedPackage } from "@/lib/crypto";

function AccountContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "crypto">(
    tabParam === "settings" ? "settings" : tabParam === "crypto" ? "crypto" : "profile"
  );

  // Auth simulation state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState("analyst.citizen@scamlens.com");
  const [userRole, setUserRole] = useState<"Community Sentinel" | "Security Analyst">("Security Analyst");

  // Global Environment State simulation (Dev vs Prod)
  const [currentEnv, setCurrentEnv] = useState<"development" | "production">("production");
  const [mockDataActive, setMockDataActive] = useState(true);
  const [strictWafActive, setStrictWafActive] = useState(true);

  // Encryption Testbench State
  const [cryptoInput, setCryptoInput] = useState(
    JSON.stringify(
      {
        target: "sbi-pan-kyc-verify-portal.top",
        victim_phone: "+91-98210-XXXXX",
        reported_loss_inr: 125000,
        upi_reference: "UPI/CR/8492019482/YESB",
        state: "Maharashtra",
      },
      null,
      2
    )
  );
  const [encryptedOutput, setEncryptedOutput] = useState<EncryptedPackage | null>(null);
  const [decryptedResult, setDecryptedResult] = useState<string | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Run AES-256-GCM Encryption
  const handleEncrypt = async () => {
    setIsEncrypting(true);
    try {
      const pkg = await encryptPayload(cryptoInput);
      setEncryptedOutput(pkg);
      setDecryptedResult(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEncrypting(false);
    }
  };

  // Run Decryption
  const handleDecrypt = async () => {
    if (!encryptedOutput) return;
    try {
      const text = await decryptPayload(encryptedOutput);
      setDecryptedResult(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2 font-semibold">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>OPERATIONS LAB & GLOBAL SETTINGS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Account & Operations Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your reporter credentials, inspect submitted incidents, and test global Development/Production environment settings.
          </p>
        </div>

        {/* Environment Badge */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-500">Global Env:</span>
          <span className={`px-2.5 py-1 rounded-lg font-bold uppercase border ${
            currentEnv === "production"
              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
              : "bg-amber-950 text-amber-400 border-amber-800"
          }`}>
            {currentEnv}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "profile"
              ? "bg-cyan-500 text-slate-950 shadow-xs"
              : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Dashboard & Reports</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "settings"
              ? "bg-cyan-500 text-slate-950 shadow-xs"
              : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Global Settings</span>
        </button>

        <button
          onClick={() => setActiveTab("crypto")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "crypto"
              ? "bg-cyan-500 text-slate-950 shadow-xs"
              : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          }`}
        >
          <Key className="w-4 h-4" />
          <span>AES-256 Vault Lab</span>
        </button>
      </div>

      {/* TAB 1: USER DASHBOARD & REPORTS */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className="bg-[#0c131f]/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 flex items-center justify-center font-bold text-xl font-mono">
                IN
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">{userEmail}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold">
                    {userRole}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Reputation Score: <strong className="text-emerald-400">98.5 / 100</strong> (14 verified submissions)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/report"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-xs transition-all"
              >
                + New Incident Report
              </Link>
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono transition-all cursor-pointer"
              >
                {isLoggedIn ? "Simulate Logout" : "Log In"}
              </button>
            </div>
          </div>

          {/* User Submitted Incidents */}
          <div className="bg-[#0c131f]/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                My Submitted Scam Reports
              </h3>
              <span className="text-xs text-slate-400 font-mono">3 Active Reports</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                    <th className="py-3 px-4">Tracking ID</th>
                    <th className="py-3 px-4">Target Entity</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-cyan-400">SCM-IN-84920</td>
                    <td className="py-3.5 px-4 text-rose-400 font-semibold">sbi-pan-kyc-verify-portal.top</td>
                    <td className="py-3.5 px-4 text-slate-400">Phishing</td>
                    <td className="py-3.5 px-4 text-slate-500">2026-09-22</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800/80">
                        CONFIRMED FRAUD
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-cyan-400">SCM-IN-71932</td>
                    <td className="py-3.5 px-4 text-amber-400 font-semibold">paytm-refund-desk@ybl</td>
                    <td className="py-3.5 px-4 text-slate-400">UPI Fraud</td>
                    <td className="py-3.5 px-4 text-slate-500">2026-09-21</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800/80">
                        UNDER AUDIT
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-cyan-400">SCM-IN-90184</td>
                    <td className="py-3.5 px-4 text-slate-200 font-semibold">+91-98210-XXXXX</td>
                    <td className="py-3.5 px-4 text-slate-400">FedEx SMS Contraband</td>
                    <td className="py-3.5 px-4 text-slate-500">2026-09-19</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                        MITIGATED
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL SETTINGS */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="bg-[#0c131f]/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Active Runtime Environment & Hostinger Parameters
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Toggle parameters to test application behavior under Development and Production modes.
                </p>
              </div>

              <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => {
                    setCurrentEnv("development");
                    setMockDataActive(true);
                    setStrictWafActive(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    currentEnv === "development"
                      ? "bg-cyan-500 text-slate-950 shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Development
                </button>
                <button
                  onClick={() => {
                    setCurrentEnv("production");
                    setMockDataActive(false);
                    setStrictWafActive(true);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    currentEnv === "production"
                      ? "bg-cyan-500 text-slate-950 shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Production
                </button>
              </div>
            </div>

            <div className="pt-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                    <th className="py-3 px-4">Configuration Setting</th>
                    <th className="py-3 px-4">Development Setting</th>
                    <th className="py-3 px-4">Production Setting</th>
                    <th className="py-3 px-4">Current Active State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">API Route Base</td>
                    <td className="py-3.5 px-4 text-slate-400">http://localhost:3000/api</td>
                    <td className="py-3.5 px-4 text-slate-400">https://scamlens.kytechserv.com/api</td>
                    <td className="py-3.5 px-4 text-cyan-400 font-bold">
                      {currentEnv === "production" ? "https://scamlens.kytechserv.com/api" : "http://localhost:3000/api"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Data Source Mode</td>
                    <td className="py-3.5 px-4 text-slate-400">In-Memory Mock Dataset</td>
                    <td className="py-3.5 px-4 text-slate-400">Hostinger MySQL (Prisma)</td>
                    <td className="py-3.5 px-4 text-amber-400 font-bold">
                      {mockDataActive ? "Mock Dataset Active" : "Hostinger MySQL Connected"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Minification & SWC Optimization</td>
                    <td className="py-3.5 px-4 text-slate-400">Disabled (Readable Bundles)</td>
                    <td className="py-3.5 px-4 text-slate-400">Enabled (Gzip + Console Stripping)</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-bold">
                      {currentEnv === "production" ? "Gzip & SWC Minified" : "Dev Debug Bundles"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Hostinger WAF & Security Headers</td>
                    <td className="py-3.5 px-4 text-slate-400">Permissive Localhost CORS</td>
                    <td className="py-3.5 px-4 text-slate-400">Strict CSP, HSTS, Rate Limits</td>
                    <td className="py-3.5 px-4 font-bold text-cyan-400">
                      {strictWafActive ? "Strict WAF Active" : "Permissive Dev Mode"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-white">Evidence Encryption Key</td>
                    <td className="py-3.5 px-4 text-slate-400">Local Dev Key Derived</td>
                    <td className="py-3.5 px-4 text-slate-400">Environment Vault Secret</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-bold">AES-256-GCM Armed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AES-256 ENCRYPTION LAB */}
      {activeTab === "crypto" && (
        <div className="space-y-6">
          <div className="bg-[#0c131f]/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase mb-1">
                <Key className="w-4 h-4" />
                <span>Web Crypto API (Native AES-256-GCM)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Global Encryption & Minification Testbench
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Test encrypting sensitive scam incident data, victim identifiers, and financial records into compact, minified cipher packages.
              </p>
            </div>

            {/* Input payload */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                1. Plaintext or JSON Incident Payload
              </label>
              <textarea
                rows={5}
                value={cryptoInput}
                onChange={(e) => setCryptoInput(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleEncrypt}
                disabled={isEncrypting || !cryptoInput.trim()}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isEncrypting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Encrypt with AES-256-GCM</span>
              </button>

              {encryptedOutput && (
                <button
                  onClick={handleDecrypt}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  <span>Decrypt & Verify Integrity</span>
                </button>
              )}
            </div>

            {/* Encrypted output view */}
            {encryptedOutput && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs animate-in fade-in-50">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-bold text-white">Encrypted Package Output</span>
                  <span>Algorithm: {encryptedOutput.algorithm}</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Initialization Vector (IV):</span>
                    <code className="text-cyan-400 font-bold break-all">{encryptedOutput.iv}</code>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Minified Ciphertext:</span>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-rose-300 font-bold break-all max-h-32 overflow-y-auto">
                      {encryptedOutput.ciphertext}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                  <span>Compressed payload size: {encryptedOutput.compressedSize} bytes</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(encryptedOutput));
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-cyan-400 hover:underline font-bold cursor-pointer"
                  >
                    {copied ? "Copied Package" : "Copy Encrypted JSON"}
                  </button>
                </div>
              </div>
            )}

            {/* Decrypted verification view */}
            {decryptedResult && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2 font-mono text-xs animate-in fade-in-50">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Decryption Successful & Cryptographic Integrity Verified</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 whitespace-pre-wrap">
                  {decryptedResult}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center text-cyan-400 font-mono text-xs">
        Loading Account Operations Lab...
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}
