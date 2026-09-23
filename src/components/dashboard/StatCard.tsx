"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Activity, 
  FileWarning, 
  Globe, 
  PhoneCall, 
  CreditCard 
} from "lucide-react";
import { DashboardKPI } from "@/data/dashboardDemoData";

const ICON_MAP: Record<string, React.ElementType> = {
  total_threats: ShieldAlert,
  active_threats: Activity,
  scams_reported: FileWarning,
  domains_flagged: Globe,
  phones_flagged: PhoneCall,
  upi_fraud_reports: CreditCard,
};

export default function StatCard({ kpi }: { kpi: DashboardKPI }) {
  const Icon = ICON_MAP[kpi.id] || ShieldAlert;

  const colorStyles = {
    cyan: {
      border: "border-cyan-500/20 hover:border-cyan-500/50",
      glow: "hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.15)]",
      iconBg: "bg-cyan-950/70 text-cyan-400 border-cyan-800/50",
      accentText: "text-cyan-400",
    },
    rose: {
      border: "border-rose-500/20 hover:border-rose-500/50",
      glow: "hover:shadow-[0_0_20px_-3px_rgba(239,68,68,0.15)]",
      iconBg: "bg-rose-950/70 text-rose-400 border-rose-800/50",
      accentText: "text-rose-400",
    },
    amber: {
      border: "border-amber-500/20 hover:border-amber-500/50",
      glow: "hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.15)]",
      iconBg: "bg-amber-950/70 text-amber-400 border-amber-800/50",
      accentText: "text-amber-400",
    },
    blue: {
      border: "border-blue-500/20 hover:border-blue-500/50",
      glow: "hover:shadow-[0_0_20px_-3px_rgba(59,130,246,0.15)]",
      iconBg: "bg-blue-950/70 text-blue-400 border-blue-800/50",
      accentText: "text-blue-400",
    },
    purple: {
      border: "border-purple-500/20 hover:border-purple-500/50",
      glow: "hover:shadow-[0_0_20px_-3px_rgba(168,85,247,0.15)]",
      iconBg: "bg-purple-950/70 text-purple-400 border-purple-800/50",
      accentText: "text-purple-400",
    },
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/50",
      glow: "hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.15)]",
      iconBg: "bg-emerald-950/70 text-emerald-400 border-emerald-800/50",
      accentText: "text-emerald-400",
    },
  }[kpi.accentColor || "cyan"];

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-[#0d1420]/80 backdrop-blur-md border ${colorStyles.border} ${colorStyles.glow} transition-all duration-300 relative group flex flex-col justify-between`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="space-y-1">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-slate-400 uppercase font-semibold block">
            {kpi.title}
          </span>
          <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-800 inline-block">
            {kpi.statusText}
          </span>
        </div>
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${colorStyles.iconBg} group-hover:scale-105 transition-transform shrink-0`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Large Metric Number */}
      <div className="my-1">
        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white block">
          {kpi.value}
        </span>
      </div>

      {/* Trend Percentage & Subtext */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono mt-2">
        <span className={`inline-flex items-center gap-0.5 font-bold ${kpi.isIncrease ? "text-rose-400" : "text-emerald-400"}`}>
          {kpi.isIncrease ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {kpi.isIncrease ? "↑" : "↓"} {kpi.trendPercentage}%
        </span>
        <span className="text-slate-500 text-[10px] truncate">
          {kpi.comparisonText}
        </span>
      </div>
    </div>
  );
}
