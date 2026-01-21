import Image from "next/image";
import React from "react";

const defaultTitle = "Harry Akbar Ali Munir.";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const placeholderImage = (w, h) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

const Intro: React.FunctionComponent<{ title?: string }> = ({
  title = defaultTitle,
}) => {
  return (
    <section className="flex flex-row items-center mb-8">
      <Image
        alt="Harry Akbar Ali Munir - Software Engineer"
        width={75}
        height={75}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(75, 75))}`}
        src="/assets/profile.jpeg"
        className="rounded-full border-solid border-2 border-black"
      />
      <div className="ml-4">
        <h1 className="text-xl md:text-4xl font-bold">{title}</h1>
        <h6 className="text-sm">Software Engineer, Singapore 🇸🇬</h6>
      </div>
    </section>
  );
};

export default Intro;
