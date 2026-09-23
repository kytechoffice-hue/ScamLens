"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Users, PlusCircle, Search } from "lucide-react";
import RecentThreatTable from "@/components/dashboard/RecentThreatTable";
import LiveThreatFeed from "@/components/dashboard/LiveThreatFeed";

export default function ReportsPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              COMMUNITY DEFENSE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Community Reports & Incident Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Crowd-sourced cyber fraud indicators submitted by Indian citizens and verified by automated heuristics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/report"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Report</span>
          </Link>
          <Link
            href="/"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-mono border border-slate-750 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>

      <RecentThreatTable />

      <div className="max-w-3xl">
        <LiveThreatFeed />
      </div>
    </div>
  );
}
