import AcademyPage from "../AcademyPage";
import { useLoaderData } from "react-router";
import { LocaleProvider } from "../../shared/locale";
import { moduleLinks } from "../../shared/route-links";
import type { AcademyData } from "./load";
import academyStyles from "../academy.css?url";

export type { AcademyArgs, AcademyData } from "./load";
export const academyLinks = () => [...moduleLinks(), { rel: "stylesheet", href: academyStyles }];
/** The meta is built by the loader (load.ts), so this route never needs the course in the browser. */
export const metaFromLoader = ({ loaderData }: { loaderData?: AcademyData }) => loaderData?.meta ?? [];
export function AcademyRoute() {
  const loaderData = useLoaderData<AcademyData>();
  return (
    <LocaleProvider locale={loaderData.locale}>
      <AcademyPage {...loaderData} />
    </LocaleProvider>
  );
}
