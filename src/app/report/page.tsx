"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ShieldAlert, ArrowRight, ArrowLeft, CheckCircle2,
  UploadCloud, X, ChevronDown, Info,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SCAM_CATEGORIES = [
  { value: "phishing",      label: "Fake Website Scams",          sub: "Phishing" },
  { value: "crypto",        label: "Cryptocurrency Fraud",        sub: "Crypto & Yield" },
  { value: "job",           label: "Fake Job Offers",             sub: "Job Scam" },
  { value: "loan",          label: "Fake Loan Offers",            sub: "Loan Scam" },
  { value: "lottery",       label: "Fake Lottery / Prize Offers", sub: "Lottery Scam" },
  { value: "nft",           label: "Digital Asset Fraud",         sub: "NFT Scam" },
  { value: "sms",           label: "Fake SMS / Message Scams",    sub: "SMS Smishing" },
  { value: "voice",         label: "Fake Calls / Phone Scams",    sub: "Voice Phishing" },
  { value: "ecommerce",     label: "Fake Online Shopping",        sub: "E-Commerce Scam" },
  { value: "impersonation", label: "Impersonation / Identity",    sub: "Impersonation" },
  { value: "other",         label: "Other",                       sub: "Other" },
];

const PLATFORMS = [
  "WhatsApp", "Phone Call", "SMS", "Website", "Email", "Social Media", "Other",
];

const PAYMENT_METHODS = [
  "UPI", "Bank Transfer", "Credit Card", "Debit Card", "Wallet", "Crypto", "Other",
];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Andaman & Nicobar Islands","Chandigarh","Delhi",
  "Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
];

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Scam Info" },
  { id: 2, label: "Scammer Info" },
  { id: 3, label: "Financial Loss" },
  { id: 4, label: "Evidence" },
  { id: 5, label: "Your Details" },
  { id: 6, label: "Confirmation" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
      {children}
      {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-1 text-[11px] text-slate-400 mt-1">
      <Info className="w-3 h-3 shrink-0 mt-0.5" />
      {children}
    </p>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-slate-400";

const selectCls =
  "w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100 transition-all appearance-none cursor-pointer";

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}

// ─── File Upload ──────────────────────────────────────────────────────────────

type FileEntry = {
  name: string;
  size: string;
  url?: string;
  storedName?: string;
  mimeType?: string;
  fileSizeKb?: number;
};

function FileUploadZone({
  label,
  hint,
  files,
  onAdd,
  onRemove,
  accept = "image/*,.pdf,.doc,.docx",
}: {
  label: string;
  hint?: string;
  files: FileEntry[];
  onAdd: (f: FileEntry) => void;
  onRemove: (name: string) => void;
  accept?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (selectedFiles.length === 0) return;

    setUploading(true);
    for (const file of selectedFiles) {
      const kb = (file.size / 1024).toFixed(0);
      const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${kb} KB`;

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.success) {
          onAdd({
            name: file.name,
            size: sizeStr,
            url: data.url,
            storedName: data.storedName,
            mimeType: data.mimeType,
            fileSizeKb: data.fileSizeKb,
          });
        } else {
          onAdd({ name: file.name, size: sizeStr, url: `uploads/${file.name}` });
        }
      } catch {
        onAdd({ name: file.name, size: sizeStr, url: `uploads/${file.name}` });
      }
    }
    setUploading(false);
    e.target.value = "";
  };

  return (
    <div>
      <Label>{label}</Label>
      {hint && <Hint>{hint}</Hint>}
      <div
        onClick={() => !uploading && ref.current?.click()}
        className="mt-2 border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-xl p-5 text-center cursor-pointer transition-all bg-slate-50 hover:bg-amber-50/30 group relative"
      >
        <UploadCloud className={`w-6 h-6 text-amber-500 mx-auto mb-1.5 transition-transform ${uploading ? "animate-bounce" : "group-hover:scale-110"}`} />
        <p className="text-xs font-semibold text-slate-600">
          {uploading ? "Uploading files..." : "Click to browse or drag & drop"}
        </p>
        <span className="text-[10px] text-slate-400">PNG, JPG, PDF up to 10 MB</span>
        <input ref={ref} type="file" multiple accept={accept} className="hidden" onChange={handleChange} />
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
              <span className="max-w-[160px] truncate">{f.name}</span>
              <span className="text-slate-400 text-[10px]">{f.size}</span>
              <button type="button" onClick={() => onRemove(f.name)} className="text-slate-400 hover:text-rose-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <span className="w-7 h-7 rounded-full bg-[#0a2540] text-white text-xs font-black flex items-center justify-center shrink-0">
          {step}
        </span>
        <h2 className="text-base font-black text-[#0a2540] tracking-tight">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted]   = useState(false);
  const [reportId, setReportId]         = useState("");

  // ── Step 1: Scam Information
  const [category, setCategory]       = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [platform, setPlatform]       = useState("");
  const [description, setDescription] = useState("");

  // ── Step 2: Scammer Information
  const [scammerName, setScammerName]     = useState("");
  const [scammerPhone, setScammerPhone]   = useState("");
  const [scammerEmail, setScammerEmail]   = useState("");
  const [scammerUrl, setScammerUrl]       = useState("");
  const [scammerSocial, setScammerSocial] = useState("");
  const [scammerUpi, setScammerUpi]       = useState("");

  // ── Step 3: Financial Loss
  const [lostMoney, setLostMoney]         = useState<"yes" | "no" | "">("");
  const [amountLost, setAmountLost]       = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  // ── Step 4: Evidence
  const [screenshots, setScreenshots]   = useState<FileEntry[]>([]);
  const [receipts, setReceipts]         = useState<FileEntry[]>([]);
  const [chatRecords, setChatRecords]   = useState<FileEntry[]>([]);
  const [otherDocs, setOtherDocs]       = useState<FileEntry[]>([]);

  // ── Step 5: Reporter Information
  const [repName, setRepName]       = useState("");
  const [repPhone, setRepPhone]     = useState("");
  const [repEmail, setRepEmail]     = useState("");
  const [repState, setRepState]     = useState("");
  const [repDistrict, setRepDistrict] = useState("");
  const [repCity, setRepCity]       = useState("");

  // Auto-fill logged-in user credentials if present
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("scamlens_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.fullName) setRepName(u.fullName);
        if (u.email) setRepEmail(u.email);
      }
    } catch { /* ignore */ }
  }, []);

  // ── Step 6: Confirmation
  const [reportedPolice, setReportedPolice] = useState<"yes" | "no" | "">("");
  const [policeNumber, setPoliceNumber]     = useState("");
  const [consent, setConsent]               = useState(false);

  // ── Handlers
  const addFile = (setter: React.Dispatch<React.SetStateAction<FileEntry[]>>) =>
    (f: FileEntry) => setter((prev) => prev.some((x) => x.name === f.name) ? prev : [...prev, f]);

  const removeFile = (setter: React.Dispatch<React.SetStateAction<FileEntry[]>>) =>
    (name: string) => setter((prev) => prev.filter((f) => f.name !== name));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        // Step 1
        categorySlug: category,
        incidentDate,
        incidentTime:  incidentTime || undefined,
        platform,
        description,

        // Step 2
        scammerName:        scammerName   || undefined,
        scammerPhone:       scammerPhone  || undefined,
        scammerEmail:       scammerEmail  || undefined,
        scammerUrl:         scammerUrl    || undefined,
        scammerSocialLink:  scammerSocial || undefined,
        scammerUpiOrAccount: scammerUpi   || undefined,

        // Step 3
        lostMoney: lostMoney === "yes",
        amountLostInr:   lostMoney === "yes" && amountLost ? Number(amountLost) : undefined,
        paymentMethod:   lostMoney === "yes" ? paymentMethod || undefined : undefined,
        transactionId:   lostMoney === "yes" ? transactionId || undefined : undefined,
        transactionDate: lostMoney === "yes" ? transactionDate || undefined : undefined,

        // Step 4 – file metadata with uploaded URLs
        evidenceFiles: [
          ...screenshots.map((f) => ({
            fileType: "screenshot" as const,
            originalName: f.name,
            storedName: f.storedName || f.name,
            mimeType: f.mimeType || "image/*",
            fileSizeKb: f.fileSizeKb || 0,
            storagePath: f.url || `uploads/${f.name}`,
          })),
          ...receipts.map((f) => ({
            fileType: "payment_receipt" as const,
            originalName: f.name,
            storedName: f.storedName || f.name,
            mimeType: f.mimeType || "image/*",
            fileSizeKb: f.fileSizeKb || 0,
            storagePath: f.url || `uploads/${f.name}`,
          })),
          ...chatRecords.map((f) => ({
            fileType: "chat_email_record" as const,
            originalName: f.name,
            storedName: f.storedName || f.name,
            mimeType: f.mimeType || "image/*",
            fileSizeKb: f.fileSizeKb || 0,
            storagePath: f.url || `uploads/${f.name}`,
          })),
          ...otherDocs.map((f) => ({
            fileType: "other" as const,
            originalName: f.name,
            storedName: f.storedName || f.name,
            mimeType: f.mimeType || "application/octet-stream",
            fileSizeKb: f.fileSizeKb || 0,
            storagePath: f.url || `uploads/${f.name}`,
          })),
        ],

        // Step 5
        reporterName:     repName,
        reporterPhone:    repPhone,
        reporterEmail:    repEmail,
        reporterState:    repState,
        reporterDistrict: repDistrict,
        reporterCity:     repCity || undefined,

        // Step 6
        reportedToPolice:      reportedPolice === "yes",
        policeComplaintNumber: reportedPolice === "yes" ? policeNumber || undefined : undefined,
        consentAgreed: consent,
      };

      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Submission failed.");
      }

      setReportId(data.trackingId);
      setIsSubmitted(true);

    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = STEPS.length;

  // ─── Success screen ──────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Report Submitted!</h2>
          <p className="text-sm text-slate-500 mb-6">
            Your scam incident has been received and is under review by our moderation team.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-8 font-mono">
            <span className="text-xs text-slate-500 block mb-1">Tracking ID</span>
            <span className="text-xl font-black text-[#0a2540]">{reportId}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account" className="px-6 py-2.5 rounded-xl bg-[#0a2540] text-white text-sm font-bold hover:opacity-90 transition-all">
              My Reports
            </Link>
            <Link href="/" className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-semibold mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          CITIZEN DEFENSE INITIATIVE
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0a2540] tracking-tight mb-2">
          Report a Scam
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Help protect others by reporting scam incidents. All submissions are reviewed by our security team before being published.
        </p>
      </div>

      {/* Step progress bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-500 font-semibold">
            Step {currentStep} of {totalSteps} — <span className="text-[#0a2540]">{STEPS[currentStep - 1].label}</span>
          </span>
          <span className="text-xs font-mono text-slate-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        {/* Step labels */}
        <div className="flex justify-between mt-2">
          {STEPS.map((s) => (
            <span
              key={s.id}
              className={`text-[9px] font-mono font-semibold hidden sm:block ${
                s.id === currentStep ? "text-amber-600" : s.id < currentStep ? "text-emerald-600" : "text-slate-300"
              }`}
            >
              {s.id < currentStep ? "✓" : s.id === currentStep ? "●" : "○"} {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Form card */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">

          {/* ── STEP 1: Scam Information ─────────────────────────────────────── */}
          {currentStep === 1 && (
            <SectionCard step={1} title="Scam Information">

              {/* Scam Category */}
              <div>
                <Label required>Scam Category</Label>
                <SelectWrapper>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls} required>
                    <option value="">— Select a category —</option>
                    {SCAM_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label} ({c.sub})
                      </option>
                    ))}
                  </select>
                </SelectWrapper>
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label required>Date of Incident</Label>
                  <input type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} className={inputCls} required />
                </div>
                <div>
                  <Label>Time of Incident <span className="text-slate-400 font-normal normal-case text-[10px]">(Optional)</span></Label>
                  <input type="time" value={incidentTime} onChange={(e) => setIncidentTime(e.target.value)} className={inputCls} />
                </div>
              </div>

              {/* Platform */}
              <div>
                <Label required>Where did the scam happen?</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        platform === p
                          ? "bg-[#0a2540] text-white border-[#0a2540]"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label required>Description of the Scam</Label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe how the scam happened — how they contacted you, what they claimed, what happened next..."
                  className={`${inputCls} resize-none leading-relaxed`}
                />
                <Hint>Be as detailed as possible. This helps our team verify and publish the report faster.</Hint>
              </div>
            </SectionCard>
          )}

          {/* ── STEP 2: Scammer Information ──────────────────────────────────── */}
          {currentStep === 2 && (
            <SectionCard step={2} title="Scammer Information">
              <p className="text-xs text-slate-500 -mt-2">Share any details you know about the scammer. All fields are optional.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Scammer Name <span className="text-slate-400 font-normal normal-case text-[10px]">(if known)</span></Label>
                  <input type="text" value={scammerName} onChange={(e) => setScammerName(e.target.value)} placeholder="e.g. Raj Kumar / Customer Care" className={inputCls} />
                </div>
                <div>
                  <Label>Mobile Number</Label>
                  <input type="tel" value={scammerPhone} onChange={(e) => setScammerPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                </div>
              </div>

              <div>
                <Label>Email Address</Label>
                <input type="email" value={scammerEmail} onChange={(e) => setScammerEmail(e.target.value)} placeholder="scammer@example.com" className={inputCls} />
              </div>

              <div>
                <Label>Website / URL</Label>
                <input type="url" value={scammerUrl} onChange={(e) => setScammerUrl(e.target.value)} placeholder="https://fake-bank-login.cc" className={inputCls} />
                <Hint>Paste the exact URL or domain you were directed to.</Hint>
              </div>

              <div>
                <Label>Social Media Profile / Account Link</Label>
                <input type="text" value={scammerSocial} onChange={(e) => setScammerSocial(e.target.value)} placeholder="https://instagram.com/fakeaccount or @username" className={inputCls} />
              </div>

              <div>
                <Label>UPI ID / Bank Account Number <span className="text-slate-400 font-normal normal-case text-[10px]">(if available)</span></Label>
                <input type="text" value={scammerUpi} onChange={(e) => setScammerUpi(e.target.value)} placeholder="scammer@upi or Account No." className={inputCls} />
              </div>
            </SectionCard>
          )}

          {/* ── STEP 3: Financial Loss Details ───────────────────────────────── */}
          {currentStep === 3 && (
            <SectionCard step={3} title="Financial Loss Details">

              {/* Did you lose money? */}
              <div>
                <Label required>Did you lose money?</Label>
                <div className="flex gap-3 mt-1">
                  {(["yes", "no"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setLostMoney(val)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all cursor-pointer capitalize ${
                        lostMoney === val
                          ? val === "yes"
                            ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                            : "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {val === "yes" ? "✓ Yes" : "✗ No"}
                    </button>
                  ))}
                </div>
              </div>

              {lostMoney === "yes" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Amount */}
                    <div>
                      <Label>Amount Lost (₹)</Label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={amountLost}
                          onChange={(e) => setAmountLost(e.target.value)}
                          placeholder="0"
                          className={`${inputCls} pl-8`}
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <Label>Payment Method</Label>
                      <SelectWrapper>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className={selectCls}>
                          <option value="">— Select method —</option>
                          {PAYMENT_METHODS.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </SelectWrapper>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Transaction ID */}
                    <div>
                      <Label>Transaction ID / UTR Number</Label>
                      <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="UTR / Txn ID" className={inputCls} />
                    </div>
                    {/* Transaction Date */}
                    <div>
                      <Label>Transaction Date</Label>
                      <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} className={inputCls} />
                    </div>
                  </div>
                </>
              )}

              {lostMoney === "no" && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 font-medium">
                  Great — reporting without financial loss is still very helpful to warn others!
                </div>
              )}
            </SectionCard>
          )}

          {/* ── STEP 4: Evidence & Attachments ───────────────────────────────── */}
          {currentStep === 4 && (
            <SectionCard step={4} title="Evidence & Attachments">
              <p className="text-xs text-slate-500 -mt-2">Upload any files that support your report. All files are optional but help verify the scam.</p>

              <FileUploadZone
                label="Upload Screenshots"
                hint="Screenshots of the scam message, fake website, or fraudulent profile."
                files={screenshots}
                onAdd={addFile(setScreenshots)}
                onRemove={removeFile(setScreenshots)}
                accept="image/*"
              />
              <FileUploadZone
                label="Upload Payment Receipt"
                hint="Bank statement, UPI receipt, or transaction confirmation."
                files={receipts}
                onAdd={addFile(setReceipts)}
                onRemove={removeFile(setReceipts)}
                accept="image/*,.pdf"
              />
              <FileUploadZone
                label="Upload Chat / Email Records"
                hint="Exported WhatsApp chats, email threads, or SMS screenshots."
                files={chatRecords}
                onAdd={addFile(setChatRecords)}
                onRemove={removeFile(setChatRecords)}
                accept="image/*,.pdf,.txt,.eml"
              />
              <FileUploadZone
                label="Upload Other Documents"
                hint="Any other supporting documents (contracts, agreements, etc.)."
                files={otherDocs}
                onAdd={addFile(setOtherDocs)}
                onRemove={removeFile(setOtherDocs)}
              />
            </SectionCard>
          )}

          {/* ── STEP 5: Reporter Information ─────────────────────────────────── */}
          {currentStep === 5 && (
            <SectionCard step={5} title="Reporter Information">
              <p className="text-xs text-slate-500 -mt-2">Your details are kept confidential and used only for verification and follow-up.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label required>Full Name</Label>
                  <input type="text" required value={repName} onChange={(e) => setRepName(e.target.value)} placeholder="Your full name" className={inputCls} />
                </div>
                <div>
                  <Label required>Mobile Number</Label>
                  <input type="tel" required value={repPhone} onChange={(e) => setRepPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                </div>
              </div>

              <div>
                <Label required>Email Address</Label>
                <input type="email" required value={repEmail} onChange={(e) => setRepEmail(e.target.value)} placeholder="your@email.com" className={inputCls} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label required>State</Label>
                  <SelectWrapper>
                    <select required value={repState} onChange={(e) => setRepState(e.target.value)} className={selectCls}>
                      <option value="">— State —</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </SelectWrapper>
                </div>
                <div>
                  <Label required>District</Label>
                  <input type="text" required value={repDistrict} onChange={(e) => setRepDistrict(e.target.value)} placeholder="District" className={inputCls} />
                </div>
                <div>
                  <Label>City</Label>
                  <input type="text" value={repCity} onChange={(e) => setRepCity(e.target.value)} placeholder="City / Town" className={inputCls} />
                </div>
              </div>
            </SectionCard>
          )}

          {/* ── STEP 6: Final Confirmation ────────────────────────────────────── */}
          {currentStep === 6 && (
            <SectionCard step={6} title="Final Confirmation">

              {/* Police report */}
              <div>
                <Label required>Have you already reported this to the police?</Label>
                <div className="flex gap-3 mt-1">
                  {(["yes", "no"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setReportedPolice(val)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all cursor-pointer capitalize ${
                        reportedPolice === val
                          ? "bg-[#0a2540] text-white border-[#0a2540] shadow-sm"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {val === "yes" ? "✓ Yes" : "✗ No"}
                    </button>
                  ))}
                </div>
              </div>

              {reportedPolice === "yes" && (
                <div>
                  <Label>Police Complaint Number <span className="text-slate-400 font-normal normal-case text-[10px]">(Optional)</span></Label>
                  <input type="text" value={policeNumber} onChange={(e) => setPoliceNumber(e.target.value)} placeholder="e.g. FIR No. 123/2026" className={inputCls} />
                </div>
              )}

              {/* Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
                <p className="text-slate-500 font-semibold uppercase text-[10px] mb-2">Report Summary</p>
                {[
                  ["Category",    SCAM_CATEGORIES.find((c) => c.value === category)?.label ?? "—"],
                  ["Platform",    platform || "—"],
                  ["Date",        incidentDate || "—"],
                  ["Amount Lost", lostMoney === "yes" && amountLost ? `₹${amountLost}` : "None"],
                  ["Reporter",    repName || "—"],
                  ["Total Files", `${screenshots.length + receipts.length + chatRecords.length + otherDocs.length} file(s)`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-slate-500">{k}:</span>
                    <span className="text-slate-800 font-bold text-right">{v}</span>
                  </div>
                ))}
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded accent-amber-500 cursor-pointer shrink-0"
                />
                <span className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                  I confirm that the information provided is correct and truthful to the best of my knowledge. I understand that submitting false information may lead to legal action.
                </span>
              </label>
            </SectionCard>
          )}
        </div>

        {/* ── Navigation buttons ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-5">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
          ) : (
            <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all">
              Cancel
            </Link>
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0a2540] text-white text-sm font-bold hover:opacity-90 transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex flex-col items-end gap-2">
              {submitError && (
                <p className="text-xs text-rose-600 font-medium max-w-xs text-right">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={!consent || !reportedPolice || isSubmitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-extrabold uppercase tracking-wide shadow-md shadow-red-500/20 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                {isSubmitting ? "Submitting…" : "Submit Report"}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
