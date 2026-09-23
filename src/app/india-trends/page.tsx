"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, ShieldAlert, ExternalLink, ArrowRight } from "lucide-react";
import TopScamCategories from "@/components/dashboard/TopScamCategories";
import { TOP_INDIAN_SCAM_CATEGORIES } from "@/data/dashboardDemoData";

export default function IndiaTrendsPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 w-full">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              VECTOR ANALYSIS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Indian Cyber Scam Trends & Emerging Vectors
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Breakdown of digital arrest extortion, fake courier parcels, Telegram recharge rings, and banking impersonations.
          </p>
        </div>

        <Link
          href="/"
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-mono border border-slate-750 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
      </div>

      <TopScamCategories />

      {/* Advisory Callout */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <span>Key Advisory for Indian Internet Users</span>
        </h3>
        <ul className="space-y-2 text-xs font-mono text-slate-300 leading-relaxed">
          <li>• <strong>UPI PIN is ONLY required to send money</strong>: Receiving payments never requires entering your UPI PIN or scanning a collect QR code.</li>
          <li>• <strong>No Indian law enforcement arrests citizens over WhatsApp or Skype video calls</strong>: &quot;Digital Arrest&quot; is an organized cyber-extortion scheme. Disconnect immediately.</li>
          <li>• <strong>Never click SMS links regarding electricity disconnection or SIM card expiration</strong>: Official updates are communicated via verified service portals and registered bills.</li>
        </ul>
      </div>
    </div>
  );
}
