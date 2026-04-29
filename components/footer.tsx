import Container from "./container";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="flex flex-col">
          <h3 className="flex mb-4 text-xl md:text-2xl font-bold tracking-tighter leading-tight text-center lg:text-left">
            Connect with me
          </h3>
          <div>
            <a
              href="https://linkedin.com/in/harryakbaram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Harry Akbar's LinkedIn profile"
              className="mr-3 font-bold hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/harryakbar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Harry Akbar's GitHub profile"
              className="mx-3 font-bold hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://leetcode.com/harryakbaram/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Harry Akbar's Leetcode profile"
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
