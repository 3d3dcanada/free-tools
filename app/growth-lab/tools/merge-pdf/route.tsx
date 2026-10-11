import guide from "../../seo/content/merge-pdf.en";
import ToolPage from "../ToolPage";
import Editor from "../pdf-toolkit/PdfToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("merge-pdf");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="merge-pdf" />
    </ToolPage>
  );
}
