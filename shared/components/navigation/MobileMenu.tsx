// /components/MobileMenu.js

import Link from "next/link";
import { RiHomeHeartLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

const menuItems = [
  {
    href: "/",
    label: "Home",
    icon: <RiHomeHeartLine />,
  },
  // {
  //   href: "/invite",
  //   label: "Invite",
  //   icon: (
  //     <svg className="line" viewBox="0 0 24 24">
  //       <path
  //         d="M92.30583,264.72053a3.42745,3.42745,0,0,1-.37,1.57,3.51,3.51,0,1,1,0-3.13995A3.42751,3.42751,0,0,1,92.30583,264.72053Z"
  //         transform="translate(-83.28571 -252.73452)"
  //       />
  //       <circle className="svgC" cx="18.48892" cy="5.49436" r="3.51099" />
  //       <circle className="svgC" cx="18.48892" cy="18.50564" r="3.51099" />
  //       <line
  //         className="cls-3"
  //         x1="12.53012"
  //         x2="8.65012"
  //         y1="8.476"
  //         y2="10.416"
  //       />
  //       <line
  //         className="cls-3"
  //         x1="12.53012"
  //         x2="8.65012"
  //         y1="15.496"
  //         y2="13.556"
  //       />
  //     </svg>
  //   ),
  // },
  {
    href: "/setting",
    label: "Setting",
    icon: <IoSettingsOutline />,
  },
];

export default function MobileMenu() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-theme-50 shadow-[0_-10px_25px_-5px] shadow-black/15 dark:shadow-white/10 rounded-t-3xl px-5 md:hidden dark:bg-neutral-800">
        <ul className="h-14 flex items-center mb-1">
          {menuItems.map(({ href, label, icon }) => (
            <li
              key={label}
              className="flex justify-center grow basis-1/5 shrink-0 *:hover:scale-105"
            >
              <Link
                aria-label={label}
                href={href}
                className="inline-flex flex-col gap-px items-center justify-center min-w-9 h-9 rounded-full px-2 transition-all duration-500 text-inherit dark:text-white [&>svg]:mx-1 [&>svg]:shrink-0"
                role="button"
              >
                {icon}
                <span className=" whitespace-nowrap text-ellipsis text-xs">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Margin for Footer */}
      <style>
        {`
        @media screen and (max-width: 767.98px) {
          footer {
            margin-bottom: 5rem;
          }
        }
        `}
      </style>
    </>
  );
}
