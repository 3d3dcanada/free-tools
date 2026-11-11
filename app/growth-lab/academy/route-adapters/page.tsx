import { academyLoader, type AcademyArgs } from "./load";
import { metaFromLoader } from "./shared";
export { AcademyRoute as default, academyLinks as links } from "./shared";
export const loader = ({ params }: AcademyArgs) => academyLoader("en", params.page);
export const meta = metaFromLoader;
