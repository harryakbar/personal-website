import { RefObject, useCallback, useEffect, useState } from "react";

/** Degrees of tilt, away from the resting angle, that reach full travel. */
const RANGE_DEG = 20;
/** How fast the resting angle follows the phone, so it re-centres itself. */
const BASELINE_DRIFT = 0.015;
/** How fast the rendered tilt chases the sensor reading (low-pass). */
const SMOOTHING = 0.14;

type PermissionEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export type TiltState = "unsupported" | "needs-permission" | "on" | "off";

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Follows the phone's gyroscope and writes `--tilt-x` / `--tilt-y`
 * (each -1…1) onto the target element, so CSS can move the photos.
 * Writes CSS variables directly, so a tilt never re-renders React.
 */
const useDeviceTilt = (target: RefObject<HTMLElement>) => {
  const [state, setState] = useState<TiltState>("unsupported");

  // Decide what this device can do once we are in the browser.
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("DeviceOrientationEvent" in window) ||
      !window.matchMedia("(pointer: coarse)").matches ||
      prefersReducedMotion()
    ) {
      return;
    }
    const needsPermission =
      typeof (DeviceOrientationEvent as PermissionEvent).requestPermission ===
      "function";
    // iOS needs a tap before it shares the gyroscope; elsewhere, just start.
    setState(needsPermission ? "needs-permission" : "on");
  }, []);

  // Some browsers expose requestPermission yet already deliver readings
  // (Android Chrome); start straight away there. iOS stays silent until tapped.
  useEffect(() => {
    if (state !== "needs-permission") return undefined;
    const probe = (event: DeviceOrientationEvent) => {
      if (event.beta !== null) setState("on");
    };
    window.addEventListener("deviceorientation", probe);
    return () => window.removeEventListener("deviceorientation", probe);
  }, [state]);

  useEffect(() => {
    if (state !== "on") return undefined;
    const element = target.current;
    if (!element) return undefined;

    let baseBeta: number | null = null;
    let baseGamma = 0;
    let goalX = 0;
    let goalY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;
      // Swap axes when the phone is held sideways.
      const angle = (screen.orientation?.angle ?? 0) % 360;
      let lean = event.gamma; // left / right
      let pitch = event.beta; // toward / away
      if (angle === 90) [lean, pitch] = [event.beta, -event.gamma];
      else if (angle === 270 || angle === -90)
        [lean, pitch] = [-event.beta, event.gamma];

      if (baseBeta === null) {
        baseBeta = pitch;
        baseGamma = lean;
      }
      baseBeta += (pitch - baseBeta) * BASELINE_DRIFT;
      baseGamma += (lean - baseGamma) * BASELINE_DRIFT;

      goalX = clamp((lean - baseGamma) / RANGE_DEG);
      goalY = clamp((pitch - baseBeta) / RANGE_DEG);
    };

    const tick = () => {
      x += (goalX - x) * SMOOTHING;
      y += (goalY - y) * SMOOTHING;
      element.style.setProperty("--tilt-x", x.toFixed(4));
      element.style.setProperty("--tilt-y", y.toFixed(4));
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("deviceorientation", onOrientation);
    frame = requestAnimationFrame(tick);
    element.dataset.tilt = "on";

    return () => {
      window.removeEventListener("deviceorientation", onOrientation);
      cancelAnimationFrame(frame);
      delete element.dataset.tilt;
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
    };
  }, [state, target]);

  /** Turns tilt on (asking iOS for permission, from the tap) or off. */
  const toggle = useCallback(async () => {
    if (state === "on") {
      setState("off");
      return;
    }
    const request = (DeviceOrientationEvent as PermissionEvent)
      .requestPermission;
    if (request) {
      try {
        if ((await request()) !== "granted") return;
      } catch {
        return;
      }
    }
    setState("on");
  }, [state]);

  return { state, toggle };
};

export default useDeviceTilt;
