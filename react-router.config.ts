import type { Config } from "@react-router/dev/config";
import { prerenderPaths } from "./scripts/prerender-paths";

/**
 * A static site: every page is rendered to HTML at build time and hydrates in the
 * browser. Nothing runs on a server after `npm run build`, so any static host works
 * (see the README, "Host it").
 */
export default {
  ssr: false,
  prerender: prerenderPaths,
} satisfies Config;
