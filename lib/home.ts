// Copy for the homepage, from the "Personal Site v3" design.
// Rich text uses a tiny convention: segments wrapped in **double asterisks**
// render as <strong>, everything else as plain text (see components/home/rich.tsx).

import { COMPANY_NAME, JOB_TITLE } from "./constants";

export const RESUME_URL =
  "https://files.harryakbar.dev/Resume_HarryAkbarAliMunir-15.pdf";
export const GITHUB_URL = "https://github.com/harryakbar";
export const LINKEDIN_URL = "https://linkedin.com/in/harryakbaram";
export const LEETCODE_URL = "https://leetcode.com/harryakbaram/";
export const TRIP_OPTIMIZER_URL = "https://trip-optimizer.harryakbar.dev/";

export const NAV = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#code", label: "Code" },
  { href: "#writing", label: "Writing" },
  { href: "/photographs", label: "Photographs" },
];

export type Audience = "hire" | "freelance";

export const HERO_COPY: Record<Audience, { lead: string; body: string }> = {
  hire: {
    lead: "I build production web applications with React, TypeScript, and Node.js. Currently at **FairPrice Group** — Singapore's largest online grocery platform — working on order, payments, and platform features used at national scale.",
    body: "I own Core Web Vitals monitoring for my team, and I ship side projects end to end across web and mobile.",
  },
  freelance: {
    lead: "I take web products from idea to production — **frontend, API, payments, deploy**. Most recently that meant building an AI travel planner on my own, live with real paying users.",
    body: "Good fit for launching an MVP, making a slow app fast, or standing up a component library your team will actually use.",
  },
};

export const getStats = (years: number) => [
  { label: "Years shipping production apps", value: `${years}+` },
  { label: "Monthly GMV added by one feature", value: "S$100K" },
  { label: "Fewer production type errors", value: "90%" },
];

export type DiagramId = "order-amendment" | "rcs-companion" | "tms" | "stoqo";

export type Role = {
  company: string;
  title: string;
  period: string;
  diagram?: DiagramId;
  bullets?: string[];
  summary?: string;
  stack?: string;
};

export const EXPERIENCE: Role[] = [
  {
    company: COMPANY_NAME,
    title: JOB_TITLE,
    period: "Aug 2022 — Present · Singapore",
    // diagram: "order-amendment", — hidden for now; components/home/diagrams/order-amendment.tsx is kept for a later revisit
    bullets: [
      "Delivered Post Order Amendment on FairPrice Online, contributing **an additional S$100K/month in GMV**.",
      "Launched Quickbuy@SGov with GovTech so public officers can pay through a government scheme; built approval-workflow automation in Node.js and Google Cloud Tasks.",
      "Cut order page load times by **~2 seconds** with prefetching and caching, and own Core Web Vitals monitoring on Datadog so regressions surface early.",
      "Built the shared component library (React, TypeScript, Storybook), and replaced Go email templates and the invoice PDF service with modular React components.",
    ],
    stack:
      "React · Next.js · TypeScript · Redux · Node.js · Go · GCP · Datadog",
  },
  {
    company: "better.sg",
    title: "Volunteer Software Engineer",
    period: "2026 — Present · Singapore",
    diagram: "rcs-companion",
    bullets: [
      "Contributing across every feature end to end, from the delegated login and account system to the interactive UI itself.",
      "Apply agentic AI workflows across design, documentation, bug fixing, monitoring, and code review to ship faster with a small volunteer team.",
    ],
  },
  {
    company: "GudangAda",
    title: "Software Engineer · Project Lead",
    period: "Jul 2020 — Jul 2022 · Tangerang, ID",
    diagram: "tms",
    bullets: [
      "Built the TMS frontend in React — batch assignment, drag-and-drop route building with drop restrictions, and an automated routing UI that replaced manual routing.",
      "Led two teams as project lead on Seller Self-Registration for GudangAda Logistics, onboarding around **20 new retailers, principals, and wholesalers a day** across Indonesia.",
      "Migrated the codebase from JavaScript to TypeScript, reducing production type errors by **90%** per Sentry.",
    ],
    stack: "React · Next.js · TypeScript · Redux · Python · Jest",
  },
  {
    company: "STOQO",
    title: "Software Engineer",
    period: "Dec 2018 — Apr 2020 · Jakarta, ID",
    diagram: "stoqo",
    bullets: [
      "Built a Warehouse Management System dashboard in React and a mobile app in React Native, digitizing operations from inbound to outbound.",
      "Attended overnight warehouse shifts to validate the product against how the work is really done.",
    ],
  },
  {
    company: "Earlier",
    title: "Internships",
    period: "2017 — 2018 · Jakarta, ID",
    summary:
      "Frontend Engineer Intern at HappyFresh, on mobile web and GrabFresh with React and Redux. Web Engineer Intern at Kudo, on a React migration and Firebase web push.",
  },
];

export const CUBE_FACES = [
  { label: "React", face: "front" },
  { label: "TypeScript", face: "right" },
  { label: "Node.js", face: "back" },
  { label: "Go", face: "left" },
  { label: "Next.js", face: "top" },
  { label: "PostgreSQL", face: "bottom" },
] as const;

export const STACK_GROUPS = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Redux",
      "Tailwind CSS",
      "Storybook",
    ],
  },
  {
    title: "Backend & infra",
    items: [
      "Node.js",
      "Go",
      "Hono",
      "Cloudflare Workers",
      "Supabase",
      "PostgreSQL",
      "GCP",
    ],
  },
  {
    title: "Craft & tooling",
    items: [
      "Core Web Vitals",
      "Datadog",
      "Jest / Vitest",
      "Turborepo",
      "GitHub Actions",
      "Accessibility",
      "Figma",
    ],
  },
];

/** Short titles and blurbs for the Writing list, keyed by post slug. */
export const WRITING: Record<
  string,
  { title: string; blurb: string; topic: string }
> = {
  "effective-engineer": {
    title: "The Effective Engineer — a review",
    blurb:
      "Leverage as impact divided by time invested, and the habits that compound: CI/CD, one-command setup, automated tests, docs a new contributor can follow.",
    topic: "Books",
  },
  lfit: {
    title: "Love For Imperfect Things, Ch. 1: Self Care",
    blurb:
      "On being good to yourself first, and why chasing someone else's definition of a good life is a bad trade.",
    topic: "Books",
  },
  "lfit-2": {
    title: "Love For Imperfect Things, Ch. 2: Family",
    blurb:
      "Five shapes a father–child relationship can take, and gratitude for parents who took the risk that made everything after it possible.",
    topic: "Books",
  },
};

/** Display order for posts that share a date (all three do). */
export const WRITING_ORDER = ["effective-engineer", "lfit", "lfit-2"];
