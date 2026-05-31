import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PostTitle from "../../components/post-title";
import type PostType from "../../interfaces/post";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import { SITE_NAME, SITE_URL, AUTHOR_NAME, HOME_OG_IMAGE_URL } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts: _morePosts, preview }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const canonicalUrl = `${SITE_URL}/posts/${post.slug}`;
  const structuredData = !router.isFallback
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt || `${post.title} by ${SITE_NAME}`,
        image: post.ogImage?.url || HOME_OG_IMAGE_URL,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Person",
          name: post.author?.name || AUTHOR_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: AUTHOR_NAME,
          url: SITE_URL,
        },
        url: canonicalUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
      }
    : null;

  return (
    <Layout
      preview={preview}
      meta={{
        title: post.title,
        description: post.excerpt || `${post.title} by ${SITE_NAME}`,
        ogImage: post.ogImage?.url,
        canonicalUrl,
      }}
    >
      {structuredData && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>
      )}
      <Container className="max-w-5xl">
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "excerpt",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
