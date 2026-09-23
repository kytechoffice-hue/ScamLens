import React from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  ExternalLink, 
  Users, 
  DollarSign, 
  CheckCircle2, 
} from "lucide-react";
import { ScamReport } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

interface ScamCardProps {
  scam: ScamReport;
  onSelect?: (scam: ScamReport) => void;
}

export default function ScamCard({ scam, onSelect }: ScamCardProps) {
  const isDangerous = scam.riskLevel === "DANGEROUS";

  return (
    <div className="bg-[#0c131f]/90 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden border border-slate-800 shadow-xl hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-200 group">
      {/* Risk accent line top */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 ${
          isDangerous 
            ? "bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500" 
            : "bg-gradient-to-r from-amber-500 to-yellow-400"
        }`} 
      />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-900 text-slate-300 border border-slate-800">
            {scam.category}
          </span>

          <div className="flex items-center gap-2">
            {scam.verifiedByModerator && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-medium" title="Verified by Security Analyst">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Verified</span>
              </span>
            )}
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-extrabold border ${
              isDangerous ? "bg-rose-950/80 text-rose-400 border-rose-800/80" : "bg-amber-950/80 text-amber-400 border-amber-800/80"
            }`}>
              SCORE {scam.riskScore}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
          {scam.title}
        </h3>

        {/* Target Entity / URL Box */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-850 font-mono text-xs text-rose-300 mb-3 break-all font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-400" />
          <span className="truncate">{scam.targetDomainOrEntity}</span>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
          {scam.summary}
        </p>
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-300 font-medium" title="Reported complaints">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{scam.reportCount}</span>
          </div>
          {scam.reportedLoss > 0 && (
            <div className="flex items-center gap-0.5 text-rose-400 font-bold" title="Reported financial loss">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{formatCurrency(scam.reportedLoss).replace("$", "")}</span>
            </div>
          )}
        </div>

        {onSelect ? (
          <button
            onClick={() => onSelect(scam)}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer transition-colors"
          >
            <span>Forensics</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        ) : (
          <Link
            href={`/check?q=${encodeURIComponent(scam.targetDomainOrEntity)}`}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            <span>Audit</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
