import guide from "../../seo/content/pdf-to-jpg.fr";
import ToolPage from "../ToolPage";
import Editor from "../pdf-toolkit/PdfToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("pdf-to-jpg", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="pdf-to-image" preset={{ format: "jpeg" }} />
    </ToolPage>
  );
}
