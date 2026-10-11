import { useEffect, useRef, type ReactNode } from "react";

/** Native modal focus, Escape and focus return, shared by tool drawers and editors. */
export default function Dialog({ open, title, className, onClose, children }: {
  open: boolean;
  title: string;
  className: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    if (!open) { dialog.close(); return; }
    const trigger = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      // React may remove a portalled dialog before this cleanup runs.
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`gl-dialog ${className}`}
      aria-label={title}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      {children}
    </dialog>
  );
}
