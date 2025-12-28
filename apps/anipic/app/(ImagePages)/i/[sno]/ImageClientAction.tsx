"use client";

import { IconButton } from "@shared/components/ui/Button";
import { useState, useTransition } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";
import { SlCloudDownload } from "react-icons/sl";
import { toast } from "react-toastify";
import getDownloadUrl from "./action";

export function LikeButton() {
  return (
    <div>
      <IconButton>
        <FaRegHeart />
      </IconButton>
    </div>
  );
}

export function DownloadButton({ sno }: { sno: number }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await getDownloadUrl(sno);

      if (!res?.success || !res.downloadUrl) {
        throw new Error("Invalid response");
      }

      // trigger download
      window.location.assign(res.downloadUrl);

      toast.success("Download started");
    } catch {
      toast.error("Failed to download");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      aria-label="Download"
      className="cursor-pointer disabled:opacity-60"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? <AiOutlineLoading className="animate-spin" /> : <SlCloudDownload />}
    </button>
  );
}
