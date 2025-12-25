import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { twoFactor, username, emailOTP, admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { sendNoReplyMail } from "@shared/lib/sendMail";

const NODE_ENV = process.env.NODE_ENV;
const NEXT_PUBLIC_AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;

if (!NEXT_PUBLIC_AUTH_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_AUTH_BASE_URL env");
}

// MongoDB
let mongoClient: MongoClient;

function getMongoClient() {
  if (!mongoClient) {
    const uri = process.env.MONGODB_URI_AUTH;
    if (!uri) throw new Error("MONGODB_URI_AUTH is not defined");

    mongoClient = new MongoClient(uri);

    if (NODE_ENV !== "production") {
      // reuse global for dev HMR
      (globalThis as any).mongoClient = mongoClient;
    }
  }

  return mongoClient;
}

const db = getMongoClient().db("BetterAuth");

const trustedOrigins =
  process.env.ALLOW_AUTH_ORIGIN_DIVIDE_BY_COMMA?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

// Auth config
export const auth = betterAuth({
  appName: "Anix7",
  baseURL: NEXT_PUBLIC_AUTH_BASE_URL,
  trustedOrigins,

  database: mongodbAdapter(db),

  account: {
    accountLinking: { enabled: true },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  advanced: {
    ...(NODE_ENV === "production" && {
      crossSubDomainCookies: {
        enabled: true,
        domain: "anix7.in",
      },
      useSecureCookies: true,
    }),

    cookiePrefix: "anix7-auth",
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      if (NODE_ENV === "development") {
        console.log("Test Verification Email: ", url);
        return;
      }

      try {
        await sendNoReplyMail({
          sendTo: user.email,
          subject: "Verify your email address",
          html: `
            <p>Hello ${user.name ?? ""},</p>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${url}">${url}</a>
          `,
        });
      } catch (error) {
        console.error("Verify email send failed", error);
      }
    },
  },

  plugins: [
    twoFactor(),

    username(),

    emailOTP({
      disableSignUp: false,

      async sendVerificationOTP({ email, otp, type }) {
        let subject = "Your verification code";
        const html = `<strong>${otp}</strong>`;

        if (type === "sign-in") subject = "Sign-in verification code";
        else if (type === "email-verification") subject = "Verify your email";
        else if (type === "forget-password") subject = "Reset your password";

        if (NODE_ENV === "development") {
          console.log(subject, ": ", otp);
          return;
        }

        try {
          await sendNoReplyMail({
            sendTo: email,
            subject,
            html,
            fromName: "Anix7 Verification",
          });
        } catch (error) {
          console.error("OTP email send failed", error);
        }
      },
    }),

    admin(),

    nextCookies(), // ⚠️ Must be last
  ],
});
