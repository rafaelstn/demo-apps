"use client";
import { useCallback, useState } from "react";
import type { TelaId } from "@/lib/catalog/apps";
import { Modal } from "@/components/site/Modal";

export type ConfirmOpts = {
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};

export type ScreenApi = {
  tela: TelaId;
  go: (t: TelaId) => void;
  openModal: (title: string, body: string) => void;
  openConfirm: (title: string, body: string, onConfirm: () => void, opts?: ConfirmOpts) => void;
};

type ModalState = {
  title: string;
  body: string;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};

export function AppRuntime({
  telaInicial,
  render,
}: {
  telaInicial: TelaId;
  render: (api: ScreenApi) => React.ReactNode;
}) {
  const [tela, setTela] = useState<TelaId>(telaInicial);
  const [modal, setModal] = useState<ModalState | null>(null);

  const go = useCallback((t: TelaId) => setTela(t), []);
  const openModal = useCallback((title: string, body: string) => setModal({ title, body }), []);
  const openConfirm = useCallback(
    (title: string, body: string, onConfirm: () => void, opts?: ConfirmOpts) =>
      setModal({ title, body, onConfirm, ...opts }),
    [],
  );

  const fechar = useCallback(() => setModal(null), []);
  const confirmar = useCallback(() => {
    const cb = modal?.onConfirm;
    // Fecha primeiro; se o callback abrir outro modal (ex.: feedback de sucesso),
    // ele é o último setModal do handler e prevalece.
    setModal(null);
    cb?.();
  }, [modal]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-ink">
      {render({ tela, go, openModal, openConfirm })}
      <Modal
        open={!!modal}
        onClose={fechar}
        title={modal?.title ?? ""}
        onConfirm={modal?.onConfirm ? confirmar : undefined}
        confirmLabel={modal?.confirmLabel}
        cancelLabel={modal?.cancelLabel}
        danger={modal?.danger}
      >
        {modal?.body}
      </Modal>
    </div>
  );
}
