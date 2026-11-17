import Link from "next/link";

import { GITHUB_URL, LEETCODE_URL, LINKEDIN_URL } from "../../lib/home";

import styles from "./home.module.css";

const EXTERNAL = [
  { href: GITHUB_URL, label: "GitHub" },
  { href: LINKEDIN_URL, label: "LinkedIn" },
  { href: LEETCODE_URL, label: "LeetCode" },
];

const SiteFooter = () => (
  <footer className={styles.footer}>
    <div className={styles.footerInner}>
      <p>© {new Date().getFullYear()} Harry Akbar Ali Munir · Singapore</p>
      <nav aria-label="Elsewhere" className={styles.footerNav}>
        <Link href="/photographs">Photographs</Link>
        <Link href="/app">Projects</Link>
        {EXTERNAL.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export default SiteFooter;
