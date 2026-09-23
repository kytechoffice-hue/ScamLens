"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import ThreatAnalyticsCharts from "@/components/dashboard/ThreatAnalyticsCharts";
import StatCard from "@/components/dashboard/StatCard";
import { DASHBOARD_KPIS } from "@/data/dashboardDemoData";

export default function AnalyticsPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 w-full">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              DEEP TELEMETRY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Threat Analytics & Cyber Intelligence Metrics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Quantitative analysis of fraud vectors, temporal surges, and regional vulnerability across India.
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {DASHBOARD_KPIS.map((kpi) => (
          <StatCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Charts Module */}
      <ThreatAnalyticsCharts />
    </div>
  );
}
