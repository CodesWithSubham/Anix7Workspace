// components/Navbar.js

import { Suspense } from "react";
import { Button, IconButton } from "../ui/Button";
import { IfLoggedIn, IfLoggedOut } from "../../auth/LoggedInWrapper";
import Profile from "../Profile";
import LoginSignup from "../../auth/LoginSignup";
import Link from "next/link";

type MoreIconType =
  | {
      component: React.ReactNode;
      IfLoggedIn: true;
    }
  | {
      component: React.ReactNode;
      IfLoggedOut: true;
    }
  | {
      component: React.ReactNode;
    };

export type NavBarType = {
  appName?: string;
  appSubName?: string;
  moreIcon?: MoreIconType[];
};

export default async function Navbar({
  appName = "Anix7",
  appSubName = "",
  moreIcon = [],
}: NavBarType) {
  return (
    <>
      <header className="w-full z-20 sticky top-0 shadow-xs border-b md:dark:border-b-gray-900/25">
        <div className="relative flex justify-between items-center h-14 md:h-[58px] lg:h-[61px] xl:h-16 dark:bg-(--darkB) bg-(--headerB)">
          <div className="flex items-center w-56 pl-4 md:pl-5 transition-all">
            <div className="basis-7 text-xs flex">
              <IconButton className="tNav mx-0" htmlFor="SideBarInput">
                <svg className="line *:opacity-0 *:transition-all" viewBox="0 0 24 24">
                  <g className="h1">
                    <path d="M 3 18 H 14 M 10 6 H 21"></path>
                    <line className="svgC" x1="3" x2="21" y1="12" y2="12"></line>
                  </g>
                  <g
                    className="h2"
                    transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) translate(5.000000, 8.500000)"
                  >
                    <path d="M14,0 C14,0 9.856,7 7,7 C4.145,7 0,0 0,0"></path>
                  </g>
                </svg>
              </IconButton>
            </div>

            <div className="w-11/12 pl-1">
              <Link href="/" className="block text-inherit text-xl font-medium">
                <bdi>
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis block">
                    {appName}
                    <span className="mx-1 text-xs whitespace-nowrap text-ellipsis overflow-hidden max-w-16 opacity-75">
                      {appSubName}
                    </span>
                  </span>
                </bdi>
              </Link>
            </div>
          </div>
          <div className="px-3 transition-all">
            <ul className="flex justify-end items-center gap-2">
              {moreIcon.map((icon, i) => {
                if ("IfLoggedIn" in icon && icon.IfLoggedIn) {
                  return (
                    <IfLoggedIn key={i}>
                      <li>{icon.component}</li>
                    </IfLoggedIn>
                  );
                }

                if ("IfLoggedOut" in icon && icon.IfLoggedOut) {
                  return (
                    <IfLoggedOut key={i}>
                      <li>{icon.component}</li>
                    </IfLoggedOut>
                  );
                }

                // default: no login condition
                return <li key={i}>{icon.component}</li>;
              })}
              <IfLoggedIn>
                <li>
                  <Profile />
                </li>
              </IfLoggedIn>
              <IfLoggedOut>
                <li>
                  <Button htmlFor="loginSignupCheckId" className="rounded-full">
                    Join Us
                  </Button>
                </li>
              </IfLoggedOut>
            </ul>
          </div>
        </div>
      </header>
      <Suspense>
        <LoginSignup />
      </Suspense>
    </>
  );
}
