import "../../shared/french";
import "../french";
import { academyLoader } from "./load";
import { metaFromLoader } from "./shared";
export { AcademyRoute as default, academyLinks as links } from "./shared";
export const loader = () => academyLoader("fr");
export const meta = metaFromLoader;
