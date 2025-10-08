"use client";

import { useActionState, useState } from "react";
import { uploadImageAction } from "./actions";
import { useSession } from "next-auth/react";
import { formatThumbnailImageUrl } from "@/utils/formatThumbnail";
import { Button } from "@shared/components/ui/Button";
import { cn } from "@shared/utils/cn";

export default function UploadPage() {
  const [state, action, isPending] = useActionState(uploadImageAction, {
    success: false,
    message: "",
  });

  type ImgType = {
    org: {
      url: string;
      width: number;
      height: number;
    };
    thumb: {
      url: string;
      width: number;
      height: number;
    };
  };
  const [img, setImg] = useState<ImgType | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const imageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgLoading(true);
    setImg(null);
    const url = e.target.value;
    // validate URL format is an image
    const img = new Image();
    img.src = url;
    img.onload = () => {
      e.target.setCustomValidity("");
      const thumbUrl = formatThumbnailImageUrl(url);
      const thumb = new Image();
      thumb.src = thumbUrl;
      thumb.onload = () => {
        setImg({
          org: { url, width: img.width, height: img.height },
          thumb: { url: thumbUrl, width: thumb.width, height: thumb.height },
        });
        setImgLoading(false);
      };
      thumb.onerror = () => {
        e.target.setCustomValidity("Please enter a valid image URL.");
        setImgLoading(false);
      };
    };
    img.onerror = () => {
      e.target.setCustomValidity("Please enter a valid image URL.");
      setImgLoading(false);
    };
  };

  const { data: session, status } = useSession();
  const allowed =
    status === "authenticated" &&
    (session?.user?.role === "admin" || session?.user?.role === "owner");

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!allowed) {
    return (
      <p className="text-center mt-10 text-red-500">You do not have permission to upload images.</p>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Upload Image (Direct URL)</h1>

      <form action={action} className="flex flex-col gap-3">
        <input
          type="url"
          name="url"
          onChange={imageUrlChange}
          placeholder="Enter direct image URL (https://...)"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="border p-2 rounded"
        />

        {img && (
          <table className="mt-3 table-fixed w-full border border-gray-700/40 text-sm">
            <thead>
              <tr className="text-base bg-gray-800/60">
                <th className="w-1/2 p-1.5 font-medium border-r border-gray-700/40">Image</th>
                <th className="w-1/2 p-1.5 font-medium">Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="p-1 border-t border-gray-700/40 border-r">
                  <img src={img.org.url} alt="Preview" className="w-full h-auto rounded-md" />
                </td>
                <td className="p-1 border-t border-gray-700/40">
                  <img src={img.thumb.url} alt="Thumbnail" className="w-full h-auto rounded-md" />
                </td>
              </tr>
              <tr className="text-center text-gray-400">
                <td className="p-1 border-t border-gray-700/40 border-r">
                  {img.org.width} x {img.org.height}
                </td>
                <td className="p-1 border-t border-gray-700/40">
                  {img.thumb.width} x {img.thumb.height}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        <Button
          type="submit"
          disabled={isPending || imgLoading}
          className={cn("mx-auto disabled:opacity-50", isPending && "cursor-wait")}
        >
          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </form>

      {state.message && (
        <p
          className={`text-center mt-4 text-sm ${
            state.success ? "text-green-600" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}

      <p className="text-center mt-6 text-gray-500 text-xs">
        Uploaded images need admin approval before appearing publicly.
      </p>
    </div>
  );
}
