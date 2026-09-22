/**
 * ScamLens Global Application Configuration
 * Controls environment parameters for Development and Production.
 */

export interface AppConfig {
  environment: "development" | "production";
  appName: string;
  tagline: string;
  version: string;
  apiBaseUrl: string;
  isMockDataEnabled: boolean;
  minification: {
    enabled: boolean;
    compressResponse: boolean;
    removeDebugLogs: boolean;
  };
  encryption: {
    algorithm: "AES-GCM-256";
    keyDerivation: "SHA-256";
    autoEncryptSensitiveFields: boolean;
  };
  security: {
    maxScanQueriesPerMinute: number;
    cspStrict: boolean;
    hostingerWafActive: boolean;
  };
  database: {
    provider: "MySQL on Hostinger (Prisma)";
    readinessStatus: "Pending DB Credentials";
  };
}

const isProd = process.env.NODE_ENV === "production";

export const APP_CONFIG: AppConfig = {
  environment: isProd ? "production" : "development",
  appName: "ScamLens",
  tagline: "See it. Report it. Stop it.",
  version: "1.0.0",
  apiBaseUrl: isProd ? "https://scamlens.com/api" : "http://localhost:3000/api",
  isMockDataEnabled: true, // Switched to false when Hostinger MySQL is wired
  minification: {
    enabled: isProd,
    compressResponse: true,
    removeDebugLogs: isProd,
  },
  encryption: {
    algorithm: "AES-GCM-256",
    keyDerivation: "SHA-256",
    autoEncryptSensitiveFields: true,
  },
  security: {
    maxScanQueriesPerMinute: isProd ? 30 : 120,
    cspStrict: isProd,
    hostingerWafActive: isProd,
  },
  database: {
    provider: "MySQL on Hostinger (Prisma)",
    readinessStatus: "Pending DB Credentials",
  },
};
