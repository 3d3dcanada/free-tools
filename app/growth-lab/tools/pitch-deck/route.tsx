import guide from "../../seo/content/pitch-deck.en";
import ToolPage from "../ToolPage";
import DeckStudio from "../deck-studio/DeckStudio";
import { toolMeta } from "../catalog";
import { moduleLinks } from "../../shared/route-links";
import deckStyles from "../deck-studio/deck.css?url";
export const links = () => [...moduleLinks(), { rel: "stylesheet", href: deckStyles }];
export const meta = () => toolMeta("pitch-deck");
export default function Route() {
  return (
    <ToolPage guide={guide} wide>
      <DeckStudio />
    </ToolPage>
  );
}
