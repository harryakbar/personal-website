import Link from "next/link";
import { useEffect, useRef } from "react";

import { NAV } from "../../lib/home";

import styles from "./home.module.css";

const SiteHeader = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <div ref={progressRef} role="presentation" className={styles.progress} />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.brand}>
            Harry Akbar
          </a>
          <nav aria-label="Sections" className={styles.nav}>
            <div className={styles.navLinks}>
              {NAV.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className={styles.navLink}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.navLink}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
            <a href="#contact" className={`${styles.btn} ${styles.btnSmall}`}>
              Contact
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};

export default SiteHeader;
