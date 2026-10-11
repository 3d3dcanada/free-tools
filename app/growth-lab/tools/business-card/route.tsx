import guide from "../../seo/content/business-card.en";
import ToolPage from "../ToolPage";
import PageStudio from "../design-studio/PageStudio";
import { toolMeta } from "../catalog";
import { moduleLinks } from "../../shared/route-links";
import deckStyles from "../deck-studio/deck.css?url";
import pageStyles from "../design-studio/page.css?url";
export const links = () => [...moduleLinks(), { rel: "stylesheet", href: deckStyles }, { rel: "stylesheet", href: pageStyles }];
export const meta = () => toolMeta("business-card");
export default function Route() {
  return (
    <ToolPage guide={guide} wide>
      <PageStudio studio="card" />
    </ToolPage>
  );
}
