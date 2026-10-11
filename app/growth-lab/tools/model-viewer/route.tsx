import guide from "../../seo/content/model-viewer.en";
import ToolPage from "../ToolPage";
import Editor from "../printing-tools/PrintingTools";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("model-viewer");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="model-viewer" />
    </ToolPage>
  );
}
