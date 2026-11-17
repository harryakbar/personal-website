import { RefObject, useEffect } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type TiltOptions = {
  /** Resting rotation, in degrees. */
  baseX?: number;
  baseY?: number;
  /** Maximum extra rotation at the scene's edge, in degrees. */
  depth?: number;
  /** Lifted cards get their own perspective, rise 4px and set data-lifted while hovered. */
  lift?: boolean;
};

/**
 * Pointer-follow depth: the card leans toward the pointer while it is over the
 * scene, and settles back to its resting angle when it leaves. No-op under
 * prefers-reduced-motion and on touch-only pointers.
 */
export function useTilt(
  sceneRef: RefObject<HTMLElement>,
  cardRef: RefObject<HTMLElement> = sceneRef,
  { baseX = 0, baseY = 0, depth = 10, lift = false }: TiltOptions = {},
) {
  useEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    if (!scene || !card || prefersReducedMotion()) return;

    let raf = 0;
    let rx = baseX;
    let ry = baseY;
    const paint = () => {
      raf = 0;
      card.style.transform =
        (lift ? "perspective(1400px) " : "") +
        `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)` +
        (lift ? " translateY(-4px)" : "");
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = scene.getBoundingClientRect();
      ry = baseY + ((e.clientX - r.left) / r.width - 0.5) * 2 * depth;
      rx = baseX - ((e.clientY - r.top) / r.height - 0.5) * 2 * depth;
      if (lift) card.dataset.lifted = "true";
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      rx = baseX;
      ry = baseY;
      delete card.dataset.lifted;
      card.style.transform = "";
    };

    scene.addEventListener("pointermove", onMove, { passive: true });
    scene.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
    };
  }, [sceneRef, cardRef, baseX, baseY, depth, lift]);
}

/**
 * Fades and tips up every [data-reveal] block inside the container that starts
 * below the fold. Server HTML leaves everything visible, so content never
 * depends on this running.
 */
export function useReveal(containerRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = containerRef.current;
    if (
      !root ||
      prefersReducedMotion() ||
      typeof IntersectionObserver === "undefined"
    )
      return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    ).filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    if (!targets.length) return;

    const hidden = new Set(targets);
    const show = (el: HTMLElement) => {
      el.dataset.reveal = "shown";
      hidden.delete(el);
      io.unobserve(el);
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) show(e.target as HTMLElement);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    targets.forEach((el) => {
      el.dataset.reveal = "hidden";
      io.observe(el);
    });

    // anything scrolled past without ever intersecting (anchor jumps) must not stay hidden
    const sweep = () =>
      hidden.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
      });
    window.addEventListener("scroll", sweep, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", sweep);
      targets.forEach((el) => (el.dataset.reveal = "shown"));
    };
  }, [containerRef]);
}
