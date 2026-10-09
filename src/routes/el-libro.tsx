import { createFileRoute } from '@tanstack/react-router';
import { fragmentosLibro } from '@/data/journal';
import { pageHead } from '@/lib/community';
import { PostCollection } from '@/components/community/PostCollection';
export const Route = createFileRoute('/el-libro')({ head: () => pageHead('El Libro', 'Fragmentos de De Fragmentada a Soberana, el libro de María Barros Coronado, en un espacio independiente del diario.'), component: BookPage });
function BookPage() {
  return <main className="mx-auto max-w-5xl px-6 py-14"><header className="mb-12 text-center"><p className="eyebrow">Un libro en construcción</p><h1 className="mt-4 font-serif text-5xl italic md:text-6xl">El Libro</h1><p className="mt-4 font-serif text-2xl text-muted-foreground">De Fragmentada a Soberana</p><span className="mx-auto mt-8 block h-px w-16 bg-border"/></header><PostCollection posts={fragmentosLibro()}/></main>;
}
