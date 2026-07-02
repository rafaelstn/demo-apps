"use client";
import { useCallback, useState } from "react";
import type { TelaId } from "@/lib/catalog/apps";
import { Modal } from "@/components/site/Modal";

export type ScreenApi = {
  tela: TelaId;
  go: (t: TelaId) => void;
  openModal: (title: string, body: string) => void;
};

export function AppRuntime({
  telaInicial,
  render,
}: {
  telaInicial: TelaId;
  render: (api: ScreenApi) => React.ReactNode;
}) {
  const [tela, setTela] = useState<TelaId>(telaInicial);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);

  const go = useCallback((t: TelaId) => setTela(t), []);
  const openModal = useCallback((title: string, body: string) => setModal({ title, body }), []);

  return (
    <div className="relative h-full w-full overflow-y-auto bg-white text-ink">
      {render({ tela, go, openModal })}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title ?? ""}>
        {modal?.body}
      </Modal>
    </div>
  );
}
