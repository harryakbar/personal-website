import { CUBE_FACES, STACK_GROUPS, TRIP_OPTIMIZER_URL } from "../../lib/home";

import styles from "./home.module.css";

const Stack = () => (
  <section
    id="stack"
    aria-labelledby="stack-heading"
    className={styles.section}
  >
    <h2 id="stack-heading" className={`${styles.h2} ${styles.stackHeading}`}>
      Stack &amp; tools
    </h2>

    <div className={`${styles.card} ${styles.drivers}`} data-reveal="">
      <div>
        <p className={styles.eyebrow}>Daily drivers</p>
        <p className={styles.driversCopy}>
          Six languages and frameworks I reach for first — the same six that
          shipped every case study above.
        </p>
      </div>
      <div className={styles.cubeScene}>
        <div
          role="img"
          aria-label={`Rotating cube labelled ${CUBE_FACES.map((f) => f.label).join(", ")}`}
          className={styles.cube}
        >
          {CUBE_FACES.map((f) => (
            <div
              key={f.face}
              aria-hidden="true"
              className={styles.face}
              data-face={f.face}
            >
              {f.label}
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className={styles.groups} data-reveal="">
      {STACK_GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          <ul className={styles.chips}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className={`${styles.card} ${styles.project}`} data-reveal="">
      <div>
        <p className={styles.eyebrow} style={{ marginBottom: 8 }}>
          Shipped solo
        </p>
        <h3 className={styles.projectName}>Trip Optimizer</h3>
        <a
          href={TRIP_OPTIMIZER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.projectLink}
        >
          trip-optimizer.harryakbar.dev
        </a>
      </div>
      <div>
        <p className={styles.projectCopy}>
          An AI travel planner in production. React and TypeScript frontend, a
          Hono API on Cloudflare Workers, Supabase for data, and dual-currency
          payments through Stripe and Midtrans on a token-based credit system —
          designed, built, and deployed end to end.
        </p>
        <p className={styles.meta}>
          Cloudflare Workers · Supabase · Stripe · Midtrans
        </p>
      </div>
    </div>
  </section>
);

export default Stack;
