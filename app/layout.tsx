import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "DamaTech, crie o seu aplicativo",
  description: "Aplicativos nativos sob medida para o seu negócio. Escolha um modelo e veja rodando de verdade.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
