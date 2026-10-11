import guide from "../../seo/content/png-to-webp.fr";
import ToolPage from "../ToolPage";
import Editor from "../image-toolkit/ImageToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("png-to-webp", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="convert-image" preset={{ format: "webp" }} />
    </ToolPage>
  );
}
