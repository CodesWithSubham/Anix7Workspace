"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { cn } from "@shared/utils/cn";
import { IoClose, IoDocumentTextOutline } from "react-icons/io5";

export function WorkBox({ children, className = "", ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "my-3 mx-auto p-5 bg-transparent text-center shadow-[0_5px_35px_rgba(0,0,0,0.1)] rounded-xl relative",
        className
      )}
      {...props}
    >
      <div className="w-16 h-16 absolute -z-10 bg-black/5 bottom-0 left-0 rounded-tr-full" />
      {children}
    </div>
  );
}

type PopupBoxProps = React.HTMLProps<HTMLDivElement> & {
  id?: string;
  visible?: boolean;
  className?: string;
  header?: React.ReactNode;
  svg?: React.ReactNode;
  closeable?: boolean;
  onClose?: () => void;
};
/**
 * A reusable popup container with optional header, close button, and animation support.
 *
 * @example
 * // Basic usage:
 * <PopUpBox visible={true} header="Hello" closeable onClose={() => setShow(false)}>
 *   <p>This is a popup message.</p>
 * </PopUpBox>
 *
 * @example
 * // With custom icon and styling:
 * <PopUpBox
 *   visible={isOpen}
 *   svg={<MyIcon />}
 *   className="max-w-md bg-white shadow-lg"
 *   closeable
 *   onClose={() => setOpen(false)}
 * >
 *   <div>Custom content goes here</div>
 * </PopUpBox>
 *
 * @param props - See `PopupBoxProps` for all available options.
 */
export function PopUpBox({
  children,
  id = "",
  visible = true,
  className = "",
  header,
  svg,
  closeable = false,
  onClose = () => {},
  ...props
}: PopupBoxProps) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setIsAtBottom(scrollHeight - scrollTop - clientHeight <= 10);
  }, []);

  const checkScrollable = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollHeight, clientHeight } = el;
    setIsScrollable(scrollHeight > clientHeight);
    handleScroll();
  }, [handleScroll]);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    checkScrollable();
  }, [children, checkScrollable]);

  // useEffect(() => {
  //   if (!isVisible) {
  //     setTimeout(() => {
  //       onClose();
  //     }, 300);
  //   }
  // }, [isVisible, onClose]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  }, [onClose]);

  return (
    <>
      <input
        type="checkbox"
        id={id || undefined}
        className="hidden"
        checked={isVisible}
        onChange={(e) => setIsVisible(e.target.checked)}
      />

      <div
        className={cn(
          "fixed inset-0 z-98 bg-black/40 transition-all duration-500",
          isVisible ? "visible opacity-100" : "opacity-0 invisible"
        )}
        {...props}
      >
        <div className="fixed inset-0 z-99 p-5 flex flex-col justify-center items-center">
          <div
            className={cn(
              "relative bg-slate-50 dark:bg-neutral-900 w-full max-w-xl pt-4 px-5 pb-6 rounded-3xl",
              "transition-transform duration-300",
              isVisible ? "scale-100" : "scale-0"
            )}
          >
            {closeable && (
              <Button
                className="absolute -top-4 right-4 rounded-full w-7 h-7 m-0"
                onClick={handleClose}
              >
                <IoClose />
              </Button>
            )}

            <div className="mx-auto mb-1 w-6">{svg || <IoDocumentTextOutline />}</div>

            <div className="text-lg md:text-xl font-bold mb-2 text-center">{header}</div>

            <div
              className="max-h-[55vh] overflow-x-hidden overflow-y-auto"
              ref={scrollRef}
              onScroll={handleScroll}
            >
              {children}
            </div>

            {isScrollable && !isAtBottom && (
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                onClick={scrollToBottom}
              >
                <button className="animate-bounce">
                  <DoubleDownIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function DoubleDownIcon() {
  return (
    <svg viewBox="0 0 15 15">
      <path
        d="M3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.14645 6.85355C7.34171 7.04882 7.65829 7.04882 7.85355 6.85355L11.8536 2.85355C12.0488 2.65829 12.0488 2.34171 11.8536 2.14645C11.6583 1.95118 11.3417 1.95118 11.1464 2.14645L7.5 5.79289L3.85355 2.14645ZM3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L7.5 11.7929L3.85355 8.14645Z"
        className="svgC"
      ></path>
    </svg>
  );
}

export function Note({
  children,
  className = "",
  type,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  type?: string;
} & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className="my-2 relative pt-5 pl-12 pr-5 bg-(--headerB) dark:bg-neutral-800 rounded-xl overflow-hidden"
      {...props}
    >
      <div className="absolute w-14 h-14 bg-black/5 rounded-full -top-3 -left-3" />
      <div className=" absolute left-4 top-4">&#9733;</div>
      {children}
    </div>
  );
}

export function ShadowBox({
  children,
  className = "",
  ...props
}: { children: React.ReactNode; className?: string } & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "w-full shadow-[0px_3px_10px_rgba(0,0,0,.20),inset_20px_20px_18px_rgba(255,255,255,.9),inset_-20px_-20px_18px_rgba(0,0,0,.07)] dark:shadow-[inset_20px_20px_18px_rgba(255,255,255,.07),inset_-20px_-20px_18px_rgba(0,0,0,.9)] p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
