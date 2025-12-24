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
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
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
