import type { StudioId } from "../model";
import type { Template } from "./kit";
import { FLYERS } from "./flyer";
import { POSTERS } from "./poster";
import { SOCIAL } from "./social";
import { CARDS } from "./card";

export type { Template } from "./kit";

export const TEMPLATES: Record<StudioId, Template[]> = {
  flyer: FLYERS,
  poster: POSTERS,
  social: SOCIAL,
  card: CARDS,
};
