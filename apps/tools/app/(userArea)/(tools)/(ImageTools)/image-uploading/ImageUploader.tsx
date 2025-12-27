// /app/(userArea)/image-uploading/page.js
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { upload } from "@vercel/blob/client";
import { Button } from "@shared/components/ui/Button";
import { CopyInput } from "@shared/components/ui/Input";
import DropZone, { ExtendedFile } from "@shared/components/ui/DropZone";
import Hr from "@shared/components/ui/Hr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";

export default function ImageUploader() {
  const [image, setImage] = useState<ExtendedFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedURL, setUploadedURL] = useState<string | null>(null);

  const handleFileChange = (files: ExtendedFile[]) => {
    setImage(null);
    setUploadedURL(null);
    const file = files[0];
    if (!file) return;

    setImage(file);
  };

  const handleUpload = async () => {
    setUploading(true);

    try {
      if (!image) {
        toast.error("No image selected");
        return;
      }
      const id = window.crypto.randomUUID();

      const newBlob = await upload(image.name, image, {
        access: "public",
        handleUploadUrl: "/api/tools/ImageIndex/upload/blob",
        clientPayload: id,
      });

      const res = await fetch("/api/tools/ImageIndex/upload/byBlob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: newBlob.url, name: image.name }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Upload failed");
        return;
      }

      console.log(newBlob);
      setUploadedURL(data.imageUrl);
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const acceptedTypes = Object.fromEntries(
    ["png", "jpeg", "gif", "apng", "tiff"].map((ext) => [`image/${ext}`, []])
  );

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Image Uploader</h1>

      <DropZone
        className="max-w-lg"
        accept={acceptedTypes}
        onFilesChange={handleFileChange}
        maxSize={10 * 1024 * 1024} // 10 MB
        label="Drag & drop your image here, or click to select"
      />

      {uploadedURL && (
        <div className="w-5/6 max-w-xs mt-4">
          <p className="text-xs text-theme-450 ml-2 -mb-1">Uploaded Image URL</p>
          <CopyInput value={uploadedURL} />
        </div>
      )}

      {!uploadedURL && image && (
        <Button
          onClick={handleUpload}
          className="flex flex-col justify-center items-center gap-2 mt-4 "
          disabled={uploading || !image}
          loading={uploading}
          loadingText="Uploading..."
          svg={<IoMdCloudUpload />}
        >
          Upload Image
        </Button>
      )}

      <Hr />
      <Button href="/image-uploading/my-uploads" svg={<IoDocumentTextOutline />}>
        My Uploads
      </Button>
      <Hr />
    </div>
  );
}
