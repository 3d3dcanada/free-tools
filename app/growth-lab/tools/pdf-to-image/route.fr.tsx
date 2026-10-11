import guide from "../../seo/content/pdf-to-image.fr";
import ToolPage from "../ToolPage";
import Editor from "../pdf-toolkit/PdfToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("pdf-to-image", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="pdf-to-image" />
    </ToolPage>
  );
}
