import Link from "next/link";

import type Author from "../interfaces/author";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section>
      <div className="mb-6">
        <CoverImage title={title} src={coverImage} slug={slug} priority />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10">
        <div>
          <h3 className="mb-3 text-2xl sm:text-3xl font-bold leading-tight text-balance">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:underline underline-offset-4"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-sm text-neutral-600">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-base leading-relaxed text-neutral-700 mb-4">
            {excerpt}
          </p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
