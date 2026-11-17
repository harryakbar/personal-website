import Link from "next/link";

import styles from "./home.module.css";

export type WritingItem = {
  slug: string;
  title: string;
  blurb: string;
  meta: string;
};

const Writing = ({ posts }: { posts: WritingItem[] }) => (
  <section
    id="writing"
    aria-labelledby="writing-heading"
    className={styles.section}
  >
    <h2 id="writing-heading" className={styles.h2}>
      Writing
    </h2>
    <ul className={styles.writingList} data-reveal="">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`} className={styles.postLink}>
            <span className={styles.postMeta}>{post.meta}</span>
            <span>
              <span className={styles.postTitle}>{post.title}</span>
              <span className={styles.postBlurb}>{post.blurb}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default Writing;
