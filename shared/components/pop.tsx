"use client";

import { createRoot, Root } from "react-dom/client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

/* ----------------------------------------
   Internal singleton state
----------------------------------------- */
let activeRoot: Root | null = null;
let activeContainer: HTMLDivElement | null = null;

/* ----------------------------------------
   Core popup creator (SAFE EVERYWHERE)
----------------------------------------- */
function createPopup<T>(Component: React.FC<{ close: (value: T) => void }>): Promise<T> {
  // ✅ SSR safety
  if (typeof window === "undefined") {
    return Promise.resolve(undefined as T);
  }

  // ✅ Prevent stacked popups
  if (activeRoot && activeContainer) {
    activeRoot.unmount();
    activeContainer.remove();
  }

  return new Promise<T>((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = createRoot(container);
    activeRoot = root;
    activeContainer = container;

    const close = (value: T) => {
      root.unmount();
      container.remove();
      activeRoot = null;
      activeContainer = null;
      resolve(value);
    };

    root.render(<Component close={close} />);
  });
}

/* ----------------------------------------
   ALERT
----------------------------------------- */
const alert = (message: React.ReactNode): Promise<void> =>
  createPopup<void>(({ close }) => {
    const [visible, setVisible] = useState(true);

    console.log("1", 1);

    const handleClose = () => {
      setVisible(false);
      setTimeout(() => close(undefined), 200);
    };

    return (
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-9999 flex items-center justify-center bg-black/50 transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={twMerge(
            "bg-gray-800 rounded-lg p-4 w-[90%] max-w-sm shadow transition-transform",
            visible ? "scale-100" : "scale-95"
          )}
        >
          <div className="mb-4">{message}</div>
          <div className="text-center">
            <Button onClick={handleClose}>OK</Button>
          </div>
        </div>
      </div>
    );
  });

/* ----------------------------------------
   CONFIRM
----------------------------------------- */
const confirm = (message: React.ReactNode): Promise<boolean> =>
  createPopup<boolean>(({ close }) => {
    const [visible, setVisible] = useState(true);

    const done = (val: boolean) => {
      setVisible(false);
      setTimeout(() => close(val), 200);
    };

    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
        <div className="bg-gray-800 rounded-lg p-4 w-[90%] max-w-sm">
          <div className="mb-4">{message}</div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => done(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={() => done(true)}>
              OK
            </Button>
          </div>
        </div>
      </div>
    );
  });

/* ----------------------------------------
   PROMPT / INPUT
----------------------------------------- */
const getInput = (message: string, placeholder = ""): Promise<string | null> =>
  createPopup<string | null>(({ close }) => {
    const [value, setValue] = useState("");

    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
        <div className="bg-gray-800 rounded-lg p-4 w-[90%] max-w-sm">
          <p className="mb-2">{message}</p>
          <Input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => e.key === "Enter" && close(value)}
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={() => close(null)}>Cancel</Button>
            <Button onClick={() => close(value)}>Submit</Button>
          </div>
        </div>
      </div>
    );
  });

/* ----------------------------------------
   EXPORT
----------------------------------------- */
const pop = { alert, confirm, getInput };
export default pop;
