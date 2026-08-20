import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

// Self-hosted by next/font so the photography pages make no external font
// request. Exposed as CSS variables consumed by photography.module.css.
export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const photographyFontClass = `${instrumentSans.variable} ${plexMono.variable}`;
