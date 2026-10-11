import guide from "../../seo/content/split-pdf.fr";
import ToolPage from "../ToolPage";
import Editor from "../pdf-toolkit/PdfToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("split-pdf", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="split-pdf" />
    </ToolPage>
  );
}
