"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Globe2, ShieldAlert } from "lucide-react";
import IndiaThreatMap from "@/components/dashboard/IndiaThreatMap";
import LiveThreatFeed from "@/components/dashboard/LiveThreatFeed";

export default function ThreatMapPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 w-full">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              LIVE RADAR
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            India Live Threat Map & Regional Hotspots
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            State-wise geospatial threat telemetry, active UPI fraud centers, and cybercrime incident density.
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <IndiaThreatMap />
        </div>
        <div className="lg:col-span-4">
          <LiveThreatFeed />
        </div>
      </div>
    </div>
  );
}
