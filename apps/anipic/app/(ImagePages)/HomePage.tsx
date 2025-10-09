"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export type Img = { sno: number; url: string };

export default function HomePage({ images = [] }: { images: Img[] }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    if (visibleCount >= images.length) {
      setHasMore(false);
      return;
    }
    setVisibleCount((prev) => prev + 20);
  }, [visibleCount, images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const visibleImages = images.slice(0, visibleCount);

  // 🧩 Don’t re-memoize columns → just distribute once (avoids losing layoutId mapping)
  const colCount =
    typeof window !== "undefined"
      ? window.innerWidth < 640
        ? 2
        : window.innerWidth < 1024
        ? 3
        : 4
      : 3;

  const columns: Img[][] = Array.from({ length: colCount }, () => []);
  visibleImages.forEach((img, i) => {
    columns[i % colCount].push(img);
  });

  return (
    <div className="flex gap-4 px-2 sm:px-4">
      {columns.map((col, i) => (
        <div key={i} className="flex flex-col gap-4 flex-1">
          {col.map((img) => (
            <Link key={img.sno} href={`/i/${img.sno}`}>
              <motion.div
                layoutId={`image-${img.sno}`}
                className="relative cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={img.url}
                  alt=""
                  width={400}
                  height={400}
                  loading="lazy"
                  unoptimized
                  className="object-cover w-full h-auto rounded-md"
                  style={{
                    opacity: 0,
                    transition: "opacity 400ms ease",
                    display: "block",
                  }}
                  onLoad={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.opacity = "1";
                  }}
                />
              </motion.div>
            </Link>
          ))}
        </div>
      ))}

      {hasMore && (
        <div
          ref={loaderRef}
          className="w-full flex justify-center py-10 text-gray-500 text-sm col-span-full"
        >
          Loading more images...
        </div>
      )}
    </div>
  );
}
