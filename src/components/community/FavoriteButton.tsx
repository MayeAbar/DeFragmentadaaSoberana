import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/lib/favorites';
export function FavoriteButton({ id }: { id: string }) {
  const { ids, toggle, error } = useFavorites();
  const saved = ids.includes(id);
  return <div className="flex flex-col items-end"><Button type="button" variant="ghost" size="icon" aria-label={saved ? 'Quitar de Favoritos' : 'Guardar en Favoritos'} title={saved ? 'Quitar de Favoritos' : 'Guardar en Favoritos'} aria-pressed={saved} className="text-foreground hover:bg-secondary/40" onClick={e => { e.stopPropagation(); toggle(id); }}><Bookmark strokeWidth={1.3} fill={saved ? 'currentColor' : 'none'} /></Button>{error && <span role="alert" className="max-w-48 text-xs text-muted-foreground">{error}</span>}</div>;
}
