import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CATEGORIES, ENTRIES, toTikTokScript, type CategoryId, type Entry } from "@/lib/entries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "De Fragmentada a Soberana — Diario de Vida" },
      { name: "description", content: "Diario de transformación: alimentación, deporte, trading, maternidad, mujer y soberanía digital." },
      { property: "og:title", content: "De Fragmentada a Soberana — Diario de Vida" },
      { property: "og:description", content: "Un diario íntimo de transformación femenina en seis pilares de crecimiento." },
    ],
  }),
  component: Index,
});

function useToday() {
  const [d, setD] = useState("");
  useEffect(() => {
    setD(new Intl.DateTimeFormat("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date()));
  }, []);
  return d;
}

function Index() {
  const [active, setActive] = useState<CategoryId | "todas">("todas");
  const list = active === "todas" ? ENTRIES : ENTRIES.filter((e) => e.category === active);
  return (
    <main className="mx-auto max-w-4xl px-5 py-14">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Diario de vida · Blog de transformación</p>
        <h1 className="mt-4 font-serif text-5xl italic leading-tight md:text-7xl">De Fragmentada a Soberana</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">Seis pilares, una mujer reconstruyéndose página a página.</p>
      </header>

      <nav className="glass sticky top-4 z-10 mt-12 flex gap-1 overflow-x-auto rounded-full p-1.5">
        {[{ id: "todas" as const, label: "Todas" }, ...CATEGORIES].map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${active === c.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"}`}
          >
            {c.label}
          </button>
        ))}
      </nav>
      {active !== "todas" && (
        <p className="mt-4 text-center font-serif text-lg italic text-muted-foreground">{CATEGORIES.find((c) => c.id === active)?.desc}</p>
      )}

      <section className="mt-10 space-y-10">
        {list.map((e) => <EntryCard key={e.id} entry={e} />)}
      </section>

      <footer className="mt-20 text-center font-serif italic text-muted-foreground">Escrito con el alma · Abar Digital</footer>
    </main>
  );
}

function EntryCard({ entry }: { entry: Entry }) {
  const today = useToday();
  const cat = CATEGORIES.find((c) => c.id === entry.category)!;
  const [script, setScript] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    const s = toTikTokScript(entry, cat.label);
    setScript(s);
    try {
      await navigator.clipboard.writeText(s);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  };

  return (
    <article className="glass animate-in fade-in slide-in-from-bottom-2 rounded-2xl p-7 duration-500 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={`${cat.color} rounded-full px-3 py-1 text-xs font-medium text-foreground`}>{cat.label}</span>
        <time className="text-xs capitalize text-muted-foreground">{today}</time>
      </div>
      <h2 className="mt-5 font-serif text-3xl italic md:text-4xl">{entry.title}</h2>
      <p className="diary-lines mt-5 text-[15px] leading-8">{entry.body}</p>

      <button onClick={handle} className="mt-7 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-accent">
        {copied ? "¡Guion copiado! ✓" : "Copiar Guion para TikTok"}
      </button>

      {script && (
        <pre className="mt-5 whitespace-pre-wrap rounded-xl border bg-muted/60 p-5 font-sans text-sm leading-relaxed">{script}</pre>
      )}

      <div className="mt-7 rounded-xl border border-dashed p-5 text-center text-xs text-muted-foreground">
        {entry.tiktokUrl ? (
          <iframe src={entry.tiktokUrl} className="mx-auto h-[575px] w-full max-w-[325px]" allowFullScreen title="TikTok" />
        ) : (
          "Espacio reservado para tu video de TikTok"
        )}
      </div>
    </article>
  );
}
