import Link from "next/link";

import Container from "../components/container";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { SITE_URL, SITE_DESCRIPTION, SITE_KEYWORDS } from "../lib/constants";

const TECH_STACK = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Go",
  "Kotlin",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "GitHub Actions",
  "Figma",
];

const EXPERIENCE = [
  {
    company: "NTUC FairPrice Group",
    role: "Software Engineer",
    period: "2022 – Present",
    location: "Singapore 🇸🇬",
  },
  {
    company: "GudangAda",
    role: "Frontend Engineer",
    period: "2021 – 2022",
    location: "Indonesia",
  },
  {
    company: "Shopee",
    role: "Frontend Engineer",
    period: "2020",
    location: "Indonesia",
  },
  {
    company: "STOQO",
    role: "Frontend Engineer",
    period: "2019 – 2020",
    location: "Indonesia",
  },
];

export default function Index() {
  return (
    <Layout
      meta={{
        title: "Harry Akbar Ali Munir — Software Engineer in Singapore",
        description: SITE_DESCRIPTION,
        keywords: SITE_KEYWORDS,
        canonicalUrl: SITE_URL,
      }}
    >
      <Container>
        <Intro />

        {/* About */}
        <section aria-labelledby="about-heading" className="mb-8">
          <h2 id="about-heading" className="text-xl font-semibold mb-3">
            About
          </h2>
          <div className="text-sm text-neutral-700 space-y-2 leading-relaxed">
            <p>
              I&apos;m a <strong>Software Engineer based in Singapore</strong>,
              currently at <strong>NTUC FairPrice Group</strong> building
              scalable web applications used by millions of shoppers.
            </p>
            <p>
              I specialize in <strong>frontend engineering</strong> — crafting
              performant, accessible UIs with React, Next.js, and TypeScript —
              while growing my backend skills in Go and Node.js. I care about
              clean code, great developer experience, and products that actually
              delight users.
            </p>
            <p>
              Previously at GudangAda, Shopee, and STOQO. CS graduate from
              University of Indonesia, where I also served as a Teaching
              Assistant and coached students in web development at Glints.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section aria-labelledby="skills-heading" className="mb-8">
          <h2 id="skills-heading" className="text-xl font-semibold mb-3">
            Tech Stack
          </h2>
          <ul
            className="flex flex-wrap gap-2"
            aria-label="Technologies I work with"
          >
            {TECH_STACK.map((tech) => (
              <li
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 list-none"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section aria-labelledby="experience-heading" className="mb-8">
          <h2 id="experience-heading" className="text-xl font-semibold mb-3">
            Experience
          </h2>
          <ol className="space-y-3">
            {EXPERIENCE.map((exp) => (
              <li key={exp.company} className="flex items-start gap-3 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                <div>
                  <span className="font-semibold">{exp.company}</span>
                  <span className="text-neutral-500">
                    {" · "}
                    {exp.role}
                  </span>
                  <div className="text-neutral-400 text-xs mt-0.5">
                    {exp.period} · {exp.location}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Links */}
        <section aria-labelledby="links-heading" className="mb-8">
          <h2 id="links-heading" className="text-xl font-semibold mb-3">
            Links
          </h2>
          <ul className="flex flex-wrap gap-3 text-sm">
            <li>
              <Link
                href="https://files.harryakbar.dev/Resume_HarryAkbarAliMunir-15.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-700 transition-colors text-xs font-medium"
              >
                📄 Resume
              </Link>
            </li>
            <li>
              <Link
                href="https://linkedin.com/in/harryakbaram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 text-neutral-700 hover:border-neutral-400 transition-colors text-xs font-medium"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/harryakbar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 text-neutral-700 hover:border-neutral-400 transition-colors text-xs font-medium"
              >
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href="/app"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 text-neutral-700 hover:border-neutral-400 transition-colors text-xs font-medium"
              >
                🛠️ Projects & Blog
              </Link>
            </li>
          </ul>
        </section>
      </Container>
    </Layout>
  );
}
