import React from "react";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";

interface RiskGaugeProps {
  score: number; // 0 to 100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function RiskGauge({ score, size = "md", showLabel = true }: RiskGaugeProps) {
  // Determine risk level and colors
  let level: "SAFE" | "SUSPICIOUS" | "DANGEROUS" = "SAFE";
  let color = "text-emerald-400";
  let strokeColor = "#10b981";
  let bgColor = "bg-emerald-950/80";
  let borderColor = "border-emerald-800/80";
  let Icon = ShieldCheck;

  if (score > 65) {
    level = "DANGEROUS";
    color = "text-rose-400";
    strokeColor = "#ef4444";
    bgColor = "bg-rose-950/80";
    borderColor = "border-rose-800/80";
    Icon = ShieldAlert;
  } else if (score > 25) {
    level = "SUSPICIOUS";
    color = "text-amber-400";
    strokeColor = "#f59e0b";
    bgColor = "bg-amber-950/80";
    borderColor = "border-amber-800/80";
    Icon = AlertTriangle;
  }

  // Dimension settings
  const radius = size === "lg" ? 54 : size === "md" ? 42 : 28;
  const strokeWidth = size === "lg" ? 8 : size === "md" ? 6 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const svgSize = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center justify-center shrink-0">
      <div className="relative flex items-center justify-center">
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90 transition-all duration-1000"
        >
          {/* Background circle track */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-850 text-slate-800"
          />
          {/* Active score ring */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-mono font-extrabold tracking-tighter ${
            size === "lg" ? "text-3xl" : size === "md" ? "text-2xl" : "text-base"
          } ${color}`}>
            {score}
          </span>
          {size !== "sm" && (
            <span className="text-[10px] text-slate-500 font-mono -mt-0.5">
              / 100
            </span>
          )}
        </div>
      </div>

      {showLabel && (
        <div className={`mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-bold tracking-wider font-mono uppercase ${bgColor} ${color} ${borderColor}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{level}</span>
        </div>
      )}
    </div>
  );
}
