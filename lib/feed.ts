import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_URL } from "./constants";
import { WRITING } from "./home";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export type FeedPost = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
};

export function generateFeed(posts: FeedPost[]) {
  const items = posts
    .map((post) => {
      const copy = WRITING[post.slug];
      const url = `${SITE_URL}/posts/${post.slug}`;
      return `    <item>
      <title>${escapeXml(copy?.title ?? post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(copy?.blurb ?? post.excerpt ?? "")}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(AUTHOR_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}
