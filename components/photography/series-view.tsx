import Image from "next/image";
import Link from "next/link";

import { Photo, SERIES, seriesPhotos } from "../../lib/photographs";

import styles from "./photography.module.css";

const SERIES_SIZES = "(max-width: 900px) 96vw, (max-width: 1440px) 60vw, 860px";

type FigureProps = {
  photo?: Photo;
  hero?: boolean;
  priority?: boolean;
  sizes?: string;
};

const SeriesFigure = ({ photo, hero, priority, sizes }: FigureProps) => {
  if (!photo) return null;
  return (
    <figure
      className={`${styles.seriesFig} ${hero ? styles.seriesHero : ""}`.trim()}
    >
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        sizes={sizes ?? SERIES_SIZES}
        placeholder="blur"
        blurDataURL={photo.lqip}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </figure>
  );
};

/**
 * "The Glass Hours" — a fixed-stock series view. The page is pinned to Velvia
 * through data-sim, so the retint control is deliberately absent.
 */
const SeriesView = () => {
  const frames = seriesPhotos();

  return (
    <div className={`${styles.root} ${styles.series}`} data-sim="velvia">
      <a className={styles.skip} href="#series-frames">
        Skip to the frames
      </a>

      <header className={styles.seriesHead}>
        <div className={styles.railLeft}>
          <Link className={styles.wordmark} href="/">
            harryakbar<span className={styles.tld}>.dev</span>
          </Link>
          <nav className={styles.seriesNav} aria-label="Primary">
            <Link href="/">About</Link>
            <Link href="/app">Apps &amp; Blog</Link>
            <Link href="/photographs" aria-current="page">
              Photographs
            </Link>
          </nav>
        </div>
        <Link className={styles.seriesBack} href="/photographs">
          ← all frames
        </Link>
      </header>

      <div className={styles.seriesTitle}>
        <h1>
          The Glass
          <br />
          Hours
        </h1>
        <div className={styles.seriesMeta}>
          <div className={styles.seriesFacts}>
            <span className={styles.seriesFactsLead}>{SERIES.place}</span>
            <span>{SERIES.dates}</span>
            <span>{frames.length} frames</span>
            <span>Velvia</span>
          </div>
          <p className={styles.seriesIntro}>{SERIES.intro}</p>
        </div>
      </div>

      <div
        id="series-frames"
        className={`${styles.seriesFlow} ${styles.plate}`}
      >
        <SeriesFigure
          photo={frames[0]}
          hero
          priority
          sizes="(max-width: 900px) 96vw, 1330px"
        />

        <div className={styles.sr75}>
          <SeriesFigure photo={frames[1]} />
          <div className={styles.srStack}>
            <SeriesFigure photo={frames[2]} />
            <p className={styles.seriesNote}>
              Eight o’clock: the escalators fill and empty in ninety-second
              cycles. You wait for the gap, then for the one figure that holds
              the diagonal.
            </p>
          </div>
        </div>

        <div className={styles.sr3}>
          <SeriesFigure
            photo={frames[3]}
            sizes="(max-width: 900px) 48vw, 30vw"
          />
          <SeriesFigure
            photo={frames[4]}
            sizes="(max-width: 900px) 48vw, 30vw"
          />
          <SeriesFigure
            photo={frames[5]}
            sizes="(max-width: 900px) 48vw, 30vw"
          />
        </div>

        <div className={styles.sr48}>
          <p className={styles.seriesNote}>
            The last two are the same hall an hour later, when the light has
            gone flat and everyone is inside. I keep them for the contrast.
          </p>
          <SeriesFigure photo={frames[6]} />
        </div>

        <div className={styles.sr2}>
          <SeriesFigure
            photo={frames[7]}
            sizes="(max-width: 900px) 96vw, 45vw"
          />
          <SeriesFigure
            photo={frames[8]}
            sizes="(max-width: 900px) 96vw, 45vw"
          />
        </div>

        <SeriesFigure
          photo={frames[9]}
          hero
          sizes="(max-width: 900px) 96vw, 1330px"
        />
      </div>

      <div className={styles.seriesFoot}>
        <span>End of series</span>
        <Link href="/photographs">All frames →</Link>
      </div>

      <div className={styles.grain} aria-hidden="true" />
    </div>
  );
};

export default SeriesView;
