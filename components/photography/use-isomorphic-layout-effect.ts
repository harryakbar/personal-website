import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server. Layout work that
 * must land before paint (measuring the gallery, running the FLIP) uses this
 * so the mobile column layout never flashes through the desktop rows.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
