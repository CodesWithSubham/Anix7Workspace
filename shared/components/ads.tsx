"use client";
import { useClientWidth } from "@shared/utils/ClientInfo";
import { cn } from "@shared/utils/cn";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useRef } from "react";

export function AdsIcon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full my-1.5 max-w-[calc(100vw-58px)] overflow-x-hidden">
      <div
        className={cn("relative mx-auto flex justify-center", className)}
        style={{ maxWidth: "100%" }}
      >
        <Link
          href="https://beta.publishers.adsterra.com/referral/dkbeL7ft3W"
          className="absolute top-0 right-0 bg-white opacity-100 dark:bg-neutral-700 text-[8px] text-center inline-block w-3.5 hover:w-16 transition-all duration-300 overflow-hidden group"
        >
          <span className="inline-block group-hover:hidden">AD</span>
          <span className="hidden group-hover:inline-block whitespace-nowrap">Ads by Adsterra</span>
        </Link>

        {children}
      </div>
    </div>
  );
}

/**
 * Monetag Ad Script - Injects into <head>
 */

export function MonetagMultiTag01() {
  /**<script src="" data-zone="128909" async data-cfasync="false"></script> */
  return (
    <Script
      id="monetag-multi-tag-01"
      src="https://fpyf8.com/88/tag.min.js"
      data-zone="128909"
      async
      data-cfasync="false"
    />
  );
}

export function MonetagInterstitial01() {
  return (
    <Script id="monetag-interstitial-01">
      {`(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',8883254,document.createElement('script'))`}
    </Script>
  );
}

export function MonetagVignetteBanner01() {
  return (
    <>
      <Script id="monetag-vignette-banner-01">
        {`(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('gizokraijaw.net',8978589,document.createElement('script'))`}
      </Script>
    </>
  );
}

export function AdsForImageIndexPage({ad}: {ad: number}) {
  if (ad == 1) {
    return (
      <>
        <MonetagVignetteBanner01 />
      </>
    );
  }
  if (ad == 2) {
    return (
      <>
        <MonetagVignetteBanner01 />
        <MonetagInterstitial01 />
      </>
    );
  }
  if (ad == 3) {
    return (
      <>
        <MonetagMultiTag01 />
      </>
    );
  }
  return null;
}

export function AdsterraNativeBanner() {
  const id = useId();
  return (
    <>
      <div className="mt-3 mb-2">
        <p className="ml-2">
          &#9733; <span className="border-b-2 pb-0.5 pr-2 border-theme-450">Sponsored</span>
        </p>
        <div id="container-fa1a6360539a28084530bb8980474d9a" />
      </div>
      <Script
        id={`adsterra-native-banner-${id}`}
        src="//jewelsobstructionerosion.com/fa1a6360539a28084530bb8980474d9a/invoke.js"
        async
        data-cfasync="false"
      />
    </>
  );
}

export function AdsterraBanner320x50() {
  const containerRef = useRef<null | HTMLDivElement>(null); // Reference to the div

  useEffect(() => {
    const container = containerRef.current; // Local reference

    if (!container) return;

    // Create and append the atOptions script
    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : '16bfa1be346fae62d3524171a14ef815',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    container.appendChild(script1);

    // Create and append the invoke script
    const script2 = document.createElement("script");
    script2.src = "//jewelsobstructionerosion.com/16bfa1be346fae62d3524171a14ef815/invoke.js";
    script2.async = true;
    script2.dataset.cfasync = "false";
    script2.type = "text/javascript";
    container.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (container) {
        container.innerHTML = ""; // Clear all child nodes (scripts)
      }
    };
  }, []);

  return (
    <AdsIcon className="w-xs">
      <div ref={containerRef} />
    </AdsIcon>
  );
}

export function AdsterraBanner468x60() {
  const containerRef = useRef<null | HTMLDivElement>(null); // Reference to the div

  useEffect(() => {
    const container = containerRef.current; // Local reference
    if (!container) return;

    // atOptions script
    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : 'b07eb1a97a194d7ed0c4d7caa5f32768',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;
    container.appendChild(script1);

    // Adsterra invoke script
    const script2 = document.createElement("script");
    script2.src = "//jewelsobstructionerosion.com/b07eb1a97a194d7ed0c4d7caa5f32768/invoke.js";
    script2.async = true;
    script2.dataset.cfasync = "false";
    container.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (container) {
        container.innerHTML = ""; // Clear all child nodes (scripts)
      }
    };
  }, []);

  return (
    <AdsIcon className="w-[468px]">
      <div ref={containerRef} />
    </AdsIcon>
  );
}

export function AdsterraBanner728x90() {
  const containerRef = useRef<null | HTMLDivElement>(null); // Reference to the div

  useEffect(() => {
    const container = containerRef.current; // Local reference
    if (!container) return;

    // Create atOptions script
    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : '24e33492ef011e1c64d6379b48b0e8da',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    container.appendChild(script1);

    // Create Adsterra invoke.js script
    const script2 = document.createElement("script");
    script2.src = "//jewelsobstructionerosion.com/24e33492ef011e1c64d6379b48b0e8da/invoke.js";
    script2.async = true;
    script2.dataset.cfasync = "false";
    container.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (container) {
        container.innerHTML = ""; // Clear all child nodes (scripts)
      }
    };
  }, []);

  return (
    <AdsIcon className="w-[728px]">
      <div ref={containerRef} />
    </AdsIcon>
  );
}

export function AdsterraBannerStrip() {
  const w = useClientWidth();
  if (w < 500) return <AdsterraBanner320x50 />;
  if (w >= 500 && w < 768) return <AdsterraBanner468x60 />;
  return <AdsterraBanner728x90 />;
}

export function HillTopAdsBanner01() {
  const containerRef = useRef<null | HTMLDivElement>(null); // Reference to the div

  useEffect(() => {
    const container = containerRef.current; // Local reference
    if (!container) return;

    // HillTopAds invoke script
    const script = document.createElement("script");
    script.src =
      "//ptoptaglyphi.com/bHXrVDs.d/Gllj0VYPWcdziPYnWa5tuLZzXVIW/sevmB9xu/Z/UflWkFP-TAYCxWOrDocs4CMfjgcQtuNhjyEq4/Nlz/g/ycOMAC";
    script.async = true;
    script.referrerPolicy = "no-referrer-when-downgrade";
    container.appendChild(script);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (container) {
        container.innerHTML = ""; // Clear all child nodes (scripts)
      }
    };
  }, []);

  return <div ref={containerRef}></div>;
}
export function HillTopAdsBanner02() {
  const containerRef = useRef<null | HTMLDivElement>(null); // Reference to the div
  useEffect(() => {
    const container = containerRef.current; // Local reference
    if (!container) return;

    // HillTopAds invoke script
    const script = document.createElement("script");
    script.src =
      "//ptoptaglyphi.com/brXCV.szdPGxlM0hYJWUdWioYYWI5/uOZ/XVIl/xe/m/9NuUZHUSldkpPkT/YQxuOdDrkw0iNuDyc-tJNDj-EN4SOeT/Qr0POXAM";
    script.async = true;
    script.referrerPolicy = "no-referrer-when-downgrade";
    container.appendChild(script);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (container) {
        container.innerHTML = ""; // Clear all child nodes (scripts)
      }
    };
  }, []);

  return <div ref={containerRef}></div>;
}
export function HillTopAdsBanner03() {
  const containerRef = useRef<null | HTMLDivElement>(null); // Reference to the div

  useEffect(() => {
    const container = containerRef.current; // Local reference
    if (!container) return;

    // HillTopAds invoke script
    const script = document.createElement("script");
    script.src =
      "//ptoptaglyphi.com/bXX.VMs/dTGFlf0DY/W/dMi/YKW/5buDZxX/Ii/LemmE9murZAUWlPkyPaTfYhxrO_DmkG3bN-jJAftnNYjwEV4iOCTXcz2zM/QU";
    script.async = true;
    script.referrerPolicy = "no-referrer-when-downgrade";
    container.appendChild(script);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (container) {
        container.innerHTML = ""; // Clear all child nodes (scripts)
      }
    };
  }, []);

  return <div ref={containerRef}></div>;
}
export function HillTopAdsBanner04() {
  const containerRef = useRef<null | HTMLDivElement>(null); // Reference to the div

  useEffect(() => {
    const container = containerRef.current; // Local reference
    if (!container) return;

    // HillTopAds invoke script
    const script = document.createElement("script");
    script.src =
      "//ptoptaglyphi.com/btXIVps.dzGplK0FYxWOdQikYFWo5SuwZUXBId/ceUmv9eu/ZxUTlokmPWTHY/xsO/D-k/3ENkz/ActZNwjGE/4DOQTTcK3/MBQC";
    script.async = true;
    script.referrerPolicy = "no-referrer-when-downgrade";
    container.appendChild(script);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (container) {
        container.innerHTML = ""; // Clear all child nodes (scripts)
      }
    };
  }, []);

  return <div ref={containerRef}></div>;
}

export function HillTopAdsByWidth() {
  // console.log(w);
  const w = useClientWidth();
  if (w <= 660)
    return (
      <div className="space-y-1.5 flex flex-col items-center">
        <HillTopAdsBanner01 />
        <HillTopAdsBanner02 />
        <HillTopAdsBanner03 />
      </div>
    );

  if (w > 660 && w <= 1080)
    return (
      <>
        <div className="flex justify-around mb-3">
          <HillTopAdsBanner01 />
          <HillTopAdsBanner02 />
        </div>
        <div className="flex justify-around">
          <HillTopAdsBanner03 />
          <HillTopAdsBanner04 />
        </div>
      </>
    );
  if (w > 1080 && w <= 1440)
    return (
      <div className="flex justify-around">
        <HillTopAdsBanner01 />
        <HillTopAdsBanner02 />
        <HillTopAdsBanner03 />
      </div>
    );

  return (
    <div className="flex justify-around">
      <HillTopAdsBanner01 />
      <HillTopAdsBanner02 />
      <HillTopAdsBanner03 />
      <HillTopAdsBanner04 />
    </div>
  );
}
