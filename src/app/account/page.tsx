"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, FileText } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Page Header */}
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

      {/* Reports Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Submitted Scam Reports</h2>
          <span className="text-xs text-slate-500 font-mono">3 Active Reports</span>
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
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-6 font-bold text-[#0a2540]">SCAM-LENS-84920</td>
                <td className="py-3.5 px-6 text-rose-700 font-semibold">chase-auth-security-update9.cc</td>
                <td className="py-3.5 px-6 text-slate-600">Phishing</td>
                <td className="py-3.5 px-6 text-slate-500">2026-09-21</td>
                <td className="py-3.5 px-6">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    VERIFIED SCAM
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-6 font-bold text-[#0a2540]">SCAM-LENS-71932</td>
                <td className="py-3.5 px-6 text-rose-700 font-semibold">apex-yield-ai-finance.top</td>
                <td className="py-3.5 px-6 text-slate-600">Crypto &amp; Yield</td>
                <td className="py-3.5 px-6 text-slate-500">2026-09-20</td>
                <td className="py-3.5 px-6">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    VERIFIED SCAM
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-6 font-bold text-[#0a2540]">SCAM-LENS-90184</td>
                <td className="py-3.5 px-6 text-amber-700 font-semibold">+1 (888) 492-3819</td>
                <td className="py-3.5 px-6 text-slate-600">SMS Smishing</td>
                <td className="py-3.5 px-6 text-slate-500">2026-09-18</td>
                <td className="py-3.5 px-6">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    UNDER AUDIT
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
