"use client";

import React, { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  ExternalLink, 
  Calendar, 
  X,
  SlidersHorizontal
} from "lucide-react";
import { MOCK_SCAMS, MOCK_CATEGORIES, ScamReport } from "@/data/mockData";
import ScamCard from "@/components/ScamCard";
import { formatCurrency, formatDate } from "@/lib/utils";

function ScamDatabaseContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [minLoss, setMinLoss] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "loss" | "reports">("recent");
  const [activeModalScam, setActiveModalScam] = useState<ScamReport | null>(null);

  // Filter and sort items
  const filteredScams = useMemo(() => {
    return MOCK_SCAMS.filter((scam) => {
      // Search matching
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        scam.title.toLowerCase().includes(query) ||
        scam.targetDomainOrEntity.toLowerCase().includes(query) ||
        scam.summary.toLowerCase().includes(query) ||
        scam.category.toLowerCase().includes(query);

      // Category matching
      const matchesCategory =
        selectedCategory === "all" ||
        scam.category.toLowerCase().includes(selectedCategory.toLowerCase());

      // Loss filter
      const matchesLoss = scam.reportedLoss >= minLoss;

      // Verified filter
      const matchesVerified = !verifiedOnly || scam.verifiedByModerator;

      return matchesSearch && matchesCategory && matchesLoss && matchesVerified;
    }).sort((a, b) => {
      if (sortBy === "loss") return b.reportedLoss - a.reportedLoss;
      if (sortBy === "reports") return b.reportCount - a.reportCount;
      return new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime();
    });
  }, [searchQuery, selectedCategory, minLoss, verifiedOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono mb-2 font-semibold">
            <Search className="w-3.5 h-3.5 text-amber-600" />
            <span>COMMUNITY INCIDENT ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0a2540] tracking-tight">
            Scam Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse verified community incident reports, phishing portals, fake e-commerce stores, and investment traps.
          </p>
        </div>

        <Link
          href="/report"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold self-start md:self-auto hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md shadow-red-500/10"
        >
          <span>Report New Scam</span>
        </Link>
      </div>

      {/* Search & Control Filters Bar */}
      <div className="bg-white rounded-3xl p-5 mb-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by suspicious URL, keyword, domain, or fraud pattern..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-mono focus:border-amber-500 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 shrink-0 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono focus:border-amber-500 focus:outline-none cursor-pointer font-medium"
            >
              <option value="recent">Most Recent</option>
              <option value="loss">Highest Financial Loss</option>
              <option value="reports">Most Victim Complaints</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              All Types
            </button>
            {MOCK_CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === c.slug
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Checkbox filters */}
          <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 border-slate-300"
            />
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified Reports Only
            </span>
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between text-xs font-mono text-slate-500">
        <span>Showing {filteredScams.length} verified threats</span>
        {searchQuery && (
          <span>Search query: &quot;{searchQuery}&quot;</span>
        )}
      </div>

      {/* Grid */}
      {filteredScams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScams.map((scam) => (
            <ScamCard
              key={scam.id}
              scam={scam}
              onSelect={(s) => setActiveModalScam(s)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
          <ShieldAlert className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No Scams Matched Your Filters</h3>
          <p className="text-xs max-w-sm mx-auto mb-4 text-slate-500">
            Try adjusting your search keywords or clear your category filters to view other indexed threats.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setVerifiedOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-800 font-semibold transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Forensic Modal (Light Theme) */}
      {activeModalScam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50 duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                  {activeModalScam.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {activeModalScam.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalScam(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 text-xs font-mono cursor-pointer"
              >
                [Close ✕]
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 font-mono text-xs text-rose-800 break-all font-semibold">
                Suspect Target: <strong>{activeModalScam.targetDomainOrEntity}</strong>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-500 font-bold mb-1">Modus Operandi / Narrative:</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeModalScam.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Reported Loss</span>
                  <span className="text-base font-extrabold font-mono text-rose-700">
                    {formatCurrency(activeModalScam.reportedLoss)}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Complaints Logged</span>
                  <span className="text-base font-extrabold font-mono text-[#0a2540]">
                    {activeModalScam.reportCount} Verified Complaints
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-500 font-bold mb-2">Technical Indicators:</h4>
                <ul className="space-y-1.5 text-xs text-slate-600 font-mono">
                  {activeModalScam.indicators.domainAge && (
                    <li>• Domain Age: <span className="text-rose-700 font-semibold">{activeModalScam.indicators.domainAge}</span></li>
                  )}
                  <li>• SSL Status: <span className="text-amber-700 font-semibold">{activeModalScam.indicators.sslStatus}</span></li>
                  <li>• Threat Engines: <span className="text-rose-700 font-semibold">{activeModalScam.indicators.blacklistedCount} Engines Flagged</span></li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Report ID: {activeModalScam.id} • {formatDate(activeModalScam.dateReported)}
              </span>
              <Link
                href={`/check?q=${encodeURIComponent(activeModalScam.targetDomainOrEntity)}`}
                className="px-4 py-2 rounded-xl bg-[#0a2540] text-white text-xs font-bold hover:bg-[#1e3a8a] transition-all flex items-center gap-1.5"
              >
                <span>Launch Live Scan</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ScamsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-amber-600 font-mono text-sm">
        Loading Scam Directory...
      </div>
    }>
      <ScamDatabaseContent />
    </Suspense>
  );
}
