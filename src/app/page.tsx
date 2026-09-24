"use client";

import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import TopScamCategories from "@/components/dashboard/TopScamCategories";
import ThreatAnalyticsCharts from "@/components/dashboard/ThreatAnalyticsCharts";
import RecentThreatTable from "@/components/dashboard/RecentThreatTable";
import { DASHBOARD_KPIS } from "@/data/dashboardDemoData";

export default function HomeDashboardPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full">
        {/* Top Welcome & Sub-Header */}
        <div className="pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
                INDIA OPERATIONS SECTOR
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                NATIONAL THREAT HORIZON
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0a2540] tracking-tight flex items-center gap-3">
              <span>Our current registered India Cyber Threat Dashboard</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Continuous surveillance of digital arrest extortion, UPI collect fraud, banking phishing portals, fake job tasks, and malicious infrastructure targeting Indian citizens.
            </p>
          </div>
        </div>

        {/* 1. DASHBOARD SUMMARY CARDS */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {DASHBOARD_KPIS.map((kpi) => (
              <StatCard key={kpi.id} kpi={kpi} />
            ))}
          </div>
        </section>

        {/* 2. THREAT ANALYTICS & SEVERITY */}
        <section className="pt-2">
          <ThreatAnalyticsCharts />
        </section>

        {/* 3. TOP INDIAN SCAM CATEGORIES */}
        <section className="pt-2">
          <TopScamCategories />
        </section>

        {/* 4. RECENT THREAT TABLE */}
        <section className="pt-2">
          <RecentThreatTable />
        </section>

        {/* 5. PLATFORM DISCLAIMER & NOTICE */}
        <section className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Disclaimer:</strong> ScamLens is an independent community cyber threat intelligence and research platform. Data is demonstrative/crowd-sourced and does not claim official Indian government agency affiliation.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/threat-intelligence" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold">
              Heuristic Crawler
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/learn" className="text-amber-600 hover:text-amber-700 hover:underline font-semibold">
              Safety Guides
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
