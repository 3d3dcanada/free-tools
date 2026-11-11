/**
 * The academy's French, registered for useAcademyT() and frenchReference() (2026-11-11). Import this
 * second, after shared/french, in the academy's French routes, and nowhere else.
 */
import { addAcademyFrench } from "./text";
import { academyUiFr } from "./ui.fr";
import * as reference from "./reference.fr";
addAcademyFrench(academyUiFr, reference);
