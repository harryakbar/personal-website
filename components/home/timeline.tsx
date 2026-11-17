import { useEffect, useRef } from "react";

import { DiagramId, EXPERIENCE, Role } from "../../lib/home";

import OrderAmendment from "./diagrams/order-amendment";
import RcsCompanion from "./diagrams/rcs-companion";
import StoqoChecklist from "./diagrams/stoqo-checklist";
import TmsRoute, { TmsFigures, tmsFooterClass } from "./diagrams/tms-route";
import styles from "./home.module.css";
import { useTilt } from "./motion";
import Rich from "./rich";

const DIAGRAMS: Record<
  DiagramId,
  { Diagram: () => JSX.Element; caption: string }
> = {
  "order-amendment": {
    Diagram: OrderAmendment,
    caption:
      "Post Order Amendment — the real order-status steps plus the amendment banner: customers add items to a placed order, keep their delivery slot, and pay no extra fees.",
  },
  "rcs-companion": {
    Diagram: RcsCompanion,
    caption:
      "RCS Companion — the volunteer dashboard: role-aware navigation, care stats, and a notes feed. Every row is keyboard reachable with 48px targets and AA contrast; Supabase row-level security decides what each volunteer can see.",
  },
  tms: {
    Diagram: TmsRoute,
    caption:
      "Transport Management System — batching, drag-and-drop routing, and ETA dispatch across a nationwide fleet.",
  },
  stoqo: {
    Diagram: StoqoChecklist,
    caption:
      "Digital Checking List — checkers work a ride, order by order, accepting or rejecting each SKU on a handheld; rejected SKUs become rescue tasks for pickers.",
  },
};

const CaseFigure = ({ id }: { id: DiagramId }) => {
  const ref = useRef<HTMLElement>(null);
  useTilt(ref, ref, { depth: 2.8, lift: true });
  const { Diagram, caption } = DIAGRAMS[id];

  return (
    <figure ref={ref} className={styles.figure}>
      <Diagram />
      {id === "tms" ? (
        <div className={tmsFooterClass}>
          <figcaption className={styles.figcaption}>{caption}</figcaption>
          <TmsFigures />
        </div>
      ) : (
        <figcaption className={styles.figcaption}>{caption}</figcaption>
      )}
    </figure>
  );
};

const RoleEntry = ({ role }: { role: Role }) => (
  <article className={styles.role} data-reveal="">
    <span aria-hidden="true" data-dot="" className={styles.dot} />
    <div className={styles.roleHead}>
      <h3 className={styles.h3}>{role.company}</h3>
      <span className={styles.roleTitle}>{role.title}</span>
      <span className={styles.period}>{role.period}</span>
    </div>

    {role.diagram ? <CaseFigure id={role.diagram} /> : null}

    {role.bullets ? (
      <ul className={styles.bullets}>
        {role.bullets.map((bullet) => (
          <li key={bullet}>
            <span aria-hidden="true" className={styles.bulletMark}>
              ·
            </span>
            <span>
              <Rich text={bullet} />
            </span>
          </li>
        ))}
      </ul>
    ) : null}
    {role.summary ? <p className={styles.roleSummary}>{role.summary}</p> : null}
    {role.stack ? <p className={styles.roleStack}>{role.stack}</p> : null}
  </article>
);

const Timeline = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  // the accent spine draws down to 65% of the viewport, filling dots it passes
  useEffect(() => {
    const box = boxRef.current;
    const spine = spineRef.current;
    if (!box || !spine) return;
    const dots = Array.from(box.querySelectorAll<HTMLElement>("[data-dot]"));
    let raf = 0;
    const paint = () => {
      raf = 0;
      const rect = box.getBoundingClientRect();
      const anchor = window.innerHeight * 0.65;
      spine.style.height = `${Math.max(0, Math.min(rect.height - 16, anchor - rect.top))}px`;
      dots.forEach((dot) => {
        const d = dot.getBoundingClientRect();
        dot.dataset.passed = String(d.top + d.height / 2 < anchor);
      });
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
    <section
      id="work"
      aria-labelledby="work-heading"
      className={`${styles.section} ${styles.work}`}
    >
      <h2 id="work-heading" className={styles.h2}>
        Experience
      </h2>
      <p className={styles.workIntro}>
        Each role with a small diagram of the interface I actually worked on.
      </p>

      <div ref={boxRef} className={styles.timeline}>
        <div aria-hidden="true" className={styles.rail} />
        <div ref={spineRef} aria-hidden="true" className={styles.spine} />
        {EXPERIENCE.map((role) => (
          <RoleEntry key={role.company} role={role} />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
