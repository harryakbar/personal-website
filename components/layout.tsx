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
  /** Pages that carry their own full-bleed chrome opt out of the site footer. */
  hideFooter?: boolean;
};

const Layout = ({
  preview: _preview,
  children,
  meta,
  hideFooter = false,
}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Meta {...meta} />
      <main className="flex flex-col flex-1">{children}</main>
      {hideFooter ? null : <Footer />}
    </div>
  );
};

export default Layout;
