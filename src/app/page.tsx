"use client";

import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import IndiaThreatMap from "@/components/dashboard/IndiaThreatMap";
import LiveThreatFeed from "@/components/dashboard/LiveThreatFeed";
import TopScamCategories from "@/components/dashboard/TopScamCategories";
import ThreatAnalyticsCharts from "@/components/dashboard/ThreatAnalyticsCharts";
import RecentThreatTable from "@/components/dashboard/RecentThreatTable";
import { DASHBOARD_KPIS } from "@/data/dashboardDemoData";

export default function HomeDashboardPage() {
  return (
    <div className="bg-[#070a0f] text-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full">
        {/* Top Welcome & Sub-Header */}
        <div className="pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                INDIA OPERATIONS SECTOR
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">
                NATIONAL THREAT HORIZON
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>India Cyber Threat Intelligence Dashboard</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
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

        {/* 2. INDIA MAP + LIVE THREAT FEED */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <IndiaThreatMap />
          </div>
          <div className="lg:col-span-4">
            <LiveThreatFeed />
          </div>
        </section>

        {/* 3. TOP INDIAN SCAM CATEGORIES */}
        <section className="pt-2">
          <TopScamCategories />
        </section>

        {/* 4. THREAT ANALYTICS & SEVERITY */}
        <section className="pt-2">
          <ThreatAnalyticsCharts />
        </section>

        {/* 5. RECENT THREAT TABLE */}
        <section className="pt-2">
          <RecentThreatTable />
        </section>

        {/* 6. PLATFORM DISCLAIMER & NOTICE */}
        <section className="p-4 rounded-2xl bg-slate-950/70 border border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Disclaimer:</strong> ScamLens is an independent community cyber threat intelligence and research platform. Data is demonstrative/crowd-sourced and does not claim official Indian government agency affiliation.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/threat-intelligence" className="text-cyan-400 hover:underline">
              Heuristic Crawler
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/learn" className="text-cyan-400 hover:underline">
              Safety Guides
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
