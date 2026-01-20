import { Html, Head, Main, NextScript } from "next/document";

import { SITE_URL, SITE_DESCRIPTION, AUTHOR_NAME } from "../lib/constants";

export default function Document() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    alternateName: "Harry Akbar Ali M",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    jobTitle: "Software Engineer",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: "Singapore",
    },
    worksFor: {
      "@type": "Organization",
      name: "NTUC FairPrice",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Indonesia",
    },
    knowsAbout: [
      "React.js",
      "Node.js",
      "UI/UX",
      "Web Development",
      "Frontend Development",
      "JavaScript",
      "TypeScript",
      "Figma",
    ],
    sameAs: [
      "https://linkedin.com/in/harryakbaram",
      "https://github.com/harryakbar",
      "https://leetcode.com/harryakbaram/",
    ],
  };

  return (
    <Html lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
