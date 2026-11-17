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
  /** Page chrome rendered before <main> (e.g. a skip link and sticky header). */
  header?: ReactNode;
  /** Replaces the default site footer. */
  footer?: ReactNode;
  /** id on <main>, for skip links. */
  mainId?: string;
  /** Extra classes on the outermost wrapper. */
  className?: string;
};

const Layout = ({
  preview: _preview,
  children,
  meta,
  hideFooter = false,
  header,
  footer,
  mainId,
  className = "",
}: Props) => {
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      <Meta {...meta} />
      {header}
      <main id={mainId} className="flex flex-col flex-1">
        {children}
      </main>
      {hideFooter ? null : (footer ?? <Footer />)}
    </div>
  );
};

export default Layout;
