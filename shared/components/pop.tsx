"use client";

import { createRoot, Root } from "react-dom/client";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "@shared/utils/cn";
import { IoClose } from "react-icons/io5";

type BaseOption = {
  header?: React.ReactNode;
  icon?: React.ReactNode;
};

type DialogProps = React.PropsWithChildren<
  BaseOption & {
    visible: boolean;
    close?: () => void;
  }
>;

export function Dialog({ children, visible, header, icon, close }: DialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed inset-0 z-98 bg-black/40 transition-all duration-500",
        visible ? "visible opacity-100" : "opacity-0 invisible",
      )}
    >
      <div className="fixed inset-0 z-99 p-5 flex flex-col justify-center items-center">
        <div
          className={cn(
            "relative bg-slate-50 dark:bg-neutral-900 w-full max-w-xl pt-4 px-3 pb-6 rounded-3xl",
            "transition-transform duration-300",
            visible ? "scale-100" : "scale-0",
          )}
        >
          {typeof close === "function" && (
            <Button className="absolute -top-4 right-4 rounded-full w-7 h-7 m-0" onClick={close}>
              <IoClose />
            </Button>
          )}

          {icon && <div className="mx-auto mb-1 w-6">{icon}</div>}

          {header && <div className="text-lg md:text-xl font-bold mb-2 text-center">{header}</div>}

          <div className="max-h-[55vh] overflow-x-hidden overflow-y-auto *:px-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Internal singleton state
let activeRoot: Root | null = null;
let activeContainer: HTMLDivElement | null = null;

// Core popup creator
function createPopup<T>(Component: React.FC<{ close: (value: T) => void }>) {
  if (typeof window === "undefined") {
    return Promise.resolve(undefined as T);
  }

  // Prevent stacked popups
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

// alert
const alert = (message: React.ReactNode, options?: BaseOption) =>
  createPopup<void>(({ close }) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
      setVisible(false);
      setTimeout(() => close(undefined), 200);
    };

    return (
      <Dialog visible={visible} header={options?.header || "Alert"} icon={options?.icon}>
        <div className="mb-4">{message}</div>
        <div className="text-center">
          <Button onClick={handleClose}>OK</Button>
        </div>
      </Dialog>
    );
  });

// confirm
const confirm = (message: React.ReactNode, options?: BaseOption) =>
  createPopup<boolean>(({ close }) => {
    const [visible, setVisible] = useState(true);

    const done = (val: boolean) => {
      setVisible(false);
      setTimeout(() => close(val), 200);
    };

    return (
      <Dialog visible={visible} header={options?.header} icon={options?.icon}>
        <div className="mb-4">{message}</div>
        <div className="flex gap-3">
          <Button className="flex-1" onClick={() => done(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={() => done(true)}>
            OK
          </Button>
        </div>
      </Dialog>
    );
  });

// input
const getInput = (message: string, placeholder = "", options?: BaseOption) =>
  createPopup<string | null>(({ close }) => {
    const [visible, setVisible] = useState(true);
    const [value, setValue] = useState("");

    const done = (val: string | null) => {
      setVisible(false);
      setTimeout(() => close(val), 200);
    };

    return (
      <Dialog visible={visible} header={options?.header} icon={options?.icon}>
        <p className="mb-2">{message}</p>
        <Input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === "Enter" && done(value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={() => done(null)}>Cancel</Button>
          <Button onClick={() => done(value)}>Submit</Button>
        </div>
      </Dialog>
    );
  });

// custom (open)
export type PopupOpenComponentProps<T> = { close: (value: T | undefined) => void };
type PopupOptions = BaseOption & { closable?: false };

const open = <T,>(
  Component: React.ComponentType<PopupOpenComponentProps<T | undefined>>,
  options?: PopupOptions,
) =>
  createPopup<T | undefined>(({ close }) => {
    const [visible, setVisible] = useState(true);

    const handleClose = (value: T | undefined) => {
      setVisible(false);
      setTimeout(() => close(value), 200);
    };

    return (
      <Dialog
        visible={visible}
        header={options?.header}
        icon={options?.icon}
        close={options?.closable === false ? undefined : () => handleClose}
      >
        <Component close={handleClose} />
      </Dialog>
    );
  });

// export
const pop = { alert, confirm, getInput, open };
export default pop;
