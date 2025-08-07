import dynamic from "next/dynamic";
import Head from "next/head";

import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import Post from "../interfaces/post";
import { getAllPosts } from "../lib/api";

const Weather = dynamic(() => import("../components/weather"), { ssr: false });
const Calendar = dynamic(() => import("../components/calendar"), {
  ssr: false,
});
const CurrencyConverter = dynamic(
  () => import("../components/currencyConverter"),
  { ssr: false },
);

type Props = {
  allPosts: Post[];
};

export default function App({ allPosts }: Props) {
  const heroPost = allPosts?.[0];
  const morePosts = allPosts?.slice(1);

  return (
    <main>
      <Layout>
        <Head>
          <title>Harry Akbar Ali M</title>
        </Head>
        <Container>
          <Intro title="Tools" />
          <div className="flex md:space-x-4 flex-col md:flex-row items-start md:items-top space-x-0">
            <div className="flex flex-col">
              <Weather />
              <CurrencyConverter />
            </div>
            <div className="flex grow">
              <Calendar />
            </div>
          </div>

          <div>
            <article className="prose">
              <h1>Blog</h1>
            </article>
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
          </div>
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
