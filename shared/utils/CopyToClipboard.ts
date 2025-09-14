"use client";
import { toast } from "react-toastify";

export default function copyToClipboard(text: string) {
  // Modern Clipboard API
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch((err) => {
        console.error("Clipboard API failed:", err);
        fallbackCopy(text);
      });
  } else {
    // Fallback for older browsers
    fallbackCopy(text);
  }
}

// Fallback using hidden textarea + execCommand
function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);

  textarea.select();
  try {
    const success = document.execCommand("copy");
    if (success) {
      toast.success("Copied to clipboard!");
    } else {
      throw new Error("execCommand failed");
    }
  } catch (err) {
    console.error("Fallback copy failed:", err);
    toast.error("Failed to copy!");
  } finally {
    document.body.removeChild(textarea);
  }
}
