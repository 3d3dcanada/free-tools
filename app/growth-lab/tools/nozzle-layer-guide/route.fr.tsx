import guide from "../../seo/content/nozzle-layer-guide.fr";
import ToolPage from "../ToolPage";
import Editor from "../printing-tools/PrintingTools";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("nozzle-layer-guide", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="nozzle-layer-guide" />
    </ToolPage>
  );
}
