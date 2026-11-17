import {
  ago,
  collapse,
  describeEvent,
  plural,
  RawEvent,
  toRepo,
} from "./github";

const NOW = new Date("2026-11-17T12:00:00Z").getTime();

describe("plural", () => {
  it("pluralises regular and sibilant words", () => {
    expect(plural(1, "commit")).toBe("1 commit");
    expect(plural(3, "commit")).toBe("3 commits");
    expect(plural(2, "push")).toBe("2 pushes");
  });
});

describe("ago", () => {
  it("formats relative times", () => {
    expect(ago("2026-11-17T11:59:30Z", NOW)).toBe("just now");
    expect(ago("2026-11-17T11:30:00Z", NOW)).toBe("30 minutes ago");
    expect(ago("2026-11-17T09:00:00Z", NOW)).toBe("3 hours ago");
    expect(ago("2026-11-16T12:00:00Z", NOW)).toBe("1 day ago");
  });
});

describe("collapse + describeEvent", () => {
  const push = (repo: string, at: string, size: number): RawEvent => ({
    type: "PushEvent",
    created_at: at,
    repo: { name: `harryakbar/${repo}` },
    payload: { size },
  });

  it("folds same-day pushes to one repo and sums their commits", () => {
    const events = [
      push("site", "2026-11-17T10:00:00Z", 2),
      push("site", "2026-11-17T09:00:00Z", 3),
      push("other", "2026-11-16T09:00:00Z", 1),
      {
        type: "WatchEvent",
        created_at: "2026-11-15T09:00:00Z",
        repo: { name: "someone/lib" },
      },
    ];
    const rows = collapse(events).map((e) => describeEvent(e, NOW)?.text);
    expect(rows).toEqual([
      "Pushed 5 commits to site",
      "Pushed 1 commit to other",
      "Starred someone/lib",
    ]);
  });

  it("falls back to raw events when one repo swallows the feed", () => {
    const events = [1, 2, 3, 4].map((h) =>
      push("site", `2026-11-17T0${h}:00:00Z`, 1),
    );
    expect(collapse(events)).toHaveLength(4);
  });

  it("ignores event types it cannot describe", () => {
    expect(
      describeEvent(
        { type: "GollumEvent", created_at: "2026-11-17T00:00:00Z" },
        NOW,
      ),
    ).toBeNull();
  });
});

describe("toRepo", () => {
  it("builds the meta line and a description fallback", () => {
    expect(
      toRepo({
        name: "a",
        html_url: "u",
        description: null,
        fork: false,
        language: "TypeScript",
        stargazers_count: 2,
      }),
    ).toEqual({
      name: "a",
      url: "u",
      description: "No description yet.",
      meta: "TypeScript · 2 stars",
    });
  });
});
