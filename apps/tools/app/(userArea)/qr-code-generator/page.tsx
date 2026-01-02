import Image from "next/image";
import { Button } from "@shared/components/ui/Button";
import QRCodeGenerator, { LaunchQRCodeGenerator } from "./generator";
import { IoColorPaletteOutline } from "react-icons/io5";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fully customized QR Code Generator with colors, shapes, and logos",
  description:
    "QR Code Generator by Anix7 Tools, where you can generate fully customized QR Codes with colors, shapes, and logos.",
  keywords: [
    "QR",
    "QR Code",
    "QR Code Generator",
    "QR Code Generator by Anix7 Tools",
    "Anix7 QR Code Generator",
    "Anix7 Tools QR Code Generator",
    "Anix7 Tools",
    "Anix7 Tools QR code generator",
    "QR code generator Anix7 Tools",
    "QR code generator with colors",
    "QR code generator with shapes",
    "QR code generator with logos",
    "custom QR code generator",
    "create QR codes online Anix7",
    "generate QR codes with logos",
    "QR code design tool",
    "personalized QR codes",
    "QR code generator for websites",
    "dynamic QR code generator",
    "QR code creation tool Anix7",
    "QR code with custom design",
    "QR code with logo Anix7 Tools",
    "Anix7 customized QR code generator",
    "QR code for business cards",
    "generate static QR codes",
    "QR code creator Anix7",
    "Anix7 QR code tool",
    "QR code generator with custom colors",
    "create QR code for links",
    "QR code for marketing Anix7",
    "QR code generator for events",
    "generate QR code for URL",
    "QR code generator with custom features",
    "QR Code with colors",
    "QR Code with shapes",
    "QR Code with logos",
    "QR Code Generator with colors, shapes, and logos",
    "Static QR Codes",
    "Customized Colors & Shapes for QR Codes",
    "QR Code design",
    "custom QR code generator",
    "personalized QR code",
    "QR code maker with logos",
    "QR code customization",
    "generate QR code with logo",
    "create QR code with colors",
    "free QR code generator",
    "dynamic QR codes",
    "QR code for websites",
    "QR code for social media",
    "QR code with image",
    "QR code for business",
    "generate QR for marketing",
    "customize your QR code",
    "QR code for event tickets",
    "QR code with branded logo",
    "create colorful QR codes",
    "QR code generator for business cards",
    "static QR code generator",
    "advanced QR code creator",
    "QR code generator online",
    "scanable QR code creation",
    "QR code generator free",
    "QR code maker for websites",
    "QR code with custom logo",
    "QR code for promotional campaigns",
    "QR code generator for flyers",
    "generate scannable QR codes",
    "QR code for business marketing",
    "QR code with custom branding",
    "personalized QR code creation",
    "generate colorful QR codes",
    "QR code generator for events",
    "generate QR code for marketing campaigns",
    "QR code generator for e-commerce",
    "QR code maker for advertising",
    "QR code generator with high customization",
    "easy QR code generator",
    "customizable QR code builder",
    "QR code generator with images",
    "create business QR code",
    "QR code with dynamic features",
    "QR code for digital marketing",
    "QR code with analytics",
    "generate branded QR codes",
  ],

  openGraph: {
    url: "/qr-code-generator",
    siteName: "Anix7 Tools",
    images: [
      {
        url: `/assets/img/qr-code-generator-og.jpeg`,
        width: 1200,
        height: 630,
        alt: "Anix7 Tools QR Code Generator",
      },
    ],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/qr-code-generator" },
  addToSitemap: true,
};

export default async function QrCode() {
  return (
    <>
      {/* <IfLoggedIn> */}
      {/* <Suspense> */}
      <QRCodeGenerator />
      {/* </Suspense> */}
      {/* </IfLoggedIn> */}
      <div className="w-full text-center">
        <div className="flex flex-wrap justify-center gap-6 text-center my-10 *:max-w-xs">
          {/* Section 1: Custom Landing Pages */}
          {/* <div className="flex flex-col items-center gap-2">
    <img src="/icons/page.svg" alt="Landing Page" className="w-12 h-12" />
    <h3 className="text-base font-semibold">
    Fully Customized Landing Pages
    </h3>
    <p className="text-sm text-muted-foreground">
    Design unique redirect pages for each QR code — great for profiles,
    events, or campaigns.
    </p>
    </div> */}

          {/* Section 2: QR Code Stats */}
          {/* <div className="flex flex-col items-center gap-2">
    <img
    src="/icons/stats.svg"
    alt="QR Code Stats"
    className="w-12 h-12"
    />
    <h3 className="text-base font-semibold">QR Code Statistics</h3>
    <p className="text-sm text-muted-foreground">
    Track scans in real-time: see when, where, and how your QR codes are
    being used.
    </p>
    </div> */}

          {/* Section 3: QR Styling */}
          <div className="flex flex-col items-center gap-2">
            <IoColorPaletteOutline className="w-20 h-20" />
            <h2 className="text-base font-semibold">Customized Colors & Shapes</h2>
            <p className="text-sm text-muted-foreground">
              Personalize your QR codes with unique color schemes, eye styles, and frames.
            </p>
          </div>

          {/* Section 4: Logo Support */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/assets/img/image.png"
              alt="QR Logo"
              title="QR Logo"
              className="w-20 h-20"
              width={80}
              height={80}
            />
            <h2 className="text-base font-semibold">Add Logos to QR Codes</h2>
            <p className="text-sm text-muted-foreground">
              Boost recognition by embedding your brand logo directly into the QR code.
            </p>
          </div>
        </div>
      </div>
      <section className="my-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Benefits from <span className="text-theme-450">QR by Anix7 Tools</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {/* With QR by Anix7 Tools, you can track how many people scan your QR
          Codes — along with the time, location, and more. No coding skills
          needed to build beautiful, fully customized landing pages. */}
          With QR Code Generator by Anix7 Tools, you can generate fully customized QR Codes with
          colors, shapes, and logos.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            // "Dynamic QR Codes",
            "Static QR Codes",
            // "QR Code Statistics",
            // "Fully Customized Landing Pages",
            "Customized Colors & Shapes for QR Codes",
            // "No Coding Required",
          ].map((benefit, i) => (
            <div
              key={i}
              className="flex-1 min-w-[250px] max-w-sm sm:basis-[calc(50%-1rem)] md:basis-[calc(33.333%-1rem)] border rounded-lg px-4 py-5 bg-background/80 shadow-xs hover:shadow-md transition-all"
            >
              <p className="font-medium text-sm sm:text-base">{benefit}</p>
            </div>
          ))}
        </div>
      </section>
      {/* <section className="my-16 px-4">
  <h2 className="text-2xl font-bold text-center mb-6">
    Dynamic vs Static QR Codes
  </h2>
  <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
    Both serve similar purposes but differ in flexibility, editability,
    and trackability.
  </p>

  <div className="grid md:grid-cols-2 gap-6">
    {
      // Dynamic QR Code Card
    }
    <div className="border rounded-xl p-6 shadow-xs bg-background">
      <h3 className="text-xl font-semibold mb-2 text-theme-450">
        DYNAMIC
      </h3>
      <div className="h-32 w-full bg-muted/30 rounded-md mb-4 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">
          [ Illustration ]
        </span>
      </div>
      <h4 className="text-lg font-medium mb-1">
        Dynamic QR Codes Explained
      </h4>
      <p className="text-sm text-muted-foreground mb-2">
        Dynamic QR Codes allow you to change the destination URL anytime
        you want without having to reprint the QR Code.
      </p>
      <p className="text-sm text-muted-foreground mb-2">
        You can also track how many people scan your QR Code, from where
        and when.
      </p>
      <p className="text-sm text-muted-foreground">
        Perfect for marketing campaigns, business cards, product
        packaging, etc.
      </p>
    </div>

    {
      //Static QR Code Card
    }
    <div className="border rounded-xl p-6 shadow-xs bg-background">
      <h3 className="text-xl font-semibold mb-2 text-theme-450">
        STATIC
      </h3>
      <div className="h-32 w-full bg-muted/30 rounded-md mb-4 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">
          [ Illustration ]
        </span>
      </div>
      <h4 className="text-lg font-medium mb-1">
        Static QR Codes Explained
      </h4>
      <p className="text-sm text-muted-foreground mb-2">
        Static QR Codes encode the information directly in the QR Code
        pattern.
      </p>
      <p className="text-sm text-muted-foreground mb-2">
        Once generated, you cannot change what's encoded in the QR Code.
      </p>
      <p className="text-sm text-muted-foreground">
        Perfect for simple use cases like sharing WiFi passwords, contact
        information, or plain text.
      </p>
    </div>
  </div>
</section> */}
      <section className="my-16 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">How to Use</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Creating QR Codes with{" "}
          <span className="text-theme-450 font-medium">QR by Anix7 Tools</span> is simple and
          efficient. Just follow these steps:
        </p>

        <div className="flex flex-wrap justify-center gap-6 *:max-w-xs">
          {/* Step 1 */}
          <div className="border rounded-xl p-6 shadow-xs text-center bg-background">
            <div className="h-24 w-full bg-muted/30 rounded-md mb-4 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                <Image
                  src="/assets/img/touch.png"
                  alt="Touch Icon"
                  title="Choose QR Code Type"
                  width={80}
                  height={80}
                />
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Choose QR Code Type</h3>
            <p className="text-sm text-muted-foreground">
              First, choose the type of QR Code. This defines what your QR Code will do — link,
              text, WiFi, email, and more.
            </p>
          </div>

          {/* Step 2 */}
          <div className="border rounded-xl p-6 shadow-xs text-center bg-background">
            <div className="h-24 w-full bg-muted/30 rounded-md mb-4 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                <Image
                  src="/assets/img/fill.png"
                  alt="Fill Required Fields"
                  title="Fill Required Fields"
                  width={80}
                  height={80}
                />
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Fill Required Fields</h3>
            <p className="text-sm text-muted-foreground">
              Enter the necessary details based on the selected type. For example, a link-type QR
              will ask for a website URL.
            </p>
          </div>

          {/* Step 3 */}
          <div className="border rounded-xl p-6 shadow-xs text-center bg-background">
            <div className="h-24 w-full bg-muted/30 rounded-md mb-4 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                <Image
                  src="/assets/img/share2.png"
                  alt="Download & Share"
                  title="Download & Share"
                  width={80}
                  height={80}
                />
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Download & Share</h3>
            <p className="text-sm text-muted-foreground">
              Once generated, download and share your QR Code directly from your dashboard — edit
              anytime if needed.
            </p>
          </div>
        </div>
      </section>
      <section className="my-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What are QR Codes?</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          QR Codes stand for <strong>Quick Response</strong>. Originally developed in 1994 by Denso
          Wave to track vehicles during manufacturing, they&apos;ve since evolved into powerful
          tools for modern interaction. Today, anyone can scan a QR Code with just a phone camera.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Feedback */}
          <div className="p-5 border rounded-xl shadow-xs bg-background">
            <h3 className="text-lg font-semibold mb-1">📋 Gather Feedback</h3>
            <p className="text-sm text-muted-foreground">
              Easily collect user feedback when they scan your QR Code — ideal for improving
              products or services.
            </p>
          </div>

          {/* Business Instructions */}
          <div className="p-5 border rounded-xl shadow-xs bg-background">
            <h3 className="text-lg font-semibold mb-1">🏢 Describe your Business</h3>
            <p className="text-sm text-muted-foreground">
              Redirect users to an instructional or informational page about your business for quick
              insights.
            </p>
          </div>

          {/* Profile Cards */}
          <div className="p-5 border rounded-xl shadow-xs bg-background">
            <h3 className="text-lg font-semibold mb-1">💼 Profile Cards</h3>
            <p className="text-sm text-muted-foreground">
              Ditch physical cards — share digital profile cards instantly with a single scan.
            </p>
          </div>

          {/* Events & Discounts */}
          <div className="p-5 border rounded-xl shadow-xs bg-background">
            <h3 className="text-lg font-semibold mb-1">🎉 Promote Events & Discounts</h3>
            <p className="text-sm text-muted-foreground">
              Share special offers or event invites by embedding them in QR Codes — perfect for
              campaigns and promotions.
            </p>
          </div>
        </div>
      </section>
      <section className="my-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">QR Code Types</h2>
        <p className="text-center text-muted-foreground mb-8">
          Choose the type of QR Code you want to generate.
        </p>

        <div className="flex flex-wrap justify-stretch gap-6">
          {[
            {
              label: "URL",
              desc: "Link to any Website URL",
              img: "/assets/img/link.png",
            },
            { label: "Text", desc: "Share Text", img: "/assets/img/text.png" },
            {
              label: "Email",
              desc: "Send an email",
              img: "/assets/img/email.png",
            },
            // { label: "Call", desc: "Make a call", img: "/icons/call.png" },
            // { label: "SMS", desc: "Send message", img: "/icons/sms.png" },
            // { label: "WhatsApp", desc: "Send WhatsApp message", img: "/icons/whatsapp.png" },
            {
              label: "Wifi",
              desc: "Connect to WI-FI",
              img: "/assets/img/wifi.png",
            },
            // { label: "Vcard", desc: "Save a contact", img: "/icons/vcard.png" },
            // { label: "Event", desc: "Invite to your event", img: "/icons/event.png" },
          ].map((type, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-60 sm:min-w-72 md:min-w-80 flex flex-col items-center border rounded-xl p-4 shadow-xs bg-background text-center"
            >
              <Image
                src={type.img}
                alt={type.label}
                title={type.label}
                className="w-12 h-12 mb-3 object-contain"
                width={48}
                height={48}
              />
              <h3 className="font-semibold text-lg">{type.label}</h3>
              <p className="text-sm mb-4">{type.desc}</p>
              {/* <IfLoggedIn> */}
              <Button href={`?content=${type.label}`}>Choose</Button>
              {/* </IfLoggedIn> */}
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 px-4 max-w-5xl mx-auto text-center">
        <Image
          src="/assets/img/logo.png" // Replace with your actual logo path
          alt="QR by Anix7 Tools"
          title="QR by Anix7 Tools"
          className="w-40 h-40 mx-auto mb-4"
          width={160}
          height={160}
        />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">QR by Anix7 Tools</h2>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
          Generate fully customized QR Codes with colors, shapes, and logos
          {/* — and keep track of how many people scan your QR Codes, from where, and on what date */}
          .
        </p>
        <LaunchQRCodeGenerator />
      </section>
    </>
  );
}
