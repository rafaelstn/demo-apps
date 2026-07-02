export function PhoneFrame({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <>
      {/* Mobile: o app ocupa a tela inteira abaixo da barra de navegação (top-11) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 top-11 z-10 bg-white">{children}</div>

      {/* Desktop: o app roda dentro de uma moldura de celular */}
      <div className="hidden md:grid place-items-center py-6">
        <div className="relative" style={{ filter: `drop-shadow(0 30px 70px ${accent}40)` }}>
          <div className="relative h-[720px] w-[356px] rounded-[3rem] bg-black p-3 ring-1 ring-white/15">
            <div className="absolute left-1/2 top-3 z-20 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />
            <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-white">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
