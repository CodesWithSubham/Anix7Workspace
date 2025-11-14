import Script from "next/script";

export default function Analytics() {
  if (process.env.NODE_ENV == "production")
    return (
      <>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RFXNWC90EH"></Script>
        <Script id="googletagmanager-G-RFXNWC90EH">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-RFXNWC90EH');`}
        </Script>
      </>
    );
  return null;
}
