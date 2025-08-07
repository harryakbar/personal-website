import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import { placeholderImage } from "./intro";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <div className="flex justify-center">
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        className={cn("shadow-sm self-center", {
          "hover:shadow-lg transition-shadow duration-200": slug,
        })}
        width={300}
        height={630}
        placeholder="blur"
        blurDataURL={placeholderImage(300, 630)}
      />
    </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link
          className="flex justify-center"
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          aria-label={title}
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
