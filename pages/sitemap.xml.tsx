import { GetServerSideProps } from "next";

import { getAllPosts } from "../lib/api";
import { SITE_URL } from "../lib/constants";

function generateSitemap(posts: Array<{ slug: string; date?: string }>) {
  const currentDate = new Date().toISOString().split("T")[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/app</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${posts
  .map((post) => {
    const lastmod = post.date
      ? new Date(post.date).toISOString().split("T")[0]
      : currentDate;
    return `  <url>
    <loc>${SITE_URL}/posts/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

function Sitemap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getAllPosts(["slug", "date"]);

  // Generate the XML sitemap with the posts data
  const sitemap = generateSitemap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
