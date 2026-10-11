import guide from "../../seo/content/qr-code.fr";
import ToolPage from "../ToolPage";
import Editor from "../qr-code/QrCode";
import { toolMeta } from "../catalog";
export { moduleLinks as links } from "../../shared/route-links";
export const meta = () => toolMeta("qr-code", "fr");
export default function Route() {
  return (
    <ToolPage guide={guide}>
      <Editor />
    </ToolPage>
  );
}
