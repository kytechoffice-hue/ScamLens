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
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
              INDIAN CYBER FRAUD PATTERNS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0a2540] tracking-tight">
            Top Indian Scam Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Active vectors targeting citizens, UPI payment rails, telecom networks, and banking portals.
          </p>
        </div>

        <Link
          href="/scams"
          className="text-xs font-mono text-amber-600 hover:text-amber-700 flex items-center gap-1.5 self-start sm:self-auto font-semibold hover:underline"
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
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-300 hover:shadow-md transition-all duration-200 group flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Top Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isCritical
                      ? "bg-red-50 text-red-700 border-red-200"
                      : isHigh
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isCritical
                      ? "bg-red-50 text-red-700 border-red-200"
                      : isHigh
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}>
                    {cat.riskLevel}
                  </span>
                </div>

                {/* Category Name */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1.5">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {cat.description}
                </p>
              </div>

              {/* Metrics & Vector */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-semibold">
                    {cat.incidentsCount.toLocaleString()} incidents
                  </span>
                  <span className="text-rose-600 font-bold flex items-center gap-0.5">
                    ↑ {cat.trendPercentage}%
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Vector: <span className="text-slate-700 font-medium">{cat.primaryVector}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
