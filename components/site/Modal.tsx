"use client";
import { useEffect } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-ink-soft ring-1 ring-white/10 p-6">
        <h3 className="font-display text-lg text-paper">{title}</h3>
        <div className="mt-2 text-sm text-paper/70">{children}</div>
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-accent py-2.5 text-sm font-medium text-white transition hover:bg-accent-deep"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
