import guide from "../../seo/content/heic-to-jpg.en";
import ToolPage from "../ToolPage";
import Editor from "../image-toolkit/ImageToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("heic-to-jpg");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="convert-image" preset={{ format: "jpeg" }} />
    </ToolPage>
  );
}
