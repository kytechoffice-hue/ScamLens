export interface ScamReport {
  id: string;
  title: string;
  targetDomainOrEntity: string;
  category: "Phishing" | "Crypto & Investment" | "Job & Task Fraud" | "Fake E-Commerce" | "Impersonation" | "Tech Support";
  riskScore: number; // 0 to 100
  riskLevel: "DANGEROUS" | "SUSPICIOUS" | "SAFE";
  status: "VERIFIED_SCAM" | "UNDER_INVESTIGATION" | "RESOLVED";
  reportedLoss: number;
  reportCount: number;
  dateReported: string;
  summary: string;
  evidenceType: string[];
  indicators: {
    domainAge?: string;
    sslStatus: "Valid" | "Expired" | "Self-Signed" | "Untrusted";
    reportedPhoneOrEmail?: string;
    cryptoAddress?: string;
    blacklistedCount: number;
  };
  reporterAlias: string;
  verifiedByModerator: boolean;
}

export interface ScamCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  reportedCount: number;
  totalLoss: number;
  threatTrend: "+12%" | "+28%" | "-4%" | "+55%" | "+8%";
}

export const MOCK_CATEGORIES: ScamCategory[] = [
  {
    id: "cat-phishing",
    name: "Phishing & Fake Portals",
    slug: "phishing",
    description: "Fraudulent lookalike login portals designed to steal banking credentials, 2FA codes, and credentials.",
    iconName: "ShieldAlert",
    reportedCount: 4210,
    totalLoss: 1420000,
    threatTrend: "+28%",
  },
  {
    id: "cat-crypto",
    name: "Crypto & Investment Fraud",
    slug: "crypto",
    description: "High-yield ponzi schemes, fake automated trading bots, liquidity mining traps, and wallet drainers.",
    iconName: "TrendingDown",
    reportedCount: 3190,
    totalLoss: 4890000,
    threatTrend: "+55%",
  },
  {
    id: "cat-job",
    name: "Remote Job & Task Scams",
    slug: "job-fraud",
    description: "Fake recruitment, freelance review task scams requesting upfront deposits for commission payouts.",
    iconName: "Briefcase",
    reportedCount: 2840,
    totalLoss: 980000,
    threatTrend: "+12%",
  },
  {
    id: "cat-ecommerce",
    name: "Counterfeit & Ghost Stores",
    slug: "fake-stores",
    description: "Deceptive websites with steep discounts (80-90% off) collecting card details without ever shipping items.",
    iconName: "ShoppingBag",
    reportedCount: 2450,
    totalLoss: 620000,
    threatTrend: "-4%",
  },
  {
    id: "cat-impersonation",
    name: "Executive & Govt Impersonation",
    slug: "impersonation",
    description: "Scammers posing as IRS, tax officers, bank security executives, or family members in urgent distress.",
    iconName: "UserX",
    reportedCount: 1980,
    totalLoss: 1150000,
    threatTrend: "+8%",
  },
  {
    id: "cat-techsupport",
    name: "Ransom & Tech Support Scams",
    slug: "tech-support",
    description: "Browser lock popups claiming malware infection urging victims to call high-cost fake support centers.",
    iconName: "Cpu",
    reportedCount: 1650,
    totalLoss: 730000,
    threatTrend: "+12%",
  },
];

export const MOCK_SCAMS: ScamReport[] = [
  {
    id: "SCAM-9842",
    title: "Fake Chase Bank Urgent Security Alert SMS Phishing",
    targetDomainOrEntity: "chase-auth-security-update9.cc",
    category: "Phishing",
    riskScore: 98,
    riskLevel: "DANGEROUS",
    status: "VERIFIED_SCAM",
    reportedLoss: 14500,
    reportCount: 142,
    dateReported: "2026-09-21",
    summary: "Victims receive SMS notifying them of an unauthorized $950 wire with a direct link to reverse it. The landing page is a 1:1 replica of Chase online banking stealing username, password, and SMS OTP in real-time.",
    evidenceType: ["SMS Screenshot", "Phishing URL", "Harvesting Script"],
    indicators: {
      domainAge: "4 days old",
      sslStatus: "Untrusted",
      reportedPhoneOrEmail: "+1 (888) 492-3819",
      blacklistedCount: 17,
    },
    reporterAlias: "CyberWatchDog",
    verifiedByModerator: true,
  },
  {
    id: "SCAM-9839",
    title: "ApexAI Quantitative Yield Automated Arbitrage Bot",
    targetDomainOrEntity: "apex-yield-ai-finance.top",
    category: "Crypto & Investment",
    riskScore: 94,
    riskLevel: "DANGEROUS",
    status: "VERIFIED_SCAM",
    reportedLoss: 78500,
    reportCount: 89,
    dateReported: "2026-09-20",
    summary: "Promised 3.8% daily compounded returns through proprietary AI liquidity arbitrage. Withdrawals are immediately frozen after 7 days requiring a 25% 'regulatory clearance deposit'.",
    evidenceType: ["Contract Audit Failure", "Telegram Chat Logs", "Transaction Hash"],
    indicators: {
      domainAge: "18 days old",
      sslStatus: "Valid",
      cryptoAddress: "0x71C...89FaE2",
      blacklistedCount: 9,
    },
    reporterAlias: "DefiSentinel",
    verifiedByModerator: true,
  },
  {
    id: "SCAM-9831",
    title: "Telegram Hotel & YouTube Review Task Compensation",
    targetDomainOrEntity: "travel-feedback-rewards.vip",
    category: "Job & Task Fraud",
    riskScore: 91,
    riskLevel: "DANGEROUS",
    status: "VERIFIED_SCAM",
    reportedLoss: 8900,
    reportCount: 114,
    dateReported: "2026-09-19",
    summary: "Recruiters text victims offering $150-$400/day for rating hotels and leaving 5-star reviews on Google Maps. After minor initial payouts ($20), users are trapped into 'negative balance recharge' tasks.",
    evidenceType: ["WhatsApp Screenshots", "Bank Transfer Receipt"],
    indicators: {
      domainAge: "11 days old",
      sslStatus: "Untrusted",
      reportedPhoneOrEmail: "+44 7911 204918",
      blacklistedCount: 14,
    },
    reporterAlias: "AnonymousVictim_42",
    verifiedByModerator: true,
  },
  {
    id: "SCAM-9824",
    title: "Luxury Outlet Designer Handbags 85% Clearance Sale",
    targetDomainOrEntity: "prada-outlet-clearance-us.shop",
    category: "Fake E-Commerce",
    riskScore: 89,
    riskLevel: "DANGEROUS",
    status: "VERIFIED_SCAM",
    reportedLoss: 12400,
    reportCount: 67,
    dateReported: "2026-09-18",
    summary: "Facebook & Instagram sponsored ads directing buyers to an unauthorized clone site offering authentic Italian luxury bags. Credit cards are charged in foreign currency and no items are ever dispatched.",
    evidenceType: ["Ad Archive URL", "Stripe Chargeback Dispute"],
    indicators: {
      domainAge: "21 days old",
      sslStatus: "Valid",
      blacklistedCount: 11,
    },
    reporterAlias: "RetailFraudAudit",
    verifiedByModerator: true,
  },
  {
    id: "SCAM-9818",
    title: "USCIS Visa Renewal & Green Card Fee Processing Portal",
    targetDomainOrEntity: "uscis-status-renewal-gov.org",
    category: "Impersonation",
    riskScore: 99,
    riskLevel: "DANGEROUS",
    status: "VERIFIED_SCAM",
    reportedLoss: 29000,
    reportCount: 53,
    dateReported: "2026-09-17",
    summary: "Impersonates US Citizenship and Immigration Services with official seals. Demands immediate payment via Zelle or wire transfer to prevent deportation or visa cancellation.",
    evidenceType: ["Phishing Email Header", "Official Seal Abuse"],
    indicators: {
      domainAge: "6 days old",
      sslStatus: "Self-Signed",
      reportedPhoneOrEmail: "support@uscis-notice-gov.org",
      blacklistedCount: 22,
    },
    reporterAlias: "ImmigrationAlert",
    verifiedByModerator: true,
  },
  {
    id: "SCAM-9805",
    title: "Urgent Microsoft Defender Critical Threat Pop-Up",
    targetDomainOrEntity: "security-defender-scan-err084.xyz",
    category: "Tech Support",
    riskScore: 87,
    riskLevel: "DANGEROUS",
    status: "VERIFIED_SCAM",
    reportedLoss: 4500,
    reportCount: 78,
    dateReported: "2026-09-16",
    summary: "Full screen lockdown audio alarm instructing user to call toll-free line. Scammers demand remote access via AnyDesk and steal funds by transferring from online bank.",
    evidenceType: ["Audio Recording", "Payload URL"],
    indicators: {
      domainAge: "2 days old",
      sslStatus: "Untrusted",
      reportedPhoneOrEmail: "+1 (800) 241-9871",
      blacklistedCount: 29,
    },
    reporterAlias: "ShieldTeam",
    verifiedByModerator: true,
  },
];

export const MOCK_RECENT_TICKER = [
  { text: "CRITICAL: Phishing ring active targeting PayPal users via domain 'payp-account-resolve.pw'", time: "4m ago", level: "critical" },
  { text: "NEW REPORT: Crypto drainer contract 0x48...e91 active in fake Arbitrum airdrop", time: "18m ago", level: "high" },
  { text: "VERIFIED: 12 fake Temu coupon generator sites seized and blacklisted", time: "32m ago", level: "info" },
  { text: "WATCHLIST: 47 newly registered domains mimicking Wells Fargo 2FA", time: "1h ago", level: "warning" },
  { text: "COMMUNITY: Over $340,000 saved from job task scam via quick detection", time: "2h ago", level: "safe" },
];

export const MOCK_STATS = {
  totalScamsIndexed: "18,492+",
  financialLossPrevented: "$4.8M",
  activeThreatFeeds: "42",
  communityMembers: "128,500+",
  detectionAccuracy: "99.4%",
  avgScanTimeSec: "1.2s",
};

export interface InspectionResult {
  query: string;
  type: "domain" | "phone" | "crypto" | "email";
  riskScore: number; // 0 to 100
  riskLevel: "SAFE" | "SUSPICIOUS" | "DANGEROUS";
  verdict: string;
  summary: string;
  metrics: {
    label: string;
    value: string;
    status: "good" | "warning" | "danger";
  }[];
  threatFactors: string[];
  safetyChecklist: {
    check: string;
    passed: boolean;
    detail: string;
  }[];
}

export const SAMPLE_CHECKS: Record<string, InspectionResult> = {
  "google.com": {
    query: "google.com",
    type: "domain",
    riskScore: 2,
    riskLevel: "SAFE",
    verdict: "Officially Verified & Recognized Domain",
    summary: "Google LLC official domain with enterprise DNSSEC, Extended Validation SSL certificate, and clean threat feed history.",
    metrics: [
      { label: "Domain Age", value: "28+ Years", status: "good" },
      { label: "SSL Certificate", value: "Valid (Google Trust Services)", status: "good" },
      { label: "Threat Engine Flags", value: "0 / 92 Engines", status: "good" },
      { label: "Reputation Trust", value: "99 / 100", status: "good" },
    ],
    threatFactors: [],
    safetyChecklist: [
      { check: "Valid SSL & TLS 1.3 Encryption", passed: true, detail: "Legitimate enterprise security certificate." },
      { check: "Not flagged in global anti-phishing feeds", passed: true, detail: "Zero listings on Google SafeBrowsing, PhishTank, or URLhaus." },
      { check: "Established Domain History", passed: true, detail: "Registered in 1997 with continuous verifiable WHOIS ownership." },
      { check: "Valid SPF/DKIM/DMARC Email Policies", passed: true, detail: "Strict enforcement prevents spoofing." },
    ],
  },
  "chase-auth-security-update9.cc": {
    query: "chase-auth-security-update9.cc",
    type: "domain",
    riskScore: 98,
    riskLevel: "DANGEROUS",
    verdict: "Confirmed High-Risk Phishing Portal",
    summary: "Severe threat. Impersonates JPMorgan Chase & Co. login portal. Newly registered through an anonymous privacy guard with credential harvesting scripts detected.",
    metrics: [
      { label: "Domain Age", value: "4 Days", status: "danger" },
      { label: "SSL Certificate", value: "Free Let's Encrypt (Untrusted)", status: "warning" },
      { label: "Threat Engine Flags", value: "19 / 92 Engines", status: "danger" },
      { label: "Community Reports", value: "142 Complaints", status: "danger" },
    ],
    threatFactors: [
      "Brand Typosquatting / Visual Impersonation of Chase Bank",
      "Dynamic OTP / SMS Two-Factor Interceptor script",
      "Hosted on bulletproof offshore hosting provider",
      "Anonymous WHOIS registrant with fake address",
    ],
    safetyChecklist: [
      { check: "Legitimate Corporate Ownership", passed: false, detail: "Not owned or authorized by JPMorgan Chase." },
      { check: "Clean Threat Blacklist Status", passed: false, detail: "Flagged on 19 cybersecurity threat feeds." },
      { check: "Mature Domain Registration", passed: false, detail: "Registered 4 days ago on an untrusted .cc ccTLD." },
      { check: "Safe Input Field Handling", passed: false, detail: "Transfers credentials unmasked to external command server." },
    ],
  },
  "apex-yield-ai-finance.top": {
    query: "apex-yield-ai-finance.top",
    type: "domain",
    riskScore: 92,
    riskLevel: "DANGEROUS",
    verdict: "Deceptive High-Yield Ponzi Scheme",
    summary: "Fake decentralized algorithmic investment platform. Unlicensed financial offering with smart contract vulnerability and withdrawal lockout mechanisms.",
    metrics: [
      { label: "Domain Age", value: "18 Days", status: "danger" },
      { label: "Regulatory License", value: "None Found (SEC/FCA warning)", status: "danger" },
      { label: "Threat Engine Flags", value: "12 / 92 Engines", status: "danger" },
      { label: "Reported Victims", value: "89 Reports ($78.5K Loss)", status: "danger" },
    ],
    threatFactors: [
      "Unrealistic 3.8% daily compounded returns promise",
      "Associated with known illicit Ethereum wash address 0x71...FaE2",
      "Fabricated team members using AI-generated avatars",
    ],
    safetyChecklist: [
      { check: "Registered Financial Entity", passed: false, detail: "No FINRA, SEC, or FCA registration." },
      { check: "Verifiable Team & Audits", passed: false, detail: "Audit badges are static fake SVG images." },
      { check: "Safe Smart Contracts", passed: false, detail: "Source code contains owner-only withdrawal blacklist function." },
      { check: "Clean Community Record", passed: false, detail: "89 victims submitted evidence of frozen funds." },
    ],
  },
  "+1 (888) 492-3819": {
    query: "+1 (888) 492-3819",
    type: "phone",
    riskScore: 95,
    riskLevel: "DANGEROUS",
    verdict: "Known Robocall & Smishing SMS Gateway",
    summary: "Toll-free spoofed number reported in over 300 smishing campaigns sending fraudulent bank security alerts and IRS audit threats.",
    metrics: [
      { label: "Line Type", value: "VoIP (Virtual Unverified)", status: "warning" },
      { label: "Carrier", value: "Twilio / Bandwidth Reseller", status: "warning" },
      { label: "Spam Score", value: "96% High Spam Probability", status: "danger" },
      { label: "User Complaints", value: "312 Verified Reports", status: "danger" },
    ],
    threatFactors: [
      "Active sender of 'Unauthorized Zelle transfer' fraud SMS",
      "Automated robocall engine operating during off-business hours",
      "Associated with 14 active phishing domain landing pages",
    ],
    safetyChecklist: [
      { check: "Verified Business Caller ID", passed: false, detail: "Unverified anonymous VoIP caller." },
      { check: "TCPA Compliance", passed: false, detail: "Violates do-not-call registry protocols." },
      { check: "No Fraud Association", passed: false, detail: "Directly linked to Chase & Bank of America smishing." },
      { check: "Reputable Telephony Carrier", passed: false, detail: "Uses prepaid disposable virtual routing." },
    ],
  },
};

export interface ModerationQueueItem {
  id: string;
  submittedAt: string;
  submitterName: string;
  target: string;
  category: string;
  lossClaimed: number;
  evidenceFilesCount: number;
  autoRiskScore: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export const MOCK_MODERATION_QUEUE: ModerationQueueItem[] = [
  {
    id: "SUB-1082",
    submittedAt: "10 mins ago",
    submitterName: "alex_security_99",
    target: "metamask-web3-sync-vault.io",
    category: "Crypto & Investment",
    lossClaimed: 5400,
    evidenceFilesCount: 3,
    autoRiskScore: 97,
    status: "PENDING",
  },
  {
    id: "SUB-1081",
    submittedAt: "34 mins ago",
    submitterName: "Anonymous",
    target: "amazon-prime-refund-desk.co",
    category: "Phishing",
    lossClaimed: 890,
    evidenceFilesCount: 2,
    autoRiskScore: 92,
    status: "PENDING",
  },
  {
    id: "SUB-1080",
    submittedAt: "1 hour ago",
    submitterName: "jordan_k",
    target: "fedex-parcel-delivery-redelivery.info",
    category: "Phishing",
    lossClaimed: 0,
    evidenceFilesCount: 1,
    autoRiskScore: 89,
    status: "PENDING",
  },
  {
    id: "SUB-1079",
    submittedAt: "2 hours ago",
    submitterName: "ElenaV",
    target: "nike-clearance-outlet-us.store",
    category: "Fake E-Commerce",
    lossClaimed: 320,
    evidenceFilesCount: 4,
    autoRiskScore: 86,
    status: "PENDING",
  },
  {
    id: "SUB-1078",
    submittedAt: "3 hours ago",
    submitterName: "crypto_hunter",
    target: "binance-p2p-arbitrage-academy.club",
    category: "Crypto & Investment",
    lossClaimed: 18000,
    evidenceFilesCount: 5,
    autoRiskScore: 95,
    status: "PENDING",
  },
];
