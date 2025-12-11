// /components/LoginSignup.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../components/ui/Button";
import { PopUpBox } from "../components/ui/Boxes";

import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import { useSession } from "./client";

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
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const defaultOpen = searchParams.has("openLogin");

  if (session) return null;

  return (
    <PopUpBox
      visible={defaultOpen}
      id="loginSignupCheckId"
      closeable={!isLoading}
      svg={
        <svg
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          clipRule="evenodd"
          viewBox="0 0 64 64"
        >
          <path
            className="svgC"
            d="M59 43H5v-8a1 1 0 0 0-2 0v13a3 3 0 0 0 3 3h4a1 1 0 0 0 0-2H6a1 1 0 0 1-1-1v-3h54v3a1 1 0 0 1-1 1H14a1 1 0 0 0 0 2h12.6c-.2 2.7-.8 6.1-3.4 8h-1.7a1 1 0 0 0 0 2h21a1 1 0 0 0 0-2h-1.7c-2.6-1.9-3.2-5.3-3.4-8H58a3 3 0 0 0 3-3V18a3 3 0 0 0-3-3H48a1 1 0 0 0 0 2h10a1 1 0 0 1 1 1v25Zm-23.6 8h-6.8c-.1 2.5-.8 5.7-2.6 8h12a14.8 14.8 0 0 1-2.6-8ZM53 29a3 3 0 0 0-3-3H14a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h36a3 3 0 0 0 3-3v-9Zm-2 0v9c0 .6-.4 1-1 1H14a1 1 0 0 1-1-1v-9c0-.6.4-1 1-1h36c.6 0 1 .4 1 1Zm-7.2 2.8-.8-.5a1 1 0 0 0-1 1.8l.8.4-.8.4a1 1 0 0 0 1 1.8l.8-.5v.8a1 1 0 0 0 2 0v-.8l.7.5a1 1 0 0 0 1-1.8l-.7-.4.7-.4a1 1 0 0 0-1-1.8l-.7.5V31a1 1 0 0 0-2 0v.8Zm-12.8 0-.8-.5a1 1 0 0 0-1 1.8l.8.4-.8.4a1 1 0 0 0 1 1.8l.8-.5v.8a1 1 0 0 0 2 0v-.8l.8.5a1 1 0 0 0 1-1.8l-.8-.4.8-.4a1 1 0 0 0-1-1.8l-.8.5V31a1 1 0 0 0-2 0v.8Zm-12.7 0-.8-.5a1 1 0 0 0-1 1.8l.8.4-.8.4a1 1 0 0 0 1 1.8l.8-.5v.8a1 1 0 0 0 2 0v-.8l.7.5a1 1 0 0 0 1-1.8l-.7-.4.7-.4a1 1 0 0 0-1-1.8l-.7.5V31a1 1 0 0 0-2 0v.8ZM16 15H6a3 3 0 0 0-3 3v13.5a1 1 0 0 0 2 0V18a1 1 0 0 1 1-1h10a1 1 0 0 0 0-2Zm10.1-2.3a9.4 9.4 0 0 0-4 7.7v.6a3 3 0 0 0 3 3H39a3 3 0 0 0 3-3v-.6a9.3 9.3 0 0 0-4-7.7 6.7 6.7 0 1 0-11.8 0Zm13.8 7.7v.6c0 .6-.5 1-1 1H25a1 1 0 0 1-1-1v-.6a7.3 7.3 0 0 1 7.3-7.3h1.2a7.3 7.3 0 0 1 7.3 7.3ZM36 11.8a4.7 4.7 0 1 0-8.2 0c1-.5 2.3-.7 3.5-.7h1.2c1.2 0 2.4.2 3.5.7Z"
          />
        </svg>
      }
      header={
        <div className="font-extrabold text-lg relative flex p-1 border border-(--linkC) rounded-full *:p-1.5 *:flex-1 *:w-1/2 *:rounded-full *:transition-all *:duration-500 *:ease-in-out">
          <button
            aria-label="Login"
            className={isLoginTab ? "text-white" : "text-(--linkC) cursor-pointer"}
            onClick={() => setIsLoginTab(true)}
          >
            Login
          </button>
          <button
            aria-label="Sign Up"
            className={!isLoginTab ? "text-white" : "text-(--linkC) cursor-pointer"}
            onClick={() => setIsLoginTab(false)}
          >
            Sign Up
          </button>
          {/* Sliding background */}
          <span
            className={`z-[-1] absolute top-px bottom-px w-1/2 bg-(--linkC) rounded-full ${
              isLoginTab ? "left-px" : "left-[calc(50%-1px)]"
            }`}
          ></span>
        </div>
      }
    >
      {isLoginTab ? <LogInForm /> : <SignUpForm />}
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
