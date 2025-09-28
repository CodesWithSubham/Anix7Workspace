import { mirrorMap, upsideDownMap } from "./letters";

export const reverseText = (text: string) => Array.from(text).reverse().join("");

// --- Reverse words ---
export const reverseWords = (text: string) =>
  text
    .trim()
    .split(/\n+/)
    .reverse()
    .map((rl) => rl.split(/\s+/).reverse().join(" "))
    .join("\n");

export const reverseEachWordLettering = (text: string) =>
  text
    .split(/\n+/)
    .map((t) =>
      t
        .split(/\s+/)
        .map((w) => Array.from(w).reverse().join(""))
        .join(" ")
    )
    .join("\n");

// --- Flip logic ---
const flip = (text: string, map: Record<string, string>) =>
  Array.from(text)
    .map((ch) => map[ch] || ch)
    .join("");

export const flipTextUpsideDown = (text: string) => flip(text, upsideDownMap);
export const flipTextMirror = (text: string) => flip(text, mirrorMap);
