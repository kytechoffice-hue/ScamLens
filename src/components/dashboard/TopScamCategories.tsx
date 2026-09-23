"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  CreditCard, 
  Smartphone, 
  Briefcase, 
  TrendingUp, 
  Package, 
  Scale, 
  Banknote, 
  Share2, 
  Cpu, 
  ShoppingBag,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { TOP_INDIAN_SCAM_CATEGORIES, ScamCategorySummary } from "@/data/dashboardDemoData";

const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  cat_upi: CreditCard,
  cat_phish: ShieldAlert,
  cat_kyc: Smartphone,
  cat_digital_arrest: Scale,
  cat_job: Briefcase,
  cat_invest: TrendingUp,
  cat_courier: Package,
  cat_loan: Banknote,
  cat_sim: Smartphone,
  cat_shopping: ShoppingBag,
  cat_social: Share2,
  cat_tech: Cpu,
};

export default function TopScamCategories() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              INDIAN CYBER FRAUD PATTERNS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Top Indian Scam Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Active vectors targeting citizens, UPI payment rails, telecom networks, and banking portals.
          </p>
        </div>

        <Link
          href="/scams"
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 self-start sm:self-auto font-semibold hover:underline"
        >
          <span>Open Full Scam Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of 12 Indian Threat Vectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {TOP_INDIAN_SCAM_CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICON_MAP[cat.id] || ShieldAlert;
          const isCritical = cat.riskLevel === "CRITICAL RISK";
          const isHigh = cat.riskLevel === "HIGH RISK";

          return (
            <Link
              key={cat.id}
              href={`/scams?category=${encodeURIComponent(cat.name)}`}
              className="p-5 rounded-2xl bg-[#0c131f]/85 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                {/* Top Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isCritical
                      ? "bg-rose-950/70 text-rose-400 border-rose-800/60"
                      : isHigh
                      ? "bg-amber-950/70 text-amber-400 border-amber-800/60"
                      : "bg-cyan-950/70 text-cyan-400 border-cyan-800/60"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded border ${
                    isCritical
                      ? "bg-rose-950 text-rose-400 border-rose-800/80"
                      : isHigh
                      ? "bg-amber-950 text-amber-400 border-amber-800/80"
                      : "bg-cyan-950 text-cyan-400 border-cyan-800/80"
                  }`}>
                    {cat.riskLevel}
                  </span>
                </div>

                {/* Category Name */}
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {cat.description}
                </p>
              </div>

              {/* Metrics & Vector */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">
                    {cat.incidentsCount.toLocaleString()} incidents
                  </span>
                  <span className="text-rose-400 font-bold flex items-center gap-0.5">
                    ↑ {cat.trendPercentage}%
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  Vector: <span className="text-slate-300">{cat.primaryVector}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
