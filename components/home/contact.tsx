import { AUTHOR_EMAIL } from "../../lib/constants";
import { LINKEDIN_URL, RESUME_URL } from "../../lib/home";

import styles from "./home.module.css";

const Contact = () => (
  <section
    id="contact"
    aria-labelledby="contact-heading"
    className={`${styles.section} ${styles.contact}`}
  >
    <div className={`${styles.card} ${styles.contactCard}`} data-reveal="">
      <h2 id="contact-heading" className={styles.contactHeading}>
        Let&apos;s talk about what you&apos;re building.
      </h2>
      <p className={styles.contactCopy}>
        Open to engineering roles in Singapore and to selected freelance work.
        Email is fastest — I reply within a day or two.
      </p>
      <div className={styles.buttons}>
        <a href={`mailto:${AUTHOR_EMAIL}`} className={styles.btn}>
          {AUTHOR_EMAIL}
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnGhost}
        >
          LinkedIn
        </a>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnGhost}
        >
          Résumé (PDF)
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
