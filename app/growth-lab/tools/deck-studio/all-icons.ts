/**
 * The whole lucide set, behind its own module (2026-11-11). `import("lucide")` asked
 * for the package's namespace, and the bundler kept that namespace in the chunk the
 * static named imports already share, so every tool page and the hub downloaded all
 * 1,871 icons to draw about forty. Importing this file instead keeps the full set in
 * the picker's own lazy chunk.
 */
export { icons } from "lucide";
