"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Mail,
  KeyRound,
  X,
  ShieldAlert,
} from "lucide-react";

// ─── Error Popup Modal ────────────────────────────────────────────────────────
interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

function ErrorPopup({ message, onClose }: ErrorPopupProps) {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="error-popup-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl border border-red-200 shadow-2xl max-w-sm w-full p-7 relative overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        {/* Red top accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-red-700 rounded-t-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close error popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-500 shadow-sm">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 id="error-popup-title" className="text-lg font-black text-[#0a2540] tracking-tight">
            Login Failed
          </h2>
        </div>

        {/* Message */}
        <p className="text-sm text-slate-600 text-center leading-relaxed mb-6">
          {message}
        </p>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white text-sm font-bold transition-all cursor-pointer shadow-md shadow-red-500/20"
        >
          Try Again
        </button>

        {/* Auto-dismiss progress bar */}
        <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-400 rounded-full"
            style={{ animation: "shrink 5s linear forwards" }}
          />
        </div>

        <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to   { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Error popup state
  const [popupError, setPopupError] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const openErrorPopup = useCallback((msg: string) => {
    setPopupError(msg);
    setShowErrorPopup(true);
  }, []);

  const closeErrorPopup = useCallback(() => {
    setShowErrorPopup(false);
    setPopupError("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    closeErrorPopup();

    // Client-side validation — show inline (not popup) for empty fields
    if (!usernameOrEmail.trim() || !password) {
      return; // HTML `required` attributes already handle this
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail: usernameOrEmail.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Show error in popup modal
        openErrorPopup(data.message ?? "An unexpected error occurred. Please try again.");
        return;
      }

      // ── Success ──────────────────────────────────────────────────────────
      setSuccessMessage(
        `Welcome back${data.user?.fullName ? `, ${data.user.fullName}` : ""}! Redirecting to your dashboard…`
      );
      setTimeout(() => router.push("/account"), 1200);
    } catch {
      openErrorPopup(
        "Unable to reach the server. Please check your internet connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUsernameOrEmail("");
    setPassword("");
    closeErrorPopup();
    setSuccessMessage("");
    router.push("/");
  };

  const handleOpenForgotModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsForgotModalOpen(true);
    setForgotEmail("");
    setForgotError("");
    setForgotSuccess("");
  };

  const handleCloseForgotModal = () => {
    setIsForgotModalOpen(false);
    setForgotEmail("");
    setForgotError("");
    setForgotSuccess("");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (!forgotEmail.trim()) {
      setForgotError("Please enter your registered Email ID.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail.trim())) {
      setForgotError("Please enter a valid email address.");
      return;
    }

    setForgotLoading(true);

    // Simulate sending password reset email
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSuccess("Password reset instructions have been sent to your email!");
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setForgotSuccess("");
        setForgotEmail("");
      }, 2200);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg relative overflow-hidden">
          {/* Top Amber Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-[#0a2540]" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center mb-4 group">
              <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-amber-500/40 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-amber-500 transition-all">
                <Image
                  src="/logo.png"
                  alt="ScamLens Logo"
                  width={52}
                  height={52}
                  className="w-full h-full object-contain rounded-full"
                  priority
                />
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a2540] tracking-tight">
              Sign In to Scam<span className="text-amber-500">Lens</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Enter your credentials to access your security portal
            </p>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Username / Email */}
            <div>
              <label
                htmlFor="usernameOrEmail"
                className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold mb-2"
              >
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  autoComplete="username email"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="Enter your username or email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            {/* 2. Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleOpenForgotModal}
                  className="text-xs text-amber-600 hover:text-amber-700 hover:underline font-medium cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#0a2540] hover:bg-[#081c33] active:scale-[0.99] text-white text-sm font-bold shadow-md shadow-[#0a2540]/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span>Submit</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 text-sm font-semibold border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Cancel</span>
              </button>
            </div>
          </form>

          {/* Link for Not Registered Users */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-600">
              Not registered yet?{" "}
              <Link
                href="/register"
                className="font-bold text-amber-600 hover:text-amber-700 hover:underline transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0a2540] transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* ── Error Popup Modal ─────────────────────────────────────────────── */}
      {showErrorPopup && (
        <ErrorPopup message={popupError} onClose={closeErrorPopup} />
      )}

      {/* ── Forgot Password Popup Modal ───────────────────────────────────── */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="forgot-password-title"
          >
            {/* Top Amber Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-[#0a2540]" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseForgotModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 mx-auto mb-3.5 shadow-xs">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2
                id="forgot-password-title"
                className="text-xl sm:text-2xl font-black text-[#0a2540] tracking-tight"
              >
                Reset Password
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                Enter your registered Email ID below and we will send you instructions to reset
                your password.
              </p>
            </div>

            {/* Alerts */}
            {forgotError && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotSuccess && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleForgotSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="forgotEmail"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold mb-2"
                >
                  Email ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="forgotEmail"
                    name="forgotEmail"
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your registered email ID"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#0a2540] hover:bg-[#081c33] active:scale-[0.99] text-white text-sm font-bold shadow-md shadow-[#0a2540]/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {forgotLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCloseForgotModal}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 text-sm font-semibold border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
