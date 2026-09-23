"use client";

import React, { useState } from "react";
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

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "crypto">("profile");

  // Auth simulation state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState("analyst.citizen@scamlens.com");
  const [userRole, setUserRole] = useState<"Community Sentinel" | "Security Analyst">("Security Analyst");

  // Global Environment State simulation (Dev vs Prod)
  const [currentEnv, setCurrentEnv] = useState<"development" | "production">("development");
  const [mockDataActive, setMockDataActive] = useState(true);
  const [strictWafActive, setStrictWafActive] = useState(false);

  // Encryption Testbench State
  const [cryptoInput, setCryptoInput] = useState(
    JSON.stringify(
      {
        target: "chase-auth-security-update9.cc",
        victim_email: "victim@example.com",
        evidence_loss_usd: 14500,
        bank_wire_reference: "WIRE-89124-SECRET",
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono mb-2 font-semibold">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>ACCOUNT & GLOBAL SETTINGS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0a2540] tracking-tight">
            Account & System Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your reporter credentials, inspect submitted incidents, and test global Development/Production environment settings.
          </p>
        </div>

        {/* Environment Badge */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-500">Global Env:</span>
          <span className={`px-2.5 py-1 rounded-lg font-bold uppercase ${
            currentEnv === "production"
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-amber-100 text-amber-900 border border-amber-300"
          }`}>
            {currentEnv}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-8">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "profile"
              ? "border-[#0a2540] text-[#0a2540]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Dashboard & My Reports</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "settings"
              ? "border-[#0a2540] text-[#0a2540]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Global Settings (Dev / Prod)</span>
        </button>

        <button
          onClick={() => setActiveTab("crypto")}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "crypto"
              ? "border-[#0a2540] text-[#0a2540]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Key className="w-4 h-4 text-amber-500" />
          <span>AES-256 Encryption Lab</span>
        </button>
      </div>

      {/* TAB 1: USER DASHBOARD & REPORTS */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold text-xl font-mono">
                SC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{userEmail}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                    {userRole}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reputation Score: <strong className="text-emerald-600 font-mono">98.5 / 100</strong> (14 verified submissions)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/report"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold shadow-xs hover:opacity-90 transition-all"
              >
                + New Incident Report
              </Link>
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
              >
                {isLoggedIn ? "Simulate Logout" : "Log In"}
              </button>
            </div>
          </div>

          {/* User Submitted Incidents */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                My Submitted Scam Reports
              </h3>
              <span className="text-xs text-slate-500 font-mono">3 Active Reports</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="py-3 px-4">Tracking ID</th>
                    <th className="py-3 px-4">Target Entity</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#0a2540]">SCAM-LENS-84920</td>
                    <td className="py-3 px-4 text-rose-700 font-semibold">chase-auth-security-update9.cc</td>
                    <td className="py-3 px-4 text-slate-600">Phishing</td>
                    <td className="py-3 px-4 text-slate-500">2026-09-21</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        VERIFIED SCAM
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#0a2540]">SCAM-LENS-71932</td>
                    <td className="py-3 px-4 text-rose-700 font-semibold">apex-yield-ai-finance.top</td>
                    <td className="py-3 px-4 text-slate-600">Crypto & Yield</td>
                    <td className="py-3 px-4 text-slate-500">2026-09-20</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        VERIFIED SCAM
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#0a2540]">SCAM-LENS-90184</td>
                    <td className="py-3 px-4 text-amber-700 font-semibold">+1 (888) 492-3819</td>
                    <td className="py-3 px-4 text-slate-600">SMS Smishing</td>
                    <td className="py-3 px-4 text-slate-500">2026-09-18</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        UNDER AUDIT
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL SETTINGS (DEVELOPMENT VS PRODUCTION) */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          {/* Environment Switcher Simulation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Active Runtime Environment
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Toggle parameters to test application behavior under Development and Production modes.
                </p>
              </div>

              <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200">
                <button
                  onClick={() => {
                    setCurrentEnv("development");
                    setMockDataActive(true);
                    setStrictWafActive(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    currentEnv === "development"
                      ? "bg-white text-[#0a2540] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
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
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    currentEnv === "production"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Production
                </button>
              </div>
            </div>

            {/* Matrix comparison table */}
            <div className="pt-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="py-3 px-4">Configuration Setting</th>
                    <th className="py-3 px-4">Development Setting</th>
                    <th className="py-3 px-4">Production Setting</th>
                    <th className="py-3 px-4">Current Active State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">API Route Base</td>
                    <td className="py-3.5 px-4 text-slate-500">http://localhost:3000/api</td>
                    <td className="py-3.5 px-4 text-slate-500">https://scamlens.com/api</td>
                    <td className="py-3.5 px-4 text-blue-700 font-bold">
                      {currentEnv === "production" ? "https://scamlens.com/api" : "http://localhost:3000/api"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Data Source Mode</td>
                    <td className="py-3.5 px-4 text-slate-500">In-Memory Mock Dataset</td>
                    <td className="py-3.5 px-4 text-slate-500">Hostinger MySQL (Prisma)</td>
                    <td className="py-3.5 px-4 text-amber-700 font-bold">
                      {mockDataActive ? "Mock Dataset Active" : "Hostinger MySQL Connected"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Minification & SWC Optimization</td>
                    <td className="py-3.5 px-4 text-slate-500">Disabled (Readable Bundles)</td>
                    <td className="py-3.5 px-4 text-slate-500">Enabled (Gzip + Console Stripping)</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-bold">
                      {currentEnv === "production" ? "Gzip & SWC Minified" : "Dev Debug Bundles"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Hostinger WAF & Security Headers</td>
                    <td className="py-3.5 px-4 text-slate-500">Permissive Localhost CORS</td>
                    <td className="py-3.5 px-4 text-slate-500">Strict CSP, HSTS, Rate Limits</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {strictWafActive ? "Strict WAF Active" : "Permissive Dev Mode"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Evidence Encryption Key</td>
                    <td className="py-3.5 px-4 text-slate-500">Local Dev Key Derived</td>
                    <td className="py-3.5 px-4 text-slate-500">Environment Vault Secret</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-bold">AES-256-GCM Armed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AES-256 ENCRYPTION & MINIFICATION TESTBENCH */}
      {activeTab === "crypto" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-amber-600 text-xs font-mono font-bold uppercase mb-1">
                <Key className="w-4 h-4" />
                <span>Web Crypto API (Native AES-256-GCM)</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Global Encryption & Minification Testbench
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Test encrypting sensitive scam incident data, victim identifiers, and financial records into compact, minified cipher packages.
              </p>
            </div>

            {/* Input payload */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                1. Plaintext or JSON Incident Payload
              </label>
              <textarea
                rows={5}
                value={cryptoInput}
                onChange={(e) => setCryptoInput(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleEncrypt}
                disabled={isEncrypting || !cryptoInput.trim()}
                className="px-6 py-3 rounded-xl bg-[#0a2540] hover:bg-[#1e3a8a] text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isEncrypting ? <RefreshCw className="w-4 h-4 animate-spin text-amber-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
                <span>Encrypt with AES-256-GCM</span>
              </button>

              {encryptedOutput && (
                <button
                  onClick={handleDecrypt}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  <span>Decrypt & Verify Integrity</span>
                </button>
              )}
            </div>

            {/* Encrypted output view */}
            {encryptedOutput && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs animate-in fade-in-50">
                <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800">Encrypted Package Output</span>
                  <span>Algorithm: {encryptedOutput.algorithm}</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Initialization Vector (IV):</span>
                    <code className="text-blue-700 font-bold break-all">{encryptedOutput.iv}</code>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Minified Ciphertext:</span>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-rose-700 font-bold break-all max-h-32 overflow-y-auto">
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
                    className="text-amber-600 hover:text-amber-700 font-bold cursor-pointer"
                  >
                    {copied ? "Copied Package" : "Copy Encrypted JSON"}
                  </button>
                </div>
              </div>
            )}

            {/* Decrypted verification view */}
            {decryptedResult && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 font-mono text-xs animate-in fade-in-50">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Decryption Successful & Cryptographic Integrity Verified</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-emerald-200 text-slate-800 whitespace-pre-wrap">
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
