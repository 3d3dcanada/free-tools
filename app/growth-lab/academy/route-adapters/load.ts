import { academyInfo, academyRoutes } from "../metadata";
import { loadAcademy } from "../load-content";
import { academyView, type AcademyView } from "../view";
import { pageMeta, type Locale } from "../../seo/guide";

/**
 * The academy loader, in its own module (2026-11-11) so a route imports it for `loader` only and
 * the build drops it, with the whole course behind it, from the browser's copy of the route.
 */
export type AcademyArgs = { params: { page?: string } };
export type AcademyData = Awaited<ReturnType<typeof loadAcademy>> &
  AcademyView & { path: string; locale: Locale; meta: ReturnType<typeof academyMeta> };
export function academyPath(page?: string) {
  const path = "/learn/academy" + (page ? "/" + page : "");
  if (!academyRoutes.includes(path)) throw new Response("Page not found", { status: 404 });
  return path;
}
/** The course view and the meta are built here, so the browser never loads the course to draw them. */
export async function academyLoader(locale: Locale, page?: string): Promise<AcademyData> {
  const path = academyPath(page);
  const content = await loadAcademy(page || "academy", locale);
  return { path, locale, ...content, ...academyView(path, locale, content), meta: academyMeta(locale, page) };
}
function academyMeta(locale: Locale, page?: string) {
  const path = academyPath(page),
    info = academyInfo(path, locale);
  const image = page ? `/og/learn/academy/${page}.${locale}.jpg` : `/og/learn/academy.${locale}.jpg`;
  return pageMeta(path, locale, info.title, info.description, image);
}
