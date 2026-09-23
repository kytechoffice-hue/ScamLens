"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  ShieldAlert, 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Calendar,
  Layers
} from "lucide-react";
import { THREAT_ANALYTICS_DATA, INDIA_STATE_THREATS } from "@/data/dashboardDemoData";

export default function ThreatAnalyticsCharts() {
  const [activeTab, setActiveTab] = useState<"7D" | "30D">("7D");
  const { last7Days, last30DaysTrend, categoryShare, severityBreakdown } = THREAT_ANALYTICS_DATA;

  // Max value for 7-day chart scaling
  const maxThreat7D = Math.max(...last7Days.map((d) => d.threatsDetected));

  // Max value for 30-day chart scaling
  const maxReports30D = Math.max(...last30DaysTrend.map((d) => d.reports));

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
              SECURITY ANALYTICS ENGINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0a2540] tracking-tight">
            Threat Analytics & Severity Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Temporal attack volume, incident severity breakdown, and vector distribution across Indian cyberspace.
          </p>
        </div>

        {/* Time Window Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("7D")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === "7D"
                ? "bg-[#0a2540] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setActiveTab("30D")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === "30D"
                ? "bg-[#0a2540] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Primary Time-Series Chart (Last 7 Days / 30 Days) */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-500" />
                <span>
                  {activeTab === "7D" ? "Threats Detected — Last 7 Days" : "Scam Reports Volume — Last 30 Days"}
                </span>
              </h3>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                {activeTab === "7D"
                  ? "Daily automated heuristic detections & incoming verified fraud indicators"
                  : "Weekly aggregate citizen reports and financial loss prevented trajectory"}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-mono text-amber-700 font-bold">
                {activeTab === "7D" ? "Peak: 2,847 Threats/day" : "Weekly Avg: 3,150 Reports"}
              </span>
            </div>
          </div>

          {/* SVG Responsive Area & Bar Chart */}
          {activeTab === "7D" ? (
            <div className="w-full">
              <div className="h-64 sm:h-72 w-full relative flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2">
                {/* Horizontal reference grid lines */}
                <div className="absolute inset-x-0 top-6 border-b border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>3,000</span>
                </div>
                <div className="absolute inset-x-0 top-1/2 border-b border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>1,500</span>
                </div>
                <div className="absolute inset-x-0 bottom-6 border-b border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>0</span>
                </div>

                {/* Bars per day */}
                {last7Days.map((item, idx) => {
                  const heightPercent = Math.round((item.threatsDetected / 3000) * 100);
                  const isPeak = idx === last7Days.length - 1;

                  return (
                    <div key={item.day} className="flex-1 flex flex-col items-center h-full justify-end group relative z-10">
                      {/* Floating tooltip on hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[10px] font-mono text-white shadow-xl pointer-events-none whitespace-nowrap z-20">
                        {item.date}: <strong className="text-amber-400">{item.threatsDetected}</strong> detections
                      </div>

                      {/* Bar Pillar */}
                      <div className="w-full max-w-[38px] rounded-t-xl overflow-hidden bg-slate-100 flex flex-col justify-end border-t border-x border-slate-200 group-hover:border-amber-400 transition-all">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full transition-all duration-500 rounded-t-lg ${
                            isPeak
                              ? "bg-gradient-to-t from-amber-600 to-amber-400 shadow-sm"
                              : "bg-gradient-to-t from-blue-700 to-blue-500 group-hover:from-blue-600 group-hover:to-cyan-400"
                          }`}
                        />
                      </div>

                      {/* Day Label */}
                      <span className="text-[11px] font-mono text-slate-600 mt-2 font-semibold">
                        {item.day}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 hidden sm:block">
                        {item.threatsDetected}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-600" />
                    <span>Detections</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-3 h-3 rounded bg-slate-300" />
                    <span>Citizen Verified</span>
                  </span>
                </div>
                <span className="text-rose-600 font-semibold">↑ 18.4% Week-over-Week</span>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="h-64 sm:h-72 w-full relative flex items-end justify-between gap-4 pt-6 pb-2 px-4">
                {last30DaysTrend.map((item, idx) => {
                  const heightPercent = Math.round((item.reports / maxReports30D) * 100);
                  return (
                    <div key={item.period} className="flex-1 flex flex-col items-center h-full justify-end group relative z-10">
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[10px] font-mono text-white shadow-xl pointer-events-none whitespace-nowrap z-20">
                        {item.period}: <strong>{item.reports} reports</strong> (₹{item.lossReportedLakhs}L loss)
                      </div>

                      <div className="w-full max-w-[60px] rounded-t-xl bg-slate-100 overflow-hidden flex flex-col justify-end border-t border-x border-slate-200">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-gradient-to-t from-amber-600 to-amber-400 transition-all duration-500 rounded-t-lg group-hover:to-amber-300"
                        />
                      </div>

                      <span className="text-xs font-mono text-slate-700 mt-2 font-bold">
                        {item.period}
                      </span>
                      <span className="text-[10px] font-mono text-amber-700 font-semibold">
                        {item.reports} rpts
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-mono text-slate-600">
                <span>Total 30-Day Volume: <strong className="text-slate-900">12,638 Reports</strong></span>
                <span className="text-amber-700 font-semibold">₹2,480 Lakhs Prevented</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Threat Severity Distribution (Required Item 9) */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-500" />
                <span>THREAT SEVERITY</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Active Audit</span>
            </div>

            {/* Severity Bars with Accessible Icons & Text */}
            <div className="space-y-4">
              {/* Critical */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-rose-600 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>CRITICAL</span>
                  </span>
                  <span className="text-slate-700 font-bold">
                    {severityBreakdown.critical.percentage}% ({severityBreakdown.critical.count})
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <div
                    style={{ width: `${severityBreakdown.critical.percentage}%` }}
                    className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full"
                  />
                </div>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  {severityBreakdown.critical.desc}
                </p>
              </div>

              {/* High */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-amber-700 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>HIGH</span>
                  </span>
                  <span className="text-slate-700 font-bold">
                    {severityBreakdown.high.percentage}% ({severityBreakdown.high.count})
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <div
                    style={{ width: `${severityBreakdown.high.percentage}%` }}
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                  />
                </div>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  {severityBreakdown.high.desc}
                </p>
              </div>

              {/* Medium */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-blue-700 font-bold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>MEDIUM</span>
                  </span>
                  <span className="text-slate-700 font-bold">
                    {severityBreakdown.medium.percentage}% ({severityBreakdown.medium.count})
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <div
                    style={{ width: `${severityBreakdown.medium.percentage}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                  />
                </div>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  {severityBreakdown.medium.desc}
                </p>
              </div>

              {/* Low */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>LOW</span>
                  </span>
                  <span className="text-slate-700 font-bold">
                    {severityBreakdown.low.percentage}% ({severityBreakdown.low.count})
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <div
                    style={{ width: `${severityBreakdown.low.percentage}%` }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                  />
                </div>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  {severityBreakdown.low.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-500">
            Total Analyzed Vectors: <strong className="text-slate-900">2,847 Active</strong>
          </div>
        </div>
      </div>

      {/* Secondary Analytics Row: Category Distribution & State-wise Ranking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Threat Category Distribution */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600" />
              <span>Threat Category Distribution</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">By Incident Share</span>
          </div>

          {/* Stacked Progress Bar */}
          <div className="w-full h-4 rounded-xl overflow-hidden flex bg-slate-100 border border-slate-200 mb-4">
            {categoryShare.map((cat) => (
              <div
                key={cat.name}
                style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                title={`${cat.name}: ${cat.percentage}%`}
                className="h-full transition-all hover:opacity-90"
              />
            ))}
          </div>

          {/* Legend Items */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {categoryShare.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-slate-700 truncate">{cat.name}</span>
                <span className="ml-auto font-bold text-slate-900">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* State-Wise Threat Distribution */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>State-Wise Threat Ranking</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Top 5 Hotspots</span>
          </div>

          <div className="space-y-3">
            {INDIA_STATE_THREATS.slice(0, 5).map((s, idx) => {
              const maxThreat = INDIA_STATE_THREATS[0].activeThreats;
              const barWidth = Math.round((s.activeThreats / maxThreat) * 100);

              return (
                <div key={s.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                      <span className="text-slate-400 font-bold">#{idx + 1}</span>
                      <span>{s.state}</span>
                    </span>
                    <span className="text-blue-700 font-bold">
                      {s.activeThreats} active ({s.reportedScams} reports)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
