import { academyLoader } from "./load";
import { metaFromLoader } from "./shared";
export { AcademyRoute as default, academyLinks as links } from "./shared";
export const loader = () => academyLoader("en");
export const meta = metaFromLoader;
