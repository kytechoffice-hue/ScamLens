"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  PlusCircle, FileText, ChevronLeft, ChevronRight,
  Filter, X, Loader2, AlertCircle, RefreshCw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ReportStatus = "VERIFIED SCAM" | "UNDER AUDIT" | "PENDING" | "REJECTED";

type Report = {
  id: number;
  tracking_id: string;
  status: ReportStatus;
  category: string;
  category_tag: string;
  category_slug: string;
  platform: string;
  incident_date: string;
  lost_money: boolean;
  amount_lost_inr: number | null;
  scammer_url: string | null;
  scammer_phone: string | null;
  created_at: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUSES: ReportStatus[] = ["VERIFIED SCAM", "UNDER AUDIT", "PENDING", "REJECTED"];
const PAGE_SIZE = 10;

// ─── Category label map ───────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, string> = {
  "Crypto & Yield":  "Cryptocurrency Fraud",
  "Job Scam":        "Fake Job Offers",
  "Loan Scam":       "Fake Loan Offers",
  "Lottery Scam":    "Fake Lottery / Prize Offers",
  "NFT Scam":        "Digital Asset Fraud",
  "Phishing":        "Fake Website Scams",
  "SMS Smishing":    "Fake SMS / Message Scams",
  "Voice Phishing":  "Fake Calls / Phone Scams",
};

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ReportStatus }) {
  const styles: Record<ReportStatus, string> = {
    "VERIFIED SCAM": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "UNDER AUDIT":   "bg-amber-50  text-amber-700  border-amber-200",
    "PENDING":       "bg-sky-50    text-sky-700    border-sky-200",
    "REJECTED":      "bg-rose-50   text-rose-700   border-rose-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AccountPage() {
  // Filter state
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo,   setDateTo]   = useState("");
  const [category, setCategory] = useState("");
  const [status,   setStatus]   = useState("");
  const [page,     setPage]     = useState(1);

  // Data state
  const [reports,    setReports]    = useState<Report[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");

  // ── Fetch from API ──────────────────────────────────────────────────────────
  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (dateFrom)  params.set("from",     dateFrom);
      if (dateTo)    params.set("to",       dateTo);
      if (category)  params.set("category", category);
      if (status)    params.set("status",   status);
      params.set("page",  String(page));
      params.set("limit", String(PAGE_SIZE));

      const res  = await fetch(`/api/reports?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) throw new Error(json.message ?? "Failed to load reports.");

      setReports(json.data as Report[]);
      setPagination(json.pagination as Pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo, category, status, page]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const applyFilter = (fn: () => void) => { fn(); setPage(1); };
  const clearFilters = () => { setDateFrom(""); setDateTo(""); setCategory(""); setStatus(""); setPage(1); };
  const hasFilters = dateFrom || dateTo || category || status;

  const total      = pagination?.total      ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const safePage   = Math.min(page, totalPages);

  // ── Target entity to display ─────────────────────────────────────────────────
  const getTarget = (r: Report) => r.scammer_url || r.scammer_phone || "—";
  const isPhone   = (r: Report) => !r.scammer_url && !!r.scammer_phone;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono mb-2 font-semibold">
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>MY ACCOUNT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0a2540] tracking-tight">
            My Submitted Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track and manage all scam incidents you have reported to ScamLens.
          </p>
        </div>

        <Link
          href="/report"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold shadow-md shadow-red-500/20 hover:opacity-90 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          New Incident Report
        </Link>
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4 mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filters
          </div>

          {/* Date From */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => applyFilter(() => setDateFrom(e.target.value))}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-slate-50"
            />
          </div>

          {/* Date To */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => applyFilter(() => setDateTo(e.target.value))}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-slate-50"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Category</label>
            <select
              value={category}
              onChange={(e) => applyFilter(() => setCategory(e.target.value))}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-slate-50 min-w-[160px]"
            >
              <option value="">All Types</option>
              {Object.entries(CATEGORY_LABELS).map(([orig, label]) => (
                <option key={orig} value={orig}>
                  {label} ({orig})
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Status</label>
            <select
              value={status}
              onChange={(e) => applyFilter(() => setStatus(e.target.value))}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-slate-50 min-w-[140px]"
            >
              <option value="">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold border border-rose-200 rounded-lg px-3 py-1.5 bg-rose-50 hover:bg-rose-100 transition-colors mt-4"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}

          {/* Refresh */}
          <button
            onClick={fetchReports}
            disabled={loading}
            className="ml-auto inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 font-semibold border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 hover:bg-slate-100 transition-colors mt-4 disabled:opacity-40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Reports Table ── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header row */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Submitted Scam Reports</h2>
          <span className="text-xs text-slate-500 font-mono">
            {loading ? "Loading…" : `${total} ${total === 1 ? "Report" : "Reports"}`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="py-3 px-6">Tracking ID</th>
                <th className="py-3 px-6">Target Entity</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">

              {/* Loading skeleton */}
              {loading && Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: 5 }).map((__, j) => (
                    <td key={j} className="py-3.5 px-6">
                      <div className="h-3 bg-slate-100 rounded-full w-3/4" />
                    </td>
                  ))}
                </tr>
              ))}

              {/* Error state */}
              {!loading && error && (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <AlertCircle className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                    <p className="text-xs text-rose-500 font-medium">{error}</p>
                    <button
                      onClick={fetchReports}
                      className="mt-3 text-xs text-slate-500 underline hover:text-slate-700"
                    >
                      Try again
                    </button>
                  </td>
                </tr>
              )}

              {/* Empty state */}
              {!loading && !error && reports.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-14 text-center">
                    <FileText className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-400">No reports found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {hasFilters ? "Try adjusting your filters." : "Submit your first scam report to get started."}
                    </p>
                    {!hasFilters && (
                      <Link
                        href="/report"
                        className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-xl bg-[#0a2540] text-white text-xs font-bold hover:opacity-90 transition-all"
                      >
                        <PlusCircle className="w-3.5 h-3.5" /> New Report
                      </Link>
                    )}
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!loading && !error && reports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-[#0a2540]">{r.tracking_id}</td>
                  <td className={`py-3.5 px-6 font-semibold ${isPhone(r) ? "text-amber-700" : "text-rose-700"}`}>
                    {getTarget(r)}
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    {CATEGORY_LABELS[r.category_tag] ?? r.category}
                    <span className="ml-1 text-slate-400 font-normal">({r.category_tag})</span>
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    {r.incident_date?.slice(0, 10)}
                  </td>
                  <td className="py-3.5 px-6">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[11px] text-slate-400 font-mono">
              Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, total)} of {total}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`min-w-[28px] h-7 rounded-lg text-[11px] font-bold border transition-colors ${
                    p === safePage
                      ? "bg-[#0a2540] text-white border-[#0a2540]"
                      : "border-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
