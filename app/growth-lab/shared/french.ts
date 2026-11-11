/**
 * The French interface, registered for translate() (2026-11-11). Import this first in every
 * French route module (`route.fr.tsx`, the academy's `*.fr.tsx`) and nowhere else, so the
 * dictionary rides in the French pages' chunks and never in the English ones.
 */
import { addFrench } from "./translate";
import { frenchUi } from "./ui.fr";
import { workspaceUi } from "./ui.fr.workspace";
import { completionUi } from "./ui.fr.completion";
import { hubUi } from "./ui.fr.hub";
// 2026-10-09: the image, PDF and 3D workspaces keep their French in their own file.
addFrench({ ...frenchUi, ...workspaceUi, ...completionUi, ...hubUi });
