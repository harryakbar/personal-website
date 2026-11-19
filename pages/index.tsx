import { GetStaticProps } from "next";
import { useRef } from "react";

import Contact from "../components/home/contact";
import { homeFontClass } from "../components/home/fonts";
import Hero from "../components/home/hero";
import styles from "../components/home/home.module.css";
import { useReveal } from "../components/home/motion";
import OpenSource from "../components/home/open-source";
import SiteFooter from "../components/home/site-footer";
import SiteHeader from "../components/home/site-header";
import Stack from "../components/home/stack";
import Timeline from "../components/home/timeline";
import Writing, { WritingItem } from "../components/home/writing";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import {
  JOB_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_URL,
  yearsShipping,
} from "../lib/constants";
import { getGitHubSnapshot, GitHubSnapshot } from "../lib/github";
import { WRITING, WRITING_ORDER } from "../lib/home";

type Props = {
  github: GitHubSnapshot;
  posts: WritingItem[];
  years?: number;
};

export default function Index({ github, posts, years }: Props) {
  const mainRef = useRef<HTMLDivElement>(null);
  useReveal(mainRef);

  return (
    <Layout
      meta={{
        title: `${JOB_TITLE} in Singapore`,
        description: SITE_DESCRIPTION,
        keywords: SITE_KEYWORDS,
        canonicalUrl: SITE_URL,
      }}
      className={`${styles.root} ${homeFontClass}`}
      header={<SiteHeader />}
      footer={<SiteFooter />}
      mainId="main"
    >
      <div ref={mainRef}>
        <Hero years={years} />
        <Timeline />
        <Stack />
        <OpenSource github={github} />
        <Writing posts={posts} />
        <Contact />
      </div>
    </Layout>
  );
}

const rank = (slug: string) => {
  const i = WRITING_ORDER.indexOf(slug);
  return i === -1 ? WRITING_ORDER.length : i;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const github = await getGitHubSnapshot();

  const posts: WritingItem[] = getAllPosts(["title", "date", "slug", "excerpt"])
    .sort((a, b) => b.date.localeCompare(a.date) || rank(a.slug) - rank(b.slug))
    .map((post) => {
      const copy = WRITING[post.slug];
      const year = new Date(post.date).getFullYear();
      return {
        slug: post.slug,
        title: copy?.title ?? post.title,
        blurb: copy?.blurb ?? post.excerpt ?? "",
        meta: copy ? `${year} · ${copy.topic}` : String(year),
      };
    });

  return {
    props: { github, posts, years: yearsShipping() },
    // refresh the GitHub snapshot at most hourly
    revalidate: 3600,
  };
};
