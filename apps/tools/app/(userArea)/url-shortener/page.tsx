// /app/(pages)/url-shortener/page.js

import { WorkBox } from "@shared/components/ui/Boxes";
import { Button } from "@shared/components/ui/Button";
import UrlShortener from "./UrlShortener";
import Section, { Card, CardSection } from "@shared/components/ui/Section";
import { IfLoggedIn, IfLoggedOut } from "@shared/auth/LoggedInWrapper";

export const metadata = {
  title: "Simple, fast, and secure URL Shortener",
  description:
    "Easily shorten long URLs into concise, shareable links. Perfect for social media, emails, and more. Try Anix7 Tools' fast and secure URL shortener today!",
  keywords: [
    "Anix7 Tools",
    "Anix7 URL shortener",
    "URL shortener",
    "link shortener",
    "short link generator",
    "tiny URL",
    "best URL shortener",
    "custom URL shortener",
    "Anix7 link shortener",
    "best URL shortener tool",
    "short URL generator Anix7",
    "custom short link generator",
    "create short URLs online",
    "shorten long links easily",
    "short links for SEO",
    "quick URL shortener service",
    "free short URL tool",
    "link shortening for social media",
    "URL shortener for marketing campaigns",
    "instant link shortener",
    "secure URL shortening tool",
    "link shortening for emails",
    "shortened URLs with custom aliases",
    "short link creation for branding",
    "generate short links for websites",
    "shareable URL shortening",
    "shorten links for tracking",
    "URL shortener for content creators",
    "short URLs for influencer",
    "short link generator with analytics",
    "easily create tiny URLs",
    "personalized link shortener",
    "URL shortener with custom domains",
    "dynamic URL shortener",
    "anonymized URL shortener",
    "safe URL shortener",
    "efficient URL shortening",
    "URL shortener for e-commerce",
    "create fast short links",
    "short link generator for businesses",
    "brandable short links",
    "generate shareable tiny links",
    "simplified URL shortener",
    "short links for promotions",
    "easy-to-use link shortener",
    "professional URL shortener",
    "customizable link shortener",
    "automatic URL shortening",
    "link shortener for tracking clicks",
    "shorten URLs for advertising",
    "QR code and URL shortener integration",
    "shareable link tool",
    "create custom URL shortener",
    "URL shortening with analytics",
    "URL shortening for affiliate marketing",
    "mobile-friendly link shortener",
    "free link shortening service",
    "shorten URLs for SMS",
    "generate short links for events",
    "create branded short links",
    "easy custom URL shortening",
    "URL shortening with click tracking",
    "short links for video sharing",
    "URL shortener for newsletters",
    "bulk URL shortener",
    "link shortening for websites",
  ],

  openGraph: {
    url: `/url-shortener`,
    siteName: "Anix7 Tools",
    images: [
      {
        url: `/assets/img/url-shortener-og.jpeg`,
        width: 1200,
        height: 630,
        alt: "Anix7 Tools URL Shortener",
      },
    ],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/url-shortener" },
  addToSitemap: true,
};

export default async function ImageUploading() {
  const Drops = [
    {
      title: "Shorten, Share, and Track",
      description:
        "Generate shortened links for use in documents, social media, and messages. Monitor the performance of your URLs with real-time click tracking.",
      image: "/assets/img/link.png",
    },
    {
      title: "Easy to Use",
      description:
        "Simply paste your long link, click shorten, and receive a compact URL instantly.",
      image: "/assets/img/easy.png",
    },
    {
      title: "Universal Compatibility",
      description: "Shorten URLs of any length from any platform or website.",
      image: "/assets/img/universal.png",
    },
    {
      title: "Secure & Reliable",
      description:
        "All links are protected with HTTPS encryption. Malicious links are automatically removed.",
      image: "/assets/img/secure.png",
    },
    // {
    //   title: "Performance Analytics",
    //   description:
    //     "Track the number of clicks your shortened URLs receive in real time.",
    //   image: "/assets/img/start-earning.png",
    // },
    {
      title: "Multi-Device Support",
      description: "Optimized for smartphones, tablets, and desktop devices.",
      image: "/assets/img/multi-device.png",
    },
  ];

  return (
    <>
      <IfLoggedIn>
        <UrlShortener />
      </IfLoggedIn>

      <Section title="Fast & Secure URL Shortener">
        <p className="text-center mb-6">
          Shorten long URLs from various platforms, share them effortlessly, and track performance
          with ease.
        </p>
        <CardSection>
          {Drops.map(({ title, description, image }, index) => (
            <Card
              key={index}
              image={image}
              title={title}
              description={description}
              className="flex-col sm:flex-row md:flex-col text-center sm:text-justify md:text-center"
            />
          ))}
        </CardSection>
      </Section>
      <IfLoggedOut>
        <WorkBox className="mt-14 text-center">
          <h2>Make Your Links Short & Shareable!</h2>
          <p>Sign up now to shorten URLs and track their performance with ease.</p>
          <Button htmlFor="loginSignupCheckId">Signup Now</Button>
        </WorkBox>
      </IfLoggedOut>
    </>
  );
}
