import Hub from "../ToolsHub";
import guide from "../../seo/hub.fr";
import { pageMeta } from "../../seo/guide";
export { moduleLinks as links } from "../../shared/route-links";
export const meta = () => pageMeta("/tools", "fr", guide.title, guide.description, "/og/tools/hub.fr.jpg");
export default function Route() {
  return <Hub guide={guide} />;
}
