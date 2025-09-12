"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type TSection = {
  title?: string;
  titleClassName?: string;
} & React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>;

export default function Section({
  children,
  title,
  titleClassName,
  className,
  ...props
}: TSection) {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const [titleHeight, setTitleHeight] = useState(title ? 70 : 0); // default height when title exists

  // 1️⃣ Initial synchronous measurement (no flicker)
  useLayoutEffect(() => {
    if (h2Ref.current) {
      setTitleHeight(h2Ref.current.offsetHeight + 32); // +32px padding
    }
  }, [title]);

  // 2️⃣ Asynchronous resize updates (won’t block paint)
  useEffect(() => {
    if (!h2Ref.current) return;
    const el = h2Ref.current;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === el) {
          // update asynchronously → smoother
          setTitleHeight(entry.contentRect.height + 32);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [title]);

  return (
    <section
      {...props}
      className={twMerge(
        "relative bg-white dark:bg-neutral-800 px-5 py-8 mt-5 mb-12 mx-auto shadow-[0_5px_35px_rgba(0,0,0,.07)] rounded-xl text-justify",
        className
      )}
      style={{ paddingTop: title ? titleHeight : undefined }}
    >
      {title && (
        <h2
          ref={h2Ref}
          className={twMerge(
            "absolute top-5 w-[calc(100%-40px)] left-1/2 -translate-x-1/2 text-center after:content-[''] after:block after:w-40 after:h-[3px] after:bg-(--linkC) after:rounded-full after:mx-auto after:mt-1",
            titleClassName
          )}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export const CardSection = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={twMerge(
      "grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// export const Card = ({
//   children,
//   className,
//   ...props
// }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
//   <div
//     className={twMerge(
//       "w-full border rounded-lg px-4 py-5 shadow-xs hover:shadow-md transition-all",
//       className
//     )}
//     {...props}
//   >
//     {children}
//   </div>
// );

type CardButtonProps = {
  image?: string | URL;
  title: string;
  description: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
} & React.HTMLAttributes<HTMLDivElement>; // next/link specific props

export function Card({
  image,
  title,
  description,
  className = "",
  imageClassName = "",
  imageWidth,
  imageHeight,
  ...props
}: CardButtonProps) {
  return (
    <div
      className={twMerge(
        "w-full flex h-full flex-row items-center gap-4 p-4 overflow-hidden border rounded-lg px-4 py-5 shadow-xs hover:shadow-md transition-all",
        className
      )}
      {...props}
    >
      {image && (
        <div
          className={twMerge(
            "w-1/4 max-w-24 aspect-square flex-shrink-0 flex items-center justify-center overflow-hidden",
            imageClassName
          )}
        >
          <Image
            src={image.toString()}
            alt={title || "Feature Image"}
            width={imageWidth || 96}
            height={imageHeight || 96}
            className="object-contain w-full h-full"
          />
        </div>
      )}
      <div className="flex-1">
        {title && <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>}
        {description && <p className="text-sm text-gray-700 dark:text-gray-200">{description}</p>}
      </div>
    </div>
  );
}
