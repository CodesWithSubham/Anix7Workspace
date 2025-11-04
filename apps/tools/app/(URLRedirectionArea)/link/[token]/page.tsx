import { errors, jwtDecrypt } from "jose";
import RedirectWithDelay from "./RedirectWithDelay";
import Error from "@shared/components/errors/Error";
import { notFound } from "next/navigation";

const secretKey = new TextEncoder().encode(process.env.URL_SHORTENER_TOKEN);

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  // Await params before using its properties, then extract the token
  const { token } = await params;
  try {

    // Decode the token from Base64URL back to the original JWE string
    const decodedToken = Buffer.from(token, "base64url").toString("utf8");

    // Decrypt the token using the secret key
    const { payload } = await jwtDecrypt(decodedToken, secretKey);

    const longUrl = payload?.longUrl;
    const adsLabel = payload?.adsLabel;

    // If payload contains a valid longUrl, redirect to it
    if (typeof longUrl === "string" || typeof longUrl === "number") {
      return (
        <RedirectWithDelay
          longUrl={String(longUrl)} // ensure it's a string for URL usage
          adsLabel={adsLabel ? Number(adsLabel) : undefined}
        />
      );
    } else {
      return notFound();
    }
  } catch (error) {
    console.error("Error during decryption:", error);
    if (error instanceof errors.JWEDecryptionFailed) {
      return notFound();
    }
    return <Error />;
  }
}
