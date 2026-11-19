import { GetServerSideProps } from "next";

import { getAllPosts } from "../lib/api";
import { FeedPost, generateFeed } from "../lib/feed";

function Feed() {
  // getServerSideProps writes the XML response
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getAllPosts(["slug", "title", "date", "excerpt"]) as FeedPost[];

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate",
  );
  res.write(generateFeed(posts));
  res.end();

  return { props: {} };
};

export default Feed;
