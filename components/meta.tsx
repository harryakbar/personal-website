import Head from "next/head";

import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  HOME_OG_IMAGE_URL,
} from "../lib/constants";

type MetaProps = {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
};

const Meta = ({
  title = SITE_NAME,
  description = SITE_DESCRIPTION,
  keywords = SITE_KEYWORDS,
  ogImage = HOME_OG_IMAGE_URL,
  canonicalUrl = SITE_URL,
}: MetaProps = {}) => {
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_NAME} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="SG" />
      <meta name="geo.placename" content="Singapore" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta
        name="twitter:creator"
        content={`@${SITE_NAME.replace(/\s+/g, "")}`}
      />

      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />

      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
    </Head>
  );
};

export default Meta;
