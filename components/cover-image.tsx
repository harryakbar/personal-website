import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import { placeholderImage } from "./intro";

type Props = {
  title: string;
  src: string;
  slug?: string;
  priority?: boolean;
};

const CoverImage = ({ title, src, slug, priority = false }: Props) => {
  const image = (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-neutral-100",
        {
          "shadow-sm": true,
          "hover:shadow-md transition-shadow duration-200": slug,
        },
      )}
    >
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={src}
          alt={`Cover image for ${title}`}
          fill
          priority={priority}
          quality={85}
          // Request larger responsive images so covers look crisp on desktop/retina.
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1200px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={placeholderImage(1600, 900)}
        />
      </div>
    </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link
          className="block w-full"
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
