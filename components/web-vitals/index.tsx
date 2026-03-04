"use client";

import { useEffect, useState } from "react";

type MetricName = "CLS" | "FID" | "LCP" | "INP" | "TTFB";

interface Metric {
  name: MetricName;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
}

const thresholds: Record<MetricName, [number, number]> = {
  LCP: [2500, 4000],
  FID: [100, 300],
  CLS: [0.1, 0.25],
  INP: [200, 500],
  TTFB: [800, 1800],
};

function getRating(name: MetricName, value: number): Metric["rating"] {
  const [good, poor] = thresholds[name];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

function formatValue(name: MetricName, value: number): string {
  if (name === "CLS") return value.toFixed(3);
  return `${Math.round(value)} ms`;
}

const ratingColor: Record<Metric["rating"], string> = {
  good: "bg-green-100 text-green-800 border-green-300",
  "needs-improvement": "bg-yellow-100 text-yellow-800 border-yellow-300",
  poor: "bg-red-100 text-red-800 border-red-300",
};

const ratingDot: Record<Metric["rating"], string> = {
  good: "bg-green-500",
  "needs-improvement": "bg-yellow-500",
  poor: "bg-red-500",
};

const CORE_VITALS: MetricName[] = ["LCP", "CLS", "FID"];
const ALL_VITALS: MetricName[] = ["LCP", "CLS", "FID", "INP", "TTFB"];

export default function WebVitalsPanel() {
  const [metrics, setMetrics] = useState<Partial<Record<MetricName, Metric>>>(
    {}
  );
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    import("web-vitals").then(({ onCLS, onFID, onLCP, onINP, onTTFB }) => {
      const report = ({ name, value }: { name: string; value: number }) => {
        const metricName = name as MetricName;
        setMetrics((prev) => ({
          ...prev,
          [metricName]: {
            name: metricName,
            value,
            rating: getRating(metricName, value),
          },
        }));
      };

      onCLS(report);
      onFID(report);
      onLCP(report);
      onINP(report);
      onTTFB(report);
    });
  }, []);

  if (!mounted) return null;

  const displayMetrics = expanded ? ALL_VITALS : CORE_VITALS;
  const coreVitals = CORE_VITALS.map((name) => metrics[name]);
  const overallRating = coreVitals.some((m) => m?.rating === "poor")
    ? "poor"
    : coreVitals.some((m) => m?.rating === "needs-improvement")
    ? "needs-improvement"
    : "good";

  const overallColor: Record<Metric["rating"], string> = {
    good: "bg-green-500",
    "needs-improvement": "bg-yellow-500",
    poor: "bg-red-500",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-xs">
      {/* Collapsed dot */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          title="Show Web Vitals"
          className={`w-8 h-8 rounded-full ${overallColor[overallRating]} shadow-md hover:scale-110 transition-transform flex items-center justify-center text-white font-bold`}
        >
          ⚡
        </button>
      )}

      {/* Expanded panel */}
      {expanded && (
        <div className="bg-white border border-neutral-200 rounded-xl shadow-lg p-3 w-56">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-neutral-700 text-xs uppercase tracking-wide">
              Web Vitals
            </span>
            <button
              onClick={() => setExpanded(false)}
              className="text-neutral-400 hover:text-neutral-700 text-sm leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5">
            {displayMetrics.map((name) => {
              const metric = metrics[name];
              const isCore = CORE_VITALS.includes(name);
              return (
                <div
                  key={name}
                  className={`flex items-center justify-between px-2 py-1 rounded border ${
                    metric
                      ? ratingColor[metric.rating]
                      : "bg-neutral-50 text-neutral-400 border-neutral-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {metric && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${ratingDot[metric.rating]}`}
                      />
                    )}
                    <span className="font-semibold">{name}</span>
                    {isCore && (
                      <span className="text-neutral-400 text-[10px]">★</span>
                    )}
                  </div>
                  <span>
                    {metric ? formatValue(name, metric.value) : "—"}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-2 w-full text-center text-neutral-400 hover:text-neutral-600 text-[10px]"
          >
            {expanded ? "★ = Core Web Vitals" : ""}
          </button>
        </div>
      )}
    </div>
  );
}
