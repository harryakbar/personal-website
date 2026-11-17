import type { GitHubSnapshot } from "../../lib/github";
import { GITHUB_URL } from "../../lib/home";

import styles from "./home.module.css";

const OpenSource = ({ github }: { github: GitHubSnapshot }) => (
  <section id="code" aria-labelledby="code-heading" className={styles.section}>
    <div className={styles.codeHead}>
      <h2 id="code-heading" className={styles.h2}>
        Open source
      </h2>
      <p className={styles.meta}>live from github.com/harryakbar</p>
    </div>

    <div className={styles.codeGrid} data-reveal="">
      <div>
        {github.repos.length ? (
          <ul className={styles.repoList}>
            {github.repos.map((repo) => (
              <li key={repo.url}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.rowLink}
                >
                  <span className={styles.repoTop}>
                    <span className={styles.repoName}>{repo.name}</span>
                    <span className={styles.repoMeta}>{repo.meta}</span>
                  </span>
                  <span className={styles.repoDesc}>{repo.description}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className={styles.status}>
            {github.reposMessage}
          </p>
        )}
        <p className={styles.allRepos}>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            All repositories
          </a>
        </p>
      </div>

      <div className={`${styles.card} ${styles.activityCard}`}>
        <h3 className={styles.eyebrow}>Recent activity</h3>
        {github.activity.length ? (
          <ul className={styles.activityList}>
            {github.activity.map((ev, i) => (
              <li key={`${ev.text}-${i}`}>
                <span aria-hidden="true" className={styles.activityDot} />
                <span style={{ minWidth: 0 }}>
                  <span className={styles.activityText}>{ev.text}</span>
                  <span className={styles.activityWhen}>{ev.when}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className={styles.status}>
            {github.activityMessage}
          </p>
        )}
      </div>
    </div>
  </section>
);

export default OpenSource;
