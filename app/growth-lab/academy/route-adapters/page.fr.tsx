import { academyLoader, academyMeta, type AcademyArgs } from "./shared";
export { AcademyRoute as default, academyLinks as links } from "./shared";
export const loader = ({ params }: AcademyArgs) => academyLoader("fr", params.page);
export const meta = ({ params }: AcademyArgs) => academyMeta("fr", params.page);
