// /app/(pages)/url-shortener/page.js

"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { checkAlias, createShortUrl } from "./action";
import ShortedURLs from "./ShortedURLs";
import { twMerge } from "tailwind-merge";
import { WorkBox } from "@shared/components/ui/Boxes";
import { CopyInput, Input } from "@shared/components/ui/Input";
import { ErrorText } from "@shared/components/ui/Paragraph";
import { Button } from "@shared/components/ui/Button";
import { Urls } from "./types";
import { AiOutlineLoading } from "react-icons/ai";

export default function UrlShortener() {
  // Create URL Box
  const [longUrl, setLongUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isAlias, setIsAlias] = useState(false);
  const [alias, setAlias] = useState("");
  const [aliasError, setAliasError] = useState("");
  const [aliasLoading, setAliasLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  // My URLs
  const [urls, setUrls] = useState<Urls[]>([]);
  const [total, setTotal] = useState(0);

  // Check alias using server action
  const handleAlias = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setAlias("");
    setAliasError("");

    if (value.length === 0) return;

    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setAliasError("Alias must contain only letters and numbers.");
      return;
    }

    if (value.length !== 6) {
      setAliasError("Alias must be 6 characters long.");
      return;
    }

    try {
      setAliasLoading(true);

      // 🔥 Use server action directly
      const res = await checkAlias({ alias: value });

      if (!res.success) {
        setAliasError(res.message || "Failed to check alias.");
        return;
      }

      if (res.data?.available) {
        setAlias(value);
      } else {
        setAliasError(res.message || "Alias is already taken.");
      }
    } catch (error) {
      console.error("Error checking alias:", error);
      setAliasError("Something went wrong. Please try again.");
    } finally {
      setAliasLoading(false);
    }
  };

  // Validate URL
  const validateUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setUrlError("");
    setLongUrl("");

    if (url.startsWith("http://")) {
      setUrlError("Only HTTPS URLs are allowed.");
      return;
    }

    const urlPattern = /^(https:\/\/)((?!localhost)[\w.-]+)\.([a-z]{2,})(:\d{1,5})?(\/.*)?$/i;
    if (urlPattern.test(url)) {
      setLongUrl(url);
    } else {
      setUrlError("Invalid URL");
    }
  };

  // Handle Create URL form
  const handleSubmit = async () => {
    setSubmitLoading(true);

    try {
      const res = await createShortUrl({ longUrl, alias });

      if (!res.success) {
        setUrlError(res.message || "Failed to shorten URL");
        return;
      }

      const { data } = res;

      if (data) {
        if (data.isNew) {
          setUrls((prev) => [data, ...prev]);
          setTotal((t) => t + 1);
        }

        setShortUrl(data.shortUrl);
        setLongUrl("");
        setAlias("");
        setIsAlias(false);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    } catch (error) {
      toast.error("Unexpected error occurred.");
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      {/* ======= Create URL ========= */}
      <WorkBox className="border max-w-lg my-5">
        <h2 className="mb-5">URL Shortener</h2>
        {!shortUrl ? (
          <>
            <Input
              type="url"
              placeholder="Enter Long URL"
              autoComplete="off"
              onChange={(e) => validateUrl(e)}
            />
            <ErrorText>{urlError}</ErrorText>

            <button
              className="my-2 text-(--linkC) font-bold cursor-pointer"
              onClick={() => setIsAlias(!isAlias)}
            >
              {isAlias ? "- Remove Alias" : "+ Add Alias"}
            </button>

            <div
              className={twMerge(
                "relative opacity-0 transition-all duration-500",
                isAlias ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden"
              )}
            >
              <Input
                type="text"
                placeholder="Enter 6 characters"
                autoComplete="off"
                onChange={handleAlias}
                maxLength={6}
              />

              <span className="absolute top-1/2 right-3 -translate-y-1/2 text-green-600 font-bold">
                {alias ? "Available ✓" : aliasLoading && <AiOutlineLoading className="animate-spin" />}
              </span>

              <ErrorText>{aliasError}</ErrorText>
            </div>
            {/* <!-- Submit Button --> */}
            <div className="flex justify-end w-full">
              <Button
                type="submit"
                className="w-1/3"
                disabled={
                  !!((isAlias && (!alias || aliasError)) || !longUrl || urlError || submitLoading)
                }
                onClick={handleSubmit}
                loading={submitLoading}
              >
                Submit
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* <!-- Short URL Display --> */}
            <CopyInput value={shortUrl} />
            {/* <!-- Reset Button --> */}
            <Button onClick={() => setShortUrl("")}>Generate New</Button>
          </>
        )}
      </WorkBox>

      <ShortedURLs urls={urls} setUrls={setUrls} total={total} setTotal={setTotal} />
    </>
  );
}
