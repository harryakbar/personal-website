// Build-time snapshot of public GitHub data for the homepage's Open source
// section. Fetched in getStaticProps and refreshed by ISR, so visitors never
// hit GitHub's unauthenticated rate limit. Never throws: on any failure it
// returns empty lists with a message the page shows in their place.

export const GITHUB_USER = "harryakbar";

export type Repo = {
  name: string;
  url: string;
  description: string;
  meta: string;
};

export type Activity = { text: string; when: string };

export type GitHubSnapshot = {
  repos: Repo[];
  activity: Activity[];
  reposMessage: string;
  activityMessage: string;
  /** ISO time the snapshot was taken; "when" labels are relative to it. */
  fetchedAt: string;
};

type RawRepo = {
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
};

export type RawEvent = {
  type: string;
  created_at: string;
  repo?: { name: string };
  payload?: {
    size?: number;
    distinct_size?: number;
    commits?: unknown[];
    ref_type?: string;
    action?: string;
    release?: { tag_name?: string };
  };
};

type CountedEvent = RawEvent & { __count?: number; __commits?: number };

export const plural = (n: number, word: string) => {
  if (n === 1) return `${n} ${word}`;
  return `${n} ${word}${/(s|sh|ch|x|z)$/.test(word) ? "es" : "s"}`;
};

export const ago = (iso: string, now: number) => {
  const s = Math.floor((now - new Date(iso).getTime()) / 1000);
  if (s < 120) return "just now";
  if (s < 3600) return `${plural(Math.floor(s / 60), "minute")} ago`;
  if (s < 86400) return `${plural(Math.floor(s / 3600), "hour")} ago`;
  if (s < 2592000) return `${plural(Math.floor(s / 86400), "day")} ago`;
  return new Date(iso).toLocaleDateString("en-SG", {
    month: "short",
    year: "numeric",
  });
};

const commitCount = (e: RawEvent) => {
  const n = e.payload?.size ?? e.payload?.distinct_size;
  if (typeof n === "number") return n;
  return e.payload?.commits?.length ?? 0;
};

/** GitHub emits several events per repo in quick succession — fold same-day runs into one row. */
export const collapse = (events: RawEvent[]): CountedEvent[] => {
  const withCount = (e: RawEvent): CountedEvent => ({
    ...e,
    __commits: commitCount(e),
  });
  const out: CountedEvent[] = [];
  events.forEach((e) => {
    const last = out[out.length - 1];
    const sameDay =
      last &&
      new Date(last.created_at).toDateString() ===
        new Date(e.created_at).toDateString();
    if (
      last &&
      sameDay &&
      last.type === e.type &&
      (last.repo?.name ?? "") === (e.repo?.name ?? "")
    ) {
      last.__count = (last.__count ?? 1) + 1;
      const n = e.payload?.size ?? e.payload?.distinct_size;
      if (typeof n === "number") last.__commits = (last.__commits ?? 0) + n;
      return;
    }
    out.push(withCount(e));
  });
  // if a single busy repo swallowed the whole feed, show the raw events instead of one lonely row
  if (out.length < 3 && events.length > 3) return events.map(withCount);
  return out;
};

export const describeEvent = (
  e: CountedEvent,
  now: number,
): Activity | null => {
  const repo = e.repo
    ? e.repo.name.replace(new RegExp(`^${GITHUB_USER}/`), "")
    : "a repository";
  let text: string | null = null;
  if (e.type === "PushEvent") {
    const commits = e.__commits ?? 0;
    const pushes = e.__count ?? 1;
    if (commits > 0) text = `Pushed ${plural(commits, "commit")} to ${repo}`;
    else if (pushes > 1) text = `${plural(pushes, "push")} to ${repo}`;
    else text = `Pushed to ${repo}`;
  } else if (e.type === "CreateEvent") {
    text = `Created ${e.payload?.ref_type || "a ref"} in ${repo}`;
  } else if (e.type === "PullRequestEvent") {
    text = `${e.payload?.action === "closed" ? "Merged" : "Opened"} a pull request in ${repo}`;
  } else if (e.type === "IssuesEvent") {
    const action = e.payload?.action ?? "updated";
    text = `${action.charAt(0).toUpperCase()}${action.slice(1)} an issue in ${repo}`;
  } else if (e.type === "WatchEvent") {
    text = `Starred ${repo}`;
  } else if (e.type === "ReleaseEvent" && e.payload?.release?.tag_name) {
    text = `Released ${e.payload.release.tag_name} in ${repo}`;
  }
  return text ? { text, when: ago(e.created_at, now) } : null;
};

export const toRepo = (r: RawRepo): Repo => ({
  name: r.name,
  url: r.html_url,
  description: r.description || "No description yet.",
  meta:
    [r.language, r.stargazers_count ? plural(r.stargazers_count, "star") : null]
      .filter(Boolean)
      .join(" · ") || "—",
});

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "personal-website",
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

export async function getGitHubSnapshot(): Promise<GitHubSnapshot> {
  const now = Date.now();
  const base = `https://api.github.com/users/${GITHUB_USER}`;
  try {
    const [rRes, eRes] = await Promise.all([
      fetch(`${base}/repos?sort=pushed&per_page=100`, { headers }),
      fetch(`${base}/events/public?per_page=100`, { headers }),
    ]);
    if (!rRes.ok) throw new Error(`repos ${rRes.status}`);
    const raw: RawRepo[] = await rRes.json();
    const repos = raw
      .filter((r) => !r.fork)
      .slice(0, 5)
      .map(toRepo);

    let activity: Activity[] = [];
    if (eRes.ok) {
      const events: RawEvent[] = await eRes.json();
      activity = collapse(events)
        .map((e) => describeEvent(e, now))
        .filter((a): a is Activity => a !== null)
        .slice(0, 6);
    }

    return {
      repos,
      activity,
      reposMessage: repos.length ? "" : "No public repositories found.",
      activityMessage: activity.length ? "" : "No recent public activity.",
      fetchedAt: new Date(now).toISOString(),
    };
  } catch {
    return {
      repos: [],
      activity: [],
      reposMessage: `GitHub is unavailable right now — see github.com/${GITHUB_USER}.`,
      activityMessage: "Activity unavailable.",
      fetchedAt: new Date(now).toISOString(),
    };
  }
}
