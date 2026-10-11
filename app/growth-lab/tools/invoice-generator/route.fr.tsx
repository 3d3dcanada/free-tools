import guide from "../../seo/content/invoice-generator.fr";
import ToolPage from "../ToolPage";
import Editor from "../invoice-generator/InvoiceGenerator";
import { toolMeta } from "../catalog";
export { moduleLinks as links } from "../../shared/route-links";
export const meta = () => toolMeta("invoice-generator", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor />
    </ToolPage>
  );
}
