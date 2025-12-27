"use client";

import { useActionState, useState } from "react";
import { uploadImageAction } from "./actions";
import { Button } from "@shared/components/ui/Button";
import { cn } from "@shared/utils/cn";
import { useSession } from "@shared/auth/client";
import { Input } from "@shared/components/ui/Input";

export default function UploadPage() {
  const [state, action, isPending] = useActionState(uploadImageAction, {
    success: false,
    error: "",
  });

  type UrlType = "originalUrl" | "displayUrl" | "thumbnailUrl";

  type ImgMeta = {
    url: string;
    width: number;
    height: number;
  };

  type ImgType = Record<UrlType, ImgMeta | null>;

  const [img, setImg] = useState<ImgType>({
    originalUrl: null,
    displayUrl: null,
    thumbnailUrl: null,
  });

  const [imgLoading, setImgLoading] = useState(false);

  const imageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.name as UrlType;
    const url = e.target.value.trim();
    if (!url) return;

    setImgLoading(true);
    setImg((prev) => ({ ...prev, [type]: null }));

    const image = new Image();
    image.src = url;

    image.onload = () => {
      e.target.setCustomValidity("");

      setImg((prev) => ({
        ...prev,
        [type]: {
          url,
          width: image.width,
          height: image.height,
          // type: image.
        },
      }));

      setImgLoading(false);
    };

    image.onerror = () => {
      e.target.setCustomValidity("Please enter a valid image URL.");
      setImgLoading(false);
    };
  };

  const { data: session, isPending: status } = useSession();
  const allowed = session?.user?.role === "admin" || session?.user?.role === "owner";

  if (status) {
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
        <Input
          type="url"
          name="originalUrl"
          onChange={imageUrlChange}
          placeholder="https://..."
          label="Enter original image URL"
          required
          autoComplete="off"
        />
        <Input
          type="url"
          name="displayUrl"
          onChange={imageUrlChange}
          placeholder="https://..."
          label="Enter display image URL (512 x 512)"
          required
          autoComplete="off"
        />
        <Input
          type="url"
          name="thumbnailUrl"
          onChange={imageUrlChange}
          placeholder="https://..."
          label="Enter thumbnail image URL (320 x 320)"
          required
          autoComplete="off"
        />

        <Input
          type="text"
          name="tags"
          placeholder="profile pic, cat, dog"
          label="Tags (comma separated)"
        />

        {img && (
          <table className="mt-3 w-full border border-gray-700/40 text-sm">
            <thead className=" *:w-1/3">
              <tr className="bg-gray-800/60">
                <th className="p-2 border-r">Original</th>
                <th className="p-2 border-r">Display</th>
                <th className="p-2">Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              <tr className="*:w-1/3 border-b">
                <td className="p-1 border-r">
                  {img.originalUrl?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img.originalUrl.url} className="rounded-md w-full" alt="Original Image" />
                  )}
                </td>
                <td className="p-1 border-r">
                  {img.displayUrl?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img.displayUrl.url} className="rounded-md w-full" alt="Display Image" />
                  )}
                </td>
                <td className="p-1">
                  {img.thumbnailUrl?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img.thumbnailUrl.url} className="rounded-md w-full" alt="Thumbnail" />
                  )}
                </td>
              </tr>
              <tr className="text-center text-gray-400">
                <td className="p-2 border-r">
                  {img.originalUrl?.width} x {img.originalUrl?.height}
                </td>
                <td className="p-2">
                  {img.displayUrl?.width} x {img.displayUrl?.height}
                </td>
                <td className="p-2">
                  {img.thumbnailUrl?.width} x {img.thumbnailUrl?.height}
                </td>
              </tr>
            </tbody>
          </table>
        )}
        
        <div className="w-full max-w-sm flex gap-2 items-center mx-auto">
          <Input
            type="number"
            name="width"
            disabled
            defaultValue={img.originalUrl?.width}
            label="Original Image Width"
          />{" "}
          x
          <Input
            type="number"
            name="height"
            disabled
            defaultValue={img.originalUrl?.height}
            label="Original Image Height"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending || imgLoading}
          className={cn("mx-auto disabled:opacity-50", isPending && "cursor-wait")}
        >
          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </form>

      {state.success && (
        <p className={"text-center mt-4 text-sm text-green-600"}>{state.message}</p>
      )}
      {!state.success && <p className={"text-center mt-4 text-sm text-red-500"}>{state.error}</p>}

      <p className="text-center mt-6 text-gray-500 text-xs">
        Uploaded images need admin approval before appearing publicly.
      </p>
    </div>
  );
}
