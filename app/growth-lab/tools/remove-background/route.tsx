import guide from "../../seo/content/remove-background.en";
import ToolPage from "../ToolPage";
import Editor from "../image-toolkit/ImageToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("remove-background");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="remove-background" />
    </ToolPage>
  );
}
