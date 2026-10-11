import { Outlet, useLocation } from "react-router";
import GrowthShell from "../shared/GrowthShell";
import { moduleLinks } from "../shared/route-links";
export const links = () => moduleLinks();
export default function GrowthLayout() {
  return (
    <GrowthShell path={useLocation().pathname}>
      <Outlet />
    </GrowthShell>
  );
}
