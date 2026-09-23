import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, ExternalLink, AlertOctagon, HeartHandshake, FileText, Globe, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#080d16] border-t border-slate-800 text-slate-400 text-xs mt-auto z-20">
      {/* Emergency Fraud Help Banner (India Focused) */}
      <div className="border-b border-slate-850 bg-slate-950/90 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-rose-300">
            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
            <span>
              <strong>Fallen victim to cyber fraud?</strong> Call National Cyber Helpline <strong>1930</strong> immediately within the golden hour.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>India Helpline: <strong className="text-rose-400">1930</strong></span>
            <span className="text-slate-700">•</span>
            <span>Portal: <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">cybercrime.gov.in</a></span>
            <span className="text-slate-700">•</span>
            <span>Chakshu Sanchar Saathi: <a href="https://sancharsaathi.gov.in" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">sancharsaathi.gov.in</a></span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 p-0.5 border border-cyan-500/40 shadow-xs flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="ScamLens" width={32} height={32} className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white">
                  SCAM<span className="text-cyan-400">LENS</span>
                </span>
                <p className="text-[10px] text-slate-500 font-mono">
                  India Cyber Threat Intelligence
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Decentralized community-driven threat radar. Exposing UPI fraud, banking phishing, digital arrest extortions, and malicious infrastructure to protect Indian citizens.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                Crowd-Verified Intelligence
              </span>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase font-mono mb-3">
              Operations Center
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  🏠 India Threat Dashboard
                </Link>
              </li>
              <li>
                <Link href="/threat-intelligence" className="hover:text-cyan-400 transition-colors text-cyan-300 font-semibold">
                  🛡 Threat Intelligence Matrix
                </Link>
              </li>
              <li>
                <Link href="/check" className="hover:text-cyan-400 transition-colors">
                  🔎 Check Website & Indicators
                </Link>
              </li>
              <li>
                <Link href="/threat-map" className="hover:text-cyan-400 transition-colors">
                  🌐 Live India Threat Map
                </Link>
              </li>
              <li>
                <Link href="/scams" className="hover:text-cyan-400 transition-colors">
                  📋 Scam Directory Archive
                </Link>
              </li>
              <li>
                <Link href="/report" className="hover:text-rose-400 transition-colors text-rose-400 font-semibold">
                  🚨 Report Scam Incident
                </Link>
              </li>
            </ul>
          </div>

          {/* Threat Categories */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase font-mono mb-3">
              Active Indian Vectors
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/scams?category=upi" className="hover:text-cyan-400 transition-colors">
                  UPI & QR Code Traps
                </Link>
              </li>
              <li>
                <Link href="/scams?category=digital-arrest" className="hover:text-cyan-400 transition-colors">
                  Digital Arrest Extortion
                </Link>
              </li>
              <li>
                <Link href="/scams?category=phishing" className="hover:text-cyan-400 transition-colors">
                  Bank KYC & Netbanking Phishing
                </Link>
              </li>
              <li>
                <Link href="/scams?category=job" className="hover:text-cyan-400 transition-colors">
                  Telegram Job / Video Recharge
                </Link>
              </li>
              <li>
                <Link href="/scams?category=courier" className="hover:text-cyan-400 transition-colors">
                  Customs / FedEx Parcel Scams
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Security */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase font-mono mb-3">
              Security Architecture
            </h3>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Framework:</span>
                <span className="text-cyan-400 font-semibold">Next.js 16 + React 19</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Security Vault:</span>
                <span className="text-emerald-400 font-semibold">AES-256-GCM Encrypted</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Sector:</span>
                <span className="text-amber-400 font-semibold">🇮🇳 India Cyber Space</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 mt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} ScamLens. Independent Community Cyber Threat Intelligence. Demonstrative Data.</p>
          <div className="flex items-center gap-4">
            <Link href="/learn" className="text-slate-400 hover:text-white">Safety Guides</Link>
            <Link href="/account" className="text-slate-400 hover:text-white">Operations Lab</Link>
            <Link href="/report" className="text-rose-400 hover:text-rose-300">Submit Incident</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
