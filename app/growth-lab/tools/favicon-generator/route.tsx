import guide from "../../seo/content/favicon-generator.en";
import ToolPage from "../ToolPage";
import Editor from "../image-toolkit/ImageToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("favicon-generator");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="favicon-generator" />
    </ToolPage>
  );
}
