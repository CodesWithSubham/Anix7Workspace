"use client";

import SlideBarLayout from "@shared/components/navigation/SlideBarLayout";
import { RxImage } from "react-icons/rx";
import { PiResize } from "react-icons/pi";
import { PiCalculatorThin } from "react-icons/pi";
import { FcManager } from "react-icons/fc";
import { IoQrCodeOutline } from "react-icons/io5";
import { HiOutlineLink } from "react-icons/hi2";
import { RiQuestionAnswerLine } from "react-icons/ri";

const menuItem = [
  {
    label: "Url Shortener",
    icon: <HiOutlineLink />,
    url: "/url-shortener",
  },
  {
    label: "QR Code Generator",
    icon: <IoQrCodeOutline />,
    url: "/qr-code-generator",
  },
  {
    label: "Calculators",
    icon: <PiCalculatorThin />,
    subMenu: [
      {
        label: "Age Calculator",
        icon: <FcManager />,
        url: "/age-calculator",
      },
    ],
  },
  {
    label: "Bulk Image Resizer",
    icon: <PiResize />,
    url: "/bulk-image-resizer",
  },
  {
    label: "Image Upload Tools",
    icon: <RxImage />,
    subMenu: [
      {
        label: "Upload Image",
        url: "/image-uploading",
      },
      {
        label: "My Uploads",
        url: "/image-uploading/my-uploads",
      },
    ],
    showOnLoggedIn: true,
    hr: true,
  },
  {
    label: "Image Uploading",
    icon: <RxImage />,
    url: "/image-uploading",
    showOnLoggedOut: true,
    hr: true,
  },
  {
    label: "FAQs",
    icon: <RiQuestionAnswerLine />,
    url: "/page/faqs",
  },
];

export default function SlideBar() {
  return <SlideBarLayout menuItem={menuItem} />;
}
