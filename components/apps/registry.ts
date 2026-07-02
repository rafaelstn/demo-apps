import type { JSX } from "react";
import { DeliveryApp } from "./delivery/DeliveryApp";

export type AppComponent = (props: { accent: string }) => JSX.Element;

export const APP_REGISTRY: Record<string, AppComponent> = {
  delivery: DeliveryApp,
};
