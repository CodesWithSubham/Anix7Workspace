import SpeedCalculatorPage from "./SpeedCalculatorPage";
import { WorkBox } from "@shared/components/ui/Boxes";
import { Button } from "@shared/components/ui/Button";
import Section, { Card, CardSection } from "@shared/components/ui/Section";
import { units } from "./speedUnits";
import { IfLoggedOut } from "@shared/auth/LoggedInWrapper";

// Generate all unique pairs of units for SEO content
const pairs = units.flatMap((u1) =>
  units.filter((u2) => u2.label !== u1.label).map((u2) => `${u1.label} to ${u2.label}`)
);

export const metadata = {
  title: "Speed Calculator - Convert Between mph, km/h, m/s, Mach, Knots and More",
  description:
    "Free online Speed Calculator tool to convert between multiple speed units like mph, km/h, m/s, Mach, knots, ft/s, and even the speed of light. Fast, accurate, and easy to use.",
  keywords: [
    "Anix7 Tools",
    "Speed calculator",
    "Speed converter",
    "speed unit conversion",
    "convert speed units",
    "online speed conversion",
    "fast speed calculator",
    ...pairs,
  ],
  openGraph: {
    url: `/speed-calculator`,
    siteName: "Anix7 Tools",
    // images: [
    //   {
    //     url: `/assets/img/speed-calculator-og.jpeg`,
    //     width: 1200,
    //     height: 630,
    //     alt: "Anix7 Tools Speed Calculator",
    //   },
    // ],
    type: "website",
  },
  // twitter: { card: "summary_large_image" },
  alternates: { canonical: "/speed-calculator" },
  addToSitemap: true,
};

export default function SpeedCalculator() {
  return (
    <>
      <SpeedCalculatorPage />

      <Section title="Smart Speed Calculator">
        <p className="text-center mb-6">
          Instantly convert between dozens of speed and velocity units including meters per second,
          kilometers per hour, miles per hour, knots, Mach number, and even the speed of light.
          Perfect for students, engineers, pilots, or curious learners.
        </p>

        <CardSection>
          {[
            {
              title: "Comprehensive Unit Support",
              description:
                "Covers all major speed units — from everyday mph and km/h to scientific units like Mach and c (speed of light).",
              // image: "/assets/img/speed-units.png",
            },
            {
              title: "Fast & Accurate Calculations",
              description:
                "Get instant results powered by precise conversion factors for engineering and physics accuracy.",
              // image: "/assets/img/speed-fast.png",
            },
            {
              title: "Educational and Practical",
              description:
                "Ideal for students, pilots, sailors, or anyone studying motion, physics, or navigation.",
              // image: "/assets/img/speed-education.png",
            },
            {
              title: "Works on Any Device",
              description:
                "Fully responsive design — use the converter on your phone, tablet, or desktop seamlessly.",
              // image: "/assets/img/speed-responsive.png",
            },
            {
              title: "Free & No Signup Required",
              description: "Use it instantly — no login, no ads, just clean conversions.",
              // image: "/assets/img/no-signup.png",
            },
          ].map(({ title, description /* , image */ }, i) => (
            <Card
              key={i}
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
          <h2>Convert Speed Instantly!</h2>
          <p>
            Create a free account to save your favorite conversions, compare multiple units, and
            unlock advanced engineering features.
          </p>
          <Button htmlFor="loginSignupCheckId">Signup Now</Button>
        </WorkBox>
      </IfLoggedOut>
    </>
  );
}
