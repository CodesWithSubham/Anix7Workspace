// /app/page.js

import MobileMenu from "@shared/components/navigation/MobileMenu";
import { WorkBox } from "@shared/components/ui/Boxes";
import { IfLoggedIn, IfLoggedOut } from "@shared/components/auth/LoggedInWrapper";
import { Button } from "@shared/components/ui/Button";
import Section, { Card, CardSection } from "@shared/components/ui/Section";
import { FeaturedTools, ToolsList } from "@/components/tools/toolsList";
import { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" }, addToSitemap: true };

export default function Home() {
  return (
    <>
      <section className="relative p-5 text-center mb-4 md:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          Welcome to Anix7 Tools
        </h1>
        <p className="sm:text-md md:text-lg lg:text-xl mb-6 text-center">
          Simplify your digital workflow with a powerful collection of online tools — from URL
          shorteners and QR code generators to image resizing, uploading, and more. Everything you
          need, all in one place.
        </p>

        <IfLoggedOut>
          <Button className="rounded-full py-3 px-[10%]" htmlFor="loginSignupCheckId">
            SignUp Now
          </Button>
        </IfLoggedOut>
      </section>

      <FeaturedTools />

      <ToolsList />

      {/* <section className="bg-gradient-to-b from-blue-600 via-indigo-600 to-transparent text-white py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Go Pro for an Enhanced Experience
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Subscribe to our Pro plan to remove ads and unlock premium features
            such as unlimited uploads, faster URL shortening, and more.
          </p>
        </div>
        <div className="flex justify-center gap-10">
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-xs text-center">
            <h3 className="text-xl font-semibold mb-4">Basic Plan</h3>
            <p className="text-lg mb-6">
              Free with ads, access to core features.
            </p>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full w-full">
              Subscribe Now
            </button>
          </div>
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-xs text-center">
            <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
            <p className="text-lg mb-6">
              No ads, premium features, faster uploads, and unlimited access.
            </p>
            <button className="px-6 py-3 bg-green-500 text-white rounded-full w-full">
              Get Pro
            </button>
          </div>
        </div>
      </section> */}

      <Section title="How It Works">
        <CardSection>
          {[
            {
              title: "Step 1: Choose a Tool",
              description:
                "Select from our tools to shorten URLs, upload images, generate custom QR codes or any other tools.",
            },
            {
              title: "Step 2: Customize",
              description:
                "Easily customize your links, images, QR codes or what you choose with various options and settings.",
            },
            {
              title: "Step 3: Share & Access",
              description:
                "Share your content instantly with shareable links, and access your uploads anytime from anywhere.",
            },
          ].map(({ title, description }, index) => (
            <Card key={index} title={title} description={description} />
          ))}
        </CardSection>
      </Section>

      {/* <Section title="What Our Users Say">
        <div className="flex justify-center gap-16">
          <div className="bg-white shadow p-8 rounded-lg max-w-xs text-center">
            <p className="text-lg italic mb-4">
              "Anix7 Tools is a lifesaver! I can quickly shorten URLs and generate QR codes without
              any hassle."
            </p>
            <h4 className="text-xl font-semibold">John Doe</h4>
            <p className="text-gray-500">Marketing Specialist</p>
          </div>
          <div className="bg-white shadow p-8 rounded-lg max-w-xs text-center">
            <p className="text-lg italic mb-4">
              "I love the image uploading feature. It's simple, fast, and perfect for sharing with
              my team."
            </p>
            <h4 className="text-xl font-semibold">Jane Smith</h4>
            <p className="text-gray-500">Photographer</p>
          </div>
        </div>
      </Section> */}

      <IfLoggedOut>
        <WorkBox className="mt-14 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg mb-6">
            Sign up today and unlock the full potential of Anix7 Tools!
          </p>

          <Button className="rounded-full py-3 px-[10%]" htmlFor="loginSignupCheckId">
            SignUp Now
          </Button>
        </WorkBox>
      </IfLoggedOut>
      <IfLoggedIn>
        <MobileMenu />
      </IfLoggedIn>
    </>
  );
}
