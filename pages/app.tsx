import dynamic from "next/dynamic";

import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";
import { SITE_URL } from "../lib/constants";

const Weather = dynamic(() => import("../components/weather"), { ssr: false });
const Calendar = dynamic(() => import("../components/calendar"), {
  ssr: false,
});
const CurrencyConverter = dynamic(
  () => import("../components/currencyConverter"),
  { ssr: false },
);

const SHOW_TOOLS_SECTION = false;

type Props = {
  allPosts: Post[];
};

export default function App({ allPosts }: Props) {
  const heroPost = allPosts?.[0];
  const morePosts = allPosts?.slice(1);

  return (
    <main>
      <Layout
        meta={{
          title: "Tools & Blog",
          description:
            "Personal tools and blog posts by Harry Akbar Ali Munir - Weather, Currency Converter, Calendar, and more.",
          canonicalUrl: `${SITE_URL}/app`,
        }}
      >
        <Container className="max-w-5xl">
          <Intro title="Apps & Blog" />

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
                  Plan trips by optimizing annual leave with public holidays.
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
                <div className="font-semibold">
                  GreatFrontEnd Marketing Pages
                </div>
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

          {/* Tools section (hidden by default) */}
          {SHOW_TOOLS_SECTION ? (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-3">Tools</h2>
              <div className="flex md:space-x-4 flex-col md:flex-row items-start md:items-top space-x-0">
                <div className="flex flex-col">
                  <Weather />
                  <CurrencyConverter />
                </div>
                <div className="flex grow">
                  <Calendar />
                </div>
              </div>
            </section>
          ) : null}

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
    </main>
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
