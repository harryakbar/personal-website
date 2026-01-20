import Footer from "./footer";
import Meta from "./meta";

type MetaProps = {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
};

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  meta?: MetaProps;
};

const Layout = ({ preview: _preview, children, meta }: Props) => {
  // preview is kept for future use
  return (
    <div className="flex flex-col min-h-screen">
      <Meta {...meta} />
      <div className="flex flex-col flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
