import { useSyncExternalStore } from "react";

/**
 * Modo Creadora: las herramientas de TikTok solo se renderizan si la URL
 * incluye ?admin=true. En SSR (build/prerender) siempre devuelve false,
 * así el HTML público nunca contiene el guion ni el botón.
 */
export function useCreatorMode(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => window.location.search.includes("admin=true"),
    () => false,
  );
}
