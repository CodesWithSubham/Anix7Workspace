// /components/LoginSignup.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../components/ui/Button";
import { PopUpBox } from "../components/ui/Boxes";
import { cn } from "@shared/utils/cn";
import { BsEnvelopeAt } from "react-icons/bs";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import { authClient, useSession } from "./client";
import { FcGoogle } from "react-icons/fc";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  refer?: string;
};

// Errors are optional strings for each field
export type SignUpErrors = Partial<Record<keyof SignUpFormData | "otp", string>>;

export default function LoginSignup() {
  const { data: session } = useSession();

  const [isLoginTab, setIsLoginTab] = useState(true);

  const searchParams = useSearchParams();
  const defaultOpen = searchParams.has("openLogin");

  if (session) return null;

  const doSocialLogin = async (formData: FormData) => {
    const action = formData.get("action")?.toString();

    const goNext = searchParams.get("next") ?? window.location.pathname;

    const safeNext = goNext.startsWith("/") ? goNext : window.location.pathname; // prevent open redirect

    const callbackURL = new URL(safeNext, window.location.origin).href;

    switch (action) {
      case "google":
        await authClient.signIn.social({ provider: "google", callbackURL });
        break;

      default:
        console.error("Unknown auth provider:", action);
        return;
    }
  };

  return (
    <PopUpBox
      visible={defaultOpen}
      id="loginSignupCheckId"
      closeable
      svg={<BsEnvelopeAt className="text-theme-500" />}
      header={
        <div className="font-extrabold text-lg relative flex p-1 border border-theme-450 rounded-full *:p-1.5 *:flex-1 *:w-1/2 *:rounded-full *:transition-all *:duration-500 *:ease-in-out">
          <button
            aria-label="Login"
            className={isLoginTab ? "text-white" : "text-theme-450 cursor-pointer"}
            onClick={() => setIsLoginTab(true)}
          >
            Login
          </button>
          <button
            aria-label="Sign Up"
            className={!isLoginTab ? "text-white" : "text-theme-450 cursor-pointer"}
            onClick={() => setIsLoginTab(false)}
          >
            Sign Up
          </button>
          {/* Sliding background */}
          <span
            className={cn(
              "-z-1 absolute top-px bottom-px w-1/2 bg-theme-450 rounded-full",
              isLoginTab ? "left-px" : "left-[calc(50%-1px)]"
            )}
          ></span>
        </div>
      }
    >
      {isLoginTab ? <LogInForm /> : <SignUpForm />}
      <div className=" relative inline-flex items-center justify-center w-full">
        <hr className="w-5/6 h-px my-8 bg-gray-300 border-0 dark:bg-gray-700" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-slate-50 left-1/2 dark:text-white dark:bg-neutral-900">
          or
        </span>
      </div>

      <form action={doSocialLogin} className="w-full flex flex-row gap-3 justify-center">
        {/* {referBy && <input type="hidden" name="referCode" value={referBy} />} */}
        <Button
          className="text-lg flex bg-transparent text-inherit items-center gap-1 border-2 shadow-md hover:scale-100 hover:shadow-inner"
          type="submit"
          name="action"
          value="google"
          svg={<FcGoogle />}
        >
          Sign In With Google
        </Button>
      </form>
    </PopUpBox>
  );
}

export function AgreeAndSubmitButton({
  disabled,
  loading,
}: {
  disabled: boolean;
  loading: boolean;
}) {
  return (
    <div className="flex gap-5 mt-5 justify-between items-center">
      <p className="text-xs text-gray-500 mt-2">
        By continuing, you agree to Our&apos;s{" "}
        <Link href="https://www.anix7.in/page/terms" target="_blank">
          Terms of Use
        </Link>
        ,{" "}
        <Link href="https://www.anix7.in/page/privacy-policy" target="_blank">
          Privacy Policy
        </Link>
        , and{" "}
        <Link href="https://www.anix7.in/page/disclaimer" target="_blank">
          Disclaimer
        </Link>
        .
      </p>

      <Button
        type="submit"
        className="min-w-26"
        disabled={disabled}
        loading={loading}
        loadingText="Loading"
      >
        Submit
      </Button>
    </div>
  );
}
