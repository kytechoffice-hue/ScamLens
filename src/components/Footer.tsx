import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, ExternalLink, AlertOctagon, HeartHandshake, FileText, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 text-sm mt-auto">
      {/* Emergency Fraud Help Banner */}
      <div className="border-b border-slate-800 bg-slate-950 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-rose-300">
            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>Fallen victim to online fraud?</strong> Contact your bank immediately and submit official complaints to law enforcement.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-300 font-mono text-[11px]">
            <span>FBI IC3: <a href="https://www.ic3.gov" target="_blank" rel="noreferrer" className="underline hover:text-white">ic3.gov</a></span>
            <span className="text-slate-600">•</span>
            <span>US FTC: <a href="https://reportfraud.ftc.gov" target="_blank" rel="noreferrer" className="underline hover:text-white">reportfraud.ftc.gov</a></span>
            <span className="text-slate-600">•</span>
            <span>UK Action Fraud: <a href="https://www.actionfraud.police.uk" target="_blank" rel="noreferrer" className="underline hover:text-white">0300 123 2040</a></span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 border-2 border-amber-500/40 shadow-xs flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="ScamLens" width={40} height={40} className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white">
                  Scam<span className="text-amber-400">Lens</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium">
                  See it. Report it. Stop it.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decentralized community-driven threat intelligence. We expose online scams, phishing portals, and cyber fraud to safeguard digital citizens.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Crowd-Verified Intel
              </span>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase font-mono mb-4">
              ScamLens Pages
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  🏠 Home (Search & Overview)
                </Link>
              </li>
              <li>
                <Link href="/scams" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  🔎 Scam Directory
                </Link>
              </li>
              <li>
                <Link href="/check" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  🌐 Check Website
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  📚 Learn (Safety Guides)
                </Link>
              </li>
              <li>
                <Link href="/report" className="hover:text-rose-300 transition-colors flex items-center gap-1.5 text-rose-400">
                  🚨 Report a Scam
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  👤 Account & Testing Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Threat Categories */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase font-mono mb-4">
              Common Threats
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/scams?category=phishing" className="hover:text-amber-300 transition-colors">
                  Phishing & Clone Websites
                </Link>
              </li>
              <li>
                <Link href="/scams?category=crypto" className="hover:text-amber-300 transition-colors">
                  Crypto Yield & Ponzi Schemes
                </Link>
              </li>
              <li>
                <Link href="/scams?category=job-fraud" className="hover:text-amber-300 transition-colors">
                  Remote Task & Job Scams
                </Link>
              </li>
              <li>
                <Link href="/scams?category=fake-stores" className="hover:text-amber-300 transition-colors">
                  Ghost E-Commerce Stores
                </Link>
              </li>
              <li>
                <Link href="/scams?category=impersonation" className="hover:text-amber-300 transition-colors">
                  Executive & Govt Impersonation
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Architecture */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase font-mono mb-4">
              Platform Architecture
            </h3>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-slate-400">Frontend & UI:</span>
                <span className="text-amber-300">Next.js + Tailwind</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-slate-400">Security Layer:</span>
                <span className="text-emerald-300">AES-256-GCM Encrypted</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-slate-400">Hosting:</span>
                <span className="text-cyan-300">Hostinger + GitHub CI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="pt-6 mt-8 border-t border-slate-800 text-center sm:text-left">
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            <strong className="text-amber-400 font-semibold">Disclaimer:</strong> ScamLens is for information and awareness only. Results are indicative and do not guarantee the safety or legitimacy of any website, link, or online activity.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ScamLens. See it. Report it. Stop it. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/learn" className="text-slate-400 hover:text-white">Safety Guides</Link>
            <Link href="/account" className="text-slate-400 hover:text-white">Global Settings</Link>
            <Link href="/report" className="text-slate-400 hover:text-white">Submit Incident</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
