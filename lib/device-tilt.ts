/** Degrees of tilt, away from the resting angle, that reach full travel. */
const RANGE_DEG = 20;
/** How fast the resting angle follows the phone, so it re-centres itself. */
const BASELINE_DRIFT = 0.015;
/** How fast the reported tilt chases the sensor reading (low-pass). */
const SMOOTHING = 0.14;

type PermissionEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

/** True on phones and tablets that have a motion sensor API. */
export const canUseDeviceTilt = () =>
  typeof window !== "undefined" &&
  "DeviceOrientationEvent" in window &&
  window.matchMedia("(pointer: coarse)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True when the browser exposes a permission prompt (iOS, newer Chrome). */
export const tiltNeedsPermission = () =>
  typeof (DeviceOrientationEvent as PermissionEvent).requestPermission ===
  "function";

/** Asks for motion access. Must be called from a tap. */
export const requestTiltPermission = async () => {
  const request = (DeviceOrientationEvent as PermissionEvent).requestPermission;
  if (!request) return true;
  try {
    return (await request()) === "granted";
  } catch {
    return false;
  }
};

/**
 * Calls `onTilt(x, y)` every frame with the phone's smoothed tilt, each -1…1,
 * measured from the angle it is being held at (which slowly re-centres).
 * `onFirstReading` fires once the sensor actually delivers data.
 * Returns a function that stops watching.
 */
export const watchDeviceTilt = (
  onTilt: (_x: number, _y: number) => void,
  onFirstReading?: () => void,
) => {
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
      onFirstReading?.();
      frame = requestAnimationFrame(tick);
    }
    baseBeta += (pitch - baseBeta) * BASELINE_DRIFT;
    baseGamma += (lean - baseGamma) * BASELINE_DRIFT;

    goalX = clamp((lean - baseGamma) / RANGE_DEG);
    goalY = clamp((pitch - baseBeta) / RANGE_DEG);
  };

  const tick = () => {
    x += (goalX - x) * SMOOTHING;
    y += (goalY - y) * SMOOTHING;
    onTilt(x, y);
    frame = requestAnimationFrame(tick);
  };

  window.addEventListener("deviceorientation", onOrientation);
  return () => {
    window.removeEventListener("deviceorientation", onOrientation);
    cancelAnimationFrame(frame);
  };
};
