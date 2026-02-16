import { notFound, redirect } from "next/navigation";
import { EncryptJWT } from "jose";
import getShortUrlModel, { ShortUrl } from "@shared/lib/db/models/ShortUrl";

const secretKey = new TextEncoder().encode(process.env.URL_SHORTENER_TOKEN);

// Function to encrypt data and generate a URL-safe token
async function encryptAndRedirect(data: {
  longUrl: ShortUrl["longUrl"];
  adsLabel: ShortUrl["adsLabel"];
}) {
  const encrypted = await new EncryptJWT(data)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(secretKey);

  // Convert to Base64URL encoding (already safe for URLs)
  const token = Buffer.from(encrypted).toString("base64url");

  // console.log("Encrypted Token:", token);

  // Redirect to tools.anix7.in
  redirect(`${process.env.WHERE_TO_REDIRECT_AFTER_PROCESSING}/${token}`);
}

export default async function Page({ params }: { params: Promise<{ shortCode: string }> }) {
  const alias = (await params).shortCode;

  const ShortUrl = await getShortUrlModel();
  const doc = await ShortUrl.findOne({ alias }).lean();

  if (!doc) {
    return notFound();
  }

  if (doc.adsLabel === 0) {
    return redirect(doc.longUrl);
  } else {
    await encryptAndRedirect({
      longUrl: doc.longUrl,
      adsLabel: doc.adsLabel,
    });
  }

  return <div>Redirecting...</div>;
}
