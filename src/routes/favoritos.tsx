import { createFileRoute, Link } from '@tanstack/react-router';
import { Bookmark } from 'lucide-react';
import { entradasDiario, fragmentosLibro } from '@/data/journal';
import { useFavorites } from '@/lib/favorites';
import { pageHead } from '@/lib/community';
import { PostCollection } from '@/components/community/PostCollection';
export const Route = createFileRoute('/favoritos')({ head: () => pageHead('Favoritos', 'Tu colección personal de reflexiones y fragmentos guardados de De Fragmentada a Soberana.'), component: FavoritesPage });
function FavoritesPage() {
  const { ids } = useFavorites();
  const diary = entradasDiario().filter(post => ids.includes(post.id));
  const book = fragmentosLibro().filter(post => ids.includes(post.id));
  return <main className="mx-auto max-w-5xl px-6 py-14"><header className="mb-12 text-center"><p className="eyebrow">Las palabras que se quedan</p><h1 className="mt-4 font-serif text-5xl italic md:text-6xl">Favoritos</h1></header>{ids.length === 0 ? <div className="py-16 text-center"><Bookmark className="mx-auto size-8 text-muted-foreground" strokeWidth={1}/><p className="mt-5 font-serif text-2xl italic">Aún no hay páginas guardadas.</p><Link to="/" className="mt-6 inline-block border-b pb-2 text-sm">Volver al diario →</Link></div> : <>{diary.length > 0 && <section><h2 className="mb-6 font-serif text-3xl italic">Del diario</h2><PostCollection posts={diary}/></section>}{book.length > 0 && <section className="mt-12 border-t pt-10"><h2 className="mb-6 font-serif text-3xl italic">Del libro</h2><PostCollection posts={book}/></section>}</>}</main>;
}
