/**
 * Deck Studio's French, registered for dt() and frContent() (2026-11-11). Import this second, after
 * shared/french, in every French route that draws a studio, and nowhere else.
 */
import { addDeckFrench } from "./i18n";
import { DECK_UI_FR } from "./ui.fr";
import { CONTENT_FR } from "./content-fr";
addDeckFrench(DECK_UI_FR, CONTENT_FR);
