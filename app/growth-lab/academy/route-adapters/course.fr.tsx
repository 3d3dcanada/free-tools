import { academyLoader, academyMeta } from "./shared";
export { AcademyRoute as default, academyLinks as links } from "./shared";
export const loader = () => academyLoader("fr");
export const meta = () => academyMeta("fr");
