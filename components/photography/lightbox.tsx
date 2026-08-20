import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Photo, SIM_MAP } from "../../lib/photographs";

import styles from "./photography.module.css";
import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect";

type Props = {
  photos: Photo[];
  index: number;
  /** Rect of the thumbnail the lightbox was opened from, for the FLIP. */
  fromRect: DOMRect | null;
  onClose: () => void;
  onStep: (_delta: number) => void;
};

function exifFor(photo: Photo): Array<[string, string]> {
  return [
    ["Body", photo.body],
    ["Lens", photo.lens],
    ["Focal length", photo.focal],
    ["Aperture", photo.aperture],
    ["Shutter", photo.shutter],
    ["ISO", String(photo.iso)],
    ["Film simulation", SIM_MAP[photo.sim].name],
    ["Frame", photo.id],
  ];
}

const Lightbox = ({ photos, index, fromRect, onClose, onStep }: Props) => {
  const [exifOpen, setExifOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const photo = photos[index];

  useEffect(() => setMounted(true), []);

  // Collapse the plate again whenever the frame changes.
  useEffect(() => setExifOpen(false), [index]);

  // Lock the page behind the scrim.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // The thumbnail physically travels. The justified cell keeps the frame's
  // native ratio, so the scale stays uniform and only the scrim cross-fades.
  useIsomorphicLayoutEffect(() => {
    if (!fromRect || !stageRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const to = stageRef.current.getBoundingClientRect();
    if (!to.width || !to.height) return;

    const sx = fromRect.width / to.width;
    const sy = fromRect.height / to.height;
    const dx = fromRect.left + fromRect.width / 2 - (to.left + to.width / 2);
    const dy = fromRect.top + fromRect.height / 2 - (to.top + to.height / 2);

    stageRef.current.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
        { transform: "none" },
      ],
      { duration: 440, easing: "cubic-bezier(.32,.72,.24,1)" },
    );
  }, [fromRect]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onStep(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onStep(-1);
      } else if (event.key === "Tab") {
        const focusable = Array.from(
          rootRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
        ).filter((button) => button.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [onClose, onStep],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  if (!mounted || !photo) return null;

  const accent = SIM_MAP[photo.sim].accent;

  const overlay = (
    <div
      ref={rootRef}
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={(event) => {
        touch.current = {
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY,
        };
      }}
      onTouchEnd={(event) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const dx = event.changedTouches[0].clientX - start.x;
        const dy = event.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) {
          onStep(dx < 0 ? 1 : -1);
        }
      }}
    >
      <div className={styles.lbHead}>
        <span className={styles.lbFrameno}>
          {`Frame ${String(index + 1).padStart(3, "0")} / ${photos.length} · ${photo.place}`}
        </span>
        <div className={styles.lbHeadRight}>
          <span className={styles.lbHint}>← → to move · esc to close</span>
          <button
            ref={closeRef}
            type="button"
            className={styles.lbClose}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>

      <div
        className={styles.lbBody}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <button
          type="button"
          className={styles.lbNav}
          onClick={() => onStep(-1)}
          aria-label="Previous frame"
        >
          ‹
        </button>
        <div
          ref={stageRef}
          className={styles.lbStage}
          style={{ aspectRatio: String(photo.ratio), width: "100%" }}
        >
          <Image
            src={photo.src}
            alt={photo.title}
            fill
            sizes="(max-width: 768px) 96vw, 1100px"
            placeholder="blur"
            blurDataURL={photo.lqip}
            priority
            style={{
              objectFit: "contain",
              filter: "var(--plate-filter)",
              transition: "filter var(--dur-sweep) var(--ease-sweep)",
            }}
          />
        </div>
        <button
          type="button"
          className={styles.lbNav}
          onClick={() => onStep(1)}
          aria-label="Next frame"
        >
          ›
        </button>
      </div>

      <div className={styles.lbFoot}>
        <button
          type="button"
          className={styles.exifToggle}
          onClick={() => setExifOpen((open) => !open)}
          aria-expanded={exifOpen}
          aria-controls="photography-exif"
        >
          <span
            className={`${styles.leader} ${styles.leaderFlat} ${styles.chromeTint}`}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
          <span>{photo.focal}</span>
          <span className={styles.dot}>·</span>
          <span>{photo.aperture}</span>
          <span className={styles.dot}>·</span>
          <span>{photo.shutter}</span>
          <span className={styles.dot}>·</span>
          <span>{`ISO ${photo.iso}`}</span>
          <span className={styles.dot}>·</span>
          <span style={{ color: accent }}>{SIM_MAP[photo.sim].name}</span>
          <span className={styles.tag}>
            {exifOpen ? "Close plate" : "Full plate"}
          </span>
        </button>

        {exifOpen && (
          <dl className={styles.exifGrid} id="photography-exif">
            {exifFor(photo).map(([key, value]) => (
              <div className={styles.exifCard} key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

export default Lightbox;
