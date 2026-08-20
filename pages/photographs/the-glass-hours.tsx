import Layout from "../../components/layout";
import { photographyFontClass } from "../../components/photography/fonts";
import SeriesView from "../../components/photography/series-view";
import { SITE_URL } from "../../lib/constants";
import { SERIES } from "../../lib/photographs";

export default function TheGlassHoursPage() {
  return (
    <Layout
      hideFooter
      meta={{
        title: SERIES.title,
        description:
          "The Glass Hours — a convention hall at eight in the morning, shot on the XC 15-45mm, mostly in Velvia. Ten frames from Sands Expo, Singapore, by Harry Akbar Ali Munir.",
        keywords:
          "The Glass Hours, Harry Akbar Ali Munir, photo series, Velvia, Sands Expo, Singapore, Fujifilm X-M5, Singapore photography",
        canonicalUrl: `${SITE_URL}/photographs/${SERIES.slug}`,
        ogImage: `${SITE_URL}/photographs/${SERIES.frames[0]}.jpg`,
      }}
    >
      <div className={photographyFontClass}>
        <SeriesView />
      </div>
    </Layout>
  );
}
