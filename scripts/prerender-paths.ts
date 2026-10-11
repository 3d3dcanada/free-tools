import { academyRoutes } from "../app/growth-lab/academy/metadata";

/**
 * Every page that gets its own HTML file at build time: each route without a URL
 * parameter, plus the academy lessons and support pages (one `:page` route, so the
 * pages are listed here from the same table the route itself checks).
 */
export function prerenderPaths({ getStaticPaths }: { getStaticPaths: () => string[] }) {
  const academy = academyRoutes.flatMap((path) => [path, "/fr" + path]);
  return [...new Set([...getStaticPaths(), ...academy])];
}
