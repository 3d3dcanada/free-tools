import guide from "../../seo/content/jpg-to-pdf.fr";
import ToolPage from "../ToolPage";
import Editor from "../pdf-toolkit/PdfToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("jpg-to-pdf", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="images-to-pdf" preset={{ size: "letter" }} />
    </ToolPage>
  );
}
