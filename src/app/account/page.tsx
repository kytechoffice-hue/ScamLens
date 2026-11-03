"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  PlusCircle, FileText, ChevronLeft, ChevronRight,
  Filter, X, Loader2, AlertCircle, RefreshCw, Trash2, ShieldCheck,
  Eye, ExternalLink, Image as ImageIcon, File, Maximize2, Download
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ReportStatus = "VERIFIED SCAM" | "UNDER AUDIT" | "PENDING" | "REJECTED";
// API-side status keys (snake_case enum)
type ApiStatus = "PENDING" | "UNDER_AUDIT" | "VERIFIED_SCAM" | "REJECTED";

type Report = {
  id: number;
  tracking_id: string;
  status: ReportStatus;
  category: string;
  category_tag: string;
  category_slug: string;
  platform: string;
  incident_date: string;
  lost_money: boolean;
  amount_lost_inr: number | null;
  scammer_url: string | null;
  scammer_phone: string | null;
  reporter_name?: string;
  reporter_email?: string;
  evidence_count?: number;
  created_at: string;
};

type EvidenceItem = {
  id: number;
  file_type: "screenshot" | "payment_receipt" | "chat_email_record" | "other";
  original_name: string;
  stored_name: string;
  mime_type: string;
  file_size_kb: number;
  storage_path: string;
  uploaded_at: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type StoredUser = {
  id: number;
  username: string | null;
  email: string;
  fullName: string | null;
  role: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUSES: ReportStatus[] = ["VERIFIED SCAM", "UNDER AUDIT", "PENDING", "REJECTED"];
const PAGE_SIZE = 10;

// Maps display label → API enum value
const STATUS_TO_API: Record<ReportStatus, ApiStatus> = {
  "VERIFIED SCAM": "VERIFIED_SCAM",
  "UNDER AUDIT":   "UNDER_AUDIT",
  "PENDING":       "PENDING",
  "REJECTED":      "REJECTED",
};

// Maps API enum value → display label
const API_TO_STATUS: Record<ApiStatus, ReportStatus> = {
  "VERIFIED_SCAM": "VERIFIED SCAM",
  "UNDER_AUDIT":   "UNDER AUDIT",
  "PENDING":       "PENDING",
  "REJECTED":      "REJECTED",
};

const ADMIN_STATUS_OPTIONS: { value: ApiStatus; label: ReportStatus }[] = [
  { value: "PENDING",       label: "PENDING" },
  { value: "UNDER_AUDIT",   label: "UNDER AUDIT" },
  { value: "VERIFIED_SCAM", label: "VERIFIED SCAM" },
  { value: "REJECTED",      label: "REJECTED" },
];

const FILE_TYPE_TITLES: Record<string, string> = {
  screenshot: "Screenshot Evidence",
  payment_receipt: "Payment Receipt",
  chat_email_record: "Chat / Email Record",
  other: "Supporting Document",
};

// ─── Category label map ───────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, string> = {
  "Crypto & Yield":  "Cryptocurrency Fraud",
  "Job Scam":        "Fake Job Offers",
  "Loan Scam":       "Fake Loan Offers",
  "Lottery Scam":    "Fake Lottery / Prize Offers",
  "NFT Scam":        "Digital Asset Fraud",
  "Phishing":        "Fake Website Scams",
  "SMS Smishing":    "Fake SMS / Message Scams",
  "Voice Phishing":  "Fake Calls / Phone Scams",
};

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ReportStatus }) {
  const styles: Record<ReportStatus, string> = {
    "VERIFIED SCAM": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "UNDER AUDIT":   "bg-amber-50  text-amber-700  border-amber-200",
    "PENDING":       "bg-sky-50    text-sky-700    border-sky-200",
    "REJECTED":      "bg-rose-50   text-rose-700   border-rose-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({
  trackingId,
  onConfirm,
  onCancel,
  loading,
}: {
  trackingId: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 max-w-sm w-full mx-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">Delete Report</h3>
            <p className="text-xs text-slate-500">{trackingId}</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 mb-5 leading-relaxed">
          This will permanently delete the report and all associated evidence files. This action <strong>cannot be undone</strong>.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Evidence Viewer Modal (Admin Only) ────────────────────────────────────────
function EvidenceModal({
  report,
  evidence,
  loading,
  error,
  onClose,
  onOpenLightbox,
}: {
  report: Report;
  evidence: EvidenceItem[];
  loading: boolean;
  error: string;
  onClose: () => void;
  onOpenLightbox: (url: string) => void;
}) {
  const getFileUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (path.startsWith("/")) return path;
    return `/${path}`;
  };

  const isImageFile = (item: EvidenceItem) => {
    if (item.mime_type && item.mime_type.startsWith("image/")) return true;
    const ext = item.original_name?.toLowerCase() || "";
    return ext.endsWith(".png") || ext.endsWith(".jpg") || ext.endsWith(".jpeg") || ext.endsWith(".webp") || ext.endsWith(".gif");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Uploaded Evidence Files</h3>
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-mono font-bold">
                  {report.tracking_id}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[10px] text-amber-800 font-semibold">
                  Admin Only
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Target: <span className="font-semibold text-rose-700">{report.scammer_url || report.scammer_phone || "Unknown"}</span>
                {report.reporter_name && <span> • Reported by: {report.reporter_name}</span>}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {loading && (
            <div className="py-16 text-center text-slate-500">
              <Loader2 className="w-7 h-7 text-sky-500 animate-spin mx-auto mb-2" />
              <p className="text-xs font-semibold">Loading uploaded evidence...</p>
            </div>
          )}

          {!loading && error && (
            <div className="py-12 text-center text-rose-500">
              <AlertCircle className="w-7 h-7 mx-auto mb-2 text-rose-400" />
              <p className="text-xs font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && evidence.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              <File className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-bold text-slate-700">No Evidence Uploaded</p>
              <p className="text-xs text-slate-400 mt-1">The user submitted this report without attaching screenshots or files.</p>
            </div>
          )}

          {!loading && !error && evidence.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {evidence.map((item) => {
                const fileUrl = getFileUrl(item.storage_path);
                const isImg = isImageFile(item);

                return (
                  <div
                    key={item.id}
                    className="group border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-md transition-all flex flex-col"
                  >
                    {/* Badge header */}
                    <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                        {FILE_TYPE_TITLES[item.file_type] || item.file_type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.file_size_kb > 0 ? `${item.file_size_kb} KB` : "Attached"}
                      </span>
                    </div>

                    {/* Preview Area */}
                    <div className="relative aspect-video bg-slate-100 flex items-center justify-center overflow-hidden">
                      {isImg ? (
                        <div className="w-full h-full relative cursor-pointer" onClick={() => onOpenLightbox(fileUrl)}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={fileUrl}
                            alt={item.original_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // If file not on disk (e.g. simulated filename), show clean placeholder
                              const target = e.currentTarget;
                              target.style.display = "none";
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                          {/* Fallback placeholder if image is missing from filesystem */}
                          <div
                            style={{ display: "none" }}
                            className="w-full h-full absolute inset-0 flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center"
                          >
                            <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                            <span className="text-[11px] font-semibold text-slate-600 line-clamp-1">{item.original_name}</span>
                            <span className="text-[9px] text-slate-400 font-mono mt-0.5">Stored as: {item.storage_path}</span>
                          </div>

                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <span className="px-3 py-1.5 rounded-lg bg-black/70 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                              <Maximize2 className="w-3.5 h-3.5" /> Enlarge
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 p-4">
                          <FileText className="w-10 h-10 text-slate-300 mb-1" />
                          <span className="text-xs font-semibold text-slate-700 line-clamp-1">{item.original_name}</span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5">Document File</span>
                        </div>
                      )}
                    </div>

                    {/* Footer / Actions */}
                    <div className="p-3 bg-white flex items-center justify-between gap-2 text-xs">
                      <div className="truncate flex-1">
                        <p className="font-semibold text-slate-800 text-[11px] truncate" title={item.original_name}>
                          {item.original_name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">
                          {item.storage_path}
                        </p>
                      </div>

                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors shrink-0"
                        title="Open in new window"
                      >
                        <ExternalLink className="w-3 h-3" /> Open
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>{evidence.length} file{evidence.length === 1 ? "" : "s"} attached</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Image Lightbox ────────────────────────────────────────────────────────────
function ImageLightbox({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in-50"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="max-w-4xl max-h-[85vh] p-2" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt="Enlarged Evidence Preview"
          className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl mx-auto"
        />
        <div className="text-center mt-3">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Open Full Resolution
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AccountPage() {
  // Auth
  const [user, setUser] = useState<StoredUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const isAdmin = user?.role === "admin";

  // Filter state
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo,   setDateTo]   = useState("");
  const [category, setCategory] = useState("");
  const [status,   setStatus]   = useState("");
  const [page,     setPage]     = useState(1);

  // Data state
  const [reports,    setReports]    = useState<Report[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");

  // Admin action state
  const [deletingId,      setDeletingId]      = useState<number | null>(null);
  const [confirmDelete,   setConfirmDelete]   = useState<Report | null>(null);
  const [statusUpdating,  setStatusUpdating]  = useState<number | null>(null);
  const [actionError,     setActionError]     = useState("");

  // Admin evidence modal state
  const [evidenceModalReport, setEvidenceModalReport] = useState<Report | null>(null);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [evidenceLoading, setEvidenceLoading] = useState(false);
  const [evidenceError, setEvidenceError] = useState("");
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // ── Load user from localStorage ─────────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem("scamlens_user");
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
    setAuthChecked(true);
  }, []);

  // ── Fetch reports ───────────────────────────────────────────────────────────
  const fetchReports = useCallback(async () => {
    if (!authChecked) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (dateFrom)  params.set("from",     dateFrom);
      if (dateTo)    params.set("to",       dateTo);
      if (category)  params.set("category", category);
      if (status)    params.set("status",   STATUS_TO_API[status as ReportStatus] ?? status);
      params.set("page",  String(page));
      params.set("limit", String(PAGE_SIZE));

      const headers: Record<string, string> = {};
      if (user?.role) headers["X-User-Role"] = user.role;
      if (user?.email) headers["X-User-Email"] = user.email;

      const res  = await fetch(`/api/reports?${params.toString()}`, { headers });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message ?? "Failed to load reports.");
      setReports(json.data as Report[]);
      setPagination(json.pagination as Pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo, category, status, page, user, authChecked]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  // ── Admin: fetch & open evidence modal ──────────────────────────────────────
  const handleOpenEvidence = async (report: Report) => {
    setEvidenceModalReport(report);
    setEvidenceLoading(true);
    setEvidenceError("");
    setEvidenceItems([]);

    try {
      const res = await fetch(`/api/reports/${report.id}`, {
        headers: { "X-User-Role": user?.role ?? "" },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load evidence.");
      }
      setEvidenceItems(data.evidence || []);
    } catch (err) {
      setEvidenceError(err instanceof Error ? err.message : "Failed to load evidence.");
    } finally {
      setEvidenceLoading(false);
    }
  };

  // ── Admin: change status ────────────────────────────────────────────────────
  const handleStatusChange = async (report: Report, apiStatus: ApiStatus) => {
    setStatusUpdating(report.id);
    setActionError("");
    try {
      const res = await fetch(`/api/reports/${report.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-User-Role": user?.role ?? "",
        },
        body: JSON.stringify({ status: apiStatus }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      // Optimistically update in state
      setReports((prev) =>
        prev.map((r) =>
          r.id === report.id
            ? { ...r, status: API_TO_STATUS[apiStatus] }
            : r
        )
      );
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Status update failed.");
    } finally {
      setStatusUpdating(null);
    }
  };

  // ── Admin: delete ───────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeletingId(confirmDelete.id);
    setActionError("");
    try {
      const res = await fetch(`/api/reports/${confirmDelete.id}`, {
        method: "DELETE",
        headers: { "X-User-Role": user?.role ?? "" },
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);
      setReports((prev) => prev.filter((r) => r.id !== confirmDelete.id));
      setPagination((prev) => prev ? { ...prev, total: prev.total - 1 } : prev);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const applyFilter = (fn: () => void) => { fn(); setPage(1); };
  const clearFilters = () => { setDateFrom(""); setDateTo(""); setCategory(""); setStatus(""); setPage(1); };
  const hasFilters   = dateFrom || dateTo || category || status;

  const total      = pagination?.total      ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const safePage   = Math.min(page, totalPages);

  const getTarget = (r: Report) => r.scammer_url || r.scammer_phone || "—";
  const isPhone   = (r: Report) => !r.scammer_url && !!r.scammer_phone;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Lightbox Preview ── */}
      {lightboxUrl && (
        <ImageLightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />
      )}

      {/* ── Evidence Modal (Admin Only) ── */}
      {evidenceModalReport && (
        <EvidenceModal
          report={evidenceModalReport}
          evidence={evidenceItems}
          loading={evidenceLoading}
          error={evidenceError}
          onClose={() => setEvidenceModalReport(null)}
          onOpenLightbox={(url) => setLightboxUrl(url)}
        />
      )}

      {/* ── Delete confirm dialog ── */}
      {confirmDelete && (
        <ConfirmDialog
          trackingId={confirmDelete.tracking_id}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
          loading={deletingId === confirmDelete.id}
        />
      )}

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono mb-2 font-semibold">
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>MY ACCOUNT</span>
            {isAdmin && (
              <span className="ml-1 px-1.5 py-0.5 rounded bg-[#0a2540] text-white text-[9px] font-bold tracking-wider">
                ADMIN
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0a2540] tracking-tight">
            My Submitted Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isAdmin
              ? "Admin Dashboard: Managing all scam reports across all users with full moderation controls."
              : user?.email
              ? `Viewing scam reports submitted with your account (${user.email}).`
              : "Track and manage all scam incidents you have reported to ScamLens."}
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

      {/* ── Admin action error ── */}
      {actionError && (
        <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {actionError}
          <button onClick={() => setActionError("")} className="ml-auto text-rose-400 hover:text-rose-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Filter Bar ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4 mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filters
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">From</label>
            <input type="date" value={dateFrom} onChange={(e) => applyFilter(() => setDateFrom(e.target.value))}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-slate-50" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">To</label>
            <input type="date" value={dateTo} onChange={(e) => applyFilter(() => setDateTo(e.target.value))}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-slate-50" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Category</label>
            <select value={category} onChange={(e) => applyFilter(() => setCategory(e.target.value))}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-slate-50 min-w-[160px]">
              <option value="">All Types</option>
              {Object.entries(CATEGORY_LABELS).map(([orig, label]) => (
                <option key={orig} value={orig}>{label} ({orig})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Status</label>
            <select value={status} onChange={(e) => applyFilter(() => setStatus(e.target.value))}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-slate-50 min-w-[140px]">
              <option value="">All Statuses</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {hasFilters && (
            <button onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-rose-600 font-semibold border border-rose-200 rounded-lg px-3 py-1.5 bg-rose-50 hover:bg-rose-100 transition-colors mt-4">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}

          <button onClick={fetchReports} disabled={loading}
            className="ml-auto inline-flex items-center gap-1 text-xs text-slate-500 font-semibold border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 hover:bg-slate-100 transition-colors mt-4 disabled:opacity-40">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
      </div>

      {/* ── Reports Table ── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Submitted Scam Reports</h2>
            {isAdmin && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0a2540]/10 border border-[#0a2540]/20 text-[10px] font-bold text-[#0a2540]">
                <ShieldCheck className="w-3 h-3" /> Admin View
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {loading ? "Loading…" : `${total} ${total === 1 ? "Report" : "Reports"}`}
          </span>
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
                {isAdmin && <th className="py-3 px-6 text-[#0a2540]">Admin Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">

              {/* Loading skeleton */}
              {loading && Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: isAdmin ? 6 : 5 }).map((__, j) => (
                    <td key={j} className="py-3.5 px-6">
                      <div className="h-3 bg-slate-100 rounded-full w-3/4" />
                    </td>
                  ))}
                </tr>
              ))}

              {/* Error */}
              {!loading && error && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="py-12 text-center">
                    <AlertCircle className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                    <p className="text-xs text-rose-500 font-medium">{error}</p>
                    <button onClick={fetchReports} className="mt-3 text-xs text-slate-500 underline hover:text-slate-700">
                      Try again
                    </button>
                  </td>
                </tr>
              )}

              {/* Empty */}
              {!loading && !error && reports.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="py-14 text-center">
                    <FileText className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-400">
                      {!user ? "Please login to view your reports" : "No reports found"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {!user
                        ? "You need to be logged in to view your submitted scam incidents."
                        : hasFilters
                        ? "Try adjusting your filters."
                        : "Submit your first scam report to get started."}
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {!user ? (
                        <Link
                          href="/login"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0a2540] text-white text-xs font-bold hover:opacity-90 transition-all"
                        >
                          Log In to Your Account
                        </Link>
                      ) : (
                        !hasFilters && (
                          <Link
                            href="/report"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0a2540] text-white text-xs font-bold hover:opacity-90 transition-all"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> New Report
                          </Link>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!loading && !error && reports.map((r) => (
                <tr key={r.id} className={`hover:bg-slate-50/60 transition-colors ${deletingId === r.id ? "opacity-40 pointer-events-none" : ""}`}>
                  <td className="py-3.5 px-6 font-bold text-[#0a2540]">{r.tracking_id}</td>
                  <td className={`py-3.5 px-6 font-semibold ${isPhone(r) ? "text-amber-700" : "text-rose-700"}`}>
                    {getTarget(r)}
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    {CATEGORY_LABELS[r.category_tag] ?? r.category}
                    <span className="ml-1 text-slate-400 font-normal">({r.category_tag})</span>
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">{r.incident_date?.slice(0, 10)}</td>
                  <td className="py-3.5 px-6">
                    <StatusBadge status={r.status} />
                  </td>

                  {/* ── Admin Actions Column (Admin Only) ── */}
                  {isAdmin && (
                    <td className="py-2.5 px-6">
                      <div className="flex items-center gap-2">

                        {/* View Uploaded Evidence / Images Button */}
                        <button
                          onClick={() => handleOpenEvidence(r)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all cursor-pointer font-bold text-[10px]"
                          title={`View uploaded evidence & images for ${r.tracking_id}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Evidence</span>
                        </button>

                        {/* Status change dropdown */}
                        <div className="relative">
                          <select
                            value={STATUS_TO_API[r.status]}
                            disabled={statusUpdating === r.id}
                            onChange={(e) => handleStatusChange(r, e.target.value as ApiStatus)}
                            className="text-[10px] font-bold border border-slate-200 rounded-lg pl-2 pr-6 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300 hover:border-amber-400 cursor-pointer transition-colors disabled:opacity-40 appearance-none min-w-[110px]"
                          >
                            {ADMIN_STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          {statusUpdating === r.id
                            ? <Loader2 className="w-3 h-3 text-amber-500 animate-spin absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            : <svg className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          }
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => setConfirmDelete(r)}
                          disabled={deletingId === r.id}
                          className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          title={`Delete ${r.tracking_id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[11px] text-slate-400 font-mono">
              Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, total)} of {total}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`min-w-[28px] h-7 rounded-lg text-[11px] font-bold border transition-colors ${p === safePage ? "bg-[#0a2540] text-white border-[#0a2540]" : "border-slate-200 text-slate-500 hover:bg-slate-100"}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
