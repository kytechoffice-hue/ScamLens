/**
 * Global Web Crypto API AES-256-GCM Encryption & Decryption Utility
 * Provides military-grade, minified, zero-dependency encryption for scam evidence & reports.
 */

export interface EncryptedPackage {
  algorithm: "AES-GCM-256";
  iv: string;
  ciphertext: string;
  timestamp: number;
  compressedSize: number;
}

// Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Derive a 256-bit CryptoKey from a passphrase using SHA-256
async function deriveKey(passphrase: string): Promise<CryptoKey> {
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

const DEFAULT_SECRET = "ScamLens_Global_Secure_Key_2026_ProdDev";

/**
 * Encrypt any plaintext string or JSON payload using AES-256-GCM
 */
export async function encryptPayload(
  payload: string | Record<string, any>,
  secretKey: string = DEFAULT_SECRET
): Promise<EncryptedPackage> {
  const text = typeof payload === "string" ? payload : JSON.stringify(payload);
  const enc = new TextEncoder();
  const data = enc.encode(text);

  // Generate 12-byte random IV
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

/**
 * Decrypt an AES-256-GCM encrypted package back into original plaintext
 */
export async function decryptPayload(
  pkg: EncryptedPackage,
  secretKey: string = DEFAULT_SECRET
): Promise<string> {
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
