"use client";

import { PopUpBox } from "@shared/components/ui/Boxes";
import { Button } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import copyToClipboard from "@shared/utils/CopyToClipboard";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { deleteShortUrl, editShortUrl, modifyAds } from "./action";
import { ErrorText } from "@shared/components/ui/Paragraph";
import { Urls } from "./types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useSession } from "@shared/auth/client";

export default function ShortedURLs({
  urls,
  setUrls,
  total,
  setTotal,
}: {
  urls: Urls[];
  setUrls: React.Dispatch<React.SetStateAction<Urls[]>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { data: session } = useSession();
  const [page, setPage] = useState(0);
  const [baseUrl, setBaseUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [adsLoading, setAdsLoading] = useState(false);

  // =========================== //
  // ========= My URLs ========= //
  // =========================== //
  const fetchedPages = useRef(new Set());
  useEffect(() => {
    const getURLs = async (pageNum: number) => {
      // Only fetch if this page hasn't been fetched already
      if (fetchedPages.current.has(pageNum)) return;
      fetchedPages.current.add(pageNum);
      setLoading(true);

      try {
        const response = await fetch("/api/tools/URLShortener/getByUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: pageNum }),
        });

        const data = await response.json();
        if (data?.success) {
          const results = data.results;
          setUrls((prevUrls) => [...prevUrls, ...results.urls]); // Append new data
          setTotal(results.totalUrlsCount);
          setBaseUrl(results.BASE_URL);
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        toast.error("Failed to fetch URLs.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getURLs(page);
  }, [page, setTotal, setUrls]);

  const modifyWaiting = async (alias: string, ad: number) => {
    setAdsLoading(true);
    try {
      const data = await modifyAds({ alias, ad });
      if (data?.success) {
        setUrls((prevUrls) =>
          prevUrls.map((item) => (item.alias === alias ? { ...item, adsLabel: ad } : item))
        );
        toast.success(data.message || "Waiting updated successfully");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to update waiting.");
      console.error(error);
    } finally {
      setAdsLoading(false);
    }
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<Urls | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openDeletePopup = (url: Urls) => {
    setSelectedUrl(url);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setSelectedUrl(null);
  };

  const handleDelete = async () => {
    if (!selectedUrl) return;
    setDeleteLoading(true);
    // return toast.info("Delete Available Soon");
    try {
      const res = await deleteShortUrl({ alias: selectedUrl.alias });

      if (res?.success) {
        toast.success(res.message);
        setUrls((prev) => prev.filter((url) => url.alias !== selectedUrl.alias)); // Remove from state
        setTotal((p) => --p);
      } else {
        toast.warn(res.message || "Failed to delete URL.");
      }
    } catch (error) {
      toast.error("Error deleting URL.");
      console.error(error);
    } finally {
      setDeleteLoading(false);
      closeDeletePopup();
    }
  };

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedUrl, setEditedUrl] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editUrlError, setEditUrlError] = useState("");

  const openEditPopup = (url: Urls) => {
    setSelectedUrl(url);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setSelectedUrl(null);
  };

  const isValidUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setEditUrlError("");
    setEditedUrl("");

    if (url.startsWith("http://")) {
      setEditUrlError("Only HTTPS URLs are allowed.");
      return;
    }

    const urlPattern = /^(https:\/\/)((?!localhost)[\w.-]+)\.([a-z]{2,})(:\d{1,5})?(\/.*)?$/i;
    if (!urlPattern.test(url)) {
      setEditUrlError("Invalid URL");
      return;
    }
    setEditedUrl(url);
  };

  const handleEdit = async () => {
    if (!selectedUrl || !editedUrl) return;
    setEditLoading(true);

    try {
      const res = await editShortUrl({ alias: selectedUrl.alias, editedUrl });
      if (res?.success) {
        toast.success(res.message);
        setUrls((prev) =>
          prev.map((url) =>
            url.alias === selectedUrl.alias ? { ...url, longUrl: editedUrl } : url
          )
        );
      } else {
        toast.warn(res.message || "Failed to update URL.");
      }
    } catch (error) {
      toast.error("Error while updating URL.");
      console.error(error);
    } finally {
      setEditLoading(false);
      closeEditPopup();
    }
  };
  return (
    <>
      {/* ======= My URLs ======= */}
      <h2>
        My Shorted URLs (<span>{total}</span>)
      </h2>
      {urls?.length ? (
        <>
          <table className="urlCards my-2 w-full border-collapse text-center">
            <thead>
              <tr>
                <th className=" border border-black">Urls</th>
                <th className=" border border-black">
                  Waiting<span className="text-xs">*</span>
                </th>
                <th className=" border border-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {urls?.map((url) => (
                <tr key={url.alias}>
                  {/* URLs */}
                  <td className="w-1/2 pt-2 border border-black">
                    <div className="py-4 w-11/12 mx-auto relative">
                      <label className="text-xs text-theme-450 absolute top-0 left-1">
                        Original Url
                      </label>
                      <input
                        className="border border-dotted border-theme-450 w-full bg-transparent outline-hidden py-1 pl-2 pr-7 rounded-full"
                        readOnly
                        value={url.longUrl}
                      />
                      <svg
                        viewBox="0 0 20 20"
                        className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all duration-300"
                        onClick={() => window.open(url.longUrl, "_blank")}
                      >
                        <path d="M3 6.25C3 4.45 4.46 3 6.25 3H14c1.8 0 3.25 1.46 3.25 3.25v2a.75.75 0 0 1-1.5 0v-2c0-.97-.78-1.75-1.75-1.75H6.25c-.97 0-1.75.78-1.75 1.75v7.5c0 .97.78 1.75 1.75 1.75h4a.75.75 0 0 1 0 1.5h-4A3.25 3.25 0 0 1 3 13.75v-7.5Z"></path>
                        <path
                          d="M8 8.75c0-.41.34-.75.75-.75h4.5a.75.75 0 0 1 0 1.5h-2.69l5.22 5.22a.75.75 0 1 1-1.06 1.06L9.5 10.56v2.69a.75.75 0 0 1-1.5 0v-4.5Z"
                          className="svgC"
                        ></path>
                      </svg>
                    </div>
                    <div className="py-4 w-11/12 mx-auto relative">
                      <label className="text-xs text-theme-450 absolute top-0 left-1">
                        Short Url
                      </label>
                      <input
                        className="border border-dotted border-theme-450 w-full bg-transparent outline-hidden py-1 pl-2 pr-7 rounded-full"
                        readOnly
                        value={baseUrl + "/" + url.alias}
                      />
                      <svg
                        viewBox="0 0 24 24"
                        className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all duration-300"
                        onClick={() => copyToClipboard(baseUrl + "/" + url.alias)}
                      >
                        <path
                          className="svgC"
                          d="M16 20H8a3 3 0 0 1-3-3V7a1 1 0 0 0-2 0v10a5 5 0 0 0 5 5h8a1 1 0 0 0 0-2Zm5-11.06a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09L14.06 2H10a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8.94Zm-6-3.53L17.59 8H16a1 1 0 0 1-1-1ZM19 15a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v3a3 3 0 0 0 3 3h3Z"
                        ></path>
                      </svg>
                    </div>
                  </td>
                  {/* Ads */}
                  <td className="p-2 border border-black">
                    <div className="flex flex-col justify-around items-start gap-0.5 disabled:*:opacity-70 min-h-24">
                      {(session?.user?.role === "admin" || session?.user?.role === "owner"
                        ? ["None", "Low", "Mid", "High"]
                        : ["Off", "On"]
                      ).map((label, i) => (
                        <button
                          key={i}
                          disabled={adsLoading}
                          onClick={() => modifyWaiting(url.alias, i)}
                          className="cursor-pointer"
                        >
                          <span
                            className={`w-4 h-4 rounded-full mr-[6px] inline-block border-[3.5px] border-theme-150 outline outline-theme-450 ${
                              url.adsLabel === i ? "bg-theme-450" : "bg-theme-150"
                            }`}
                          />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  </td>
                  {/* Actions */}
                  <td className=" border border-black">
                    <div className="flex flex-col space-y-2 m-2 *:rounded-full">
                      <Button onClick={() => openEditPopup(url)}>Edit</Button>
                      <Button className="bg-red-500" onClick={() => openDeletePopup(url)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {total > urls.length && (
            <button
              className="block w-1/2 max-w-96 bg-theme-450 p-3 mx-auto rounded-full text-white font-bold disabled:opacity-80 disabled:cursor-not-allowed enabled:hover:scale-105 transition-all duration-300"
              onClick={() => setPage((p) => ++p)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      ) : (
        <div>You have no shortened URLs</div>
      )}
      {!!urls.length && (
        <div className="mt-6 mb-14 text-xs text-gray-600">
          * Waiting time is the 3-second delay before the URL redirects to the original URL.
        </div>
      )}

      {/* Delete Confirmation DeletePopup */}
      {showDeletePopup && selectedUrl && (
        <PopUpBox header="Are you sure you want to delete?" svg={<RiDeleteBin6Line />}>
          <p className="my-2">
            <span className="text-theme-450">Original URL:</span> {selectedUrl.longUrl}
          </p>
          <p>
            <span className="text-theme-450">Shortened URL:</span>{" "}
            {baseUrl + "/" + selectedUrl.alias}
          </p>
          <div className="flex justify-end items-center text-white font-bold mt-5">
            <Button
              className="bg-red-600 hover:scale-105"
              onClick={handleDelete}
              loading={deleteLoading}
              loadingText="Deleting..."
            >
              Delete
            </Button>
            <Button
              className="bg-theme-450 hover:scale-105 mx-3"
              onClick={closeDeletePopup}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
          </div>
        </PopUpBox>
      )}

      {/* Edit Popup */}
      {showEditPopup && selectedUrl && (
        <PopUpBox
          closeable={true}
          header="Edit URL"
          onClose={closeEditPopup}
          svg={<IoDocumentTextOutline />}
        >
          <div className="flex flex-col mb-5 px-2">
            <label htmlFor="editShortedUrl" className="text-theme-450 text-xs ml-1">
              Shorted URL
            </label>
            <Input
              type="url"
              readOnly
              defaultValue={baseUrl + "/" + selectedUrl.alias}
              className="mb-3"
            />

            <label htmlFor="editOrgUrl" className="text-theme-450 text-xs ml-1">
              Original URL
            </label>
            <Input
              type="url"
              id="editOrgUrl"
              onChange={isValidUrl}
              defaultValue={selectedUrl.longUrl}
            />
            <ErrorText>{editUrlError}</ErrorText>
          </div>
          <div className="flex justify-end items-center text-white font-bold mb-px mr-1">
            <Button
              onClick={handleEdit}
              disabled={!editedUrl || editedUrl === selectedUrl.longUrl}
              loading={editLoading}
              loadingText="Saving..."
            >
              Save
            </Button>
          </div>
        </PopUpBox>
      )}
    </>
  );
}
