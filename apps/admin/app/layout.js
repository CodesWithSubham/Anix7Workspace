import "./globals.css";
import Navbar from "@shared/components/navigation/Navbar";
import NoScriptWarning from "@shared/components/errors/NoScriptWarning";
import ScrollToTopButton from "@shared/components/ScrollToTopButton";
import Wave from "@shared/components/Wave";
import SlideBar from "@/components/navigations/SlideBar";
import Providers from "@shared/providers";
import DefaultHead from "@shared/head";

const baseUrl = process.env.BASE_URL;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Anix7 - Explore Tools, Anime, Games, and Stunning Visuals",
    template: "%s - Anix7",
  },
  description:
    "Anix7 is your all-in-one hub for smart tools, anime updates, 4K wallpapers, mini games and nature photography. Discover, create, and download with ease.",
  keywords: ["Anix7"],
  author: "Anix7",
  openGraph: {
    url: "/",
    siteName: "Anix7",
    images: [
      {
        url: `/assets/img/logo/anix7-logo-512.jpg`,
        // width: 1200,
        // height: 630,
        width: 512,
        height: 512,
        alt: "Anix7 Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/img/logo/anix7-logo-512.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <DefaultHead />
      </head>
      <body>
        <Providers>
          <div className="absolute w-48 h-56 bg-neutral-500/5 dark:bg-black/15 -z-10 top-0 right-0 rounded-bl-full" />

          <Navbar appName="Anix7" appSubName="Admin Panel" />
          <div className="flex">
            <SlideBar />
            <div className="grow pt-5 md:pt-7 relative transition-all duration-300 md:w-[calc(100%-224px)] border-l border-white/30">
              <div className="px-5 md:px-6 mx-auto max-w-(--breakpoint-xl)">
                <main>
                  <NoScriptWarning />
                  {children}
                </main>
                <ScrollToTopButton />
              </div>
            </div>
            <Wave />
          </div>
        </Providers>
      </body>
    </html>
  );
}
