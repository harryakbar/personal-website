import {
  Atkinson_Hyperlegible,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Lato,
  Nunito,
} from "next/font/google";

// Self-hosted by next/font so the homepage makes no external font request.
// Exposed as CSS variables consumed by home.module.css and diagrams.module.css.
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-home-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-home-mono",
  display: "swap",
});

// The three below only dress the case-study diagrams (each mimics the type of
// the product it depicts), so they are not preloaded and never block LCP.
export const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-home-atkinson",
  display: "swap",
  preload: false,
});

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-home-nunito",
  display: "swap",
  preload: false,
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-home-lato",
  display: "swap",
  preload: false,
});

export const homeFontClass = [plexSans, plexMono, atkinson, nunito, lato]
  .map((font) => font.variable)
  .join(" ");
