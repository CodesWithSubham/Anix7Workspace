"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Img } from "./types";


type ImgContextType = { visibleImages: Img[]; setVisibleImages: (imgs: Img[]) => void };
const ImgContext = createContext<ImgContextType | undefined>(undefined);

export function ImgProvider({ children }: { children: ReactNode }) {
  const [visibleImages, setVisibleImages] = useState<Img[]>([]);
  return (
    <ImgContext.Provider value={{ visibleImages, setVisibleImages }}>
      {children}
    </ImgContext.Provider>
  );
}

export function useImgContext() {
  const ctx = useContext(ImgContext);
  if (!ctx) throw new Error("useImgContext must be used inside ImgProvider");
  return ctx;
}
