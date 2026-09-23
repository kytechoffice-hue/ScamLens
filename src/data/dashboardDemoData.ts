/**
 * ScamLens - India Cyber Threat Intelligence Demo Data
 * Reusable data structure and sample intelligence feeds.
 * NOTE: Demonstrative cyber intelligence data. Not affiliated with government law enforcement agencies.
 */

export interface DashboardKPI {
  id: string;
  title: string;
  value: string;
  rawNumber: number;
  trendPercentage: number;
  isIncrease: boolean;
  comparisonText: string;
  statusText: string;
  accentColor: "cyan" | "rose" | "amber" | "blue" | "purple" | "emerald";
}

export const DASHBOARD_KPIS: DashboardKPI[] = [
  {
    id: "total_threats",
    title: "TOTAL THREATS",
    value: "18,492+",
    rawNumber: 18492,
    trendPercentage: 15.8,
    isIncrease: true,
    comparisonText: "vs last 7 days",
    statusText: "Active Tracking",
    accentColor: "cyan",
  },
  {
    id: "active_threats",
    title: "ACTIVE THREATS",
    value: "2,847",
    rawNumber: 2847,
    trendPercentage: 12.4,
    isIncrease: true,
    comparisonText: "vs last 7 days",
    statusText: "Requires Attention",
    accentColor: "rose",
  },
  {
    id: "scams_reported",
    title: "SCAMS REPORTED",
    value: "12,638",
    rawNumber: 12638,
    trendPercentage: 8.1,
    isIncrease: true,
    comparisonText: "vs last 7 days",
    statusText: "Citizen Reports",
    accentColor: "amber",
  },
  {
    id: "domains_flagged",
    title: "DOMAINS FLAGGED",
    value: "8,421",
    rawNumber: 8421,
    trendPercentage: 14.2,
    isIncrease: true,
    comparisonText: "vs last 7 days",
    statusText: "Blacklisted URLs",
    accentColor: "blue",
  },
  {
    id: "phones_flagged",
    title: "PHONE NUMBERS FLAGGED",
    value: "4,732",
    rawNumber: 4732,
    trendPercentage: 9.6,
    isIncrease: true,
    comparisonText: "vs last 7 days",
    statusText: "Spam & Smishing",
    accentColor: "purple",
  },
  {
    id: "upi_fraud_reports",
    title: "UPI FRAUD REPORTS",
    value: "3,218",
    rawNumber: 3218,
    trendPercentage: 24.3,
    isIncrease: true,
    comparisonText: "vs last 7 days",
    statusText: "Surging Vector",
    accentColor: "rose",
  },
];

export interface StateThreatData {
  id: string;
  state: string;
  code: string;
  activeThreats: number;
  reportedScams: number;
  topCategory: string;
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  trendPercentage: number;
  x: number; // Percentage coordinate for SVG map pin
  y: number; // Percentage coordinate for SVG map pin
}

export const INDIA_STATE_THREATS: StateThreatData[] = [
  {
    id: "MH",
    state: "Maharashtra",
    code: "MH",
    activeThreats: 842,
    reportedScams: 2480,
    topCategory: "UPI & Payment Fraud",
    riskLevel: "Critical",
    trendPercentage: 18.2,
    x: 32,
    y: 56,
  },
  {
    id: "DL",
    state: "Delhi NCR",
    code: "DL",
    activeThreats: 694,
    reportedScams: 1940,
    topCategory: "Digital Arrest & Police Extortion",
    riskLevel: "Critical",
    trendPercentage: 21.5,
    x: 34,
    y: 29,
  },
  {
    id: "KA",
    state: "Karnataka",
    code: "KA",
    activeThreats: 582,
    reportedScams: 1720,
    topCategory: "Telegram Job & Task Scams",
    riskLevel: "Critical",
    trendPercentage: 14.8,
    x: 35,
    y: 72,
  },
  {
    id: "TS",
    state: "Telangana",
    code: "TS",
    activeThreats: 412,
    reportedScams: 1250,
    topCategory: "Investment & Fake Crypto Trading",
    riskLevel: "High",
    trendPercentage: 11.2,
    x: 42,
    y: 60,
  },
  {
    id: "TN",
    state: "Tamil Nadu",
    code: "TN",
    activeThreats: 388,
    reportedScams: 1180,
    topCategory: "Courier / Customs Parcel Scam",
    riskLevel: "High",
    trendPercentage: 8.9,
    x: 40,
    y: 84,
  },
  {
    id: "GJ",
    state: "Gujarat",
    code: "GJ",
    activeThreats: 345,
    reportedScams: 980,
    topCategory: "Fake Share Market & IPO Allotment",
    riskLevel: "High",
    trendPercentage: 16.4,
    x: 20,
    y: 48,
  },
  {
    id: "UP",
    state: "Uttar Pradesh",
    code: "UP",
    activeThreats: 480,
    reportedScams: 1420,
    topCategory: "Bank / KYC Update Phishing",
    riskLevel: "Critical",
    trendPercentage: 19.3,
    x: 48,
    y: 35,
  },
  {
    id: "WB",
    state: "West Bengal",
    code: "WB",
    activeThreats: 295,
    reportedScams: 840,
    topCategory: "Fake Loan Apps & Extortion",
    riskLevel: "High",
    trendPercentage: 7.5,
    x: 72,
    y: 46,
  },
  {
    id: "RJ",
    state: "Rajasthan",
    code: "RJ",
    activeThreats: 260,
    reportedScams: 790,
    topCategory: "OLX / Armed Forces Impersonation",
    riskLevel: "Medium",
    trendPercentage: 6.2,
    x: 24,
    y: 35,
  },
  {
    id: "KL",
    state: "Kerala",
    code: "KL",
    activeThreats: 184,
    reportedScams: 520,
    topCategory: "Fake Work Visa & Overseas Jobs",
    riskLevel: "Medium",
    trendPercentage: 4.8,
    x: 35,
    y: 89,
  },
  {
    id: "AP",
    state: "Andhra Pradesh",
    code: "AP",
    activeThreats: 228,
    reportedScams: 680,
    topCategory: "Micro-Loan Apps Harassment",
    riskLevel: "Medium",
    trendPercentage: 9.1,
    x: 45,
    y: 68,
  },
  {
    id: "MP",
    state: "Madhya Pradesh",
    code: "MP",
    activeThreats: 210,
    reportedScams: 640,
    topCategory: "Electricity Bill Suspension Scam",
    riskLevel: "Medium",
    trendPercentage: 5.7,
    x: 39,
    y: 46,
  },
  {
    id: "PB",
    state: "Punjab",
    code: "PB",
    activeThreats: 145,
    reportedScams: 410,
    topCategory: "Canada Immigration & Fake Visa",
    riskLevel: "Medium",
    trendPercentage: 3.4,
    x: 30,
    y: 22,
  },
  {
    id: "HR",
    state: "Haryana",
    code: "HR",
    activeThreats: 198,
    reportedScams: 580,
    topCategory: "Call Center Tech Support Scam",
    riskLevel: "High",
    trendPercentage: 12.0,
    x: 32,
    y: 27,
  },
  {
    id: "BR",
    state: "Bihar",
    code: "BR",
    activeThreats: 240,
    reportedScams: 710,
    topCategory: "SIM Swap & Aadhaar ATM Cloning",
    riskLevel: "High",
    trendPercentage: 15.2,
    x: 62,
    y: 38,
  },
  {
    id: "OD",
    state: "Odisha",
    code: "OD",
    activeThreats: 120,
    reportedScams: 360,
    topCategory: "Phishing Rewards & Lottery",
    riskLevel: "Low",
    trendPercentage: 2.1,
    x: 62,
    y: 54,
  },
];

export interface LiveThreatItem {
  id: string;
  time: string;
  threatType: string;
  description: string;
  target: string;
  location: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "Under Review" | "Confirmed Fraud" | "Escalated" | "Mitigated";
}

export const LIVE_INDIA_THREAT_FEED: LiveThreatItem[] = [
  {
    id: "TH-8491",
    time: "14:32",
    threatType: "UPI / Payment Fraud",
    description: "Suspicious UPI autopay collect request ₹24,999 masquerading as electricity bill refund",
    target: "paytm-refund-desk@ybl",
    location: "Mumbai, Maharashtra",
    severity: "HIGH",
    status: "Confirmed Fraud",
  },
  {
    id: "TH-8490",
    time: "14:28",
    threatType: "Phishing & Fake Banking",
    description: "Fake SBI Yono pan-card verification domain deployed on fast-flux bulletproof DNS",
    target: "sbi-pan-kyc-verify-portal[.]top",
    location: "Pune, Maharashtra",
    severity: "CRITICAL",
    status: "Under Review",
  },
  {
    id: "TH-8489",
    time: "14:24",
    threatType: "Job Scam / Recharge Trap",
    description: "Telegram YouTube video-like task funneling victims into frozen recharge wallet",
    target: "t.me/Global_AdTask_Official",
    location: "Bengaluru, Karnataka",
    severity: "HIGH",
    status: "Confirmed Fraud",
  },
  {
    id: "TH-8488",
    time: "14:19",
    threatType: "Investment & Trading",
    description: "Fabricated SEBI-registered institutional IPO trading web app locking deposits",
    target: "goldman-sachs-india-vip[.]cc",
    location: "Delhi NCR",
    severity: "CRITICAL",
    status: "Escalated",
  },
  {
    id: "TH-8487",
    time: "14:15",
    threatType: "Courier / Parcel Scam",
    description: "Fake FedEx/India Post SMS claiming illegal contraband detained by customs",
    target: "+91-98210-XXXXX",
    location: "Hyderabad, Telangana",
    severity: "MEDIUM",
    status: "Confirmed Fraud",
  },
  {
    id: "TH-8486",
    time: "14:08",
    threatType: "Digital Arrest Threat",
    description: "Video call impersonator posing as CBI Mumbai Cyber Crime Unit demanding clearance fee",
    target: "+91-88402-XXXXX",
    location: "Noida, Uttar Pradesh",
    severity: "CRITICAL",
    status: "Under Review",
  },
  {
    id: "TH-8485",
    time: "14:02",
    threatType: "Loan App Extortion",
    description: "Malicious APK file requesting full contact and gallery read permissions for micro-loan",
    target: "QuickCash-Instant-Rupee.apk",
    location: "Ahmedabad, Gujarat",
    severity: "HIGH",
    status: "Confirmed Fraud",
  },
  {
    id: "TH-8484",
    time: "13:54",
    threatType: "QR Code Tampering",
    description: "Replaced merchant QR code initiating reverse debit instead of receiving payment",
    target: "qr.bharatpe-merchant.in[.]vip",
    location: "Kolkata, West Bengal",
    severity: "MEDIUM",
    status: "Mitigated",
  },
  {
    id: "TH-8483",
    time: "13:47",
    threatType: "SIM Swap / OTP Hijack",
    description: "Telecommunication e-SIM upgrade pretexting targeting high-net-worth banking customers",
    target: "+91-93114-XXXXX",
    location: "Jaipur, Rajasthan",
    severity: "CRITICAL",
    status: "Escalated",
  },
  {
    id: "TH-8482",
    time: "13:41",
    threatType: "Online Shopping Fraud",
    description: "Ghost e-commerce website advertising 85% discount on iPhone 16 with pre-paid UPI only",
    target: "croma-mega-sale-online[.]shop",
    location: "Chennai, Tamil Nadu",
    severity: "LOW",
    status: "Mitigated",
  },
];

export interface ScamCategorySummary {
  id: string;
  name: string;
  incidentsCount: number;
  trendPercentage: number;
  riskLevel: "CRITICAL RISK" | "HIGH RISK" | "MEDIUM RISK";
  description: string;
  primaryVector: string;
  badgeColor: string;
}

export const TOP_INDIAN_SCAM_CATEGORIES: ScamCategorySummary[] = [
  {
    id: "cat_upi",
    name: "UPI & Payment Fraud",
    incidentsCount: 3218,
    trendPercentage: 24.3,
    riskLevel: "CRITICAL RISK",
    description: "Collect request deception, fake UPI PIN entry prompts, reverse payment scams, and tampered QR codes.",
    primaryVector: "Payment Apps & WhatsApp",
    badgeColor: "rose",
  },
  {
    id: "cat_phish",
    name: "Phishing & Fake Websites",
    incidentsCount: 2640,
    trendPercentage: 17.5,
    riskLevel: "CRITICAL RISK",
    description: "Cloned net-banking interfaces (SBI, HDFC, ICICI), tax refund portals, and utility bill suspension lures.",
    primaryVector: "SMS / Fast-Flux Domains",
    badgeColor: "rose",
  },
  {
    id: "cat_kyc",
    name: "Bank / KYC Scams",
    incidentsCount: 2180,
    trendPercentage: 19.8,
    riskLevel: "CRITICAL RISK",
    description: "'Your account will be blocked tonight' SMS warnings redirecting to malicious APKs or harvesting credentials.",
    primaryVector: "SMS / Smishing Blasts",
    badgeColor: "rose",
  },
  {
    id: "cat_digital_arrest",
    name: "Government / Digital Arrest",
    incidentsCount: 1540,
    trendPercentage: 38.6,
    riskLevel: "CRITICAL RISK",
    description: "Impersonators dressed in police uniforms via Skype/WhatsApp asserting fake money laundering arrest warrants.",
    primaryVector: "Video Calls & Fake Warrants",
    badgeColor: "rose",
  },
  {
    id: "cat_job",
    name: "Job & Task Scams",
    incidentsCount: 1920,
    trendPercentage: 14.2,
    riskLevel: "HIGH RISK",
    description: "'Like YouTube videos for ₹5,000/day' schemes that trap participants in high-deposit VIP recharge cycles.",
    primaryVector: "Telegram & WhatsApp Groups",
    badgeColor: "amber",
  },
  {
    id: "cat_invest",
    name: "Investment & Trading Scams",
    incidentsCount: 1780,
    trendPercentage: 22.1,
    riskLevel: "HIGH RISK",
    description: "Bogus stock market tips groups, simulated trading apps, and fake crypto algorithms guaranteeing 30% monthly ROI.",
    primaryVector: "Facebook/Instagram Ads & DApps",
    badgeColor: "amber",
  },
  {
    id: "cat_courier",
    name: "Courier / Parcel Scams",
    incidentsCount: 1430,
    trendPercentage: 11.4,
    riskLevel: "HIGH RISK",
    description: "Claims that a package sent in your name contains narcotics or foreign currency, requiring a clearance fee.",
    primaryVector: "IVR Calls & Smishing",
    badgeColor: "amber",
  },
  {
    id: "cat_loan",
    name: "Illegal Loan App Scams",
    incidentsCount: 1210,
    trendPercentage: 8.6,
    riskLevel: "HIGH RISK",
    description: "Unregulated instant loan apps that extract entire phone books and blackmail users with morphed imagery.",
    primaryVector: "Sideloaded Android APKs",
    badgeColor: "amber",
  },
  {
    id: "cat_sim",
    name: "OTP / SIM Swap Fraud",
    incidentsCount: 890,
    trendPercentage: 16.0,
    riskLevel: "HIGH RISK",
    description: "Fraudsters convince service providers to swap victim phone numbers to intercept two-factor SMS OTPs.",
    primaryVector: "Telecom Pretexting",
    badgeColor: "amber",
  },
  {
    id: "cat_shopping",
    name: "Online Shopping Fraud",
    incidentsCount: 1140,
    trendPercentage: 6.9,
    riskLevel: "MEDIUM RISK",
    description: "Temporary e-commerce stores promoting luxury electronics or festival clothing at impossible prices.",
    primaryVector: "Social Media Sponsored Ads",
    badgeColor: "cyan",
  },
  {
    id: "cat_social",
    name: "Social Media Takeover",
    incidentsCount: 780,
    trendPercentage: 13.5,
    riskLevel: "MEDIUM RISK",
    description: "Compromised Instagram and WhatsApp accounts messaging contacts requesting emergency medical funds.",
    primaryVector: "Phishing / Session Hijack",
    badgeColor: "cyan",
  },
  {
    id: "cat_tech",
    name: "Tech Support Scams",
    incidentsCount: 620,
    trendPercentage: 4.2,
    riskLevel: "MEDIUM RISK",
    description: "Browser lock screens claiming Windows infection, requesting AnyDesk/TeamViewer remote access installation.",
    primaryVector: "Malvertising Popups",
    badgeColor: "cyan",
  },
];

export const THREAT_ANALYTICS_DATA = {
  last7Days: [
    { day: "Wed", date: "Sep 17", threatsDetected: 1420, scamsReported: 980, resolved: 810 },
    { day: "Thu", date: "Sep 18", threatsDetected: 1680, scamsReported: 1120, resolved: 950 },
    { day: "Fri", date: "Sep 19", threatsDetected: 1950, scamsReported: 1340, resolved: 1100 },
    { day: "Sat", date: "Sep 20", threatsDetected: 2240, scamsReported: 1560, resolved: 1290 },
    { day: "Sun", date: "Sep 21", threatsDetected: 2110, scamsReported: 1480, resolved: 1210 },
    { day: "Mon", date: "Sep 22", threatsDetected: 2630, scamsReported: 1820, resolved: 1540 },
    { day: "Tue", date: "Sep 23", threatsDetected: 2847, scamsReported: 1940, resolved: 1680 },
  ],
  last30DaysTrend: [
    { period: "Week 1", reports: 2410, lossReportedLakhs: 410 },
    { period: "Week 2", reports: 2890, lossReportedLakhs: 560 },
    { period: "Week 3", reports: 3420, lossReportedLakhs: 690 },
    { period: "Week 4", reports: 3918, lossReportedLakhs: 820 },
  ],
  categoryShare: [
    { name: "UPI & Banking", percentage: 34, color: "#ef4444" },
    { name: "Phishing Portals", percentage: 22, color: "#f59e0b" },
    { name: "Job & Task", percentage: 16, color: "#3b82f6" },
    { name: "Investment / Trading", percentage: 14, color: "#a855f7" },
    { name: "Digital Arrest", percentage: 8, color: "#ec4899" },
    { name: "Others (Couriers, Loan)", percentage: 6, color: "#06b6d4" },
  ],
  severityBreakdown: {
    critical: { count: 911, percentage: 32, label: "Critical", desc: "Active financial drain / Credential exfiltration" },
    high: { count: 1252, percentage: 44, label: "High", desc: "Verified impersonation / Malicious APK payload" },
    medium: { count: 512, percentage: 18, label: "Medium", desc: "Suspicious infrastructure / Spam campaigns" },
    low: { count: 172, percentage: 6, label: "Low", desc: "Unverified lead / Low confidence signal" },
  },
};

export interface RecentThreatRecord {
  threatId: string;
  type: string;
  target: string;
  location: string;
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  reportedAgo: string;
  status: "Under Review" | "Confirmed Fraud" | "Escalated" | "Mitigated";
  categorySlug: string;
}

export const RECENT_FLAGGED_THREATS: RecentThreatRecord[] = [
  {
    threatId: "SCM-10291",
    type: "UPI Fraud",
    target: "suspicious-upi-pay[.]com",
    location: "Mumbai, MH",
    riskLevel: "Critical",
    reportedAgo: "4 min ago",
    status: "Under Review",
    categorySlug: "upi",
  },
  {
    threatId: "SCM-10290",
    type: "Digital Arrest",
    target: "+91-99411-XXXXX (CBI Impersonator)",
    location: "New Delhi, DL",
    riskLevel: "Critical",
    reportedAgo: "9 min ago",
    status: "Escalated",
    categorySlug: "digital-arrest",
  },
  {
    threatId: "SCM-10289",
    type: "Bank KYC Phishing",
    target: "hdfc-netbanking-kyc-update[.]live",
    location: "Pune, MH",
    riskLevel: "Critical",
    reportedAgo: "14 min ago",
    status: "Confirmed Fraud",
    categorySlug: "phishing",
  },
  {
    threatId: "SCM-10288",
    type: "Telegram Job Task",
    target: "youtube-task-reward[.]xyz",
    location: "Bengaluru, KA",
    riskLevel: "High",
    reportedAgo: "22 min ago",
    status: "Confirmed Fraud",
    categorySlug: "job",
  },
  {
    threatId: "SCM-10287",
    type: "Customs Courier Scam",
    target: "+91-88123-XXXXX (FedEx SMS)",
    location: "Hyderabad, TS",
    riskLevel: "High",
    reportedAgo: "35 min ago",
    status: "Under Review",
    categorySlug: "courier",
  },
  {
    threatId: "SCM-10286",
    type: "Fake Stock Trading",
    target: "zerodha-pro-terminal[.]vip",
    location: "Ahmedabad, GJ",
    riskLevel: "Critical",
    reportedAgo: "48 min ago",
    status: "Escalated",
    categorySlug: "invest",
  },
  {
    threatId: "SCM-10285",
    type: "Loan App APK",
    target: "FastCash-Approval-v2.apk",
    location: "Lucknow, UP",
    riskLevel: "High",
    reportedAgo: "1 hour ago",
    status: "Confirmed Fraud",
    categorySlug: "loan",
  },
  {
    threatId: "SCM-10284",
    type: "Electricity Bill SMS",
    target: "+91-76290-XXXXX",
    location: "Bhopal, MP",
    riskLevel: "Medium",
    reportedAgo: "1.5 hours ago",
    status: "Mitigated",
    categorySlug: "phishing",
  },
];
