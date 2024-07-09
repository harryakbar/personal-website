import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";
import Weather from "../components/weather";
import Calendar from "../components/calendar";
import CurrencyConverter from "../components/currencyConverter";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Layout>
        <Head>
          <title>Harry Akbar Ali M</title>
        </Head>
        <Container>
          <Intro title="Tools" />
          <div className="flex md:space-x-4 flex-col md:flex-row items-start md:items-top space-x-0">
            <div className="flex grow">
              <Weather />
            </div>
            <div className="flex flex-col">
              <Calendar />
              <CurrencyConverter />
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
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
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
