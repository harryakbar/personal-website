import Image from "next/image";
import React from "react";

const defaultTitle = "Harry Akbar Ali Munir.";

import { placeholderImage } from "../lib/image";

const Intro: React.FunctionComponent<{ title?: string }> = ({
  title = defaultTitle,
}) => {
  return (
    <section className="flex flex-row items-center mb-8">
      <Image
        alt="Harry Akbar Ali Munir - Software Engineer"
        width={75}
        height={75}
        priority
        placeholder="blur"
        blurDataURL={placeholderImage(75, 75)}
        src="/assets/profile.jpeg"
        className="rounded-full border-solid border-2 border-black"
      />
      <div className="ml-4">
        <h1 className="text-xl md:text-4xl font-bold">{title}</h1>
        <p className="text-sm text-neutral-600">Software Engineer, Singapore 🇸🇬</p>
      </div>
    </section>
  );
};

export default Intro;
