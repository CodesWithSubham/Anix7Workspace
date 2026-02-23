"use client";

import copyToClipboard from "../../utils/CopyToClipboard";
import { forwardRef, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const debounceTime = 200; // ms

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      name = "text",
      className = "",
      maxLength = 512,
      onChange = () => {},
      label = "",
      labelClassName = "",
      ...props
    },
    ref
  ) => {
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.value !== undefined) {
        // Controlled component — no debounce
        onChange(e);
      } else {
        // Uncontrolled — debounce onChange
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onChange(e), debounceTime);
      }
    };

    return (
      <div className={twMerge("w-full flex flex-col relative", label && "mt-3")}>
        {label && (
          <label
            className={twMerge(
              "text-xs text-theme-450 font-semibold absolute -top-2.5 left-1.5",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          className={twMerge(
            "w-full h-9 p-2 my-1.5 outline-hidden border hover:border-theme-450 focus:border-theme-450 focus:shadow-[0px_0px_5px_0px] focus:shadow-theme-450 select-none rounded-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-500 disabled:placeholder:text-gray-500",
            className
          )}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export function CopyInput({ value, className = "", ...props }: React.HTMLProps<HTMLInputElement>) {
  return (
    <div className="relative">
      <Input readOnly defaultValue={value} className={twMerge("pr-8", className)} {...props} />
      <svg
        role="button"
        viewBox="0 0 24 24"
        onClick={() => copyToClipboard((value || "").toString())}
        className="fill-theme-450 absolute top-1/2 -translate-y-1/2 right-1 hover:scale-110 cursor-pointer transition-all duration-500"
      >
        <path d="M16 20H8a3 3 0 0 1-3-3V7a1 1 0 0 0-2 0v10a5 5 0 0 0 5 5h8a1 1 0 0 0 0-2Zm5-11.06a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09L14.06 2H10a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8.94Zm-6-3.53L17.59 8H16a1 1 0 0 1-1-1ZM19 15a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v3a3 3 0 0 0 3 3h3Z" />
      </svg>
    </div>
  );
}

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ name = "password", placeholder = "Enter Password...", className = "", ...props }, ref) => {
    const [showPass, setShowPass] = useState(false);
    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type={showPass ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          className={className}
          aria-label={showPass ? "Hide password" : "Show password"}
          {...props}
        />
        <button
          type="button"
          aria-label={showPass ? "Hide password" : "Show password"}
          className="absolute top-1/2 -translate-y-1/2 right-1.5 cursor-pointer hover:scale-110 transition-all duration-300"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? (
            <svg viewBox="0 0 640 512">
              <path
                className="svgC"
                d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"
              ></path>
            </svg>
          ) : (
            <svg viewBox="0 0 576 512">
              <path
                className="svgC"
                d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"
              ></path>
            </svg>
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export function ColorInput({ value = "#000000", className = "", ...props }) {
  return (
    <input
      type="color"
      name=""
      {...props}
      value={value}
      className={`h-9 px-1 py-0.5 my-1.5 outline-hidden border  border-theme-450 focus:shadow-[0px_0px_5px_0px] focus:shadow-theme-450 select-none rounded-lg ${className}`}
    />
  );
}

export function ColorWithInput({
  value = "#ffffff",
  placeholder = "Enter Hex Color Code",
  className = "",
  onChange = (color: string) => {},
  debounceTime = 300,
  ...props
}) {
  const [localColor, setLocalColor] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync when external value changes
  useEffect(() => {
    setLocalColor(value);
  }, [value]);

  // Debounced onChange
  useEffect(() => {
    clearTimeout(debounceRef.current as NodeJS.Timeout);
    debounceRef.current = setTimeout(() => {
      if (localColor.length === 7 && localColor !== value) {
        onChange(localColor);
      }
    }, debounceTime);

    return () => clearTimeout(debounceRef.current as NodeJS.Timeout);
  }, [localColor, debounceTime, onChange, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalColor(e.target.value);
  };

  return (
    <div className={`flex gap-2 ${className}`} {...props}>
      <Input value={localColor} onChange={handleChange} placeholder={placeholder} maxLength={7} />
      <ColorInput
        className="w-24"
        value={localColor}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalColor(e.target.value)}
      />
    </div>
  );
}

export function SliderWithTooltip({
  min = 1,
  max = 50,
  value = 25,
  step = 1,
  name = "range",
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {}, // Function to update parent state
  ...props
}) {
  const [v, setV] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setV(newValue);
    onChange(e); // Call parent function
  };

  return (
    <div className="w-full max-w-md mx-auto text-center group">
      {/* Tooltip */}
      <div className="relative mr-3 ml-1">
        <div
          className="absolute -top-12 flex justify-center items-center w-10 h-10 shrink-0 text-white bg-theme-450 rounded-md shadow-md transition-all duration-300 invisible group-hover:visible opacity-0 group-hover:opacity-100 z-20"
          style={{
            left: `calc(${((v - min) / (max - min)) * 100}% - 1rem)`,
          }}
        >
          {v}
          <div className="absolute -bottom-1 rotate-45 w-3 h-3 bg-theme-450 z-10" />
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={handleChange}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-theme-450"
        {...props}
      />
    </div>
  );
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name?: string | undefined;
  placeholder?: string | undefined;
  className?: string | undefined;
  maxLength?: number | undefined;
};

export function TextArea({
  name = "text",
  placeholder = "Enter Your Text...",
  className = "",
  maxLength = 256,
  ...props
}: React.PropsWithChildren<TextAreaProps>) {
  const [count, setCount] = useState(0);
  const ref = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(ref.current as NodeJS.Timeout);
    setCount(e.target.value.length);
    ref.current = setTimeout(() => props.onChange?.(e), debounceTime);
  };
  return (
    <div>
      <textarea
        name={name}
        className={`w-full h-20 min-h-9 max-h-60 p-2 my-1.5 outline-hidden border bg-transparent border-theme-450 focus:shadow-[0px_0px_5px_0px] focus:shadow-theme-450 select-none rounded-lg ${className} `}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleChange}
        {...props}
      ></textarea>
      {!props.readOnly && (
        <p className={`text-xs -mt-3 ml-3 ${count == maxLength ? "text-red-500" : ""}`}>
          {count === 0 ? `Maximum ${maxLength} characters` : `${maxLength - count} characters left`}
        </p>
      )}
    </div>
  );
}

export type SelectOption = { label: string } & React.HTMLProps<HTMLOptionElement>;

export function Select({
  label = "",
  labelClassName = "",
  name = "select",
  value,
  className = "",
  options = [],
  ...props
}: {
  label?: string;
  labelClassName?: string;
  name?: string;
  value?: string | number;
  className?: string;
  options?: SelectOption[];
} & Omit<
  React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "children"
>) {
  return (
    <div className={twMerge("w-full flex flex-col relative", label && "mt-3")}>
      {label && (
        <label
          className={twMerge(
            "text-xs text-theme-450 font-semibold absolute -top-2.5 left-1.5",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        className={`w-full h-9 p-2 my-1.5 outline-hidden border bg-transparent border-theme-450 focus:shadow-[0px_0px_5px_0px] focus:shadow-theme-450 select-none rounded-lg ${className}`}
        {...props}
      >
        {options.map((option, i) => {
          const { label, ...rest } = option;
          return (
            <option key={i} {...rest}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function Checkbox({
  label = "",
  checked = false,
  name = "checkbox",
  className = "",
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {}, // Function to update parent state
  ...props
}) {
  const [ck, setCk] = useState(checked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCk(checked);
    onChange(e);
  };
  return (
    <label
      className={twMerge("inline-flex items-center gap-2 cursor-pointer select-none", className)}
    >
      <input
        type="checkbox"
        name={name}
        checked={ck}
        className="w-5 h-5 accent-theme-450 cursor-pointer"
        onChange={handleChange}
        {...props}
      />
      {label && <span className="text-sm font-medium cursor-pointer">{label}</span>}
    </label>
  );
}

export function OTPInput({
  value = "",
  maxLength = 6,
  onChange = (e: string) => {},
  className = "",
  ...props
}) {
  const [otp, setOtp] = useState(
    value.split("").slice(0, maxLength).concat(Array(maxLength).fill("")).slice(0, maxLength)
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const otpValue = otp.join("");
    onChange(otpValue);
  }, [otp, onChange]);

  const handleChangeOtp = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return; // only allow digits
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    if (val && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, maxLength);
    const updated = pasted.split("").concat(Array(maxLength).fill("")).slice(0, maxLength);
    setOtp(updated);
    updated.forEach((_, i) => {
      if (inputRefs.current[i]) inputRefs.current[i].focus();
    });
  };

  return (
    <div className={`w-full flex justify-center gap-2 my-2 ${className}`}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChangeOtp(index, e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          autoComplete="off"
          placeholder="0"
          className="h-auto aspect-square text-center text-lg font-semibold placeholder:text-gray-300"
          {...props}
        />
      ))}
    </div>
  );
}
