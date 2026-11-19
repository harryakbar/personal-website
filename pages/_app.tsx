import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Script from "next/script";
import "../styles/index.css";

const WebVitalsPanel = dynamic(() => import("../components/web-vitals"), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const { query } = useRouter();
  // Debug overlay: always on in development, opt-in on production via ?vitals
  const showVitals =
    process.env.NODE_ENV !== "production" || query.vitals !== undefined;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-T0SWJ8NPQB`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T0SWJ8NPQB');
          `,
        }}
      />
      <SpeedInsights />
      <Component {...pageProps} />
      <Analytics />
      {showVitals && <WebVitalsPanel />}
    </>
  );
}
