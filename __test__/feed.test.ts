import { generateFeed } from "../lib/feed";

describe("generateFeed", () => {
  const xml = generateFeed([
    {
      slug: "effective-engineer",
      title: "raw title",
      date: "2020-03-16T05:35:07.322Z",
    },
    {
      slug: "unknown-post",
      title: "Tips & <tricks>",
      date: "2021-01-01T00:00:00.000Z",
      excerpt: "An excerpt",
    },
  ]);

  it("is an RSS 2.0 document pointing at the www host", () => {
    expect(xml).toMatch(/^<\?xml version="1.0"/);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(
      '<atom:link href="https://www.harryakbar.dev/feed.xml"',
    );
  });

  it("uses the curated Writing title when one exists", () => {
    expect(xml).toContain("<title>The Effective Engineer — a review</title>");
    expect(xml).toContain(
      "<link>https://www.harryakbar.dev/posts/effective-engineer</link>",
    );
  });

  it("escapes XML in titles and falls back to the excerpt", () => {
    expect(xml).toContain("<title>Tips &amp; &lt;tricks&gt;</title>");
    expect(xml).toContain("<description>An excerpt</description>");
  });
});
