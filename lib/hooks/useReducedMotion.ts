"use client";
import { useEffect, useState } from "react";

/**
 * Retorna true quando o usuário pede menos movimento
 * (prefers-reduced-motion: reduce). Comeca em false para o
 * markup do export estático e corrige no cliente.
 */
export function useReducedMotion(): boolean {
  const [reduzido, setReduzido] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const atualizar = () => setReduzido(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);

  return reduzido;
}
