"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

type DropZoneProps = {
  accept?: Record<string, string[]>;
  multiple?: boolean;
  maxItem?: number;
  maxSize?: number;
  onFilesChange?: (files: ExtendedFile[]) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

// Custom file type with extra fields
export type ExtendedFile = File & {
  url?: string;
  uid?: string;
};

export default function DropZone({
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif", ".svg"],
    "application/pdf": [".pdf"],
  },
  multiple = false,
  maxItem = 5,
  maxSize = 10 * 1024 * 1024, // 10 MB
  onFilesChange = () => {},
  label = "Drag & drop some files here, or click to select files",
  disabled = false,
  className = "",
}: DropZoneProps) {
  const [files, setFiles] = useState<ExtendedFile[]>([]);
  const [previewFile, setPreviewFile] = useState<ExtendedFile | null>(null);
  const [customErrors, setCustomErrors] = useState<string[]>([]);

  useEffect(() => {
    onFilesChange(files);
  }, [files]);

  const mb = (maxSize / 1024 / 1024).toFixed(1);
  const allowedExts = Object.values(accept)
    .flat()
    .map((e) => e.toLowerCase());

  const acceptedTypesStr = useMemo(() => {
    const categoryMap: Record<string, Set<string>> = {};

    Object.keys(accept).forEach((type) => {
      const [main, sub] = type.split("/");
      if (!main || !sub) return;

      let label;
      if (main === "image") label = "images";
      else if (main === "video") label = "videos";
      else if (main === "audio") label = "audio files";
      else if (type === "application/pdf") label = "PDFs";
      else label = main + " files";

      if (!categoryMap[label]) categoryMap[label] = new Set();
      if (sub !== "*") categoryMap[label].add(sub);
    });

    // Convert category map to string
    return Object.entries(categoryMap)
      .map(([category, subtypes]) => {
        const list = Array.from(subtypes).join(", ");
        return list ? `${category} (${list})` : category;
      })
      .join(", ");
  }, [accept]);

  const errorMap: Record<string, string> = useMemo(
    () => ({
      "file-invalid-type": `Only ${acceptedTypesStr} are allowed.`,
      "file-too-large": `File size should not exceed ${mb} MB.`,
      "too-many-files": `You can upload a maximum of ${maxItem} files.`,
    }),
    [acceptedTypesStr, mb, maxItem]
  );

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      const withPreview: ExtendedFile[] = acceptedFiles.map((f) => {
        const copy = f as ExtendedFile;
        copy.url = URL.createObjectURL(f);
        copy.uid = crypto.randomUUID();
        return copy;
      });

      let newFiles = multiple ? [...files, ...withPreview] : withPreview;

      // Remove duplicates (by name, size, and type)
      const seen = new Set();
      newFiles = newFiles.filter((file) => {
        const key = `${file.name}-${file.size}-${file.type}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (multiple && newFiles.length > maxItem) {
        newFiles = newFiles.slice(0, maxItem);
        setCustomErrors([errorMap["too-many-files"]]);
      } else {
        setCustomErrors([]);
      }
      setFiles(newFiles);
    },
    [files, maxItem, multiple, errorMap]
  );

  // Remove url on unmount
  useEffect(() => {
    // Store previous file references
    const previousFiles = [...files];

    return () => {
      previousFiles.forEach((f) => f.url && URL.revokeObjectURL(f.url));
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    maxSize,
    onDropAccepted,
    disabled,
    validator: (file) => {
      const errors: string[] = [];
      const ext = file.name?.split(".").pop()?.toLowerCase();
      if (file.size > maxSize) errors.push("file-too-large");
      // if (!allowedExts.includes(`.${ext}`)) errors.push("wrong-extension");
      const mimeAccepted = Object.keys(accept).some((mime) => {
        if (mime.endsWith("/*")) return file.type.startsWith(mime.split("/")[0]);
        return file.type === mime;
      });
      if (!mimeAccepted) errors.push("file-invalid-type");

      if (errors.length) {
        const messages = errors.map((code) => errorMap[code]);
        setCustomErrors((prev) => Array.from(new Set([...prev, ...messages])));
        return {
          code: "custom-error",
          message: "Custom validation failed",
        };
      }
      return null;
    },
  });

  const previews = files.map((file, i) => {
    const isImage = file.type.startsWith("image/");
    // const isPdf = file.type === "application/pdf";
    const extMatch = file.name?.match(/\.(\w+)$/);
    const ext = extMatch ? extMatch[1].toUpperCase() : "FILE";

    let thumb;
    if (isImage) {
      thumb = <img src={file.url} alt={file.name} className="w-20 h-20 object-cover rounded-md" />;
    }
    // else if (isPdf) {
    //   thumb = (
    //     <div className="w-20 h-20 flex items-center justify-center border border-gray-300 rounded-md">
    //       <span className="text-lg font-bold">PDF</span>
    //     </div>
    //   );
    // }
    else {
      thumb = (
        <Link
          href={URL.createObjectURL(file)}
          target="_blank"
          className="w-20 h-20 flex items-center justify-center border border-gray-300 rounded-md"
        >
          <span className="text-lg font-bold">{ext}</span>
        </Link>
      );
    }

    return (
      <div
        key={i}
        className="flex flex-col items-center relative cursor-pointer"
        onClick={() => isImage && setPreviewFile(file)}
      >
        <Button
          className="absolute z-10 bg-red-400 text-white w-5 h-5 min-h-5 p-3 rounded-full -top-4 -right-2"
          onClick={(e) => {
            e.stopPropagation();
            const fileToRemove = files[i];
            if (fileToRemove.url) {
              URL.revokeObjectURL(fileToRemove.url);
            }
            setFiles((prev) => prev.filter((_, idx) => idx !== i));
          }}
          disabled={disabled}
        >
          <IoClose className="w-3" />
        </Button>
        {thumb}
        <span className="text-xs truncate w-24 mt-1">{file.name}</span>
      </div>
    );
  });

  return (
    <>
      <div className={twMerge("w-full my-2", className)}>
        <div
          {...getRootProps()}
          className="w-full p-5 border border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="fixed bottom-1/6 inset-0 bg-(--linkC) z-50 flex justify-center items-center text-white text-xl font-semibold">
              Drop your files here...
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 text-center">
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-gray-500">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          )}
        </div>
        {isDragActive && (
          <div className="fixed top-5/6 inset-0 bg-red-700 dark:bg-red-800 z-50 flex justify-center items-center text-white text-xl font-semibold">
            <RiDeleteBin6Line className="w-6 h-6 mr-2" />
            Cancel Drop
          </div>
        )}

        {customErrors.length > 0 && (
          <ul className="text-red-500 text-sm mt-2 list-disc pl-5 space-y-1">
            {customErrors.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        )}

        {previews.length > 0 && <div className="flex flex-wrap gap-3 mt-4">{previews}</div>}
      </div>

      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col">
          <Button
            className="absolute z-20 top-2 right-2 text-2xl px-2 py-0"
            onClick={() => setPreviewFile(null)}
          >
            &times;
          </Button>
          <div className="flex-grow flex justify-center items-center p-4">
            {previewFile.type.startsWith("image/") && (
              <div className="relative w-full h-full">
                {/* Blurred full-background layer */}
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-cover filter blur-lg scale-110 brightness-80"
                  style={{ backgroundImage: `url(${previewFile.url})` }}
                />

                {/* Foreground image layer */}
                <div
                  className="relative bg-center bg-no-repeat bg-contain w-full h-full"
                  style={{ backgroundImage: `url(${previewFile.url})` }}
                />
              </div>
            )}
            {/* {previewFile.type === "application/pdf" && (
              <object
                data={previewFile.url}
                target="_blank"
                type="application/pdf"
                className="w-full h-full"
              />
            )} */}
            {!previewFile.type.startsWith("image/") && (
              // previewFile.type !== "application/pdf" &&
              <div className="flex flex-col items-center text-white">
                <div className="text-6xl font-bold mb-4">
                  {(previewFile.name.match(/\.(\w+)$/)?.[1] || "FILE").toUpperCase()}
                </div>
                <div className="text-xl wrap-anywhere">{previewFile.name}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
