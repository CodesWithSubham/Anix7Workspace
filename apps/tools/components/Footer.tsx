import Link from "next/link";
import Image from "next/image";
import Section from "@shared/components/ui/Section";
import Hr from "@shared/components/ui/Hr";
import { Suspense } from "react";
import CurrentYear from "@shared/components/currentYear";

// Updated importantLinks constant with multiple categories
const importantLinks = [
  {
    heading: "Company",
    links: [
      {
        name: "About Us",
        url: "https://www.anix7.in/page/about-us",
      },
      // {
      //   name: "Careers",
      //   url: "/page/careers",
      // },
      {
        name: "Contact Us",
        url: "https://www.anix7.in/page/contact-us",
      },
    ],
  },
  {
    heading: "Legal",
    links: [
      {
        name: "Privacy Policy",
        url: "https://www.anix7.in/page/privacy-policy",
      },
      {
        name: "Terms of Use",
        url: "https://www.anix7.in/page/terms",
      },
      // {
      //   name: "Cookie Policy",
      //   url: "/page/cookie-policy",
      // },
    ],
  },
  {
    heading: "Resources",
    links: [
      // {
      //   name: "Blog",
      //   url: "/page/blog",
      // },
      {
        name: "FAQs",
        url: "/page/faqs",
      },
      {
        name: "Help Center",
        url: "https://www.anix7.in/page/contact-us",
      },
    ],
  },
];

export default async function Footer() {
  return (
    <footer className="mb-8 mt-10">
      <Section className="text-center">
        {/* <!-- About --> */}
        <div>
          <div className="text-gray-500 dark:text-gray-200">Made with ❤️ by</div>
          <Image
            className="w-1/3 max-w-60 aspect-square mt-2 mb-1 mx-auto"
            src="/assets/img/logo.png"
            width={120}
            height={120}
            alt="Anix7 Tools"
          />
          <div>
            <h2>Anix7 - Tools</h2>
            <p>
              Anix7 Tools offers fast, simple, and secure online tools including a URL shortener, QR
              Code Generator and image uploader.
            </p>
          </div>
        </div>
        <Hr />
        {/* Footer Section - Important Links */}
        <h3 className="text-2xl font-bold">Important Links</h3>
        <div className="flex flex-wrap justify-center items-stretch gap-x-2 gap-y-4 mt-1.5 mb-3">
          {importantLinks.map((group, i) => (
            <div key={i} className="w-full max-w-40 flex flex-col gap-2">
              {/* Heading for each link group */}
              <h4 className="text-lg font-semibold">{group.heading}</h4>
              <ul className="flex flex-col gap-1.5">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.url}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Hr />
        {/* <!--[ Credit ]--> */}
        <div className="inline-flex items-center">
          <span>
            <span className="font-sans">&copy;</span>
            <Suspense>
              <CurrentYear />
            </Suspense>{" "}
            &nbsp;&middot;&nbsp;&nbsp;
            <bdi>
              <Link href="/" className=" inline-flex items-center text-lg">
                Anix7 - Tools
                <svg viewBox="0 0 24 24" className="w-4 h-4 mx-1 fill-current">
                  <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"></path>
                </svg>
              </Link>
            </bdi>
            &nbsp;&middot;&nbsp; All rights reserved.
          </span>
        </div>
      </Section>
    </footer>
  );
}
