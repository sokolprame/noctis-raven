import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "admin-auth";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24;

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD;
}

export function validateAdminPassword(password: string) {
  const expected = getAdminPassword();
  if (!expected || !password) return false;

  const expectedBuffer = Buffer.from(expected, "utf8");
  const passwordBuffer = Buffer.from(password, "utf8");
  return expectedBuffer.length === passwordBuffer.length && timingSafeEqual(expectedBuffer, passwordBuffer);
}

export function createAdminSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) return null;

  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS;
  const signature = createHmac("sha256", secret).update(`admin:${expiresAt}`).digest("base64url");
  return `${expiresAt}.${signature}`;
}

export function isValidAdminSessionToken(token?: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32 || !token) return false;

  const [expiryText, signature, extra] = token.split(".");
  const expiresAt = Number(expiryText);
  if (extra !== undefined || !Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000) || !signature) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(`admin:${expiresAt}`).digest();
  let received: Buffer;
  try {
    received = Buffer.from(signature, "base64url");
  } catch {
    return false;
  }

  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isValidAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}
