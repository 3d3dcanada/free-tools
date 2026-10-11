import guide from "../../seo/content/social-image-maker.en";
import ToolPage from "../ToolPage";
import PageStudio from "../design-studio/PageStudio";
import { toolMeta } from "../catalog";
import { moduleLinks } from "../../shared/route-links";
import deckStyles from "../deck-studio/deck.css?url";
import pageStyles from "../design-studio/page.css?url";
export const links = () => [...moduleLinks(), { rel: "stylesheet", href: deckStyles }, { rel: "stylesheet", href: pageStyles }];
export const meta = () => toolMeta("social-image-maker");
export default function Route() {
  return (
    <ToolPage guide={guide} wide>
      <PageStudio studio="social" />
    </ToolPage>
  );
}
