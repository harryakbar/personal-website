// SEO Constants
export const SITE_NAME = "Harry Akbar Ali Munir";
// Vercel serves the www host and 308-redirects the apex to it, so every
// canonical, OG, JSON-LD and sitemap URL must use www too.
export const SITE_URL = "https://www.harryakbar.dev";
export const JOB_TITLE = "Product Engineer";
export const COMPANY_NAME = "FairPrice Group";
export const UNIVERSITY_NAME = "Universitas Indonesia";
export const SITE_DESCRIPTION = `${SITE_NAME} — ${JOB_TITLE} in Singapore building web products with React, Next.js, TypeScript, and Node.js. Currently at ${COMPANY_NAME}. Computer Science graduate of ${UNIVERSITY_NAME}.`;
export const SITE_KEYWORDS =
  "Harry Akbar Ali Munir, product engineer Singapore, software engineer Singapore, frontend engineer, React developer, Next.js developer, TypeScript, Node.js, FairPrice Group, Universitas Indonesia, web developer Singapore";
export const AUTHOR_NAME = "Harry Akbar Ali Munir";
export const AUTHOR_EMAIL = "harryakbaram@gmail.com";
export const HOME_OG_IMAGE_URL = `${SITE_URL}/assets/profile.jpeg`;

/** First full-time engineering role (STOQO, Dec 2018). */
export const CAREER_START = new Date("2018-12-01T00:00:00Z");

/** Whole years since CAREER_START, so the "N+ years" copy never goes stale. */
export const yearsShipping = (now: Date = new Date()): number => {
  const years =
    now.getUTCFullYear() -
    CAREER_START.getUTCFullYear() -
    (now.getUTCMonth() < CAREER_START.getUTCMonth() ? 1 : 0);
  return Math.max(years, 0);
};
