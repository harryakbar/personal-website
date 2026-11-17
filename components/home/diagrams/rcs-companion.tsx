import type { ReactNode } from "react";

import styles from "./diagrams.module.css";

const Icon = ({
  size = 20,
  stroke,
  children,
}: {
  size?: number;
  stroke: string;
  children: ReactNode;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    {children}
  </svg>
);

const HomeGlyph = () => (
  <>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </>
);
const PeopleGlyph = () => (
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
  </>
);
const CalendarGlyph = () => (
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </>
);
const BoxGlyph = () => (
  <>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </>
);
const FileGlyph = () => (
  <>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
    <path d="M14 2v5h6" />
  </>
);

const NAV = [
  { label: "Dashboard", Glyph: HomeGlyph },
  { label: "My Seniors", Glyph: PeopleGlyph },
  { label: "Appointments", Glyph: CalendarGlyph },
  { label: "Deliveries", Glyph: BoxGlyph },
];

const STATS = [
  {
    value: "6",
    label: "My seniors",
    Glyph: PeopleGlyph,
    stroke: "#1a4fa0",
    tint: "#e7eef6",
  },
  {
    value: "3",
    label: "Appointments this week",
    Glyph: CalendarGlyph,
    stroke: "#b5710a",
    tint: "#fdf1dc",
  },
  {
    value: "2",
    label: "Pending deliveries",
    Glyph: BoxGlyph,
    stroke: "#0c6f68",
    tint: "#dcf2ef",
  },
];

/** better.sg — the RCS Companion volunteer dashboard. */
const RcsCompanion = () => (
  <div className={`${styles.frame} ${styles.scrollX}`}>
    <div className={styles.rcs} aria-hidden="true">
      <div className={styles.rcsGrid}>
        <div className={styles.rcsSide}>
          <div className={`${styles.rcsBrand} ${styles.nunito}`}>
            <svg
              width="38"
              height="38"
              viewBox="0 0 40 40"
              fill="none"
              style={{ display: "block", flexShrink: 0 }}
            >
              <rect width="40" height="40" rx="11" fill="#17458f" />
              <circle
                cx="20"
                cy="20"
                r="8"
                fill="none"
                stroke="#f4a81c"
                strokeWidth="3.5"
              />
            </svg>
            <span>RCS Companion</span>
          </div>
          <div className={styles.rcsNav}>
            <div className={styles.rcsFocus} />
            {NAV.map(({ label, Glyph }, i) => (
              <div
                key={label}
                className={`${styles.rcsNavItem} ${styles.nunito}`}
                data-active={i === 0}
              >
                <Icon stroke={i === 0 ? "#1a4fa0" : "#5c6b7a"}>
                  <Glyph />
                </Icon>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rcsMain}>
          <div className={`${styles.rcsGreeting} ${styles.nunito}`}>
            Good morning, Harry
          </div>
          <div className={styles.rcsStats}>
            {STATS.map(({ value, label, Glyph, stroke, tint }) => (
              <div key={label} className={styles.rcsStat}>
                <span className={styles.rcsIcon} style={{ background: tint }}>
                  <Icon size={23} stroke={stroke}>
                    <Glyph />
                  </Icon>
                </span>
                <span className={styles.nunito}>
                  <span className={styles.rcsStatValue}>{value}</span>
                  <span className={styles.rcsStatLabel}>{label}</span>
                </span>
              </div>
            ))}
          </div>
          <div className={styles.rcsNote}>
            <span className={styles.rcsIcon}>
              <Icon size={22} stroke="#0c6f68">
                <FileGlyph />
              </Icon>
            </span>
            <div className={styles.rcsNoteBody}>
              <div className={styles.rcsTags}>
                <span
                  className={`${styles.rcsTag} ${styles.nunito}`}
                  style={{ background: "#fdf1dc", color: "#8a5606" }}
                >
                  Observation
                </span>
                <span
                  className={`${styles.rcsTag} ${styles.nunito}`}
                  style={{ background: "#e7eef6", color: "#1a4fa0" }}
                >
                  Mdm Tan
                </span>
                <span className={styles.rcsByline}>
                  Tania Koh · Wed, 19 Aug
                </span>
              </div>
              <p className={styles.rcsNoteText}>
                <span className={styles.nunito}>Missed lunch delivery — </span>
                Neighbour said she was at the clinic; rescheduled with the
                kitchen for tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RcsCompanion;
