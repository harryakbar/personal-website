import React from "react";

const defaultTitle = "Harry Akbar Ali M.";

const Intro: React.FunctionComponent<{ title?: string }> = ({
  title = defaultTitle,
}) => {
  return (
    <section className="flex flex-row items-center mb-8">
      <img
        alt="Harry"
        width={75}
        height={75}
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
