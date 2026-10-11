import guide from "../../seo/content/rounded-image.fr";
import ToolPage from "../ToolPage";
import Editor from "../image-toolkit/ImageToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("rounded-image", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="rounded-image" />
    </ToolPage>
  );
}
