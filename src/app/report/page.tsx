"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft, 
  UploadCloud, 
  CheckCircle2, 
  EyeOff, 
  DollarSign, 
  X,
} from "lucide-react";
import { MOCK_CATEGORIES } from "@/data/mockData";

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedReportId, setGeneratedReportId] = useState("");

  // Form State
  const [category, setCategory] = useState("phishing");
  const [platform, setPlatform] = useState("website");
  const [targetEntity, setTargetEntity] = useState("");
  const [incidentDate, setIncidentDate] = useState("2026-09-22");
  const [financialLoss, setFinancialLoss] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterEmail, setReporterEmail] = useState("");
  const [consentAgreed, setConsentAgreed] = useState(false);

  const handleFileUploadSimulated = () => {
    const mockFileNames = [
      "screenshot_phishing_sms.png",
      "bank_transaction_statement.pdf",
      "telegram_chat_history.png",
    ];
    const randomFile = mockFileNames[uploadedFiles.length % mockFileNames.length];
    if (!uploadedFiles.includes(randomFile)) {
      setUploadedFiles([...uploadedFiles, randomFile]);
    }
  };

  const removeFile = (name: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = `SCAM-LENS-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedReportId(randomId);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono mb-2 font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>CITIZEN DEFENSE INITIATIVE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0a2540] tracking-tight mb-3">
          Report a Scam
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Your intelligence alerts our global threat scanner and safeguards innocent citizens. All submissions undergo security moderation before public indexation.
        </p>
      </div>

      {!isSubmitted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xl relative">
          {/* Multi-step progress header */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2 font-semibold">
              <span>Step {currentStep} of 4</span>
              <span className="text-[#0a2540]">
                {currentStep === 1 && "Incident Classification"}
                {currentStep === 2 && "Suspect & Entity Details"}
                {currentStep === 3 && "Loss & Evidence Narrative"}
                {currentStep === 4 && "Review & Anonymity"}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-600 transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: CATEGORY & CHANNEL */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-3">
                    1. Select Scam Category *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MOCK_CATEGORIES.map((cat) => (
                      <button
                        type="button"
                        key={cat.slug}
                        onClick={() => setCategory(cat.slug)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          category === cat.slug
                            ? "bg-amber-50/80 border-amber-400 text-amber-950 shadow-xs"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-bold text-xs sm:text-sm block text-slate-900 mb-1">
                          {cat.name}
                        </span>
                        <span className="text-[11px] text-slate-500 line-clamp-2">
                          {cat.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                      First Contact Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:border-amber-500 focus:outline-none cursor-pointer"
                    >
                      <option value="website">Fraudulent Website / Domain</option>
                      <option value="sms">Unsolicited SMS / Smishing</option>
                      <option value="whatsapp">WhatsApp / Telegram Message</option>
                      <option value="email">Phishing Email / Attachment</option>
                      <option value="social">Social Media Ad / Fake Profile</option>
                      <option value="phone">Unsolicited Phone Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                      Date of Incident
                    </label>
                    <input
                      type="date"
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: SUSPECT DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                    Suspect Website URL / Domain Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    placeholder="e.g. chase-security-auth-login.cc or scamstore-discount.shop"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-mono focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Provide the exact link or domain address the scammer instructed you to open.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                      Suspect Phone / Sender ID
                    </label>
                    <input
                      type="text"
                      placeholder="+1 (800) ... or sender name"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                      Crypto Wallet / Account
                    </label>
                    <input
                      type="text"
                      placeholder="0x... or deposit address"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: LOSS & EVIDENCE */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                    Estimated Financial Loss (USD)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                    </div>
                    <input
                      type="number"
                      value={financialLoss}
                      onChange={(e) => setFinancialLoss(e.target.value)}
                      placeholder="0 if no money was lost"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                    What Happened? (Scam Narrative) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe how they contacted you, what they claimed, payment methods requested, and how you realized it was fraudulent..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs leading-relaxed focus:border-amber-500 focus:bg-white focus:outline-none resize-none"
                  />
                </div>

                {/* Evidence Dropzone */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                    Attach Evidence & Screenshots
                  </label>
                  <div
                    onClick={handleFileUploadSimulated}
                    className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-7 text-center cursor-pointer transition-all bg-slate-50 group"
                  >
                    <UploadCloud className="w-8 h-8 text-amber-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-slate-700 font-bold">
                      Click to simulate uploading screenshot, receipt, or conversation export
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      PNG, JPG, PDF (Up to 10MB - sensitive personal data auto-redacted)
                    </span>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800 font-medium"
                        >
                          <span>{file}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(file)}
                            className="text-slate-400 hover:text-slate-700"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & ANONYMITY */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                {/* Summary box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Category:</span>
                    <span className="text-slate-900 uppercase font-bold">{category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Entity:</span>
                    <span className="text-rose-700 font-bold">{targetEntity || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Claimed Loss:</span>
                    <span className="text-emerald-700 font-bold">
                      {financialLoss ? `$${financialLoss}` : "$0"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Evidence Attached:</span>
                    <span className="text-blue-700 font-bold">{uploadedFiles.length} files</span>
                  </div>
                </div>

                {/* Anonymous toggle */}
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-start gap-3">
                  <EyeOff className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">
                        Submit Anonymously
                      </span>
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Your identity and IP address will be masked from public records. Only security moderators can verify the report.
                    </p>
                  </div>
                </div>

                {!isAnonymous && (
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 font-bold mb-2">
                      Your Contact Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={reporterEmail}
                      onChange={(e) => setReporterEmail(e.target.value)}
                      placeholder="To receive updates when this scam is neutralized"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* Consent */}
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 mt-0.5"
                  />
                  <span>
                    I confirm that the information provided is truthful to the best of my knowledge and does not contain defamatory or intentionally falsified claims.
                  </span>
                </label>
              </div>
            )}

            {/* Form Nav Buttons */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2.5 rounded-xl bg-[#0a2540] hover:bg-[#1e3a8a] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!consentAgreed}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-500 via-rose-600 to-amber-600 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-red-500/20 cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Submit Scam Incident</span>
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        /* Success Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            Incident Successfully Submitted
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6">
            Your intelligence report has entered the ScamLens Moderation Queue. Automated heuristic scanners have already begun inspecting the suspect target.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto mb-8 font-mono">
            <span className="text-xs text-slate-500 block mb-1">Assigned Incident Tracking ID</span>
            <span className="text-lg font-bold text-[#0a2540]">{generatedReportId}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/scams"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-all"
            >
              Browse Scam Directory
            </Link>
            <Link
              href="/account"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0a2540] text-white text-xs font-bold hover:bg-[#1e3a8a] transition-all"
            >
              Go to My Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
