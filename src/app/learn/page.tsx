"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  FileText, 
  ExternalLink,
  HelpCircle,
  Lightbulb,
  PhoneCall,
  Lock,
  ChevronDown
} from "lucide-react";

interface GuideArticle {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  keyPoints: string[];
  recommendedAction: string;
}

const ARTICLES: GuideArticle[] = [
  {
    id: "guide-phishing",
    category: "Phishing Defense",
    readTime: "4 min read",
    title: "How to Spot a Fake Phishing Domain in Under 5 Seconds",
    excerpt: "Scammers clone legitimate banking and courier websites down to the pixel. Learn the exact URL anomalies and character substitutions they use.",
    keyPoints: [
      "Check the Root Domain: 'chase-security-update.cc' is NOT chase.com.",
      "Look out for weird Top-Level Domains (.cc, .top, .vip, .xyz, .click).",
      "Notice Urgency Language: 'Your account will be suspended in 24 hours' is a universal manipulation tactic.",
      "Always navigate directly from your own bookmark or official mobile app.",
    ],
    recommendedAction: "Never tap SMS links claiming suspicious account activity; open your banking app directly.",
  },
  {
    id: "guide-crypto",
    category: "Crypto Security",
    readTime: "6 min read",
    title: "10 Red Flags of Algorithmic Crypto & Liquidity Ponzi Schemes",
    excerpt: "Guaranteed 3% daily returns do not exist. Understand how fake Web3 trading bots lock your deposits behind 'withdrawal taxes'.",
    keyPoints: [
      "Any platform guaranteeing fixed daily ROI (e.g. 1% to 5% daily) is mathematically a Ponzi scheme.",
      "Fake Liquidity Mining: Scammers instruct you to approve unlimited ERC-20 token spending on untrusted DApps.",
      "The 'Tax Deposit' Trap: When attempting to withdraw, you are asked to pay 20% 'IRS verification fee'.",
      "Anonymous Leadership: Teams using AI-generated headshots with generic stock biographies.",
    ],
    recommendedAction: "Revoke token approvals on revoke.cash and never send additional funds to unlock frozen assets.",
  },
  {
    id: "guide-recovery",
    category: "Emergency Action",
    readTime: "5 min read",
    title: "Scammed? The First 24 Hours Emergency Playbook",
    excerpt: "Time is your greatest asset. Steps you must take within minutes of realizing you transferred funds or disclosed credentials.",
    keyPoints: [
      "Call your bank fraud department immediately and request a wire recall or card freeze.",
      "Change all master passwords and revoke active login sessions across Google, Apple, and banks.",
      "Take unedited screenshots of all wallet addresses, chat logs, phone numbers, and transaction IDs.",
      "Beware of 'Recovery Scammers' on Instagram, Reddit, or Telegram promising to hack back your lost money for a fee.",
    ],
    recommendedAction: "File an official complaint at ic3.gov (USA) or your local national cybercrime authority.",
  },
  {
    id: "guide-job-fraud",
    category: "Employment Fraud",
    readTime: "4 min read",
    title: "The Telegram 'Review 38 Hotels' Remote Task Scam Exposed",
    excerpt: "You received a WhatsApp message offering $200/day for rating YouTube videos or booking hotels. Here is how they turn that into an $8,000 theft.",
    keyPoints: [
      "The bait: They pay you real small amounts ($15-$25) on Day 1 to build artificial trust.",
      "The platform: You are invited to a fake workbench (e.g., travel-data-rating.vip) showing simulated profits.",
      "The negative balance trap: A 'combo task' drops your balance negative, requiring a wire transfer to proceed.",
      "No legitimate employer ever asks employees to deposit money to receive their salary.",
    ],
    recommendedAction: "Block and report the recruiter immediately. Cease deposits regardless of claimed account balance.",
  },
];

export default function LearnPage() {
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono mb-3 font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>SCAMLENS ACADEMY & DEFENSE GUIDES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0a2540] tracking-tight mb-4">
          Learn How to Stop Scammers
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Knowledge is your primary firewall. Explore battle-tested playbooks, recognize social engineering tactics, and learn the exact steps to protect yourself and your family.
        </p>
      </div>

      {/* Interactive Quick Quiz / Knowledge Check */}
      <div className="bg-gradient-to-br from-amber-500/10 via-blue-500/5 to-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm mb-14">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-bold uppercase mb-2">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>Interactive Knowledge Check</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
          You receive an SMS: &quot;FedEx Parcel #8919 delayed. Pay $1.50 customs fee at fedx-parcel-release.pw&quot;. What is the safest action?
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          Test your fraud awareness against common smishing delivery tricks.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setQuizAnswer("wrong1")}
            className={`p-3.5 rounded-2xl text-left border text-xs font-semibold transition-all cursor-pointer ${
              quizAnswer === "wrong1" ? "bg-rose-50 border-rose-300 text-rose-800" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            A. Open the link and pay $1.50 since the amount is negligible.
          </button>

          <button
            onClick={() => setQuizAnswer("correct")}
            className={`p-3.5 rounded-2xl text-left border text-xs font-semibold transition-all cursor-pointer ${
              quizAnswer === "correct" ? "bg-emerald-50 border-emerald-300 text-emerald-800" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            B. Do not click. The .pw domain is an unauthorized clone stealing credit card credentials.
          </button>

          <button
            onClick={() => setQuizAnswer("wrong2")}
            className={`p-3.5 rounded-2xl text-left border text-xs font-semibold transition-all cursor-pointer ${
              quizAnswer === "wrong2" ? "bg-rose-50 border-rose-300 text-rose-800" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            C. Reply &quot;STOP&quot; to the SMS sender.
          </button>
        </div>

        {quizAnswer && (
          <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed animate-in fade-in-50">
            {quizAnswer === "correct" ? (
              <div className="flex items-start gap-2 text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Correct!</strong> Fraudsters use tiny charges ($1.50) as bait to harvest full card details, CVV, and billing addresses. FedEx official portal is always <code>fedex.com</code>.
                </span>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-rose-800 font-medium">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Incorrect!</strong> Entering any card details hands the fraudster full access to charge thousands. Replying to the SMS also confirms your phone number is active to spam robocallers.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guides Grid */}
      <div className="mb-14">
        <h2 className="text-xl sm:text-2xl font-black text-[#0a2540] mb-6">
          Featured Safety Guides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                    {article.category}
                  </span>
                  <span className="text-slate-400">{article.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <div className="space-y-1.5 text-xs text-slate-700 mb-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block mb-1">
                    Key takeaways:
                  </span>
                  {article.keyPoints.slice(0, 2).map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  Verified ScamLens Playbook
                </span>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Hotline Directory */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono mb-3 font-semibold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>OFFICIAL EMERGENCY FRAUD DIRECTORY</span>
          </div>
          <h3 className="text-2xl font-black mb-3">
            Official Law Enforcement & Reporting Hotlines
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            If you have suffered financial loss or identity theft, report immediately to official authorities in addition to ScamLens:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-amber-400 font-bold block mb-1">USA - FBI IC3</span>
              <p className="text-slate-300 text-[11px]">Internet Crime Complaint Center</p>
              <a href="https://www.ic3.gov" target="_blank" rel="noreferrer" className="text-cyan-300 underline mt-2 block">
                ic3.gov
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-amber-400 font-bold block mb-1">USA - Federal Trade Commission</span>
              <p className="text-slate-300 text-[11px]">Report identity theft & scams</p>
              <a href="https://reportfraud.ftc.gov" target="_blank" rel="noreferrer" className="text-cyan-300 underline mt-2 block">
                reportfraud.ftc.gov
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-amber-400 font-bold block mb-1">UK - Action Fraud</span>
              <p className="text-slate-300 text-[11px]">National fraud & cyber reporting</p>
              <span className="text-emerald-300 mt-2 block font-bold">0300 123 2040</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 text-slate-400 hover:text-slate-700 text-xs font-mono cursor-pointer"
              >
                [Close ✕]
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>{selectedArticle.excerpt}</p>

              <div>
                <h4 className="font-bold text-slate-900 mb-2 uppercase font-mono text-xs">
                  Detailed Security Breakdown:
                </h4>
                <ul className="space-y-2">
                  {selectedArticle.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                <span className="font-bold font-mono text-xs block mb-1 uppercase">
                  Actionable Recommendation:
                </span>
                <p className="text-xs font-medium">{selectedArticle.recommendedAction}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                ScamLens Defense Library
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0a2540] text-white text-xs font-bold hover:bg-[#1e3a8a] transition-all cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
