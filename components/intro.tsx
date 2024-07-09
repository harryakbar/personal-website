import Image from "next/image";
import React from "react";

const defaultTitle = "Harry Akbar Ali M.";

const Intro = ({ title = defaultTitle }): React.ReactNode => {
  return (
    <section className="flex flex-row items-center mb-8">
      <img
        alt="Harry"
        width={100}
        height={100}
        src="/assets/profile.jpeg"
        className="rounded-full border-solid border-2 border-black"
      />
      <div className="ml-6">
        <h1 className="text-6xl md:text-6xl font-bold">{title}</h1>
        <h6>Software Engineer, Singapore</h6>
      </div>
    </section>
  );
};

export default Intro;
