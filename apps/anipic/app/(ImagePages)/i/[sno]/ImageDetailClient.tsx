"use client";

import { formatThumbnailImageUrl } from "@/utils/formatThumbnail";
// import { useRouter } from "next/navigation";
import { motion } from "motion/react";

interface Props {
  img: {
    sno: number;
    url: string;
    tags: string[];
    downloads: number;
  };
}

export default function ImageDetailClient({ img }: Props) {
  // const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        layoutId={`image-${img.sno}`} // Shared layout animation
        className="relative rounded-xl overflow-hidden cursor-pointer"
        // onClick={() => router.back()} // Click to go back
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={formatThumbnailImageUrl(img.url)}
          alt={`AniPic ${img.sno}`}
          width={800}
          height={600}
          className="object-contain w-full h-full"
        />
      </motion.div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">SNo: {img.sno}</p>
        <p className="mt-2 text-gray-700">
          Tags: {img.tags?.length ? img.tags.join(", ") : "No tags"}
        </p>
        <p className="text-gray-400 text-xs mt-2">Downloads: {img.downloads}</p>
        <a
          href={img.url}
          download
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download
        </a>
      </div>
    </div>
  );
}
