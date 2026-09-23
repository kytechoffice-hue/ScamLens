"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  Search, 
  ExternalLink, 
  Eye, 
  Bookmark, 
  BookmarkCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Filter,
  X,
  Copy,
  Check
} from "lucide-react";
import { RECENT_FLAGGED_THREATS, RecentThreatRecord } from "@/data/dashboardDemoData";

export default function RecentThreatTable() {
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedThreatModal, setSelectedThreatModal] = useState<RecentThreatRecord | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [copiedIndicator, setCopiedIndicator] = useState(false);

  const toggleWatchlist = (id: string) => {
    if (watchlist.includes(id)) {
      setWatchlist(watchlist.filter((item) => item !== id));
    } else {
      setWatchlist([...watchlist, id]);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndicator(true);
    setTimeout(() => setCopiedIndicator(false), 2000);
  };

  const filteredThreats = RECENT_FLAGGED_THREATS.filter((t) => {
    const q = searchFilter.toLowerCase();
    return (
      !q ||
      t.threatId.toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q) ||
      t.target.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.status.toLowerCase().includes(q)
    );
  });

  const getRiskBadge = (risk: RecentThreatRecord["riskLevel"]) => {
    switch (risk) {
      case "Critical":
        return "bg-rose-950/80 text-rose-400 border-rose-800/80";
      case "High":
        return "bg-amber-950/80 text-amber-400 border-amber-800/80";
      case "Medium":
        return "bg-cyan-950/80 text-cyan-400 border-cyan-800/80";
      default:
        return "bg-slate-900 text-slate-400 border-slate-700";
    }
  };

  const getStatusBadge = (status: RecentThreatRecord["status"]) => {
    switch (status) {
      case "Confirmed Fraud":
        return "bg-rose-950/60 text-rose-300 border-rose-900/60";
      case "Escalated":
        return "bg-purple-950/60 text-purple-300 border-purple-900/60";
      case "Under Review":
        return "bg-amber-950/60 text-amber-300 border-amber-900/60";
      case "Mitigated":
        return "bg-emerald-950/60 text-emerald-300 border-emerald-900/60";
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#0c131f]/90 border border-slate-800 shadow-2xl space-y-4">
      {/* Table Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              SECURITY AUDIT LOG
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Recently Flagged Threats
          </h2>
        </div>

        {/* Search Input Filter */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-cyan-400/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter threat ID, target, or location..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs font-mono focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider bg-slate-950/40">
              <th className="py-3 px-3">Threat ID</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">Target / Indicator</th>
              <th className="py-3 px-3">Location</th>
              <th className="py-3 px-3">Risk Level</th>
              <th className="py-3 px-3">Reported</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-slate-300">
            {filteredThreats.map((row) => {
              const isWatchlisted = watchlist.includes(row.threatId);

              return (
                <tr
                  key={row.threatId}
                  className="hover:bg-slate-900/60 transition-colors group"
                >
                  {/* Threat ID */}
                  <td className="py-3.5 px-3 font-bold text-cyan-400">
                    {row.threatId}
                  </td>

                  {/* Type */}
                  <td className="py-3.5 px-3 text-slate-200 font-semibold">
                    {row.type}
                  </td>

                  {/* Target */}
                  <td className="py-3.5 px-3 text-slate-300 max-w-[200px] truncate" title={row.target}>
                    {row.target}
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">
                    📍 {row.location}
                  </td>

                  {/* Risk Level */}
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskBadge(row.riskLevel)}`}>
                      {row.riskLevel}
                    </span>
                  </td>

                  {/* Reported Time */}
                  <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">
                    {row.reportedAgo}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(row.status)}`}>
                      {row.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedThreatModal(row)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-750 transition-colors"
                        title="View Incident Telemetry"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        href={`/check?q=${encodeURIComponent(row.target)}`}
                        className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/60 transition-colors"
                        title="Investigate with Scanner"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => toggleWatchlist(row.threatId)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isWatchlisted
                            ? "bg-amber-950 text-amber-400 border-amber-700"
                            : "bg-slate-900 text-slate-400 hover:text-amber-400 border-slate-750"
                        }`}
                        title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                      >
                        {isWatchlisted ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Forensic Inspection Modal */}
      {selectedThreatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in-50 duration-150">
          <div className="bg-[#0e1624] border border-slate-750 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 text-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  INCIDENT INVESTIGATION DOSSIER
                </span>
                <h3 className="text-xl font-black text-white">
                  {selectedThreatModal.threatId} — {selectedThreatModal.type}
                </h3>
              </div>
              <button
                onClick={() => setSelectedThreatModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Flagged Target / Indicator:</span>
                  <span className="text-sm font-bold text-rose-400 break-all">
                    {selectedThreatModal.target}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(selectedThreatModal.target)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 transition-colors ml-2 shrink-0"
                  title="Copy indicator"
                >
                  {copiedIndicator ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Origin Location</span>
                  <span className="text-sm font-bold text-white">📍 {selectedThreatModal.location}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Risk Evaluation</span>
                  <span className={`text-sm font-bold ${selectedThreatModal.riskLevel === "Critical" ? "text-rose-400" : "text-amber-400"}`}>
                    {selectedThreatModal.riskLevel} SEVERITY
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block mb-1">Operational Status</span>
                <p className="text-slate-300">
                  Current Workflow: <strong>{selectedThreatModal.status}</strong>. Indicator has been synchronized across ScamLens automated browser heuristics and reported to collaborative defense networks.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <Link
                href="/report"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-mono border border-slate-750 transition-colors"
              >
                Submit Supplemental Evidence
              </Link>
              <Link
                href={`/check?q=${encodeURIComponent(selectedThreatModal.target)}`}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
              >
                <span>Launch Full Scanner</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
