import { mirrorMap, upsideDownMap } from "./letters";

export const reverseText = (text) => [...text].reverse().join("");

// --- Reverse words ---
export const reverseWords = (text) =>
  text
    .split(/\n+/)
    .reverse()
    .map((t) => t.split(/\s+/).filter(Boolean).reverse().join(" "))
    .join("\n");

export const reverseEachWordLettering = (text) =>
  text
    .split(/\n+/)
    .map((t) =>
      t
        .split(/\s+/)
        .map((w) => [...w].reverse().join(""))
        .join(" ")
    )
    .join("\n");

// --- Flip logic ---
export const flipTextUpsideDown = (text) => [...text].map((ch) => upsideDownMap[ch] || ch).join("");

export const flipTextMirror = (text) => [...text].map((ch) => mirrorMap[ch] || ch).join("");
