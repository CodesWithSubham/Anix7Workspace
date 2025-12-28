import crypto from "crypto";

const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET;

if (!DOWNLOAD_SECRET) {
  throw new Error("DOWNLOAD_SECRET is not defined");
}

const SECRET_KEY = crypto.createHash("sha256").update(DOWNLOAD_SECRET).digest(); // 32 bytes

function base64UrlEncode(buffer: Buffer<ArrayBuffer>) {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function createDownloadToken(data: {
  u: string;
  w: number;
  h: number;
  t: string;
  exp?: number;
}) {
  const iv = crypto.randomBytes(12);

  const payload = JSON.stringify({
    ...data,
    exp: data.exp || Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 day expiry
  });

  const cipher = crypto.createCipheriv("aes-256-gcm", SECRET_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(payload, "utf8"), cipher.final()]);

  const tag = cipher.getAuthTag();

  const token = Buffer.concat([iv, tag, encrypted]);

  return base64UrlEncode(token);
}
