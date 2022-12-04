import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col items-center">
          <h3 className="flex text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left">
            Connect with me
          </h3>
          <div className="flex justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://linkedin.com/in/harryakbaram"
              target="__blank"
              className="mx-3 font-bold hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/harryakbar"
              target="__blank"
              className="mx-3 font-bold hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://leetcode.com/harryakbaram/"
              target="__blank"
              className="mx-3 font-bold hover:underline"
            >
              Leetcode
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
