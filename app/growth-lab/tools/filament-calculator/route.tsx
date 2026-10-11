import guide from "../../seo/content/filament-calculator.en";
import ToolPage from "../ToolPage";
import Editor from "../printing-tools/PrintingTools";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("filament-calculator");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="filament-calculator" />
    </ToolPage>
  );
}
