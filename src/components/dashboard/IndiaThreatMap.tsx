"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  MapPin, 
  Activity, 
  Info, 
  Layers, 
  Compass, 
  TrendingUp,
  Maximize2
} from "lucide-react";
import { INDIA_STATE_THREATS, StateThreatData } from "@/data/dashboardDemoData";

export default function IndiaThreatMap() {
  const [selectedState, setSelectedState] = useState<StateThreatData>(
    INDIA_STATE_THREATS.find((s) => s.code === "MH") || INDIA_STATE_THREATS[0]
  );
  const [hoveredState, setHoveredState] = useState<StateThreatData | null>(null);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "CRITICAL" | "HIGH">("ALL");

  const displayedStates = INDIA_STATE_THREATS.filter((s) => {
    if (activeFilter === "CRITICAL") return s.riskLevel === "Critical";
    if (activeFilter === "HIGH") return s.riskLevel === "Critical" || s.riskLevel === "High";
    return true;
  });

  const activeInfo = hoveredState || selectedState;

  const getRiskColor = (level: StateThreatData["riskLevel"]) => {
    switch (level) {
      case "Critical":
        return {
          fill: "#ef4444",
          border: "border-rose-500",
          text: "text-rose-400",
          bg: "bg-rose-950/80",
          glow: "rgba(239, 68, 68, 0.4)",
        };
      case "High":
        return {
          fill: "#f59e0b",
          border: "border-amber-500",
          text: "text-amber-400",
          bg: "bg-amber-950/80",
          glow: "rgba(245, 158, 11, 0.4)",
        };
      case "Medium":
        return {
          fill: "#06b6d4",
          border: "border-cyan-500",
          text: "text-cyan-400",
          bg: "bg-cyan-950/80",
          glow: "rgba(6, 182, 212, 0.4)",
        };
      default:
        return {
          fill: "#10b981",
          border: "border-emerald-500",
          text: "text-emerald-400",
          bg: "bg-emerald-950/80",
          glow: "rgba(16, 185, 129, 0.4)",
        };
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-[#0c131f]/90 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Decorative radar circle in background */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-radial from-cyan-500/5 to-transparent pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              GEOGRAPHIC TELEMETRY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>India Cyber Threat Map</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-normal">
              State & City Intensity
            </span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono text-slate-400 hidden md:inline">Filter:</span>
          {(["ALL", "CRITICAL", "HIGH"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-xs shadow-cyan-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Map Layout: Vector Map + Interactive Details Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG India Map Container */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-slate-950/60 rounded-2xl border border-slate-850 p-4 overflow-hidden group">
          {/* Cyber Coordinates Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

          {/* Radar Sweep Arc Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-cyan-500/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-cyan-500/10 pointer-events-none" />

          {/* India SVG Graphic */}
          <svg
            viewBox="0 0 600 700"
            className="w-full h-auto max-h-[440px] drop-shadow-2xl select-none"
            style={{ filter: "drop-shadow(0 0 15px rgba(6,182,212,0.15))" }}
          >
            <defs>
              {/* Radial gradient for hotspot glowing markers */}
              <radialGradient id="hotspot-glow-rose" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hotspot-glow-amber" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hotspot-glow-cyan" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Stylized Vector Silhouette of Indian Subcontinent */}
            <path
              d="M 285 45
                 C 295 40, 315 50, 320 65
                 C 328 80, 340 100, 355 110
                 C 365 115, 385 115, 395 125
                 C 415 145, 430 160, 440 175
                 C 455 195, 470 210, 490 220
                 C 515 230, 545 235, 560 250
                 C 570 260, 565 280, 550 290
                 C 530 300, 510 295, 495 305
                 C 485 315, 480 330, 470 340
                 C 455 355, 435 370, 415 385
                 C 400 400, 390 425, 380 445
                 C 365 475, 350 515, 335 550
                 C 325 580, 310 615, 295 645
                 C 290 655, 280 655, 275 645
                 C 260 610, 245 570, 230 535
                 C 215 500, 200 470, 185 440
                 C 170 415, 155 390, 140 370
                 C 125 350, 105 340, 95 325
                 C 80 305, 75 285, 90 270
                 C 110 250, 140 240, 165 235
                 C 190 230, 210 210, 220 185
                 C 230 160, 245 130, 255 105
                 C 265 80, 275 50, 285 45 Z"
              fill="#0d1829"
              stroke="#1e293b"
              strokeWidth="2.5"
              className="transition-colors duration-300"
            />

            {/* Inner Sub-regional Boundaries Grid */}
            <path
              d="M 230 185 L 355 185 M 190 270 L 440 270 M 165 370 L 440 370 M 190 470 L 370 470 M 230 550 L 335 550 M 285 45 L 285 645"
              stroke="#1e3a5f33"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* Regional Pulse Nodes / State Hotspots */}
            {displayedStates.map((s) => {
              // Convert percentage coordinates to SVG viewBox (0-600, 0-700)
              const cx = (s.x / 100) * 550 + 25;
              const cy = (s.y / 100) * 620 + 40;
              const isSelected = selectedState.id === s.id;
              const isHovered = hoveredState?.id === s.id;
              const risk = getRiskColor(s.riskLevel);

              return (
                <g
                  key={s.id}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredState(s)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => setSelectedState(s)}
                >
                  {/* Outer pulsating ring for Critical & High threats */}
                  {(s.riskLevel === "Critical" || s.riskLevel === "High") && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? "22" : "16"}
                      fill="none"
                      stroke={risk.fill}
                      strokeWidth="1.5"
                      opacity="0.6"
                      className="animate-ping"
                      style={{ animationDuration: s.riskLevel === "Critical" ? "1.8s" : "2.6s" }}
                    />
                  )}

                  {/* Soft Radial Glow */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? "18" : "13"}
                    fill={risk.fill}
                    opacity={isSelected ? "0.4" : "0.2"}
                  />

                  {/* Core Indicator Node */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? "8" : isHovered ? "7" : "5"}
                    fill={risk.fill}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    className="transition-all duration-150"
                  />

                  {/* State Code Label */}
                  <text
                    x={cx + 10}
                    y={cy + 4}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill={isSelected || isHovered ? "#ffffff" : "#94a3b8"}
                    className="select-none pointer-events-none"
                  >
                    {s.code}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Indicator Badge on Map */}
          {activeInfo && (
            <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-slate-900/90 border border-slate-750 backdrop-blur-md shadow-xl text-left pointer-events-none z-10 hidden sm:block">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getRiskColor(activeInfo.riskLevel).bg}`} />
                <span className="text-xs font-mono font-bold text-white">
                  {activeInfo.state}
                </span>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${getRiskColor(activeInfo.riskLevel).border} ${getRiskColor(activeInfo.riskLevel).text}`}>
                  {activeInfo.riskLevel}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-300 mt-1">
                Active Threats: <strong className="text-white">{activeInfo.activeThreats}</strong> • Reports: <strong className="text-white">{activeInfo.reportedScams}</strong>
              </div>
            </div>
          )}

          {/* Bottom Map Legend */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> High
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Medium
            </span>
            <span className="hidden sm:inline text-slate-500">
              Hover node for telemetry
            </span>
          </div>
        </div>

        {/* Right Details Panel for Selected / Hovered State */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  STATE THREAT TELEMETRY
                </span>
                <h3 className="text-2xl font-black text-white">
                  {activeInfo.state}
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold border ${getRiskColor(activeInfo.riskLevel).border} ${getRiskColor(activeInfo.riskLevel).text} ${getRiskColor(activeInfo.riskLevel).bg}`}>
                {activeInfo.riskLevel} RISK
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block">Active Threats</span>
                <span className="text-xl font-bold font-mono text-white">
                  {activeInfo.activeThreats}
                </span>
                <span className="text-[10px] font-mono text-rose-400 block mt-0.5">
                  ↑ {activeInfo.trendPercentage}% this week
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block">Reported Scams</span>
                <span className="text-xl font-bold font-mono text-cyan-400">
                  {activeInfo.reportedScams.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                  Verified Citizens
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Top Incident Category:
                </span>
                <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-200">
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{activeInfo.topCategory}</span>
                  </span>
                  <span className="text-[10px] font-mono text-rose-400 font-bold">#1 Hotspot</span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1">
                <span>Sector Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active Sentinel Surveillance
                </span>
              </div>
            </div>
          </div>

          {/* Quick State Switcher List */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Active Regional Hubs</span>
              <span className="text-[10px] text-slate-500">Tap to inspect</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
              {INDIA_STATE_THREATS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedState(s)}
                  className={`px-2.5 py-1.5 rounded-xl text-left text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                    selectedState.id === s.id
                      ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold"
                      : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  <span className="truncate">{s.state.split(" ")[0]}</span>
                  <span className={`text-[10px] font-bold ${getRiskColor(s.riskLevel).text}`}>
                    {s.activeThreats}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Disclaimer Notification */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed font-mono">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              Telemetry synthesizes crowd-verified incident logs and heuristic crawl signatures across Indian telecom/payment rails. Demonstrative data.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
