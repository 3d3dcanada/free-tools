import Hub from "../ToolsHub";
import guide from "../../seo/hub.en";
import { pageMeta } from "../../seo/guide";
export { moduleLinks as links } from "../../shared/route-links";
export const meta = () => pageMeta("/tools", "en", guide.title, guide.description, "/og/tools/hub.en.jpg");
export default function Route() {
  return <Hub guide={guide} />;
}
