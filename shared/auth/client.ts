import { createAuthClient } from "better-auth/react";
import type { auth } from "./index.js";
import {
  inferAdditionalFields,
  twoFactorClient,
  usernameClient,
  emailOTPClient,
  adminClient,
  organizationClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_BASE_URL ?? "http://localhost:3007",
  plugins: [
    inferAdditionalFields<typeof auth>(),
    twoFactorClient(),
    usernameClient(),
    emailOTPClient(),
    adminClient(),
    organizationClient(),
  ],
});

export const { useSession, signIn, signOut, signUp } = authClient;
