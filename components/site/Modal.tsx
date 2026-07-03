"use client";
import { useEffect } from "react";

/**
 * Modal do simulador. Dois modos:
 * - Informativo (default): só o botão "Entendi". Uso legado, não muda.
 * - Confirmação: quando recebe onConfirm, renderiza cancelar + confirmar.
 *   danger deixa o confirmar em tom de alerta (ação destrutiva).
 * Fecha por Esc, backdrop e cancelar em ambos os modos.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  onConfirm,
  confirmLabel,
  cancelLabel,
  danger,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
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

  const confirmavel = onConfirm !== undefined;

  return (
    <div className="absolute inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-ink-soft ring-1 ring-white/10 p-6">
        <h3 className="font-display text-lg text-paper">{title}</h3>
        <div className="mt-2 text-sm text-paper/70">{children}</div>
        {confirmavel ? (
          <div className="mt-5 flex gap-2.5">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/15 py-2.5 text-sm font-medium text-paper/80 transition hover:bg-white/5"
            >
              {cancelLabel ?? "Cancelar"}
            </button>
            <button
              onClick={onConfirm}
              className={
                danger
                  ? "flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                  : "flex-1 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white transition hover:bg-accent-deep"
              }
            >
              {confirmLabel ?? "Confirmar"}
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="mt-5 w-full rounded-xl bg-accent py-2.5 text-sm font-medium text-white transition hover:bg-accent-deep"
          >
            Entendi
          </button>
        )}
      </div>
    </div>
  );
}
