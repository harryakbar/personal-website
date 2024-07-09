import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPostSlugs, getPostBySlug, getAllPosts } from "./api";

jest.mock("fs");
jest.mock("path");
jest.mock("gray-matter");

describe("Post functions", () => {
  const mockPostsDirectory = "_posts";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPostSlugs", () => {
    it("should return slugs of posts", () => {
      const mockFiles = ["post1.md", "post2.md"];
      (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles);

      const slugs = getPostSlugs();

      expect(slugs).toEqual(mockFiles);
      expect(fs.readdirSync).toHaveBeenCalledWith(
        path.join(process.cwd(), mockPostsDirectory)
      );
    });
  });

  describe("getPostBySlug", () => {
    it("should return post data by slug", () => {
      const mockSlug = "post1";
      const mockFields = ["title", "date", "content"];
      const mockContent = "This is a test post content";
      const mockData = { title: "Test Post", date: "2024-07-01" };

      (fs.readFileSync as jest.Mock).mockReturnValue(`---
title: Test Post
date: 2024-07-01
---
${mockContent}`);

      (matter as jest.Mock).mockReturnValue({
        data: mockData,
        content: mockContent,
      });

      const post = getPostBySlug(mockSlug, mockFields);

      expect(post).toEqual({
        title: "Test Post",
        date: "2024-07-01",
        content: mockContent,
      });
      expect(fs.readFileSync).toHaveBeenCalledWith(
        path.join(mockPostsDirectory, `${mockSlug}.md`),
        "utf8"
      );
      expect(matter).toHaveBeenCalledWith(`---
title: Test Post
date: 2024-07-01
---
${mockContent}`);
    });
  });

  describe("getAllPosts", () => {
    it("should return all posts with specified fields", () => {
      const mockSlugs = ["post1.md", "post2.md"];
      const mockFields = ["title", "date"];
      const mockPosts = [
        { slug: "post1", title: "Post 1", date: "2024-07-01" },
        { slug: "post2", title: "Post 2", date: "2024-06-01" },
      ];

      (fs.readdirSync as jest.Mock).mockReturnValue(mockSlugs);
      (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
        const slug = path.basename(filePath, ".md");
        if (slug === "post1") {
          return `---
title: Post 1
date: 2024-07-01
---
Content of Post 1`;
        } else if (slug === "post2") {
          return `---
title: Post 2
date: 2024-06-01
---
Content of Post 2`;
        }
        return "";
      });

      const posts = getAllPosts(mockFields);

      expect(posts).toEqual([
        { title: "Test Post", date: "2024-07-01" },
        { title: "Test Post", date: "2024-07-01" },
      ]);
      expect(fs.readdirSync).toHaveBeenCalledWith(
        path.join(process.cwd(), mockPostsDirectory)
      );
      expect(fs.readFileSync).toHaveBeenCalledTimes(mockSlugs.length);
    });
  });
});
