import Layout from "../../components/layout";
import { photographyFontClass } from "../../components/photography/fonts";
import Photography from "../../components/photography/photography";
import { SITE_URL } from "../../lib/constants";

export default function PhotographsPage() {
  return (
    <Layout
      hideFooter
      meta={{
        title: "Photographs",
        description:
          "Photographs by Harry Akbar Ali Munir — frames from a Fujifilm X-M5, straight out of camera in one of six film simulations: Classic Chrome, Reala ACE, Astia, Velvia, Nostalgic Neg. and Acros.",
        keywords:
          "Harry Akbar Ali Munir, photography, Fujifilm X-M5, film simulation, Classic Chrome, Reala ACE, Astia, Velvia, Nostalgic Neg, Acros, Singapore street photography",
        canonicalUrl: `${SITE_URL}/photographs`,
        ogImage: `${SITE_URL}/photographs/DSCF0388.jpg`,
      }}
    >
      <div className={photographyFontClass}>
        <Photography />
      </div>
    </Layout>
  );
}
