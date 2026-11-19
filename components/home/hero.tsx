import Image from "next/image";
import { KeyboardEvent, useRef, useState } from "react";

import {
  AUTHOR_EMAIL,
  JOB_TITLE,
  UNIVERSITY_NAME,
  yearsShipping,
} from "../../lib/constants";
import {
  Audience,
  GITHUB_URL,
  HERO_COPY,
  getStats,
  RESUME_URL,
} from "../../lib/home";
import { placeholderImage } from "../intro";

import styles from "./home.module.css";
import { useTilt } from "./motion";
import Rich from "./rich";

const TABS: { id: Audience; label: string }[] = [
  { id: "hire", label: "For hiring teams" },
  { id: "freelance", label: "For founders & clients" },
];

type HeroProps = {
  /** Computed at build time so server and client render the same number. */
  years?: number;
};

const Hero = ({ years = yearsShipping() }: HeroProps) => {
  const [audience, setAudience] = useState<Audience>("hire");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useTilt(sceneRef, cardRef, { baseX: 6, baseY: -9, depth: 10, gyro: true });

  // roving tabindex: arrow keys move between the two tabs
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      (index + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setAudience(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const copy = HERO_COPY[audience];

  return (
    <section id="top" aria-labelledby="intro-heading" className={styles.hero}>
      <div className={styles.heroGrid}>
        <div>
          <p className={styles.kicker}>
            {JOB_TITLE} · Singapore · {years}+ years
          </p>
          <h1 id="intro-heading" className={styles.h1}>
            Harry Akbar Ali Munir
          </h1>

          <div role="tablist" aria-label="Who you are" className={styles.tabs}>
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`hero-tab-${tab.id}`}
                aria-selected={audience === tab.id}
                aria-controls="hero-panel"
                tabIndex={audience === tab.id ? 0 : -1}
                className={styles.tab}
                onClick={() => setAudience(tab.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            id="hero-panel"
            role="tabpanel"
            aria-labelledby={`hero-tab-${audience}`}
            className={styles.heroCopy}
          >
            <p className={styles.lead}>
              <Rich text={copy.lead} />
            </p>
            <p className={styles.heroBody}>{copy.body}</p>
          </div>

          <div className={`${styles.buttons} ${styles.heroButtons}`}>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
            >
              Résumé <span className={styles.btnTag}>PDF</span>
            </a>
            <a href={`mailto:${AUTHOR_EMAIL}`} className={styles.btnGhost}>
              Email me
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGhost}
            >
              GitHub
            </a>
          </div>
        </div>

        <div className={styles.heroAside}>
          <div ref={sceneRef} className={styles.tiltScene}>
            <div ref={cardRef} className={styles.tiltCard}>
              <div aria-hidden="true" className={styles.portraitShadow} />
              <Image
                src="/assets/profile.jpeg"
                alt="Portrait of Harry Akbar Ali Munir"
                width={168}
                height={200}
                priority
                placeholder="blur"
                blurDataURL={placeholderImage(168, 200)}
                className={styles.portrait}
              />
              <div aria-hidden="true" className={styles.chipDark}>
                {years}+ yrs shipping
              </div>
              <div aria-hidden="true" className={styles.chipLight}>
                {JOB_TITLE}
              </div>
            </div>
          </div>
          <p className={styles.degree}>
            B.S. Computer Science
            <br />
            {UNIVERSITY_NAME}, 2019
          </p>
        </div>
      </div>

      <dl className={styles.stats}>
        {getStats(years).map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
