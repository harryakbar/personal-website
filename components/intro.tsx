import { CMS_NAME } from "../lib/constants";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-8 md:mb-8">
      <h1 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        Harry Akbar Ali M.
      </h1>
      <h4 className="text-center md:text-left text-lg md:pl-8">
        Made this for writing, dumping, and learning 😄
      </h4>
    </section>
  );
};

export default Intro;
