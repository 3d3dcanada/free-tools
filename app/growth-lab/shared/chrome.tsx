import { createContext, useContext, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * 2026-10-11: the tool page owns one bar. Editors put their undo/redo, their
 * primary export and their secondary actions (projects, brand) into it through
 * these slots instead of stacking their own rows above the work.
 * Outside a ToolPage (no provider) a slot renders its children where they are.
 */
export type ToolSlots = { history: HTMLElement | null; primary: HTMLElement | null; menu: HTMLElement | null };
export const ToolChrome = createContext<ToolSlots | null>(null);

export function ToolSlot({ name, children }: { name: keyof ToolSlots; children: ReactNode }) {
  const slots = useContext(ToolChrome);
  if (!slots) return <>{children}</>;
  const target = slots[name];
  return target ? createPortal(children, target) : null;
}
