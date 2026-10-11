import { academyLoader, academyMeta, type AcademyArgs } from "./shared";
export { AcademyRoute as default, academyLinks as links } from "./shared";
export const loader = ({ params }: AcademyArgs) => academyLoader("en", params.page);
export const meta = ({ params }: AcademyArgs) => academyMeta("en", params.page);
