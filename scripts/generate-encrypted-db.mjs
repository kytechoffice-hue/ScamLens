import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Derive a 256-bit CryptoKey using SHA-256
async function deriveKey(passphrase) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.digest("SHA-256", enc.encode(passphrase));
  return crypto.subtle.importKey(
    "raw",
    keyMaterial,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt payload with AES-256-GCM
async function encryptPayload(payload, secretKey) {
  const text = typeof payload === "string" ? payload : JSON.stringify(payload);
  const enc = new TextEncoder();
  const data = enc.encode(text);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(secretKey);

  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  const ivBase64 = arrayBufferToBase64(iv.buffer);
  const ciphertextBase64 = arrayBufferToBase64(ciphertextBuffer);

  return {
    algorithm: "AES-GCM-256",
    iv: ivBase64,
    ciphertext: ciphertextBase64,
    timestamp: Date.now(),
    compressedSize: ciphertextBase64.length,
  };
}

async function decryptPayload(pkg, secretKey) {
  const iv = new Uint8Array(base64ToArrayBuffer(pkg.iv));
  const ciphertextBuffer = base64ToArrayBuffer(pkg.ciphertext);
  const key = await deriveKey(secretKey);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertextBuffer
  );

  const dec = new TextDecoder();
  return dec.decode(decryptedBuffer);
}

const SECRET_KEY = process.env.SCAMLENS_ENCRYPTION_SECRET || "ScamLens_Global_Secure_Key_2026_ProdDev";

// Default Database Settings (MySQL on Hostinger)
const dbConfigData = {
  provider: "mysql",
  host: process.env.DB_HOST || "srv1428.hstgr.io",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  database: process.env.DB_NAME || "u123456789_scamlens",
  user: process.env.DB_USER || "u123456789_admin",
  password: process.env.DB_PASSWORD || "ScamLens_Secure_DB_Pass!2026",
  ssl: true,
  connectionLimit: 10,
  url: process.env.DATABASE_URL || "mysql://u123456789_admin:ScamLens_Secure_DB_Pass!2026@srv1428.hstgr.io:3306/u123456789_scamlens"
};

async function run() {
  console.log("🔒 Encrypting database configuration...");
  const encrypted = await encryptPayload(dbConfigData, SECRET_KEY);

  const targetPath = path.resolve(__dirname, "../src/config/dbConfig.encrypted.json");
  fs.writeFileSync(targetPath, JSON.stringify(encrypted, null, 2), "utf-8");
  console.log("✅ Encrypted DB configuration generated at:", targetPath);

  // Self-test verification
  const testDecrypted = await decryptPayload(encrypted, SECRET_KEY);
  const parsed = JSON.parse(testDecrypted);
  console.log("🔍 Decryption verification passed for database:", parsed.database, "on host:", parsed.host);
}

run().catch((err) => {
  console.error("❌ Error generating encrypted DB configuration:", err);
  process.exit(1);
});
