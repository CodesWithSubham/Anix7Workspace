// /components/SlideBar.js
"use client";

import Link from "next/link";
import { IconButton } from "../ui/Button";
import React, { useEffect, useRef, useState } from "react";
import Hr from "../ui/Hr";
import { twJoin, twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { RiGroupLine, RiHomeHeartLine } from "react-icons/ri";
import { TiWarningOutline } from "react-icons/ti";
import { MdAlternateEmail, MdOutlineSecurity } from "react-icons/md";
import { IoLogoInstagram, IoPower } from "react-icons/io5";
import { PiTelegramLogo, PiYoutubeLogo } from "react-icons/pi";
import { signOut, useSession } from "@shared/auth/client";

type MenuItemDefault = {
  label: string;
  icon?: React.ReactNode;
  url?: string;
  onClick?: () => void;
  hr?: boolean;
  showOnLoggedIn?: boolean;
  showOnLoggedOut?: boolean;
};
export type MenuItem = MenuItemDefault & {
  subMenu?: MenuItem[];
};
const commonMenu: MenuItem[] = [
  {
    label: "About Us",
    icon: <RiGroupLine />,
    url: "https://www.anix7.in/page/about-us",
  },
  {
    label: "Contact Us",
    icon: <MdAlternateEmail />,
    url: "https://www.anix7.in/page/contact-us",
    hr: true,
  },
  {
    label: "Disclaimer",
    icon: <TiWarningOutline />,
    url: "https://www.anix7.in/page/disclaimer",
  },
  {
    label: "Terms of Use",
    icon: <MdOutlineSecurity />,
    url: "https://www.anix7.in/page/terms",
    hr: true,
  },

  {
    label: "Logout",
    icon: <IoPower />,
    onClick: () =>
      signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.reload();
          },
        },
      }),
    hr: true,
    showOnLoggedIn: true,
  },
];
const commonQuickURLs = [
  { url: "/sitemap.xml", label: "Sitemap" },
  { url: "https://www.anix7.in/page/dmca", label: "DMCA" },
  { url: "https://www.anix7.in/page/privacy-policy", label: "Privacy Policy" },
];

export default function SlideBarLayout({
  menuItem = [],
  quickURLs = [],
}: {
  menuItem?: MenuItem[];
  quickURLs?: { url: string; label: string }[];
}) {
  const { data: session } = useSession();
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const finalQuickURLs = [...quickURLs, ...commonQuickURLs].slice(0, 3); // maximum 3 items
  // Clone menuItem to avoid mutating props
  const updatedMenu = [...menuItem, ...commonMenu];

  // Conditionally add "Home" item if not on "/"
  if (pathname !== "/") {
    updatedMenu.unshift({
      label: "Home",
      icon: <RiHomeHeartLine />,
      url: "/",
      hr: true,
    });
  }
  // Add menu items based on session state
  const filteredMenu = updatedMenu.filter(
    (item) => !((!session && item.showOnLoggedIn) || (session && item.showOnLoggedOut))
  );
  // Auto-close sidebar on route change if on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowSideBar(false);
      if (checkboxRef.current) {
        checkboxRef.current.checked = false;
      }
    }
  }, [pathname]);
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      {/* SideBar Input */}
      <style>
        {showSideBar ? `.tNav .h2 {opacity: 1 !important;}` : `.tNav .h1 {opacity: 1 !important;}`}
      </style>
      <input
        type="checkbox"
        ref={checkboxRef}
        id="SideBarInput"
        onChange={(e) => setShowSideBar(e.target.checked)}
        className="hidden"
      />
      {/* ml-0 in small  */}
      <div
        className={`w-full fixed left-0 top-0 bottom-0 md:relative transition-all duration-300 z-20 md:z-10 md:shrink-0 h-full md:h-auto flex justify-start md:block ${
          showSideBar ? "ml-0 md:w-56" : "md:w-16 -ml-[100%] md:ml-0"
        }`}
      >
        <div className="mnBr w-11/12 max-w-md md:w-auto relative md:sticky md:top-14.5 lg:top-15.25 xl:top-16 max-[767.98px]:h-full max-[767.98px]:rounded-r-xl max-[767.98px]:z-3 max-[767.98px]:overflow-hidden">
          <div className="mnBrs md:h-[calc(100vh-58px)] lg:h-[calc(100vh-61px)] xl:h-[calc(100vh-64px)] bg-theme-50 dark:bg-neutral-900 md:*:w-full md:flex md:relative md:shadow-[0_0_15px] md:shadow-black/5 pt-14 md:pt-0 max-[767.98px]:pt-14 max-[767.98px]:overflow-y-scroll max-[767.98px]:overflow-x-hidden max-[767.98px]:w-full max-[767.98px]:h-full">
            <div className="absolute z-10 top-0 left-0 bg-inherit flex items-center pl-4 md:hidden w-full h-16 shadow-2xs">
              <label
                aria-label="Close"
                className="flex md:hidden items-center gap-1 text-md opacity-80 font-bold cursor-pointer"
                data-text="Close"
                htmlFor="SideBarInput"
              >
                <span className="text-2xl -mt-0.5">&times;</span> Close
              </label>
            </div>

            <div
              className={`transition-all duration-300 self-end border-t bottom-0 left-0 right-0 absolute text-center bg-inherit shadow-[-5px_-5px_15px] shadow-black/5 z-1 pt-4 ${
                showSideBar ? "md:w-56" : "md:w-16 md:pb-4"
              }`}
            >
              <div className={showSideBar ? "whitespace-nowrap overflow-hidden" : "hidden"}>
                <ul className="space-x-2 *:inline">
                  {finalQuickURLs.map((val, i) => (
                    <li key={i}>
                      <Link href={val.url} className="text-inherit hover:underline">
                        {val.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${showSideBar ? "hidden" : "block"}`}>
                <IconButton htmlFor="SideBarInput" className="m-0">
                  <svg viewBox="0 0 512 512">
                    <path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256 c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32 C448,238.3,434.3,224,417.4,224z"></path>
                  </svg>
                </IconButton>
              </div>

              <ul
                className={
                  showSideBar
                    ? "flex justify-center -left-2 -right-2 mt-1 relative w-full *:relative"
                    : "hidden"
                }
              >
                <li>
                  <IconButton
                    aria-label="Youtube"
                    href="https://www.youtube.com/Anix7Anime"
                    rel="noopener"
                    role="button"
                    target="_blank"
                  >
                    <PiYoutubeLogo />
                  </IconButton>
                </li>
                <li>
                  <IconButton
                    aria-label="Instagram"
                    href="https://Instagram.com/anix7_anime"
                    rel="noopener"
                    role="button"
                    target="_blank"
                  >
                    <IoLogoInstagram />
                  </IconButton>
                </li>
                <li>
                  <IconButton
                    aria-label="Telegram"
                    href="https://Anix7Official.t.me/"
                    rel="noopener"
                    role="button"
                    target="_blank"
                  >
                    <PiTelegramLogo />
                  </IconButton>
                </li>
              </ul>
            </div>

            <div
              className={`px-4 pt-5 pb-28  ${
                showSideBar
                  ? "md:overflow-x-hidden md:overflow-y-hidden md:hover:overflow-y-scroll md:px-5"
                  : "md:overflow-y-visible md:overflow-x-visible"
              }`}
            >
              <ul
                className="[&_svg]:opacity-80"
                itemScope
                itemType="https://schema.org/SiteNavigationElement"
              >
                {filteredMenu.map((item, index) => (
                  <SideBarItem key={index} item={item} showSideBar={showSideBar} />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <label
          className={`block md:hidden fixed -top-1/2 -left-1/2 -right-1/2 -bottom-1/2 z-1 transition-all duration-300 bg-black/20 backdrop-blur-md cursor-pointer ${
            showSideBar ? "visible opacity-100" : "invisible opacity-0"
          }`}
          htmlFor="SideBarInput"
        ></label>
      </div>
    </>
  );
}

function CompWrapper({
  href,
  children,
  ...rest
}: {
  href?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  if (href) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return <button {...rest}>{children}</button>;
}

function SideBarItem({ item, showSideBar }: { item: MenuItem; showSideBar: boolean }) {
  return (
    <li
      className={`relative  [&_svg]:shrink-0 ${
        showSideBar
          ? "ml-1 overflow-visible w-full"
          : "md:hover:[&>.list]:opacity-100 md:hover:[&>.list]:visible md:hover:[&_.n]:opacity-100 md:hover:[&_.n]:visible"
      }`}
    >
      {item.subMenu ? (
        <>
          <input
            className="hidden peer"
            id={`drpDwn-${item.label.replace(" ", "-")}`}
            name="drpDwn"
            type="checkbox"
          />
          <label
            className={`flex items-center gap-2 relative w-full rounded-lg cursor-pointer py-2.5 px-1 hover:bg-black/10 transition-all duration-300 peer-checked:[&>.d]:rotate-180 hover:*:text-theme-450 ${
              showSideBar ? "" : "md:max-w-10 md:rounded-2xl"
            }`}
            htmlFor={`drpDwn-${item.label.replace(" ", "-")}`}
          >
            {item.icon}
            <span
              className={`block whitespace-nowrap overflow-hidden text-ellipsis grow shrink-0 text-left ${
                showSideBar
                  ? ""
                  : "md:absolute md:left-9 md:top-1 md:mx-1 md:px-2.5 md:py-2 md:rounded-2xl md:rounded-tl-sm md:bg-theme-100 md:dark:bg-neutral-900 md:opacity-0 md:invisible md:z-10"
              }`}
            >
              {item.label}
            </span>
            <svg
              className={`line transition-all duration-300 d ${showSideBar ? "" : "hidden"}`}
              viewBox="0 0 24 24"
            >
              <g transform="translate(5.000000, 8.500000)">
                <path d="M14,0 C14,0 9.856,7 7,7 C4.145,7 0,0 0,0"></path>
              </g>
            </svg>
          </label>
          <div
            className={twMerge(
              "list hidden opacity-0 invisible pl-7 relative",
              showSideBar
                ? "md:h-[calc(100%-18.5px)] peer-checked:block peer-checked:relative peer-checked:opacity-100 peer-checked:visible "
                : "md:m-0 md:overflow-hidden md:block md:absolute md:left-5 md:top-1 p-0.5 pl-4 pt-2 bg-transparent md:opacity-0 md:invisible md:z-10"
            )}
          >
            {showSideBar && <span className="border-l absolute h-[calc(100%-20px)] left-3.5 " />}
            <ul
              className={twJoin(
                "ml-2",
                !showSideBar &&
                  "md:px-2.5 md:py-2 md:rounded-3xl md:rounded-tl-sm md:bg-theme-100 md:dark:bg-neutral-900 md:shadow"
              )}
            >
              {item.subMenu.map((subItem, i) => {
                return (
                  <li
                    key={i}
                    itemProp="name"
                    className={twMerge(
                      `relative block whitespace-nowrap overflow-hidden text-ellipsis grow shrink-0 *:text-inherit hover:*:text-theme-450`,
                      showSideBar ? "overflow-visible w-full mt-2" : "rounded-none"
                    )}
                  >
                    {!showSideBar && i !== 0 && <Hr className="my-1" />}
                    <CompWrapper
                      {...(subItem.url ? { href: subItem.url } : {})}
                      aria-label={subItem.label}
                      onClick={subItem.onClick}
                      className={`peer flex items-center gap-2 relative w-full rounded-lg cursor-pointer py-2 px-2 hover:bg-black/10 transition-all duration-300 *:line-clamp-1 *:flex [&>svg]:mr-1 ${
                        showSideBar
                          ? "hover:[&>svg]:fill-theme-450 hover:[&>.line]:fill-none hover:[&>.line]:stroke-theme-450 border border-dotted hover:border-theme-450"
                          : ""
                      }`}
                    >
                      {subItem.icon}
                      {subItem.label}
                    </CompWrapper>
                    {showSideBar && (
                      <span className="border-b border-dotted absolute rounded-none -left-5.25 top-1/2 -translate-y-1/2 w-5 peer-hover:border-theme-450" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <CompWrapper
          href={item.url}
          aria-label={item.label}
          className={twJoin(
            "flex items-center gap-2 relative w-full rounded-lg cursor-pointer py-2.5 px-1 hover:bg-black/10 transition-all duration-300 text-inherit",
            showSideBar ? "hover:text-theme-450" : "md:max-w-10 md:rounded-full"
          )}
          onClick={item.onClick}
        >
          {item.icon}
          <span
            className={twMerge(
              "n block whitespace-nowrap overflow-hidden text-ellipsis grow shrink-0 text-left",
              !showSideBar &&
                "md:absolute md:left-5 md:top-1 p-0.5 pl-4 pt-2 bg-transparent  md:opacity-0 md:invisible md:z-10 md:hover:opacity-100 md:hover:visible"
            )}
            itemProp="name"
          >
            <span
              className={twJoin(
                !showSideBar &&
                  "md:block md:py-2 md:px-3 md:rounded-full md:rounded-tl-sm md:bg-theme-100 md:dark:bg-neutral-900 hover:text-theme-450 md:shadow"
              )}
            >
              {item.label}
            </span>
          </span>
        </CompWrapper>
      )}
      {item.hr && <Hr className="w-full my-2" />}
    </li>
  );
}
