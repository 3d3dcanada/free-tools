import guide from "../../seo/content/quote-generator.fr";
import ToolPage from "../ToolPage";
import Editor from "../invoice-generator/InvoiceGenerator";
import { toolMeta } from "../catalog";
export { moduleLinks as links } from "../../shared/route-links";
export const meta = () => toolMeta("quote-generator", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor initialKind="quote" draftKey="3d3d-public-billing-v1:quote" />
    </ToolPage>
  );
}
