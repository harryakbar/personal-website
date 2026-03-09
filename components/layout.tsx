import type { ReactNode } from "react";

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
  children: ReactNode;
  meta?: MetaProps;
};

const Layout = ({ preview: _preview, children, meta }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Meta {...meta} />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
