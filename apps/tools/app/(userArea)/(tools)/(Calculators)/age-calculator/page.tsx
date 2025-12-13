// apps/tools/app/(userArea)/(tools)/(Calculators)/age-calculator/page.tsx

import AgeCalculatorClient from "./AgeCalculatorClient";
import Section, { Card, CardSection } from "@shared/components/ui/Section";
import { WorkBox } from "@shared/components/ui/Boxes";
import { Button } from "@shared/components/ui/Button";
import { IfLoggedOut } from "@shared/auth/LoggedInWrapper";

export const metadata = {
  title: "Age Calculator - Calculate Age in Years, Months and Days",
  description:
    "Free Age Calculator to find your exact age in years, months and days. Compare two ages, calculate differences, and check days left until your birthday.",
  keywords: [
    "Anix7 Tools",
    "Anix7 age calculator",
    "Age calculator",
    "calculate age online",
    "exact age calculator",
    "date of birth calculator",
    "birthday calculator",
    "next birthday calculator",
    "age difference calculator",
    "age gap calculator",
    "calculate age in years months days",
    "DOB calculator",
    "calculate age from date of birth",
    "age counter",
    "free age calculator",
    "how old am I",
    "age finder tool",
    "calculate age instantly",
    "day month year age calculator",
    "accurate age calculator",
    "fun age calculator",
    "online birthday age calculator",
    "student age calculator",
    "teacher age calculator",
    "historical age calculator",
    "check my age",
    "custom date age calculator",
    "compare two ages online",
    "age difference tool",
    "birthday reminder tool",
    "calculate till date",
    "advanced age calculator",
    "simple age calculator",
    "best age calculator online",
    "quick age calculator",
    "calculate friends age difference",
    "calculate couple age gap",
    "calculate family age difference",
    "instant birthday calculator",
    "precise age tool",
    "calculate milestones by age",
    "smart age calculator",
  ],

  openGraph: {
    url: `/age-calculator`,
    siteName: "Anix7 Tools",
    images: [
      {
        url: `/assets/img/age-calculator-og.jpeg`,
        width: 1200,
        height: 630,
        alt: "Anix7 Tools Age Calculator",
      },
    ],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/age-calculator" },
  addToSitemap: true,
};

export default function AgeCalculator() {
  return (
    <>
      <AgeCalculatorClient />

      <Section title="Smart Age Calculator">
        <p className="text-center mb-6">
          Our free online Age Calculator helps you find your exact age in years, months, and days.
          Whether you want to calculate your personal age, check the difference between two people,
          or discover the days left until your next birthday — this tool makes it quick, simple, and
          accurate.
        </p>

        <CardSection>
          {[
            {
              title: "Precise Age Calculation",
              description:
                "Get your age calculated instantly with exact details in years, months, and days using advanced date functions.",
              image: "/assets/img/age-calculator.png",
            },
            {
              title: "Age Difference Between Two People",
              description:
                "Easily compare two birth dates and see the exact age gap in years and months. Perfect for friends, couples, or family comparisons.",
              image: "/assets/img/age-compare.png",
            },
            {
              title: "Next Birthday Reminder",
              description:
                "Find out the exact date of your upcoming birthday and how many days are left until your special day arrives.",
              image: "/assets/img/age-birthday.png",
            },
            {
              title: "Custom Till Date Calculation",
              description:
                "Not just till today — you can select any date in the past or future to calculate age as of that specific day.",
              image: "/assets/img/age-date-to-date.png",
            },
            {
              title: "Educational & Fun",
              description:
                "Great for students, teachers, and curious minds to quickly check ages, important milestones, or historical figures’ ages.",
              image: "/assets/img/age-educational-and-fun.png",
            },
            {
              title: "No Signup Required",
              description:
                "Use the calculator instantly without any registration. For advanced features like saving and comparing, you can create a free account.",
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
          <h2>Calculate Your Age in Seconds!</h2>
          <p>
            Join now to unlock advanced features like saving your age history, comparing multiple
            people, and getting personalized birthday reminders.
          </p>
          <Button htmlFor="loginSignupCheckId">Signup Now</Button>
        </WorkBox>
      </IfLoggedOut>
    </>
  );
}
