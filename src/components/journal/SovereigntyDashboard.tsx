import { useEffect, useState } from "react";
import { SOBERANIA, hoySantiago, rachaEditorial, type Post } from "@/data/journal";

export function SovereigntyDashboard({ publicados }: { publicados: Post[] }) {
  const [hoy, setHoy] = useState<string | null>(null);
  useEffect(() => setHoy(hoySantiago()), []);
  const racha = hoy ? rachaEditorial(publicados.map((p) => p.fecha), hoy) : null;
  const estado = racha?.estado === "respiro" ? "Respiro Consciente" : racha?.estado === "activa" ? "Racha activa" : "Comenzando de nuevo";
  return (
    <section className="mt-12 border-y py-6 md:py-8">
      <h2 className="font-serif text-2xl italic">Centro de Soberanía</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Soberanía del Cuerpo</h3>
          <p className="mt-2 font-serif text-3xl leading-tight">{SOBERANIA.cuerpo.valor} días</p>
          <p className="text-xs text-muted-foreground">{SOBERANIA.cuerpo.etiqueta} · entrenamiento y alimentación en presencia</p>
        </div>
        <div className="border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Soberanía Financiera</h3>
          <p className="mt-2 font-serif text-2xl leading-tight">{SOBERANIA.financiera.estado}</p>
          <p className="text-xs text-muted-foreground">{SOBERANIA.financiera.detalle}</p>
        </div>
        <div className="border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Soberanía Mental</h3>
          <p className={`mt-2 font-serif text-3xl leading-tight transition-opacity ${racha?.estado === "respiro" ? "opacity-60" : ""}`}>{racha ? racha.dias : "—"} días</p>
          <p className="text-xs text-muted-foreground">Racha Editorial · <span className={racha?.estado === "respiro" ? "italic text-accent" : ""}>{estado}</span></p>
        </div>
      </div>
    </section>
  );
}
