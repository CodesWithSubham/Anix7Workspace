// /app/layout.js

import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@shared/components/navigation/Navbar";
import NoScriptWarning from "@shared/components/errors/NoScriptWarning";
import ScrollToTopButton from "@shared/components/ScrollToTopButton";
import Wave from "@shared/components/Wave";
import SlideBar from "@/components/navigation/SlideBar";
import DefaultHead from "@shared/head";
import Providers from "@shared/providers";
import ToolSearch from "@/components/tools/toolsSearch";

// Load Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Best for avoiding layout shift
});

const baseUrl = process.env.BASE_URL!;

export const metadata = {
  metadataBase: new URL(baseUrl),
  // alternates: {
  //   canonical: "",
  // },
  title: {
    default: "Anix7 Tools - Free Online Tools for Everyday Tasks",
    template: "%s - Anix7 Tools",
  },
  description:
    "Anix7 Tools is your go-to hub for free online utilities. URL Shortener, QR Code Generator, Image Resizing or Uploading, and many more — all in one place.",
  keywords: [
    "Anix7 Tools",
    "online tools",
    "free tools",
    "URL shortener",
    "QR code generator",
    "image uploader",
    "image resizer",
    "image tools",
    "fast URL shortener",
    "secure image hosting",
    "share images online",
    "resize images online",
    "generate QR codes",
    "convert links to QR",
  ],
  authors: [
    {
      name: "CodesWithSubham",
      url: "https://github.com/CodesWithSubham",
    },
  ],
  openGraph: {
    url: "/",
    siteName: "Anix7 Tools",
    images: [
      {
        url: `/assets/img/logo.png`,
        width: 1200,
        height: 630,
        alt: "Anix7 Tools Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [`/assets/img/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    publisher: "Anix7",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <DefaultHead />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {/* Top Right Circle Style */}
          <div className="absolute w-48 h-56 bg-neutral-500/5 dark:bg-black/15 -z-10 top-0 right-0 rounded-bl-full" />
          <Navbar
            appName="Anix7"
            appSubName="Tools"
            moreIcon={[
              {
                component: <ToolSearch />,
              },
            ]}
          />
          <div className="flex">
            <SlideBar />
            <div className="grow pt-5 md:pt-7 relative transition-all duration-300 md:w-[calc(100%-224px)] border-l border-white/30">
              <div className="px-5 md:px-6 mx-auto max-w-(--breakpoint-xl)">
                <main>
                  <NoScriptWarning />
                  {children}
                </main>
                <ScrollToTopButton />
                <Footer />
              </div>
            </div>
            {/* Bottom Wave Animation */}
            <Wave />
          </div>
        </Providers>
      </body>
    </html>
  );
}
