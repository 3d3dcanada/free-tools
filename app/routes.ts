import { index, route, type RouteConfig } from "@react-router/dev/routes";
import { growthRoutes } from "./growth-lab/port/routes";

// The tools and the academy come from app/growth-lab (synced from the 3D3D site). `/` and `/fr`
// show the tools hub, inside the same shell as /tools and /fr/tools.
const [shell] = growthRoutes;

export default [
  {
    ...shell,
    children: [
      index("growth-lab/tools/hub/route.tsx", { id: "home" }),
      route("fr", "growth-lab/tools/hub/route.fr.tsx", { id: "home-fr" }),
      ...(shell.children ?? []),
    ],
  },
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
