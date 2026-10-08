import { entradasDiario, formatFecha, ultimasMetricas } from "@/data/journal";

export function SovereigntyDashboard() {
  const m = ultimasMetricas();
  const ultimaFecha = entradasDiario()[0]?.fecha;
  return (
    <section className="mt-12 border-y py-6 md:py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-2xl italic">Centro de Soberanía</h2>
        {ultimaFecha && <p className="text-xs text-muted-foreground">Actualizado: <span className="capitalize">{formatFecha(ultimaFecha)}</span></p>}
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Soberanía Financiera</h3>
          <p className="mt-2 font-serif text-3xl leading-tight">{m.trading ?? "—"}</p>
        </div>
        <div className="border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Soberanía del Cuerpo</h3>
          <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
            <div><dd className="font-serif text-3xl leading-tight">{m.rachaGym ?? "—"} días</dd><dt className="text-xs text-muted-foreground">de racha</dt></div>
            <div><dd className="font-serif text-3xl leading-tight">{m.grasa ?? "—"}</dd><dt className="text-xs text-muted-foreground">grasa actual</dt></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
