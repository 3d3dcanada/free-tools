import guide from "../../seo/content/compress-image.fr";
import ToolPage from "../ToolPage";
import Editor from "../image-toolkit/ImageToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("compress-image", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="compress-image" />
    </ToolPage>
  );
}
