import guide from "../../seo/content/print-cost-calculator.en";
import ToolPage from "../ToolPage";
import Editor from "../printing-tools/PrintingTools";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("print-cost-calculator");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="print-cost-calculator" />
    </ToolPage>
  );
}
