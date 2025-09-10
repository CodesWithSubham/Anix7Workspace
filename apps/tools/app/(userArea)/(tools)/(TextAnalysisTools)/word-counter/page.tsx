// apps/tools/app/(userArea)/(tools)/(WritingTools)/word-counter/page.tsx

import { IfLoggedOut } from "@shared/components/auth/LoggedInWrapper";
import Section, { Card, CardSection } from "@shared/components/ui/Section";
import { WorkBox } from "@shared/components/ui/Boxes";
import { Button } from "@shared/components/ui/Button";
import WordCounterClient from "./WordCounterClient";

export const metadata = {
  title: "Free Word Counter – Track Word & Character Count Easily",
  description:
    "Free Word Counter tool to count words and characters instantly. Track text length, extract keywords, set limits, and optimize your content for writing, blogging, SEO, and social media.",
  keywords: [
    "Anix7 Tools",
    "Anix7 word counter",
    "word counter",
    "character counter",
    "word count tool",
    "character count tool",
    "free word counter",
    "SEO word counter",
    "blog word count checker",
    "essay word counter",
    "social media character limit tool",
    "keyword extraction tool",
    "content optimizer",
    "twitter character counter",
    "instagram caption counter",
    "facebook post word limit",
    "writing assistant",
    "text length counter",
    "content length checker",
    "academic word counter",
    "research paper word limit",
    "writing productivity tool",
    "online word counter",
    "track word limit",
    "track character limit",
    "real time word counter",
    "live word character counter",
  ],

  openGraph: {
    url: `/word-counter`,
    siteName: "Anix7 Tools",
    images: [
      {
        url: `/assets/img/word-counter-og.jpeg`,
        width: 1200,
        height: 630,
        alt: "Anix7 Tools Word Counter",
      },
    ],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/word-counter" },
  addToSitemap: true,
};

export default function WordCounter() {
  return (
    <>
      <WordCounterClient />

      <Section title="Smart Word Counter Tool">
        <p className="text-center mb-6">
          Our free online Word Counter helps you count words and characters in
          real-time. Whether you’re writing blog posts, social media captions,
          essays, or professional content, this tool ensures your text is
          precise, optimized, and within required limits.
        </p>

        <CardSection>
          {[
            {
              title: "Instant Word & Character Count",
              description:
                "Track the number of words and characters as you type or paste your text — instantly and accurately.",
              image: "/assets/img/word-instant.png",
            },
            {
              title: "Track Word & Character Limits",
              description:
                "Set your desired word or character limit and get progress indicators to stay on target.",
              image: "/assets/img/word-limit.png",
            },
            {
              title: "Keyword Extraction",
              description:
                "Automatically identify frequently used words in your content to optimize SEO and readability.",
              image: "/assets/img/word-keywords.png",
            },
            {
              title: "Perfect for Students & Writers",
              description:
                "Ensure your essays, assignments, and blog posts meet specific length requirements without hassle.",
              image: "/assets/img/word-student.png",
            },
            {
              title: "Social Media Friendly",
              description:
                "Check character limits for Twitter (X), Instagram, and Facebook posts to craft concise, engaging content.",
              image: "/assets/img/word-social.png",
            },
            {
              title: "No Installation Required",
              description:
                "Use it online anytime, anywhere. Free, unlimited, and works without downloads or signup.",
              image: "/assets/img/no-signup.png",
            },
          ].map(({ title, description, image }, index) => (
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
          <h2>Track Words & Characters Instantly!</h2>
          <p>
            Join now to unlock advanced features like saving your text history,
            exporting reports, and analyzing keyword density with ease.
          </p>
          <Button htmlFor="loginSignupCheckId">Signup Now</Button>
        </WorkBox>
      </IfLoggedOut>
    </>
  );
}
