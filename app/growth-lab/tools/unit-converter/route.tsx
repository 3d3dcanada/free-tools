import guide from "../../seo/content/unit-converter.en";
import ToolPage from "../ToolPage";
import Editor from "../printing-tools/PrintingTools";
import { toolMeta } from "../catalog";
export { workspaceLinks as links } from "../../shared/workspace-links";
export const meta = () => toolMeta("unit-converter");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor mode="unit-converter" />
    </ToolPage>
  );
}
