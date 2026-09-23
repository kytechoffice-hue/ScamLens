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
  ChevronDown,
  X
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
    id: "guide-upi-fraud",
    category: "Payment Security",
    readTime: "4 min read",
    title: "The Golden Rule of UPI: You NEVER Need a PIN to Receive Money",
    excerpt: "Fraudsters initiate fake 'UPI Collect' requests and QR code debits masquerading as refunds or marketplace buyers. Learn how to identify reverse debits.",
    keyPoints: [
      "UPI PIN is strictly required only to DEBIT money from your bank account.",
      "If someone claims they are sending you money and instructs you to enter your PIN, it is 100% a fraud attempt.",
      "QR Codes: Scanning a QR code sends funds from your account. Receiving funds requires only your VPA handle or linked mobile number.",
      "Never approve collect requests from unknown VPA tags on PhonePe, GPay, or Paytm.",
    ],
    recommendedAction: "Immediately decline suspicious collect requests and report the fraudster's VPA handle inside your UPI application.",
  },
  {
    id: "guide-digital-arrest",
    category: "Extortion Defense",
    readTime: "5 min read",
    title: "How to Defend Against 'Digital Arrest' Video Call Extortion",
    excerpt: "Scammers pose in police and customs uniforms over WhatsApp/Skype claiming your Aadhaar was used for money laundering. Here is how to immediately nullify the threat.",
    keyPoints: [
      "Indian Law Enforcement, CBI, ED, and State Police never conduct interrogation or issue arrest warrants via video calls.",
      "There is NO legal concept of 'Digital Arrest' in the Code of Criminal Procedure (CrPC) or Bharatiya Nagarik Suraksha Sanhita (BNSS).",
      "They demand you stay on camera while transferring your savings to a 'Supreme Court Verification Account'. That account belongs to criminal mules.",
      "Official summons are always served physically via registered post or in-person by local police officers.",
    ],
    recommendedAction: "Disconnect the call immediately. Report the phone number to 1930 and file an incident on cybercrime.gov.in.",
  },
  {
    id: "guide-phishing",
    category: "Phishing Defense",
    readTime: "4 min read",
    title: "How to Spot a Fake Banking Phishing Domain in Under 5 Seconds",
    excerpt: "Scammers clone SBI Yono, HDFC Netbanking, and ICICI portals down to the pixel. Learn the exact URL anomalies and character substitutions they use.",
    keyPoints: [
      "Check the Root Domain: 'sbi-yono-kyc-update.top' is NOT onlinesbi.sbi or sbi.co.in.",
      "Look out for weird Top-Level Domains (.cc, .top, .vip, .xyz, .pw, .click).",
      "Notice Urgency Language: 'Your PAN card is unlinked, account blocked tonight' is a universal manipulation tactic.",
      "Always navigate directly from your own bookmark or official mobile banking app.",
    ],
    recommendedAction: "Never tap SMS links claiming suspicious account activity; open your banking app directly.",
  },
  {
    id: "guide-job-fraud",
    category: "Telegram Job Traps",
    readTime: "4 min read",
    title: "The Telegram 'Review 30 Videos for ₹5,000' Task Scam Exposed",
    excerpt: "You received a WhatsApp message offering ₹3,000/day for liking YouTube clips or reviewing Google Maps. Here is how they turn that into an ₹80,000 theft.",
    keyPoints: [
      "The bait: They pay you real small amounts (₹150-₹500) on Day 1 to build artificial trust.",
      "The platform: You are invited to a fake workbench (e.g. ad-task-reward.xyz) showing simulated profits.",
      "The negative balance trap: A 'VIP combo task' drops your balance negative, requiring an immediate wire transfer to unlock funds.",
      "No legitimate employer ever asks employees to deposit money to receive their salary.",
    ],
    recommendedAction: "Block and report the recruiter immediately. Cease deposits regardless of claimed account balance.",
  },
];

export default function LearnPage() {
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>SCAMLENS DEFENSE ACADEMY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
          Cyber Fraud Defense Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Knowledge is your primary firewall. Explore verified playbooks, recognize social engineering tactics, and learn the exact steps to protect your finances and family.
        </p>
      </div>

      {/* Interactive Quick Quiz */}
      <div className="bg-[#0c131f]/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>Interactive Knowledge Check</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">
          A buyer on an online marketplace offers to pay you ₹15,000 for your used phone. They send a QR code image on WhatsApp saying &quot;Scan this to receive payment directly into your account&quot;. What should you do?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setQuizAnswer("wrong1")}
            className={`p-3.5 rounded-2xl text-left border text-xs font-mono transition-all cursor-pointer ${
              quizAnswer === "wrong1" ? "bg-rose-950 border-rose-700 text-rose-300" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            A. Scan the QR code and enter your UPI PIN to accept the funds into your bank.
          </button>

          <button
            onClick={() => setQuizAnswer("correct")}
            className={`p-3.5 rounded-2xl text-left border text-xs font-mono transition-all cursor-pointer ${
              quizAnswer === "correct" ? "bg-emerald-950 border-emerald-700 text-emerald-300" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            B. Refuse immediately. Scanning a QR code or entering a PIN debits your account; receiving money requires only your phone number/VPA.
          </button>

          <button
            onClick={() => setQuizAnswer("wrong2")}
            className={`p-3.5 rounded-2xl text-left border text-xs font-mono transition-all cursor-pointer ${
              quizAnswer === "wrong2" ? "bg-rose-950 border-rose-700 text-rose-300" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            C. Scan the code using another family member&apos;s phone to test if it works.
          </button>
        </div>

        {quizAnswer && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono leading-relaxed animate-in fade-in-50">
            {quizAnswer === "correct" ? (
              <div className="flex items-start gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Correct!</strong> In the UPI architecture, scanning a QR code is exclusively for sending money. Scammers use fake merchant QR codes to drain your balance.
                </span>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-rose-400">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Danger!</strong> Entering your UPI PIN will immediately deduct ₹15,000 from your account! You never need to enter your PIN or scan a QR code to receive funds.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guides Grid */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Featured Threat Defense Guides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-[#0c131f]/90 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold">
                    {article.category}
                  </span>
                  <span className="text-slate-500">{article.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <div className="space-y-1.5 text-xs text-slate-300 mb-4 bg-slate-950 p-4 rounded-2xl border border-slate-850 font-mono">
                  <span className="text-[10px] uppercase text-cyan-400 font-bold block mb-1">
                    Key Takeaways:
                  </span>
                  {article.keyPoints.slice(0, 2).map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500">
                  Verified ScamLens Playbook
                </span>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Read Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50 duration-150">
          <div className="bg-[#0e1624] border border-slate-750 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl text-slate-200 font-mono">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold">
                  {selectedArticle.category} • {selectedArticle.readTime}
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedArticle.excerpt}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
              <span className="text-[10px] uppercase text-cyan-400 font-bold block mb-1">
                Full Threat Defense Checklist:
              </span>
              {selectedArticle.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-200">
                  <span className="text-cyan-400 font-bold">[{idx + 1}]</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 text-xs text-cyan-200 space-y-1">
              <span className="font-bold text-cyan-300 block">Recommended Emergency Response:</span>
              <p>{selectedArticle.recommendedAction}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <Link
                href="/check"
                className="text-cyan-400 hover:underline"
              >
                Audit an Indicator in Scanner →
              </Link>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-750"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
