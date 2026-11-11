/**
 * The design studios' French, and Deck Studio's under it (2026-11-11). Import this second, after
 * shared/french, in every French route that draws a design studio, and nowhere else.
 */
import "../deck-studio/french";
import { addStudioFrench } from "./i18n";
import { CONTENT_FR, UI_FR } from "./content-fr";
addStudioFrench(UI_FR, CONTENT_FR);
