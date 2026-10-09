import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { JOURNAL } from '@/data/journal';

export const FAVORITES_KEY = 'soberana:favorites';
export function parseFavorites(value: string | null): string[] {
  try {
    const parsed: unknown = JSON.parse(value ?? '[]');
    return Array.isArray(parsed) ? [...new Set(parsed.filter((id): id is string => typeof id === 'string' && JOURNAL.some(p => p.id === id)))] : [];
  } catch { return []; }
}
export function toggleFavorite(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
}
const FavoritesContext = createContext<{ ids: string[]; toggle: (id: string) => void; error: string }>({ ids: [], toggle: () => {}, error: '' });
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const read = () => { try { setIds(parseFavorites(localStorage.getItem(FAVORITES_KEY))); } catch { setError('Tu navegador no permite guardar favoritos.'); } };
    read();
    const sync = (e: StorageEvent) => { if (e.key === FAVORITES_KEY || e.key === null) read(); };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const toggle = (id: string) => {
    setIds(current => {
      const next = toggleFavorite(current, id);
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); setError(''); } catch { setError('No se pudo guardar. Revisa los permisos de tu navegador.'); return current; }
      return next;
    });
  };
  return <FavoritesContext.Provider value={{ ids, toggle, error }}>{children}</FavoritesContext.Provider>;
}
export const useFavorites = () => useContext(FavoritesContext);
