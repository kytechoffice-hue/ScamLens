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
    <div className="bg-white rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-200 group">
      {/* Risk accent line top */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          isDangerous 
            ? "bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" 
            : "bg-gradient-to-r from-amber-500 to-yellow-400"
        }`} 
      />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {scam.category}
          </span>

          <div className="flex items-center gap-2">
            {scam.verifiedByModerator && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-medium" title="Verified by Security Analyst">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Verified</span>
              </span>
            )}
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-extrabold ${
              isDangerous ? "bg-red-50 text-red-700 border border-red-200" : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              SCORE {scam.riskScore}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 mb-2">
          {scam.title}
        </h3>

        {/* Target Entity / URL Box */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-rose-700 mb-3 break-all font-medium">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-600" />
          <span className="truncate">{scam.targetDomainOrEntity}</span>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {scam.summary}
        </p>
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-700 font-medium" title="Reported community complaints">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{scam.reportCount}</span>
          </div>
          {scam.reportedLoss > 0 && (
            <div className="flex items-center gap-0.5 text-rose-600 font-mono font-bold" title="Reported financial loss">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{formatCurrency(scam.reportedLoss).replace("$", "")}</span>
            </div>
          )}
        </div>

        {onSelect ? (
          <button
            onClick={() => onSelect(scam)}
            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-semibold cursor-pointer"
          >
            <span>Forensics</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        ) : (
          <Link
            href={`/check?q=${encodeURIComponent(scam.targetDomainOrEntity)}`}
            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-semibold"
          >
            <span>Scan Entity</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
