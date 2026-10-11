import guide from "../../seo/content/jpg-to-pdf.en";
import ToolPage from "../ToolPage";
import Editor from "../pdf-toolkit/PdfToolkit";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("jpg-to-pdf");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="images-to-pdf" preset={{ size: "letter" }} />
    </ToolPage>
  );
}
