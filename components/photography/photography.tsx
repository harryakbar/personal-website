import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Photo,
  SERIES,
  SIMS,
  SIM_MAP,
  SimId,
  countFor,
  justify,
  photosFor,
} from "../../lib/photographs";

import Lightbox from "./lightbox";
import styles from "./photography.module.css";
import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect";

/** Row target heights, from the design's gallery tokens. */
const ROW_TARGETS = [
  { min: 1440, height: 260 },
  { min: 1180, height: 230 },
  { min: 900, height: 210 },
  { min: 0, height: 180 },
];

const MOBILE_MAX = 768;
const FLAT_ROWS = 2; // painted with no reveal and an eager fetch
const STAGGER_MS = 50;
const STAGGER_CAP = 6;

/** Width assumed for the first render, so SSR and hydration agree. */
const ASSUMED_WIDTH = 1328;

const GALLERY_SIZES = "(max-width: 768px) 48vw, (max-width: 1180px) 33vw, 25vw";

const rowTargetFor = (viewport: number) =>
  (ROW_TARGETS.find((entry) => viewport >= entry.min) ?? ROW_TARGETS[3]).height;

type CellProps = {
  photo: Photo;
  width?: number;
  height?: number;
  flat: boolean;
  delayIndex: number;
  onOpen: (_photo: Photo, _element: HTMLElement) => void;
};

const Cell = ({
  photo,
  width,
  height,
  flat,
  delayIndex,
  onOpen,
}: CellProps) => {
  const ref = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [revealed, setRevealed] = useState(flat);

  // Rows below the fold reveal on intersect; the first rows never subscribe.
  useEffect(() => {
    if (flat || revealed) return undefined;
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "120px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [flat, revealed]);

  const className = [
    styles.cell,
    flat ? "" : styles.reveal,
    revealed && !flat ? styles.revealIn : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      ref={ref}
      className={className}
      style={
        {
          width: width ? `${width}px` : undefined,
          "--stagger-delay": `${Math.min(delayIndex, STAGGER_CAP) * STAGGER_MS}ms`,
        } as React.CSSProperties
      }
    >
      <button
        ref={buttonRef}
        type="button"
        className={styles.frame}
        style={
          {
            height: height ? `${height}px` : undefined,
            "--ratio": String(photo.ratio),
          } as React.CSSProperties
        }
        aria-label={`Open ${photo.title}`}
        onClick={() => {
          if (buttonRef.current) onOpen(photo, buttonRef.current);
        }}
      >
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          sizes={GALLERY_SIZES}
          placeholder="blur"
          blurDataURL={photo.lqip}
          loading={flat ? "eager" : "lazy"}
          priority={flat}
          style={{ objectFit: "cover" }}
        />
      </button>
      <figcaption className={styles.cap}>
        <span className={styles.capPlace}>{photo.place}</span>
        <span>{photo.date}</span>
      </figcaption>
    </figure>
  );
};

const Photography = () => {
  const [sim, setSim] = useState<SimId>("all");
  const [rotation, setRotation] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [fromRect, setFromRect] = useState<DOMRect | null>(null);
  const [width, setWidth] = useState(ASSUMED_WIDTH);
  const [viewport, setViewport] = useState(ASSUMED_WIDTH + 112);

  const galleryRef = useRef<HTMLElement>(null);
  const dialRef = useRef<HTMLButtonElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const stockRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const active = SIM_MAP[sim];
  const visible = useMemo(() => photosFor(sim), [sim]);
  const isMobile = viewport <= MOBILE_MAX;

  // Measure the gallery so the justified rows are flush at every width.
  useIsomorphicLayoutEffect(() => {
    const element = galleryRef.current;
    if (!element) return undefined;

    const measure = () => {
      const style = getComputedStyle(element);
      const inner =
        element.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      setWidth(inner);
      setViewport(window.innerWidth);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const gutter = isMobile ? 4 : 6;
  const rows = useMemo(
    () => justify(visible, width, rowTargetFor(viewport), gutter),
    [visible, width, viewport, gutter],
  );

  /** One low-opacity accent band, one pass, plus a kick on the dial. */
  const runSweep = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    for (const [element, className] of [
      [sweepRef.current, styles.sweepRunning],
      [dialRef.current, styles.dialKicked],
    ] as const) {
      if (!element) continue;
      element.classList.remove(className);
      void element.offsetWidth; // restart the animation
      element.classList.add(className);
    }
  }, []);

  const selectSim = useCallback(
    (next: SimId) => {
      if (next === sim) return;
      const ids = SIMS.map((entry) => entry.id);
      const from = ids.indexOf(sim);
      const to = ids.indexOf(next);
      const forward = (to - from + ids.length) % ids.length || ids.length;

      setSim(next);
      setRotation((current) => current + forward * (360 / ids.length));
      setOpenIndex(null);
      runSweep();
    },
    [sim, runSweep],
  );

  const advance = useCallback(() => {
    const ids = SIMS.map((entry) => entry.id);
    selectSim(ids[(ids.indexOf(sim) + 1) % ids.length]);
  }, [sim, selectSim]);

  // Dismiss the stock menu on an outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onClick = (event: MouseEvent) => {
      if (!stockRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const openPhoto = useCallback(
    (photo: Photo, element: HTMLElement) => {
      lastFocus.current = element;
      setFromRect(element.getBoundingClientRect());
      setOpenIndex(visible.findIndex((item) => item.id === photo.id));
    },
    [visible],
  );

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
    setFromRect(null);
    const target = lastFocus.current;
    lastFocus.current = null;
    if (target?.isConnected) target.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setFromRect(null);
      setOpenIndex((current) =>
        current === null
          ? null
          : (current + delta + visible.length) % visible.length,
      );
    },
    [visible.length],
  );

  const simChips = SIMS.map((entry) => (
    <button
      key={entry.id}
      type="button"
      className={styles.mChip}
      role="radio"
      aria-checked={entry.id === sim}
      title={entry.name}
      onClick={() => selectSim(entry.id)}
    >
      {entry.short}
    </button>
  ));

  return (
    <div className={styles.root} data-sim={sim}>
      <a className={styles.skip} href="#frames">
        Skip to the frames
      </a>
      <div className={styles.band} aria-hidden="true" />
      <div className={styles.bandGloss} aria-hidden="true" />

      <header className={styles.rail}>
        <div className={`${styles.railInner} ${styles.glass}`}>
          <div className={styles.railLeft}>
            <Link className={styles.wordmark} href="/">
              <span
                className={`${styles.leader} ${styles.leader3d} ${styles.chromeTint}`}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
                <span />
              </span>
              harryakbar<span className={styles.tld}>.dev</span>
            </Link>
            <nav className={styles.nav} aria-label="Primary">
              <Link href="/">About</Link>
              <Link href="/app">Apps &amp; Blog</Link>
              <Link href="/photographs" aria-current="page">
                Photographs
              </Link>
            </nav>
          </div>
          <span className={styles.loadedChip}>
            <span className={styles.lamp} aria-hidden="true" />
            {active.name} loaded
          </span>
        </div>
      </header>

      <section className={styles.masthead}>
        <div className={styles.mastheadCopy}>
          <span className={styles.eyebrow}>
            <span className={styles.pip} aria-hidden="true">
              ■
            </span>
            Straight out of camera
          </span>
          <h1>Photographs</h1>
          <p className={styles.lede}>
            Four stocks, no edits. Load one in the dial and the whole room
            follows — frames, accent, grain, contrast.
          </p>
        </div>

        <div className={styles.loader}>
          <div className={styles.dialStage}>
            <button
              ref={dialRef}
              type="button"
              className={styles.dial}
              onClick={advance}
              title={`Loaded: ${active.name} — click to advance`}
              aria-label="Advance to the next film simulation"
            >
              <span
                className={`${styles.dialRing} ${styles.chromeTint}`}
                aria-hidden="true"
              />
              <span className={styles.dialBezel} aria-hidden="true" />
              <span
                className={styles.dialKnurl}
                aria-hidden="true"
                style={{ "--rot": `${rotation}deg` } as React.CSSProperties}
              >
                <span className={styles.dialCap} />
                <span className={styles.dialPointer} />
              </span>
              <span className={styles.dialWindow} aria-hidden="true">
                <span>{active.short}</span>
              </span>
            </button>
          </div>

          <div className={styles.stock} ref={stockRef}>
            <button
              type="button"
              className={styles.stockPill}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-label={`Film simulation: ${active.name}. Choose another stock.`}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={styles.swatch}
                aria-hidden="true"
                style={{ "--sw": active.swatch } as React.CSSProperties}
              />
              <span className={styles.stockName}>{active.name}</span>
              <span className={styles.stockCount}>{visible.length}</span>
              <span className={styles.caret} aria-hidden="true">
                ▾
              </span>
            </button>

            {menuOpen && (
              <div
                className={styles.stockMenu}
                role="menu"
                aria-label="Film simulation"
              >
                {SIMS.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className={styles.stockRow}
                    role="menuitemradio"
                    aria-checked={entry.id === sim}
                    onClick={() => {
                      selectSim(entry.id);
                      setMenuOpen(false);
                    }}
                  >
                    <span
                      className={styles.swatch}
                      aria-hidden="true"
                      style={{ "--sw": entry.swatch } as React.CSSProperties}
                    />
                    <span className={styles.stockName}>{entry.name}</span>
                    <span className={styles.stockCount}>
                      {countFor(entry.id)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className={styles.mStrip}>
        <button
          type="button"
          className={styles.mDial}
          onClick={advance}
          aria-label="Advance to the next film simulation"
        >
          <span>{active.short}</span>
        </button>
        <div
          className={styles.mChips}
          role="radiogroup"
          aria-label="Film simulation"
        >
          {simChips}
        </div>
      </div>

      <div className={styles.statusline}>
        <span className={styles.asShot}>
          <span
            className={`${styles.leader} ${styles.leaderFlat} ${styles.chromeTint}`}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
          as shot
        </span>
        <span className={styles.simNote}>
          {active.note ?? "Four stocks, mixed — as shot, no edits."}
        </span>
      </div>

      <section
        ref={galleryRef}
        id="frames"
        className={`${styles.gallery} ${styles.plate}`}
        aria-label="Photograph index"
      >
        {visible.length === 0 && (
          <p className={styles.empty}>No frames on this stock yet.</p>
        )}

        {isMobile
          ? [0, 1].map((column) => (
              <div className={styles.mcol} key={column}>
                {visible
                  .filter((_, index) => index % 2 === column)
                  .map((photo, index) => (
                    <Cell
                      key={photo.id}
                      photo={photo}
                      flat={index < 2}
                      delayIndex={index % STAGGER_CAP}
                      onOpen={openPhoto}
                    />
                  ))}
              </div>
            ))
          : rows.map((row, rowIndex) => {
              const flat = rowIndex < FLAT_ROWS;
              return (
                <div className={styles.grow} key={row.id}>
                  {row.items.map((item, itemIndex) => (
                    <Cell
                      key={item.id}
                      photo={item}
                      width={item.w}
                      height={item.h}
                      flat={flat}
                      delayIndex={itemIndex}
                      onOpen={openPhoto}
                    />
                  ))}
                </div>
              );
            })}
      </section>

      <div className={styles.sectionFoot}>
        <span>Fujifilm X-M5 · 27mm · no edits</span>
        <Link href={`/photographs/${SERIES.slug}`}>
          {SERIES.title} — {SERIES.frames.length} frames →
        </Link>
      </div>

      <div className={styles.grain} aria-hidden="true" />
      <div ref={sweepRef} className={styles.sweep} aria-hidden="true" />

      {openIndex !== null && (
        <Lightbox
          photos={visible}
          index={openIndex}
          fromRect={fromRect}
          onClose={closeLightbox}
          onStep={step}
        />
      )}
    </div>
  );
};

export default Photography;
