/**
 * ScamLens Encrypted Database Configuration Module
 * 
 * Provides secure, decrypted access to database settings across the entire application.
 * Database credentials are encrypted with military-grade AES-256-GCM and stored in 
 * `dbConfig.encrypted.json`.
 */

import { decryptPayload, encryptPayload, EncryptedPackage, DEFAULT_SECRET } from "@/lib/crypto";
import rawEncryptedConfig from "./dbConfig.encrypted.json";

export interface DatabaseConfig {
  provider: "mysql" | "postgres";
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
  connectionLimit: number;
  url: string;
}

// In-memory cache for decrypted configuration to prevent repeated crypto operations
let cachedDbConfig: DatabaseConfig | null = null;

/**
 * Decrypts and retrieves the active Database Configuration for the whole application.
 * Environment variables (DATABASE_URL, DB_HOST, DB_USER, etc.) can optionally override
 * individual properties for flexible staging/CI deployments.
 */
export async function getDatabaseConfig(): Promise<DatabaseConfig> {
  if (cachedDbConfig) {
    return cachedDbConfig;
  }

  try {
    const secret =
      (typeof process !== "undefined" && process.env?.SCAMLENS_ENCRYPTION_SECRET) ||
      DEFAULT_SECRET;

    // Decrypt the encrypted configuration file
    const decryptedJsonStr = await decryptPayload(
      rawEncryptedConfig as unknown as EncryptedPackage,
      secret
    );

    const decryptedConfig: DatabaseConfig = JSON.parse(decryptedJsonStr);

    // Merge with any optional runtime environment variable overrides
    const config: DatabaseConfig = {
      provider: (process.env.DB_PROVIDER as "mysql" | "postgres") || decryptedConfig.provider || "mysql",
      host: process.env.DB_HOST || decryptedConfig.host,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : decryptedConfig.port,
      database: process.env.DB_NAME || decryptedConfig.database,
      user: process.env.DB_USER || decryptedConfig.user,
      password: process.env.DB_PASSWORD || decryptedConfig.password,
      ssl: process.env.DB_SSL ? process.env.DB_SSL === "true" : decryptedConfig.ssl,
      connectionLimit: process.env.DB_CONNECTION_LIMIT
        ? parseInt(process.env.DB_CONNECTION_LIMIT, 10)
        : decryptedConfig.connectionLimit,
      url: process.env.DATABASE_URL || decryptedConfig.url,
    };

    cachedDbConfig = config;
    return config;
  } catch (error) {
    console.error("❌ Failed to decrypt database configuration:", error);
    throw new Error(
      "Unable to decrypt database configuration. Please verify SCAMLENS_ENCRYPTION_SECRET."
    );
  }
}

/**
 * Returns the ready-to-use database connection URL for Prisma, mysql2, or pg pools.
 */
export async function getDatabaseUrl(): Promise<string> {
  const config = await getDatabaseConfig();
  return config.url;
}

/**
 * Checks if database credentials have been configured.
 */
export async function isDatabaseConfigured(): Promise<boolean> {
  try {
    const config = await getDatabaseConfig();
    return Boolean(config.host && config.database && config.user);
  } catch {
    return false;
  }
}

/**
 * Clears the in-memory cache (useful for testing or after updating credentials).
 */
export function invalidateDbConfigCache(): void {
  cachedDbConfig = null;
}

/**
 * Programmatically encrypts and returns a new encrypted database configuration package.
 */
export async function encryptDatabaseConfig(
  config: DatabaseConfig,
  secretKey: string = DEFAULT_SECRET
): Promise<EncryptedPackage> {
  const pkg = await encryptPayload(config, secretKey);
  return pkg;
}
