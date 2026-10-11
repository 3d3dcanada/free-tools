import workspaceStyles from "./workspace.css?url";
import { moduleLinks } from "./route-links";
/** the image, PDF and 3D printing workspaces load their stage styles on their own routes only. */
export const workspaceLinks = () => [...moduleLinks(), { rel: "stylesheet", href: workspaceStyles }];
