"use client";

import SlideBarLayout, { MenuItem } from "@shared/components/navigation/SlideBarLayout";
import { Suspense } from "react";
// import { HomeSvg } from "@shared/components/svg/HomeSvg";
// import { ImageRoundedSvg } from "@shared/components/svg/ImageSvg";
// import { InformationQuestionMarkSvg } from "@shared/components/svg/InformationSvg";
// import { QrSvg } from "@shared/components/svg/QrSvg";
// import { ResizeSvg } from "@shared/components/svg/ResizeSvg";
// import { SettingSvg } from "@shared/components/svg/SettingSvg";
// import { UrlSvg } from "@shared/components/svg/UrlSvg";

const menuItem: MenuItem[] = [
  // {
  //   label: "Anix7 Tools",
  //   icon: <SettingSvg />,
  //   subMenu: [
  //     {
  //       label: "Tools Home",
  //       icon: <HomeSvg />,
  //       url: "https://tools.anix7.in",
  //     },
  //     {
  //       label: "Url Shortener",
  //       icon: <UrlSvg />,
  //       url: "https://tools.anix7.in/url-shortener",
  //     },
  //     {
  //       label: "QR Code Generator",
  //       icon: <QrSvg />,
  //       url: "https://tools.anix7.in/qr-code-generator",
  //     },
  //     {
  //       label: "Bulk Image Resizer",
  //       icon: <ResizeSvg />,
  //       url: "https://tools.anix7.in/bulk-image-resizer",
  //     },
  //     {
  //       label: "Image Upload Tools",
  //       icon: <ImageRoundedSvg />,
  //       url: "https://tools.anix7.in/image-uploading",
  //     },
  //   ],
  // },
  // {
  //   label: "AniPic",
  //   icon: <ImageRoundedSvg />,
  //   url: "https://anipic.anix7.in",
  //   hr: true,
  // },
  // {
  //   label: "FAQs",
  //   icon: <InformationQuestionMarkSvg />,
  //   url: "/page/faqs",
  // },
];

export default function SlideBar() {
  return (
    <Suspense>
      <SlideBarLayout menuItem={menuItem} />;
    </Suspense>
  );
}
