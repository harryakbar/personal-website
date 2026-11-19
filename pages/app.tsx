import Link from "next/link";

import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";
import { SITE_URL } from "../lib/constants";

type Props = {
  allPosts: Post[];
};

export default function App({ allPosts }: Props) {
  const heroPost = allPosts?.[0];
  const morePosts = allPosts?.slice(1);

  return (
    <Layout
      meta={{
        title: "Projects",
        description:
          "Side projects, photographs, and writing by Harry Akbar Ali Munir.",
        canonicalUrl: `${SITE_URL}/app`,
      }}
    >
      <Container className="max-w-5xl">
        <Intro title="Projects" />

        {/* Personal projects */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Personal Projects</h2>
          <div className="grid grid-cols-1 gap-4">
            <a
              className="block rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm transition"
              href="https://trip-optimizer.harryakbar.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="font-semibold">Trip Optimizer</div>
              <div className="text-sm text-neutral-700">
                An AI travel planner in production — React, Hono on Cloudflare
                Workers, Supabase, and Stripe/Midtrans payments.
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                trip-optimizer.harryakbar.dev
              </div>
            </a>

            <a
              className="block rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm transition"
              href="https://gfe-apps.harryakbar.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="font-semibold">
                GreatFrontEnd Apps Course Notes
              </div>
              <div className="text-sm text-neutral-700">
                Build interactive digital experiences within popular
                applications
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                gfe-apps.harryakbar.dev
              </div>
            </a>

            <a
              className="block rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm transition"
              href="https://gfe-marketing.harryakbar.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="font-semibold">GreatFrontEnd Marketing Pages</div>
              <div className="text-sm text-neutral-700">
                GreatFrontEnd marketing page challenges (learn to ship SaaS
                landing pages).
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                gfe-marketing.harryakbar.dev
              </div>
            </a>

            <a
              className="block rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm transition"
              href="https://storybook.harryakbar.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="font-semibold">Storybook (GreatFrontEnd)</div>
              <div className="text-sm text-neutral-700">
                A component library playground built from GreatFrontEnd UI
                challenges.
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                storybook.harryakbar.dev
              </div>
            </a>
          </div>
        </section>

        {/* Photographs */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Photographs</h2>
          <Link
            className="block rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 hover:shadow-sm transition"
            href="/photographs"
          >
            <div className="font-semibold">Photographs</div>
            <div className="text-sm text-neutral-700">
              Frames from a Fujifilm X-M5, straight out of camera in one of four
              film simulations.
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              harryakbar.dev/photographs
            </div>
          </Link>
        </section>

        {/* Blog */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Blog</h2>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts && morePosts.length > 0 && (
            <MoreStories posts={morePosts} />
          )}
        </section>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
