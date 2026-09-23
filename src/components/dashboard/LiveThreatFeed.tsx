"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Radio, 
  ShieldAlert, 
  MapPin, 
  ExternalLink, 
  Filter, 
  Clock, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye
} from "lucide-react";
import { LIVE_INDIA_THREAT_FEED, LiveThreatItem } from "@/data/dashboardDemoData";

interface LiveThreatFeedProps {
  columns?: 1 | 2 | 3;
}

export default function LiveThreatFeed({ columns = 1 }: LiveThreatFeedProps) {
  const [filterSeverity, setFilterSeverity] = useState<"ALL" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW">("ALL");
  const [feedItems, setFeedItems] = useState<LiveThreatItem[]>(LIVE_INDIA_THREAT_FEED);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic simulation of incoming real-time telemetry every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFeedItems((prev) => {
        // Rotate first item or update timestamp
        const first = prev[0];
        const now = new Date();
        const istTime = now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        const rotated = [
          {
            ...first,
            id: `TH-${Math.floor(8500 + Math.random() * 500)}`,
            time: istTime,
          },
          ...prev.slice(1),
        ];
        return rotated;
      });
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredItems = feedItems.filter((item) => {
    if (filterSeverity === "ALL") return true;
    return item.severity === filterSeverity;
  });

  const getSeverityBadge = (severity: LiveThreatItem["severity"]) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-rose-950/90 text-rose-400 border border-rose-800/80";
      case "HIGH":
        return "bg-amber-950/90 text-amber-400 border border-amber-800/80";
      case "MEDIUM":
        return "bg-cyan-950/90 text-cyan-400 border border-cyan-800/80";
      case "LOW":
        return "bg-slate-900 text-slate-400 border border-slate-700";
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-[#0c131f]/90 border border-slate-800 shadow-2xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>LIVE INDIA THREAT FEED</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              Heuristic Crawler & Citizen Stream
            </p>
          </div>
        </div>

        <button
          onClick={handleManualRefresh}
          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 transition-colors"
          title="Refresh stream"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        {(["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((sev) => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              filterSeverity === sev
                ? "bg-cyan-500 text-slate-950 shadow-xs"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="flex-1 overflow-y-auto pr-1 max-h-[580px]">
        <div className={columns === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-3" : columns === 3 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" : "space-y-2.5"}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-850 hover:border-slate-700 transition-all hover:bg-slate-900/60 group"
            >
              {/* Top row: Time + Category + Severity */}
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono mb-1.5">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{item.time} IST</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500 font-semibold">{item.id}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider ${getSeverityBadge(item.severity)}`}>
                  {item.severity}
                </span>
              </div>

              {/* Threat Type Title */}
              <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {item.threatType}
              </h4>

              {/* Description */}
              <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {item.description}
              </p>

              {/* Indicator Target */}
              <div className="mt-2 p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-cyan-400 truncate">
                Target: <span className="text-slate-200">{item.target}</span>
              </div>

              {/* Bottom Row: Location + Status + Deep Link */}
              <div className="mt-2.5 pt-2 border-t border-slate-850 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{item.location}</span>
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 hidden sm:inline">
                    [{item.status}]
                  </span>
                  <Link
                    href={`/check?q=${encodeURIComponent(item.target)}`}
                    className="px-2 py-1 rounded-md bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50 flex items-center gap-1 font-semibold transition-colors"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Showing {filteredItems.length} active alerts</span>
        <Link
          href="/reports"
          className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-semibold"
        >
          <span>Stream Archive</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
