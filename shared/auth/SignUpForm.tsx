import { Input, PasswordInput } from "@shared/components/ui/Input";
import { AgreeAndSubmitButton, SignUpErrors } from "./LoginSignup";

import { signupSchema } from "@shared/lib/zod";
import { useSearchParams } from "next/navigation";
import { useState, ChangeEventHandler, useEffect, useTransition } from "react";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { signUp } from "./client";
import pop from "@shared/components/pop";

export function resolveCallbackURL(origin: string, input?: string): string {
  const fallback = origin + "/";

  if (!input) return fallback;

  // Allow only relative paths
  if (input.startsWith("/") && !input.startsWith("//")) {
    return origin + input;
  }

  // Allow same-origin absolute URLs only
  try {
    const url = new URL(input);
    if (url.origin === origin) {
      return url.origin + url.pathname + url.search;
    }
  } catch {}

  return fallback;
}

export default function SignUpForm() {
  // const [isRefer, setIsRefer] = useState(false);

  const searchParams = useSearchParams();
  // const referBy = searchParams.get("r") ?? null;
  const goNext = searchParams.get("next") ?? "/";

  // transition
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    refer: "",
  });

  const [errors, setErrors] = useState<SignUpErrors>({});

  type SignUpFormData = typeof formData; // whatever shape your formData has

  const handleFormChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target;
    const key = name as keyof SignUpFormData;

    const updatedData = { ...formData, [key]: value };
    const validation = signupSchema.safeParse(updatedData);

    setErrors((prev) => {
      const { [key]: _, ...rest } = prev;
      const issue = validation.success
        ? null
        : validation.error.errors.find((err) => err.path[0] === key);
      return issue ? { ...rest, [key]: issue.message } : rest;
    });

    setFormData(updatedData);
  };

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    startTransition(async () => {
      try {
        signupSchema.parse(formData);

        await signUp.email(
          {
            email: formData.email,
            password: formData.password,
            name: `${formData.firstName} ${formData.lastName}`,
            callbackURL: new URL(goNext, window.location.origin).href,
          },
          {
            onSuccess: () => {
              pop.alert("Check your email to verify your account");
            },
            onError: (ctx) => {
              const errCode = ctx.error.code;

              if (errCode === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
                setErrors({ email: "Email already exists" });
                return;
              }

              toast.error(ctx.error.message);
            },
          }
        );
      } catch (err) {
        if (err instanceof ZodError) {
          setErrors(
            err.errors.reduce(
              (acc, { path, message }) => ({ ...acc, [path[0]]: message }),
              {} as SignUpErrors
            )
          );
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    });
  };

  return (
    <form className="px-1" onSubmit={onSubmit} onChange={handleFormChange}>
      <div className="flex gap-2">
        <Input name="firstName" placeholder="First Name" />
        <Input name="lastName" placeholder="Last Name" />
      </div>
      {errors.firstName && <p className="text-xs pl-2 -mt-1 text-red-600">{errors.firstName}</p>}
      {errors.lastName && <p className="text-xs pl-2 -mt-1 text-red-600">{errors.lastName}</p>}
      <Input type="email" name="email" placeholder="Email" />
      {errors.email && <p className="text-xs pl-2 -mt-1 text-red-600">{errors.email}</p>}

      <PasswordInput name="password" placeholder="Password" />
      {errors.password && <p className="text-xs pl-2 -mt-1 text-red-600">{errors.password}</p>}
      <PasswordInput name="confirmPassword" placeholder="Confirm Password" />
      {errors.confirmPassword && (
        <p className="text-xs pl-2 -mt-1 text-red-600">{errors.confirmPassword}</p>
      )}

      {/* <div>
        {referBy ? (
          <Input name="refer" disabled value={referBy} />
        ) : (
          <>
            <div
              id="enterRef"
              onClick={() => setIsRefer((prev) => !prev)}
              className={`mt-2 cursor-pointer  ${isRefer ? "text-red-500" : "text-theme-450"}`}
            >
              {isRefer ? <>&times; Remove Refer Code</> : <>&#43; Enter Refer Code</>}
            </div>
            <div
              className={`transition-all duration-500 ${
                isRefer ? "max-h-32" : "max-h-0 overflow-hidden"
              }`}
            >
              <Input type="number" name="refer" placeholder="Enter Refer Code" />
            </div>
          </>
        )}
      </div> */}
      <AgreeAndSubmitButton disabled={Object.keys(errors).length > 0} loading={isPending} />
    </form>
  );
}
