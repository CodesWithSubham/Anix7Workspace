"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { tools } from ".";
import { Input } from "@shared/components/ui/Input";
import Link from "next/link";
import { cn } from "@shared/utils/cn";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconButton } from "@shared/components/ui/Button";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";

export default function ToolSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const pushed = useRef(false);

  const pathname = usePathname();

  const closeSearch = () => {
    setIsFocused(false); // Close search
    setQuery("");
    pushed.current = false; // Remove the pushed state
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isFocused) {
        closeSearch();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFocused && e.key === "Escape") {
        closeSearch();
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    if (isFocused) {
      inputRef.current?.focus();

      if (!pushed.current) {
        window.history.pushState(null, "", pathname);
        pushed.current = true;
      }
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, pathname]);

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(lower) || tool.description.toLowerCase().includes(lower),
    );
  }, [query]);

  return (
    <>
      <IconButton onClick={() => setIsFocused(true)} className="md:hidden">
        <GoSearch />
      </IconButton>

      <div
        tabIndex={0}
        className={cn("w-full max-w-lg mx-auto relative", isFocused && "z-20")}
        onFocus={() => setIsFocused(true)}
      >
        {/* Search input container */}
        <div
          className={cn(
            "w-full max-md:fixed max-md:max-w-5/6 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-top-12 md:relative transition-all duration-300 ease-in-out",
            isFocused && "max-md:top-1",
          )}
        >
          <Input
            type="text"
            ref={inputRef}
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools..."
            className={cn("px-8 rounded-full border-neutral-500", isFocused && "bg-theme-100")}
          />
          <GoSearch className="absolute left-1.5 top-1/2 -translate-y-1/2 text-neutral-500 scale-90" />
          <IoCloseCircleOutline
            onClick={() => setQuery("")}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-2 transition-all duration-300 text-neutral-500",
              query ? "cursor-pointer scale-100 hover:scale-105" : "scale-0",
            )}
          />
        </div>

        {/* Search results */}
        {isFocused && query && filteredTools.length > 0 && (
          <ul className="fixed left-1/2 -translate-x-1/2 w-5/6 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-md mt-1 max-h-[50vh] overflow-auto shadow-lg divide-y divide-black/20 dark:divide-white/20">
            {filteredTools.map((tool, i) => (
              <li key={i} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer ">
                <Link
                  className="w-full flex h-full flex-row items-center gap-2.5 overflow-hidden hover:scale-102 transition-all"
                  href={tool.link}
                  onClick={closeSearch}
                >
                  {tool.image && (
                    <div
                      className={cn(
                        "w-1/4 max-w-12 md:max-w-16 aspect-square shrink-0 flex items-center justify-center overflow-hidden",
                      )}
                    >
                      <Image
                        src={tool.image.toString()}
                        alt={tool.title || "Feature Image"}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    {tool.title && (
                      <h3 className="text-lg md:text-xl font-semibold mb-1">{tool.title}</h3>
                    )}
                    {tool.description && (
                      <p className="text-[10px] md:text-sm text-gray-700 dark:text-gray-200">
                        {tool.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* No results */}
        {isFocused && query && filteredTools.length === 0 && (
          <p className="fixed right-1/2 md:right-8 max-md:translate-x-1/2  w-5/6 md:max-w-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-md mt-1 shadow-lg text-center p-4 text-gray-700 dark:text-gray-200">
            No tools found
          </p>
        )}
      </div>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-10 invisible backdrop-blur-none transition-all duration-300",
          isFocused && "visible backdrop-blur-xs",
        )}
        onClick={closeSearch}
      />
    </>
  );
}
