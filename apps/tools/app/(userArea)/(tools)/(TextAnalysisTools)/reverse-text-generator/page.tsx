// apps/tools/app/(userArea)/(tools)/(TextAnalysisTools)/reverse-text/page.tsx

import Section, { Card, CardSection } from "@shared/components/ui/Section";
import ReverseTextPage from "./reverseTextPage";
import { IfLoggedOut } from "@shared/components/auth/LoggedInWrapper";
import { WorkBox } from "@shared/components/ui/Boxes";
import { Button } from "@shared/components/ui/Button";

export const metadata = {
  title: "Reverse Text Generator - Flip, Mirror & Reverse Words Instantly",
  description:
    "Free Reverse Text Generator to reverse letters, flip words, or mirror text instantly. Create upside-down, backward, or mirrored text for fun or creative designs.",
  keywords: [
    "Anix7 Tools",
    "Anix7 Reverse Text Generator",
    "Reverse text",
    "Flip text",
    "Mirror text",
    "Upside down text",
    "Reverse words",
    "Backwards text generator",
    "Text flipper",
    "Reverse words order",
    "Invert text online",
    "Reverse letters",
    "Upside down font",
    "Fun text generator",
    "Backwards message creator",
    "Online reverse tool",
    "Reverse text effect",
    "Mirror writing",
    "Text reverser",
    "Unicode text flipper",
    "Reverse sentence generator",
    "Funny text reverser",
    "Creative writing tool",
    "Social media fun text",
    "Reverse for Instagram bio",
    "Stylish backwards text",
    "Cool text effect online",
  ],

  openGraph: {
    url: `/reverse-text-generator`,
    siteName: "Anix7 Tools",
    // images: [
    //   {
    //     url: `/assets/img/reverse-text-generator-og.jpeg`,
    //     width: 1200,
    //     height: 630,
    //     alt: "Anix7 Tools Reverse Text Generator",
    //   },
    // ],
    type: "website",
  },
  // twitter: { card: "summary_large_image" },
  alternates: { canonical: "/reverse-text-generator" },
  addToSitemap: true,
};

export default function Page() {
  return (
    <>
      <ReverseTextPage />
      <Section title="Smart Reverse Text Generator">
        <p className="text-center mb-6">
          Our free online Reverse Text Generator lets you instantly reverse, flip, or mirror any
          text. Whether you want to create fun upside-down messages, mirrored quotes, or reversed
          words for social media — this tool makes it quick, accurate, and entertaining.
        </p>

        <CardSection>
          {[
            {
              title: "Reverse Text Instantly",
              description:
                "Reverse any sentence, paragraph, or word order in one click. Perfect for creative writing, coding tests, or hidden messages.",
              // image: "/assets/img/reverse-text.png",
            },
            {
              title: "Flip Text Upside Down",
              description:
                "Turn your normal text upside down using special Unicode characters. Ideal for fun social media posts or stylized messages.",
              // image: "/assets/img/flip-upside-down.png",
            },
            {
              title: "Mirror Text Generator",
              description:
                "Mirror or reflect your text left to right — like a true mirror image — great for design, fun bios, and puzzle-style writing.",
              // image: "/assets/img/mirror-text.png",
            },
            {
              title: "Reverse Each Word’s Letter",
              description:
                "Flip every word individually while keeping sentence order intact — unique style for word games and riddles.",
              // image: "/assets/img/reverse-each-word.png",
            },
            {
              title: "Creative & Fun Uses",
              description:
                "Generate stylish reversed text for memes, captions, bios, or puzzles. Great for social media creators, designers, and students.",
              // image: "/assets/img/fun-text-generator.png",
            },
            {
              title: "No Signup Needed",
              description:
                "Use the Reverse Text Generator instantly — no registration required. For saving text patterns or presets, you can sign up anytime.",
              // image: "/assets/img/no-signup.png",
            },
          ].map(({ title, description /*, image*/ }, index) => (
            <Card
              key={index}
              // image={image}
              title={title}
              description={description}
              className="flex-col sm:flex-row md:flex-col text-center sm:text-justify md:text-center"
            />
          ))}
        </CardSection>
      </Section>

      <IfLoggedOut>
        <WorkBox className="mt-14 text-center">
          <h2>Reverse, Flip & Mirror Text Instantly!</h2>
          <p>
            Join now to unlock extra features like saving your reversed texts, customizing fonts and
            styles, and syncing your favorite creations across devices.
          </p>
          <Button htmlFor="loginSignupCheckId">Signup Now</Button>
        </WorkBox>
      </IfLoggedOut>
    </>
  );
}
