import AcademyPage from "../AcademyPage";
import { useLoaderData } from "react-router";
import { academyInfo, academyRoutes } from "../metadata";
import { loadAcademy } from "../load-content";
import { LocaleProvider } from "../../shared/locale";
import { pageMeta, type Locale } from "../../seo/guide";
import { moduleLinks } from "../../shared/route-links";
import academyStyles from "../academy.css?url";

export type AcademyArgs = { params: { page?: string } };
export type AcademyData = Awaited<ReturnType<typeof loadAcademy>> & { path: string; locale: Locale };
export const academyLinks = () => [...moduleLinks(), { rel: "stylesheet", href: academyStyles }];
export function academyPath(page?: string) {
  const path = "/learn/academy" + (page ? "/" + page : "");
  if (!academyRoutes.includes(path)) throw new Response("Page not found", { status: 404 });
  return path;
}
export async function academyLoader(locale: Locale, page?: string): Promise<AcademyData> {
  const path = academyPath(page);
  return { path, locale, ...(await loadAcademy(page || "academy", locale)) };
}
export function academyMeta(locale: Locale, page?: string) {
  const path = academyPath(page),
    info = academyInfo(path, locale);
  const image = page ? `/og/learn/academy/${page}.${locale}.jpg` : `/og/learn/academy.${locale}.jpg`;
  return pageMeta(path, locale, info.title, info.description, image);
}
export function AcademyRoute() {
  const loaderData = useLoaderData<AcademyData>();
  return (
    <LocaleProvider locale={loaderData.locale}>
      <AcademyPage {...loaderData} />
    </LocaleProvider>
  );
}
