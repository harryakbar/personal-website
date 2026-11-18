import { RefObject, useCallback, useEffect, useState } from "react";

import {
  canUseDeviceTilt,
  requestTiltPermission,
  tiltNeedsPermission,
  watchDeviceTilt,
} from "../../lib/device-tilt";

export type TiltState = "unsupported" | "needs-permission" | "on" | "off";

/**
 * Follows the phone's gyroscope and writes `--tilt-x` / `--tilt-y`
 * (each -1…1) onto the target element, so CSS can move the photos.
 * Writes CSS variables directly, so a tilt never re-renders React.
 */
const useDeviceTilt = (target: RefObject<HTMLElement>) => {
  const [state, setState] = useState<TiltState>("unsupported");

  // Decide what this device can do once we are in the browser.
  useEffect(() => {
    if (!canUseDeviceTilt()) return;
    // iOS needs a tap before it shares the gyroscope; elsewhere, just start.
    setState(tiltNeedsPermission() ? "needs-permission" : "on");
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

    element.dataset.tilt = "on";
    const stop = watchDeviceTilt((x, y) => {
      element.style.setProperty("--tilt-x", x.toFixed(4));
      element.style.setProperty("--tilt-y", y.toFixed(4));
    });

    return () => {
      stop();
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
    if (await requestTiltPermission()) setState("on");
  }, [state]);

  return { state, toggle };
};

export default useDeviceTilt;
