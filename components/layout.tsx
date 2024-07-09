import Footer from "./footer";
import Meta from "./meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Meta />
      <div className="flex flex-col flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
