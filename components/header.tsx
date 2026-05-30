import Link from "next/link";

const Header = () => {
  return (
    <nav aria-label="Breadcrumb" className="mb-20 mt-8">
      <Link
        href="/"
        className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight hover:underline"
      >
        Back
      </Link>
    </nav>
  );
};

export default Header;
