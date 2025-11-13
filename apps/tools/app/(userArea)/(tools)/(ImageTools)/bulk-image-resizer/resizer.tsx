"use client";

import DropZone from "@shared/components/ui/DropZone";
import { useState, useEffect } from "react";
import JSZip from "jszip";
import { Checkbox, Input, SliderWithTooltip } from "@shared/components/ui/Input";
import { Button } from "@shared/components/ui/Button";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { formatBytes } from "@shared/utils/unit";
import { WorkBox } from "@shared/components/ui/Boxes";
import { IoClose } from "react-icons/io5";

type ImageFile = File & {
  uid: string;
  url: string;
  width: number;
  height: number;
  resizedBlob?: Blob;
  resizedUrl?: string;
  resizedWidth?: number;
  resizedHeight?: number;
  type: string; // keep type because File already has one
};

export default function Resizer() {
  const [images, setImages] = useState<ImageFile[]>([]); // { file, url, width, height, uid, name, resizedBlob, resizedUrl }
  const [widthType, setWidthType] = useState("pixels");
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [quality, setQuality] = useState(90);
  const [isCompress, setIsCompress] = useState(false);
  const [bulkDownloadLoading, setBulkDownloadLoading] = useState(false);
  const [widthInput, setWidthInput] = useState(0);
  const [heightInput, setHeightInput] = useState(0);
  const [maxWidth, setMaxWidth] = useState(16);
  const [maxHeight, setMaxHeight] = useState(16);
  const [loading, setLoading] = useState({ resize: false, downloadAll: false });

  useEffect(() => {
    console.log(quality, loading);
  }, [quality, loading]);

  const handleFileChange = (files: File[]) => {
    const newImages: ImageFile[] = files.map((f) => {
      const uid = crypto.randomUUID();
      const url = URL.createObjectURL(f);
      return Object.assign(f, {
        uid,
        url,
        width: 0,
        height: 0,
      });
    });
    setImages(newImages);
  };

  useEffect(() => {
    images.forEach((img, index) => {
      if (img.width === 0 || img.height === 0) {
        const image = new window.Image();
        image.onload = () => {
          setImages((prev) => {
            const updated = [...prev];
            updated[index].width = image.width;
            updated[index].height = image.height;

            return updated;
          });
          setMaxWidth((p) => (image.width > p ? image.width : p));
          setMaxHeight((p) => (image.height > p ? image.height : p));
        };
        image.src = img.url;
      }
    });
  }, [images]);

  useEffect(() => {
    setWidthInput(widthType === "pixels" ? maxWidth : 100);
    setHeightInput(widthType === "pixels" ? maxHeight : 100);
  }, [maxWidth, maxHeight, widthType]);

  const handleResize = async () => {
    setLoading((p) => ({ ...p, resize: true }));
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Canvas 2D context not available");
      setLoading((p) => ({ ...p, resize: false }));
      return;
    }

    const updatedImages = [...images];
    let index = 0;

    const processNext = () => {
      if (index >= updatedImages.length) {
        setImages(updatedImages);
        setLoading((p) => ({ ...p, resize: false }));
        return;
      }

      const img = updatedImages[index];
      const image = new window.Image();
      image.onload = () => {
        let w = img.width;
        let h = img.height;

        if (widthType === "percent") {
          w = (w * (widthInput || 100)) / 100;
          h = (h * (heightInput || 100)) / 100;
        } else {
          if (widthInput) w = widthInput;
          if (heightInput) h = heightInput;
        }

        if (maintainAspect) {
          h = Math.round((img.height / img.width) * w);
        }

        canvas.width = w;
        canvas.height = h;

        if (isCompress && ["image/png", "image/webp", "image/svg+xml"].includes(img.type)) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, w, h);
        }

        ctx.drawImage(image, 0, 0, w, h);

        const finalMime = isCompress ? "image/jpeg" : img.type;
        const finalQuality = isCompress ? quality / 100 : 1;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.error("Failed to create blob for resized image");
              index++;
              setTimeout(processNext, 50);
              return;
            }
            const resizedUrl = URL.createObjectURL(blob);
            updatedImages[index].resizedBlob = blob;
            updatedImages[index].resizedWidth = w;
            updatedImages[index].resizedHeight = h;
            updatedImages[index].resizedUrl = resizedUrl;

            index++;
            setTimeout(processNext, 100); // <- delay here to free up the UI thread
          },
          finalMime,
          finalQuality
        );
      };
      image.src = img.url;
    };

    processNext();
  };

  const handleDownloadAll = async () => {
    setBulkDownloadLoading(true);
    const zip = new JSZip();
    images.forEach((img) => {
      if (img.resizedBlob) {
        const fileName = `${img.name.replace(/\.\w+$/, "")}.${img.resizedBlob?.type.split("/")[1]}`;
        zip.file(fileName, img.resizedBlob);
      }
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Anix7_Tools_Resized_Images.zip";
    a.click();
    URL.revokeObjectURL(a.href);
    setBulkDownloadLoading(false);
  };

  return (
    <WorkBox id="BulkImageResizer">
      <div className="max-w-2xl mx-auto">
        <DropZone
          onFilesChange={handleFileChange}
          accept={{ "image/*": [] }}
          multiple
          maxItem={12}
          maxSize={50 * 1024 * 1024} // 50 MB
          label="Drag & drop your image here, or click to select"
          disabled={loading.resize}
        />
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex gap-1 md:gap-2 items-center">
            <div className="relative w-full">
              <select
                className="absolute cursor-pointer z-10 top-1/2 -translate-y-1/2 mt-1.5 right-1 outline-hidden bg-transparent"
                onChange={(e) => setWidthType(e.target.value)}
                value={widthType}
              >
                <option value="pixels">PX</option>
                <option value="percent">%</option>
              </select>
              <Input
                className="no-spinner"
                placeholder="Width"
                type="number"
                value={widthInput}
                onChange={(e) => setWidthInput(Number(e.target.value))} // raw value
                onBlur={() => {
                  const clamped =
                    widthType === "percent"
                      ? Math.max(10, Math.min(100, widthInput))
                      : Math.max(16, Math.min(maxWidth, widthInput));
                  setWidthInput(clamped);
                }}
                label="Width"
                min={widthType === "percent" ? 10 : 16}
                max={widthType === "percent" ? 100 : maxWidth}
              />
            </div>

            {!maintainAspect && (
              <>
                <IoClose className="shrink-0 mt-3" />
                <div className="relative w-full">
                  <select
                    className="absolute cursor-pointer z-10 top-1/2 -translate-y-1/2 mt-1.5 right-1 outline-hidden bg-transparent"
                    onChange={(e) => setWidthType(e.target.value)}
                    value={widthType}
                  >
                    <option value="pixels">PX</option>
                    <option value="percent">%</option>
                  </select>
                  <Input
                    className="no-spinner"
                    placeholder="Height"
                    type="number"
                    value={heightInput}
                    onChange={(e) => setHeightInput(Number(e.target.value))}
                    onBlur={() => {
                      const num = Number(heightInput);
                      const clamped =
                        widthType === "percent"
                          ? Math.max(10, Math.min(100, num))
                          : Math.max(16, Math.min(maxHeight, num));
                      setHeightInput(clamped);
                    }}
                    label="Height"
                    min={widthType === "percent" ? 10 : 16}
                    max={widthType === "percent" ? 100 : maxHeight}
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2 flex-wrap justify-around">
            <Checkbox
              type="checkbox"
              checked={maintainAspect}
              onChange={() => setMaintainAspect(!maintainAspect)}
              label="Maintain Aspect"
              disabled={loading.resize || loading.downloadAll}
            />
            <Checkbox
              type="checkbox"
              checked={isCompress}
              onChange={() => setIsCompress(!isCompress)}
              label="Reduce Quality"
              disabled={loading.resize || loading.downloadAll}
            />
          </div>
          {isCompress && (
            <SliderWithTooltip
              type="range"
              min={20}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
            />
          )}
          <div className="flex gap-2 mt-2 flex-wrap justify-around">
            <Button onClick={handleResize} loading={loading.resize} disabled={!images.length}>
              Resize
            </Button>
            {images.filter((img) => img.resizedUrl).length >= 2 && (
              <Button
                onClick={handleDownloadAll}
                disabled={bulkDownloadLoading}
                className="bg-green-500"
              >
                {bulkDownloadLoading ? "Zipping..." : "Download All"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-5">
        <div className="flex flex-wrap gap-2 justify-around">
          {!loading.resize &&
            images
              .filter((img) => img.resizedUrl)
              .map((img) => (
                <div
                  key={img.uid}
                  className="w-full max-w-48 flex flex-col rounded-lg overflow-hidden bg-white dark:bg-(--headerB) border-2 border-dotted border-(--linkC) text-center"
                >
                  <div
                    className="w-full aspect-square bg-contain bg-center bg-no-repeat mb-1"
                    style={{ backgroundImage: `url(${img.resizedUrl})` }}
                  />

                  <p className="flex justify-around gap-2 flex-wrap">
                    <span className="text-nowrap">
                      {img.resizedWidth} &times; {img.resizedHeight}
                    </span>
                    {img.resizedBlob && (
                      <span className="text-nowrap">{formatBytes(img.resizedBlob.size)}</span>
                    )}
                  </p>

                  <Button
                    href={img.resizedUrl}
                    download={`${img.name.replace(/\.\w+$/, "")}.${
                      img.resizedBlob?.type.split("/")[1]
                    }`}
                  >
                    <FaCloudDownloadAlt /> Download
                  </Button>
                </div>
              ))}
        </div>
      </div>
    </WorkBox>
  );
}

export function LaunchResizer() {
  return (
    <div className="text-center mt-8">
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="rounded-lg"
      >
        Launch Image Resizer Tool
      </Button>
    </div>
  );
}
