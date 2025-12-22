"use client";

import { useMemo, useState } from "react";
import { Button } from "@shared/components/ui/Button";
import { TextArea } from "@shared/components/ui/Input";
import Section from "@shared/components/ui/Section";
import { cn } from "@shared/utils/cn";
import Hr from "@shared/components/ui/Hr";
import {
  flipTextMirror,
  flipTextUpsideDown,
  reverseEachWordLettering,
  reverseText,
  reverseWords,
} from "./functions";

type reverseT = "word" | "each-word-letter" | "full" | null;
type flipT = "upside-down" | "mirror" | null;

export default function ReverseTextPage() {
  const [text, setText] = useState("");
  const [reverseAction, setReverseAction] = useState<reverseT>("full");
  const [flipAction, setFlipAction] = useState<flipT>(null);

  const result = useMemo(() => {
    if (!text) return "";

    const res =
      reverseAction === "full"
        ? reverseText(text)
        : reverseAction === "word"
        ? reverseWords(text)
        : reverseAction === "each-word-letter"
        ? reverseEachWordLettering(text)
        : text;

    return flipAction === "upside-down"
      ? flipTextUpsideDown(res)
      : flipAction === "mirror"
      ? flipTextMirror(res)
      : res;
  }, [text, reverseAction, flipAction]);

  // --- Share / Copy ---
  const shareText = async () => {
    const payload = result || text;
    if (!payload) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Reverse Text Generator",
          text: payload,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(payload);
      alert("Copied to clipboard!");
    }
  };

  return (
    <Section className="max-w-3xl mx-auto p-4 space-y-4" title="🌀 Reverse Text Generator">
      {/* Input box */}
      <TextArea
        onChange={(e) => setText(e.target.value)}
        placeholder="Write some text here ..."
        maxLength={30000}
      />

      <div>
        <h3>Reverse</h3>
        <div>
          <Button
            onClick={() => setReverseAction((p) => (p === "full" ? null : "full"))}
            className={cn(
              "opacity-100 border-2 border-(--linkC)",
              reverseAction !== "full" && "bg-transparent not-dark:text-gray-600"
            )}
          >
            Full
          </Button>
          <Button
            onClick={() => setReverseAction((p) => (p === "word" ? null : "word"))}
            className={cn(
              "opacity-100 border-2 border-(--linkC)",
              reverseAction !== "word" && "bg-transparent not-dark:text-gray-600"
            )}
          >
            Word
          </Button>
          <Button
            onClick={() =>
              setReverseAction((p) => (p === "each-word-letter" ? null : "each-word-letter"))
            }
            className={cn(
              "opacity-100 border-2 border-(--linkC)",
              reverseAction !== "each-word-letter" && "bg-transparent not-dark:text-gray-600"
            )}
          >
            Each Word&apos;s Letter
          </Button>
        </div>
        <h3>Flip</h3>
        <div>
          <Button
            onClick={() => setFlipAction((p) => (p === "upside-down" ? null : "upside-down"))}
            className={cn(
              "opacity-100 border-2 border-(--linkC)",
              flipAction !== "upside-down" && "bg-transparent not-dark:text-gray-600"
            )}
          >
            Upside Down
          </Button>
          <Button
            onClick={() => setFlipAction((p) => (p === "mirror" ? null : "mirror"))}
            className={cn(
              "opacity-100 border-2 border-(--linkC)",
              flipAction !== "mirror" && "bg-transparent not-dark:text-gray-600"
            )}
          >
            Mirror
          </Button>
        </div>
      </div>
      <Hr />

      {/* Result output */}
      {result && (
        <div className="relative bg-inherit">
          <h2 className="absolute bg-inherit top-1.75 left-px right-px rounded-t-lg text-sm text-gray-400 pl-2">
            Result:
          </h2>
          <TextArea className="pt-5" value={result} onFocus={(e) => e.target.select()} readOnly />
        </div>
      )}

      {/* Share */}
      <div className="flex justify-center gap-2">
        <Button onClick={shareText}>Share / Copy</Button>
      </div>
    </Section>
  );
}
