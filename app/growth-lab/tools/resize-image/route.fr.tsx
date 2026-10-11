import guide from "../../seo/content/resize-image.fr";
import ToolPage from "../ToolPage";
import Editor from "../image-toolkit/ImageToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("resize-image", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="resize-image" />
    </ToolPage>
  );
}
