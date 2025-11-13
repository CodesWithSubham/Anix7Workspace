"use client";

import SlideBarLayout from "@shared/components/navigation/SlideBarLayout";
import { RxImage } from "react-icons/rx";
import { PiResize } from "react-icons/pi";
import { IoQrCodeOutline, IoSettingsOutline } from "react-icons/io5";
import { RiHomeHeartLine, RiQuestionAnswerLine } from "react-icons/ri";
import { HiOutlineLink } from "react-icons/hi2";

const menuItem = [
  {
    label: "Anix7 Tools",
    icon: <IoSettingsOutline />,
    subMenu: [
      {
        label: "Tools Home",
        icon: <RiHomeHeartLine />,
        url: "https://tools.anix7.in",
      },
      {
        label: "Url Shortener",
        icon: <HiOutlineLink />,
        url: "https://tools.anix7.in/url-shortener",
      },
      {
        label: "QR Code Generator",
        icon: <IoQrCodeOutline />,
        url: "https://tools.anix7.in/qr-code-generator",
      },
      {
        label: "Bulk Image Resizer",
        icon: <PiResize />,
        url: "https://tools.anix7.in/bulk-image-resizer",
      },
      {
        label: "Image Upload Tools",
        icon: <RxImage />,
        url: "https://tools.anix7.in/image-uploading",
      },
    ],
  },
  {
    label: "AniPic",
    icon: <RxImage />,
    url: "https://anipic.anix7.in",
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
