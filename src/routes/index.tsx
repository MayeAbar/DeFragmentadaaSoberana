import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIAS, entradasDiario, type Categoria, type Post } from "@/data/journal";
import { Button } from "@/components/ui/button";
import { SovereigntyDashboard } from "@/components/journal/SovereigntyDashboard";
import { PostCard } from "@/components/journal/PostCard";
import { PostReader } from "@/components/journal/PostReader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "De Fragmentada a Soberana — Diario de Vida" },
      { name: "description", content: "El diario de Patricia Abar: soberanía financiera, cuerpo, maternidad, mujer, mentalidad y espiritualidad." },
      { property: "og:title", content: "De Fragmentada a Soberana — Diario de Vida" },
      { property: "og:description", content: "Reflexiones de Patricia Abar en cinco pilares de transformación, con el libro en un espacio independiente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Pestana = Categoria | "Todas";

function Index() {
  const [active, setActive] = useState<Pestana>("Todas");
  const [open, setOpen] = useState<Post | null>(null);
  const list = entradasDiario(active);

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">El diario de Patricia Abar</p>
        <h1 className="mt-5 font-serif text-5xl italic leading-tight md:text-7xl">De Fragmentada<br className="hidden sm:block"/> a Soberana</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">Cinco pilares, una mujer reconstruyéndose página a página.</p>
        <span className="mx-auto mt-8 block h-px w-16 bg-border"/>
      </header>

      <SovereigntyDashboard />

      <nav aria-label="Pilares del diario" className="mt-12 flex flex-wrap justify-center gap-x-2 gap-y-2 border-y border-border py-4">
        {(["Todas", ...CATEGORIAS.map((c) => c.id)] as const).map((c) => (
           <Button
            key={c}
             variant="ghost"
             aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`max-w-full whitespace-normal rounded-none px-3 py-2 text-xs transition-all duration-300 ${active === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"}`}
          >
            {c}
           </Button>
        ))}
        <Button asChild variant="ghost" className="rounded-none border border-border font-serif italic"><Link to="/el-libro">El Libro</Link></Button>
      </nav>
      <p key={active} className="card-enter mt-4 min-h-7 text-center font-serif text-lg italic text-muted-foreground">
        {CATEGORIAS.find((c) => c.id === active)?.desc ?? "Todas las páginas de mi diario"}
      </p>

      <section key={`grid-${active}`} className="mt-8 grid gap-6 md:grid-cols-2">
        {list.map((p, i) => <PostCard key={p.id} post={p} index={i} onOpen={() => setOpen(p)} />)}
      </section>

      {open && <PostReader post={open} onClose={() => setOpen(null)} />}
    </main>
  );
}
