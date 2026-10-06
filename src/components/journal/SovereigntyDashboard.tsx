import { JOURNAL, META_LIBRO, formatFecha, type MetricasRef } from "@/data/journal";

// Toma el valor más reciente disponible de cada métrica (JOURNAL está ordenado del más nuevo al más antiguo)
function ultimasMetricas(): MetricasRef {
  const out: MetricasRef = {};
  for (const p of [...JOURNAL].reverse()) Object.assign(out, p.metricasRef);
  return out;
}

export function SovereigntyDashboard() {
  const m = ultimasMetricas();
  const ultimo = JOURNAL[0];
  const pctLibro = Math.min(100, Math.round(((m.capsLibro ?? 0) / META_LIBRO) * 100));
  const items = [
    { label: "Racha gym", value: `${m.rachaGym ?? 0}`, unit: "días", pct: Math.min(100, ((m.rachaGym ?? 0) / 30) * 100) },
    { label: "Libro", value: `${m.capsLibro ?? 0}/${META_LIBRO}`, unit: "capítulos", pct: pctLibro },
    { label: "Grasa corporal", value: m.grasa ?? "—", unit: "actual", pct: 60 },
    { label: "Trading", value: m.trading ?? "—", unit: "estado", pct: 70 },
  ];
  return (
    <section className="glass neon-edge mt-12 rounded-2xl p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-2xl italic">Centro de Soberanía</h2>
        <p className="text-xs text-muted-foreground">Actualizado: <span className="capitalize">{formatFecha(ultimo.fecha)}</span></p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="rounded-xl border bg-background/50 p-4">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{it.label}</p>
            <p className="mt-2 font-serif text-2xl leading-tight">{it.value}</p>
            <p className="text-xs text-muted-foreground">{it.unit}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
              <div className="meter h-full rounded-full bg-accent" style={{ width: `${it.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
