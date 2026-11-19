import { Html, Head, Main, NextScript } from "next/document";

import {
  AUTHOR_NAME,
  COMPANY_NAME,
  HOME_OG_IMAGE_URL,
  JOB_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  UNIVERSITY_NAME,
} from "../lib/constants";

export default function Document() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    alternateName: "Harry Akbar",
    url: SITE_URL,
    image: HOME_OG_IMAGE_URL,
    description: SITE_DESCRIPTION,
    jobTitle: JOB_TITLE,
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: "Singapore",
    },
    worksFor: {
      "@type": "Organization",
      name: COMPANY_NAME,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: UNIVERSITY_NAME,
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Go",
      "PostgreSQL",
      "Web Performance",
      "Core Web Vitals",
      "Accessibility",
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
