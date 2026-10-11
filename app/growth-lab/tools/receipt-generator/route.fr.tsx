import guide from "../../seo/content/receipt-generator.fr";
import ToolPage from "../ToolPage";
import Editor from "../invoice-generator/InvoiceGenerator";
import { toolMeta } from "../catalog";
export { moduleLinks as links } from "../../shared/route-links";
export const meta = () => toolMeta("receipt-generator", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor initialKind="receipt" draftKey="3d3d-public-billing-v1:receipt" />
    </ToolPage>
  );
}
