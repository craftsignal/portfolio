const GRANT = "tians-site-access-v1";

const encoder = new TextEncoder();

function bufferToHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAuthToken(secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(GRANT));
  return bufferToHex(sig);
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

export async function verifyAuthToken(
  token: string | undefined,
  secret: string | undefined,
): Promise<boolean> {
  if (!token || !secret) return false;
  const expected = await createAuthToken(secret);
  return timingSafeEqualHex(token, expected);
}
