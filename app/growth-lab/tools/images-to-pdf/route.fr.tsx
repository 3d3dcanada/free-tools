import guide from "../../seo/content/images-to-pdf.fr";
import ToolPage from "../ToolPage";
import Editor from "../pdf-toolkit/PdfToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("images-to-pdf", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="images-to-pdf" />
    </ToolPage>
  );
}
