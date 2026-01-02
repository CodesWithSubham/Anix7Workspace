import type { InnerOuterEyeColor, InnerOuterRadii } from "./types";
import type { IProps as QrProps } from "react-qrcode-logo";

// Normalize always into tuple [InnerOuterRadii, InnerOuterRadii, InnerOuterRadii]
export const normalizeEyeRadius = (
  val: NonNullable<QrProps["eyeRadius"]>,
): [InnerOuterRadii, InnerOuterRadii, InnerOuterRadii] => {
  if (Array.isArray(val)) {
    // tuple-of-3
    if (val.length === 3) {
      return val.map((item) => {
        if (typeof item === "number") return { inner: item, outer: item };
        if (Array.isArray(item)) return { inner: item, outer: item };
        return item;
      }) as [InnerOuterRadii, InnerOuterRadii, InnerOuterRadii];
    }

    // case 2: array of 4 numbers -> treat as one CornerRadii
    if (val.length === 4 && val.every((n) => typeof n === "number")) {
      return [
        { inner: val, outer: val },
        { inner: val, outer: val },
        { inner: val, outer: val },
      ];
    }
  }

  if (typeof val === "number") {
    return [
      { inner: val, outer: val },
      { inner: val, outer: val },
      { inner: val, outer: val },
    ];
  }

  // already InnerOuterRadii
  return [val as InnerOuterRadii, val as InnerOuterRadii, val as InnerOuterRadii];
};

// Normalize into tuple [InnerOuterEyeColor, InnerOuterEyeColor, InnerOuterEyeColor]
export const normalizeEyeColor = (
  val: NonNullable<QrProps["eyeColor"]>,
): [InnerOuterEyeColor, InnerOuterEyeColor, InnerOuterEyeColor] => {
  if (Array.isArray(val)) {
    // tuple-of-3
    if (val.length === 3) {
      return val.map((item) => {
        if (typeof item === "string") return { inner: item, outer: item };
        return item;
      }) as [InnerOuterEyeColor, InnerOuterEyeColor, InnerOuterEyeColor];
    }
  }

  if (typeof val === "string") {
    return [
      { inner: val, outer: val },
      { inner: val, outer: val },
      { inner: val, outer: val },
    ];
  }

  // already InnerOuterEyeColor
  return [val as InnerOuterEyeColor, val as InnerOuterEyeColor, val as InnerOuterEyeColor];
};
