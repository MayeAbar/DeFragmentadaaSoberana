import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIAS, JOURNAL, type Categoria, type Post } from "@/data/journal";
import { SovereigntyDashboard } from "@/components/journal/SovereigntyDashboard";
import { PostCard } from "@/components/journal/PostCard";
import { PostReader } from "@/components/journal/PostReader";

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

function Index() {
  const [active, setActive] = useState<Categoria | "Todas">("Todas");
  const [open, setOpen] = useState<Post | null>(null);
  const list = active === "Todas" ? JOURNAL : JOURNAL.filter((p) => p.categoria === active);

  return (
    <main className="mx-auto max-w-5xl px-5 py-14">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Diario de vida · Blog de transformación</p>
        <h1 className="mt-4 font-serif text-5xl italic leading-tight md:text-7xl">De Fragmentada a Soberana</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">Seis pilares, una mujer reconstruyéndose página a página.</p>
      </header>

      <SovereigntyDashboard />

      <nav className="glass sticky top-4 z-10 mt-12 flex gap-1 overflow-x-auto rounded-full p-1.5">
        {(["Todas", ...CATEGORIAS.map((c) => c.id)] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all duration-300 ${active === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </nav>
      <p key={active} className="card-enter mt-4 min-h-7 text-center font-serif text-lg italic text-muted-foreground">
        {CATEGORIAS.find((c) => c.id === active)?.desc ?? "Todas las páginas de mi diario"}
      </p>

      <section key={`grid-${active}`} className="mt-8 grid gap-6 md:grid-cols-2">
        {list.map((p, i) => <PostCard key={p.id} post={p} index={i} onOpen={() => setOpen(p)} />)}
      </section>

      <footer className="mt-20 text-center font-serif italic text-muted-foreground">Escrito con el alma · Abar Digital</footer>
      {open && <PostReader post={open} onClose={() => setOpen(null)} />}
    </main>
  );
}
