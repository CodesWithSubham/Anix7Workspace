"use client";
import { PopUpBox } from "@shared/components/ui/Boxes";
import { Button, IconButton } from "@shared/components/ui/Button";
import { CopyInput } from "@shared/components/ui/Input";
import ImageContent from "@shared/components/loader/ImageContent";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DeleteSvg } from "@shared/components/svg/DeleteSvg";

type UploadedImage = {
  alias: string;
  extension: string;
  adsLabel: 0 | 1 | 2 | 3;
  createdAt: string;
};

export default function MyImages() {
  const { data: session } = useSession();

  const [pageNum, setPageNum] = useState(1);
  const [images, setImages] = useState<UploadedImage[][]>([]);
  const [total, setTotal] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [indexUrl, setIndexUrl] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [adsLoading, setAdsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getURLs = async (pageN: number) => {
      if (images[pageN - 1]) return;
      setPageLoading(true);

      try {
        const response = await fetch("/api/tools/ImageIndex/getAllByUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: pageN }),
        });

        const data = await response.json();
        if (data?.success) {
          const results = data.results;
          setImages((prev) => {
            const newUrls = [...prev];
            newUrls[pageNum - 1] = results.images;
            return newUrls;
          }); // Append new data

          setTotal(results.totalImagesCount);
          setImageUrl(results.IMGUR_IMAGE_URL);
          setIndexUrl(results.IMAGE_INDEX_URL);
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        toast.error("Failed to fetch URLs.");
        console.error(error);
      } finally {
        setPageLoading(false);
      }
    };
    getURLs(pageNum);
  }, [images, pageNum]);

  const modifyAds = async (alias: UploadedImage["alias"], ad: UploadedImage["adsLabel"]) => {
    // toast.warn("This Option Available Soon!")
    // return;
    setAdsLoading(true);
    try {
      const response = await fetch("/api/tools/ImageIndex/modifyAds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias, ad }),
      });

      const data = await response.json();
      if (data?.success) {
        setImages((prev) => {
          if (!prev[pageNum - 1]) return prev; // Ensure the page index exists

          return prev.map((group, index) =>
            index === pageNum - 1
              ? group.map((item) => (item.alias === alias ? { ...item, adsLabel: ad } : item))
              : group
          );
        });

        toast.success(data.message || "Ads updated successfully");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to update.");
      console.error(error);
    } finally {
      setAdsLoading(false);
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<UploadedImage | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openPopup = (img: UploadedImage) => {
    setSelectedUrl(img);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedUrl(null);
  };

  const handleDelete = async () => {
    if (!selectedUrl?.alias) return;
    setDeleteLoading(true);

    try {
      const response = await fetch("/api/tools/ImageIndex/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias: selectedUrl.alias }),
      });

      const res = await response.json();

      if (res?.success) {
        toast.success(res.message);
        // Remove the page and all pages after it
        setImages((prev) => prev.slice(0, pageNum - 1));
      } else {
        toast.error(res.error || "Failed to delete URL.");
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Error deleting image.");
      console.error("Delete Error:", error);
    } finally {
      setDeleteLoading(false);
      closePopup();
    }
  };

  return (
    <>
      {isClient && pageLoading ? (
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mx-auto">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex items-center w-11/12">
              <ImageContent className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : total > 0 ? (
        <div>
          <h2 className="text-3xl font-bold text-center m-5">My Uploaded Images ({total})</h2>
          <div className="columns-1 min-[420px]:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images[pageNum - 1]?.map((image) => (
              <div
                className="break-inside-avoid overflow-hidden rounded-lg even:bg-(--waveB) dark:even:bg-(--headerB) odd:bg-[#4e4e4e29] border-2 border-dotted border-(--linkC)"
                key={image.alias}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  onContextMenu={(e) => e.preventDefault()}
                  src={`${imageUrl}/${image.alias}.${image.extension}`}
                  alt={`Uploaded Image ${image.alias}`}
                  loading="lazy"
                  className="w-full h-auto select-none"
                />

                <div className="flex w-full gap-2 items-center justify-around p-1 border-y-2 border-dotted border-(--linkC)">
                  <CopyInput value={`${indexUrl}/${image.alias}`} />
                  <IconButton onClick={() => openPopup(image)} className="m-0.5 p-0">
                    <DeleteSvg />
                  </IconButton>
                </div>

                <div className="flex justify-center py-2">
                  <div className="pl-2">Ads: </div>
                  <div className="flex w-full justify-around items-center px-1">
                    {(session?.user?.role === "admin" || session?.user?.role === "owner"
                      ? ["None", "Low", "Mid", "High"]
                      : ["Off", "On"]
                    ).map((label, value) => (
                      <button
                        key={`${image.alias}-${value}`}
                        disabled={adsLoading || image.adsLabel === value}
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => modifyAds(image.alias, value as 0 | 1 | 2 | 3)}
                      >
                        <span
                          className={`w-4 h-4 rounded-full mr-1.5 border-[3.5px] border-(--waveB) outline outline-(--linkC) ${
                            image.adsLabel === value ? "bg-(--linkC)" : "bg-(--waveB)"
                          } ${adsLoading ? "opacity-70" : ""}`}
                        />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center my-10">
          <p className="text-2xl font-bold">Nothing to display.</p>
          <Button
            href="/image-uploading"
            svg={
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512">
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="m320 255.79-64-64-64 64m64 192.42V207.79"
                ></path>
              </svg>
            }
          >
            Upload Now
          </Button>
        </div>
      )}

      <div className="flex w-full gap-2 *:flex *:justify-center *:items-center *:bg-(--linkC) *:text-white *:w-full *:py-2 my-4">
        {pageNum != 1 && (
          <button
            className="rounded-l-lg hover:scale-105 transition-all duration-300"
            onClick={() => setPageNum((p) => --p)}
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24">
              <polyline
                fill="none"
                strokeWidth="2"
                points="9 6 15 12 9 18"
                transform="matrix(-1 0 0 1 24 0)"
              ></polyline>
            </svg>
            Previous
          </button>
        )}
        {images[0]?.length * pageNum < total && (
          <button
            className={`hover:scale-105 transition-all duration-300 ${
              pageNum == 1 ? "rounded-lg" : "rounded-r-lg"
            }`}
            onClick={() => setPageNum((p) => ++p)}
          >
            Next
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24">
              <polyline fill="none" strokeWidth="2" points="9 6 15 12 9 18"></polyline>
            </svg>
          </button>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {showPopup && selectedUrl && (
        <PopUpBox
          className="pb-3"
          header="Are you sure you want to delete?"
          svg={
            <svg viewBox="0 0 64 64">
              <path d="M53 20H11a1 1 0 0 1-1-1v-2a5 5 0 0 1 5-5h34a5 5 0 0 1 5 5v2a1 1 0 0 1-1 1Zm-41-2h40v-1a3 3 0 0 0-3-3H15a3 3 0 0 0-3 3Z"></path>
              <path
                d="M40 14H24a1 1 0 0 1-1-1v-1a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v1a1 1 0 0 1-1 1Zm-15-2h14a3 3 0 0 0-3-3h-8a3 3 0 0 0-3 3Zm14 38h-.2a1 1 0 0 1-.8-1.2L41 31a1 1 0 1 1 2 .3l-3 17.9a1 1 0 0 1-1 .8Zm-14 0a1 1 0 0 1-1-.8l-3-18a1 1 0 1 1 2-.2l3 17.9a1 1 0 0 1-.8 1.1Z"
                className="svgC"
              ></path>
              <path d="M41.6 57H22.4a5 5 0 0 1-5-4.2L13 24.2a1 1 0 0 1 1-1.2h36a1 1 0 0 1 1 1.1l-4.5 28.7a5 5 0 0 1-5 4.2ZM15.2 25l4.3 27.5a3 3 0 0 0 3 2.5h19a3 3 0 0 0 3-2.5L48.9 25Z"></path>
              <path
                d="M32 50a1 1 0 0 1-1-1V31a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1Z"
                className="svgC"
              ></path>
            </svg>
          }
        >
          <div className="relative h-[25vh] w-full overflow-hidden">
            <Image
              src={`${imageUrl}/${selectedUrl.alias}.${selectedUrl.extension}`}
              alt={`Uploaded Image ${selectedUrl.alias}`}
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          <p className="text-center text-sm text-(--linkC) my-2">{`${indexUrl}/${selectedUrl.alias}`}</p>
          <div className="flex justify-end items-center text-white font-bold *:px-4 *:py-2 *:rounded-full *:transition-all *:duration-300">
            <Button
              className="bg-red-600"
              onClick={handleDelete}
              disabled={deleteLoading}
              loading={deleteLoading}
              loadingText="Deleting..."
              svg={
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    stroke="none"
                    d="M360 184h-8c4 0 8-4 8-8v8h304v-8c0 4 4 8 8 8h-8v72h72v-80c0-35-29-64-64-64H352c-35 0-64 29-64 64v80h72v-72zm504 72H160c-18 0-32 14-32 32v32c0 4 4 8 8 8h60l25 523c2 34 30 61 64 61h454c34 0 62-27 64-61l25-523h60c4 0 8-4 8-8v-32c0-18-14-32-32-32zM731 840H293l-25-512h488l-25 512z"
                  />
                </svg>
              }
            >
              Delete
            </Button>
            <Button
              className="bg-(--linkC) hover:scale-105 mx-3"
              onClick={closePopup}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
          </div>
        </PopUpBox>
      )}
    </>
  );
}
