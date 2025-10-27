"use client";

import { useState } from "react";
import { motion } from "motion/react";
import updateDownloads from "./action";
import { Button } from "@shared/components/ui/Button";
import { formatThumbnailImageUrl } from "@/utils/formatThumbnail";

interface Props {
  img: {
    sno: number;
    url: string;
    tags: string[];
    downloads: number;
  };
}

export default function ImageDetailClient({ img }: Props) {
  const [downloads, setDownloads] = useState(img.downloads);

  const handleDownload = async () => {
    try {
      // 1️⃣ Fetch image as Blob (external or internal)
      const response = await fetch(img.url, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      // 2️⃣ Trigger download
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `AniPic-${img.sno}${getExtension(img.url)}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3️⃣ Revoke URL
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

      // 4️⃣ Update DB + state
      const res = await updateDownloads(img.sno);
      if (res?.success) {
        setDownloads((d) => d + 1);
      } else {
        console.warn("Download count not updated:", res?.message);
      }
    } catch (err) {
      console.error("❌ Download failed:", err);
      alert("Failed to download image.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        layoutId={`image-${img.sno}`}
        className="relative rounded-xl overflow-hidden"
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
        <p className="text-gray-400 text-xs mt-2">
          Downloads: {downloads}
        </p>

        <Button
          onClick={handleDownload}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download
        </Button>
      </div>
    </div>
  );
}

// Helper: extract file extension
function getExtension(url: string) {
  const match = url.match(/\.(jpe?g|png|webp|gif|bmp|svg)$/i);
  return match ? `.${match[1].toLowerCase()}` : ".jpg";
}
