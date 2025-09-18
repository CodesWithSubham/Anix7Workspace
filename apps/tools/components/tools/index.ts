export type ToolType = {
  category: "Calculator" | "Image" | "Text Analysis" | "Other";
  hot?: true;
  isNew?: true;
  title: string;
  description: string;
  image: string;
  link: string;
};

export const tools: ToolType[] = [
  {
    category: "Other",
    hot: true,
    title: "URL Shortener",
    description: "Shorten long URLs from various platforms and share them effortlessly",
    image: "/assets/img/link.png",
    link: "/url-shortener",
  },
  {
    category: "Other",
    hot: true,
    title: "QR Code Generator",
    description: "Generate fully customized QR Codes with colors, shapes, and logos.",
    image: "/assets/img/mobile-qr.png",
    link: "/qr-code-generator",
  },
  {
    category: "Calculator",
    hot: true,
    isNew: true,
    title: "Age Calculator",
    description:
      "Free Age Calculator to find exact age in years, months, days. Compare ages, differences & birthdays.",
    image: "/assets/img/age-calculator.png",
    link: "/age-calculator",
  },
  {
    category: "Text Analysis",
    title: "Word & Character Counter",
    isNew: true,
    description:
      "Free Word Counter to count words and characters, set limits, and optimize writing for SEO",
    image: "/assets/img/word-counter-limit.webp",
    link: "/word-counter",
  },
  {
    category: "Image",
    hot: true,
    title: "Bulk Image Resizer",
    description:
      "Free online image resizer — resize PNG, JPG, WebP, and more formats in bulk, quickly and securely.",
    image: "/assets/img/image-resize-logo.png",
    link: "/bulk-image-resizer",
  },
  {
    category: "Image",
    title: "Image Uploading",
    description:
      "Upload images up to 10MB, get a shareable public link, and access your uploads anytime.",
    image: "/assets/img/gallery.png",
    link: "/image-uploading",
  },
];
