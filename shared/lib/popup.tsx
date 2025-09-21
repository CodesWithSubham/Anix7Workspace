"use client";

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "../components/ui/Button";
import { PopUpBox } from "@shared/components/ui/Boxes";
import { RiDeleteBin6Line } from "react-icons/ri";
import { cn } from "@shared/utils/cn";

type PopupProp = { popup: { close: () => void } };

// Generic createPopup function
function createPopup<T>(render: (close: (value: T) => void) => React.ReactNode): Promise<T> {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const close = (value: T) => {
      root.unmount();
      container.remove();
      resolve(value);
    };

    root.render(render(close));
  });
}

// ------------------- ALERT -------------------
/**
 * @example
 * await pop.alert("This is a test alert!");
 * or 
 * await pop.alert(<div>Custom JSX content</div>);
 * or
 * pop.alert("This is a test alert!", { closeable: false });
 */
const alert = (
  message: React.ReactNode,
  props?: Omit<React.ComponentProps<typeof PopUpBox>, "children">
) =>
  createPopup<void>((close) => {
    const Popup: React.FC<PopupProp> = ({ popup }) => {
      const [visible, setVisible] = useState(true);
      const handleClose = () => {
        setVisible(false);
        setTimeout(() => close(), 300);
      };

      return (
        <PopUpBox visible={visible} header="Alert" {...props}>
          <div className="mb-4 max-h-[50vh] overflow-auto">{message}</div>
          <div className="text-center">
            <Button onClick={handleClose} className="px-6 py-2">
              OK
            </Button>
          </div>
        </PopUpBox>
      );
    };

    return <Popup popup={{ close: () => close() }} />;
  });

// ------------------- CONFIRM -------------------
/**
 * @example 
 * const result = await pop.confirm("Do you want to continue?");
 */
const confirm = (
  message: string,
  props?: Omit<React.ComponentProps<typeof PopUpBox>, "children">,
  okButton?: { text?: string; className?: string }
) =>
  createPopup<boolean>((close) => {
    const Popup: React.FC<PopupProp> = ({ popup }) => {
      const [visible, setVisible] = useState(true);

      const handle = (val: boolean) => {
        setVisible(false);
        setTimeout(() => close(val), 300);
      };

      return (
        <PopUpBox visible={visible} header="Confirm" {...props}>
          <p className="mb-4">{message}</p>
          <div className="flex justify-end gap-2">
            <Button onClick={() => handle(false)} className="px-3 py-1">
              Cancel
            </Button>
            <Button
              onClick={() => handle(true)}
              className={cn("px-3 py-1 bg-blue-600 text-white", okButton?.className)}
            >
              {okButton?.text || "OK"}
            </Button>
          </div>
        </PopUpBox>
      );
    };

    return <Popup popup={{ close: () => close(false) }} />;
  });

// ------------------- INPUT -------------------
/**
 * @example
 * const result = await pop.getInput("Enter your name:", "Your name here");
 */
const getInput = (
  message: string,
  placeholder = "",
  props?: Omit<React.ComponentProps<typeof PopUpBox>, "children">
) =>
  createPopup<string | null>((close) => {
    const Popup: React.FC<PopupProp> = ({ popup }) => {
      const [visible, setVisible] = useState(true);
      const [input, setInput] = useState("");

      const handleSubmit = () => {
        setVisible(false);
        setTimeout(() => close(input), 300);
      };

      const handleCancel = () => {
        setVisible(false);
        setTimeout(() => close(null), 300);
      };

      return (
        <PopUpBox visible={visible} onClose={handleCancel} header="Input" {...props}>
          <p className="mb-2">{message}</p>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel} className="px-3 py-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="px-3 py-1 bg-blue-600 text-white">
              Submit
            </Button>
          </div>
        </PopUpBox>
      );
    };

    return <Popup popup={{ close: () => close(null) }} />;
  });

// ------------------- CUSTOM CHILD POPUP -------------------
/**
 * @example
 * pop.popComponent(
 *   ({ popup }) => (
 *     <div>
 *       <p>This component is automatically wrapped in PopUpBox!</p>
 *       <button onClick={() => popup.close()}>Close</button>
 *     </div>
 *   ),
 *   { header: "Auto Wrapped Popup", closeable: false }
 * );
 */
function popComponent(
  Component: React.FC<{ popup: { close: () => void } }>,
  props?: Omit<React.ComponentProps<typeof PopUpBox>, "children">
) {
  createPopup<void>((close) => {
    const PopupWrapper: React.FC = () => {
      const [visible, setVisible] = useState(true);
      const handleClose = () => {
        setVisible(false);
        setTimeout(() => close(), 300);
      };

      return (
        <PopUpBox visible={visible} closeable onClose={handleClose} {...props}>
          <Component popup={{ close: handleClose }} />
        </PopUpBox>
      );
    };

    return <PopupWrapper />;
  });
}

// ------------------- EXPORT -------------------
const pop = { alert, confirm, getInput, popComponent };
export default pop;
