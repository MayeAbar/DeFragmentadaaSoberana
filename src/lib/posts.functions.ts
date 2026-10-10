import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import type { Categoria, Post } from "@/data/journal";

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async (): Promise<Post[]> => {
  const { createClient } = await import("@supabase/supabase-js");
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  const sb = createClient(process.env.SUPABASE_URL!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
  const { data, error } = await sb.from("journal_posts").select("id, fecha, titulo, categoria, contenido").order("fecha", { ascending: false }).order("created_at", { ascending: false }).limit(500);
  if (error) { console.error(error); return []; }
  return (data ?? []).map((r) => ({ id: r.id, fecha: r.fecha, titulo: r.titulo, categoria: r.categoria as Categoria, contenido: r.contenido, esFragmentoLibro: false }));
});

export const publishedPostsQuery = queryOptions({ queryKey: ["published-posts"], queryFn: () => listPublishedPosts() });
