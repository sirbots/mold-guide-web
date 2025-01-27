"use client";
import Script from "next/script";

const AnalyticsScripts = () => {
  return (
    <>
      <Script
        src={`https://analytics.umami.is/script.js`}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_DATA_WEBSITE_ID}
        strategy="afterInteractive"
      />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PZ83BXS');
        `}
      </Script>
    </>
  );
};

export default AnalyticsScripts;
