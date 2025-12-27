"use client";

import { signInSchema } from "@shared/lib/zod";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { AgreeAndSubmitButton, SignUpErrors } from "./LoginSignup";
import { useSearchParams } from "next/navigation";
import { Input, PasswordInput } from "@shared/components/ui/Input";
import { signIn } from "./client";

export default function LogInForm() {
  const searchParams = useSearchParams();
  const goNext = searchParams.get("next") ?? null;

  const [isPending, startTransition] = useTransition();

  const [signInError, setSignInError] = useState<SignUpErrors>({});

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSignInError({});
    startTransition(async () => {
      try {
        const form = e.currentTarget as typeof e.currentTarget & {
          email: HTMLInputElement;
          password: HTMLInputElement;
        };

        // 1️⃣ Zod validation (client-side)
        const credentials = signInSchema.parse({
          email: form.email.value,
          password: form.password.value,
        });

        // 2️⃣ Better Auth sign-in
        await signIn.email(
          {
            email: credentials.email,
            password: credentials.password,
            callbackURL: new URL(goNext || "/", window.location.origin).href,
          },
          {
            onSuccess() {
              toast.success("Sign in successful");
              window.location.href = goNext || window.location.href;
            },

            onError(ctx) {
              switch (ctx.error.code) {
                case "INVALID_EMAIL_OR_PASSWORD":
                  setSignInError({ password: "Invalid email or password" });
                  break;

                case "EMAIL_NOT_VERIFIED":
                  setSignInError({ email: "Please verify your email before signing in" });
                  break;

                default:
                  toast.error(ctx.error.message || "Something went wrong");
              }
            },
          }
        );
      } catch (err) {
        // 3️⃣ Zod field-level errors
        if (err instanceof ZodError) {
          setSignInError(
            err.errors.reduce<Record<string, string>>((acc, { path, message }) => {
              acc[path[0] as string] = message;
              return acc;
            }, {})
          );
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    });
  }

  return (
    <form onSubmit={handleSignIn} className="px-1" onChange={() => setSignInError({})}>
      <Input type="email" name="email" placeholder="Email" autoComplete="email" />
      {signInError?.email && <p className="text-xs pl-2  text-red-600">{signInError.email}</p>}
      <PasswordInput name="password" placeholder="Password" autoComplete="current-password" />

      {signInError?.password && (
        <p className="text-xs pl-2  text-red-600">{signInError.password}</p>
      )}

      <AgreeAndSubmitButton disabled={Object.keys(signInError).length > 0} loading={isPending} />
    </form>
  );
}
