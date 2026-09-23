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
      border: "hover:border-blue-300",
      glow: "hover:shadow-md",
      iconBg: "bg-blue-50 text-blue-700 border-blue-200",
      accentText: "text-blue-700",
    },
    rose: {
      border: "hover:border-red-300",
      glow: "hover:shadow-md",
      iconBg: "bg-red-50 text-red-700 border-red-200",
      accentText: "text-red-700",
    },
    amber: {
      border: "hover:border-amber-300",
      glow: "hover:shadow-md",
      iconBg: "bg-amber-50 text-amber-800 border-amber-200",
      accentText: "text-amber-800",
    },
    blue: {
      border: "hover:border-blue-300",
      glow: "hover:shadow-md",
      iconBg: "bg-blue-50 text-blue-700 border-blue-200",
      accentText: "text-blue-700",
    },
    purple: {
      border: "hover:border-purple-300",
      glow: "hover:shadow-md",
      iconBg: "bg-purple-50 text-purple-700 border-purple-200",
      accentText: "text-purple-700",
    },
    emerald: {
      border: "hover:border-emerald-300",
      glow: "hover:shadow-md",
      iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      accentText: "text-emerald-700",
    },
  }[kpi.accentColor || "cyan"];

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs ${colorStyles.border} ${colorStyles.glow} transition-all duration-300 relative group flex flex-col justify-between`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="space-y-1">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-slate-500 uppercase font-semibold block">
            {kpi.title}
          </span>
          <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 inline-block font-medium">
            {kpi.statusText}
          </span>
        </div>
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${colorStyles.iconBg} group-hover:scale-105 transition-transform shrink-0`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Large Metric Number */}
      <div className="my-1">
        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#0a2540] block">
          {kpi.value}
        </span>
      </div>

      {/* Trend Percentage & Subtext */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-[11px] font-mono mt-2">
        <span className={`inline-flex items-center gap-0.5 font-bold ${kpi.isIncrease ? "text-rose-600" : "text-emerald-600"}`}>
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
