import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import Index from "../pages/index";

jest.mock("next/font/google", () => {
  const font = () => ({ className: "f", variable: "f", style: {} });
  return {
    IBM_Plex_Sans: font,
    IBM_Plex_Mono: font,
    Atkinson_Hyperlegible: font,
    Nunito: font,
    Lato: font,
  };
});

const github = {
  repos: [],
  activity: [],
  reposMessage: "GitHub is unavailable right now — see github.com/harryakbar.",
  activityMessage: "Activity unavailable.",
  fetchedAt: "2026-11-17T00:00:00.000Z",
};

const posts = [
  {
    slug: "lfit",
    title: "Love For Imperfect Things, Ch. 1: Self Care",
    blurb: "On being good to yourself first.",
    meta: "2020 · Books",
  },
];

describe("Homepage", () => {
  it("renders every section", () => {
    render(<Index github={github} posts={posts} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Harry Akbar Ali Munir" }),
    ).toBeInTheDocument();
    ["Experience", "Stack & tools", "Open source", "Writing"].forEach((name) =>
      expect(
        screen.getByRole("heading", { level: 2, name }),
      ).toBeInTheDocument(),
    );
    expect(
      screen.getByRole("heading", { name: "FairPrice Group" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Love For Imperfect Things/ }),
    ).toHaveAttribute("href", "/posts/lfit");
  });

  it("swaps the intro copy between audiences", () => {
    render(<Index github={github} posts={posts} />);
    expect(
      screen.getByText(/I build production web applications/),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("tab", { name: "For founders & clients" }),
    );

    expect(
      screen.getByRole("tab", { name: "For founders & clients" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByText(/I take web products from idea to production/),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/I build production web applications/),
    ).toBeNull();
  });

  it("shows the GitHub fallback messages when the snapshot is empty", () => {
    render(<Index github={github} posts={posts} />);
    expect(
      screen.getByText(/GitHub is unavailable right now/),
    ).toBeInTheDocument();
    expect(screen.getByText("Activity unavailable.")).toBeInTheDocument();
  });

  it("links the other pages from the footer", () => {
    render(<Index github={github} posts={posts} />);
    const footerNav = screen.getByRole("navigation", { name: "Elsewhere" });
    expect(footerNav.querySelector('a[href="/photographs"]')).not.toBeNull();
    expect(footerNav.querySelector('a[href="/app"]')).not.toBeNull();
  });
});
