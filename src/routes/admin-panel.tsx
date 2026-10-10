import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIAS, type Categoria } from "@/data/journal";
import { useCreatorMode } from "@/lib/admin";

export const Route = createFileRoute("/admin-panel")({
  head: () => ({ meta: [{ title: "Panel de Escritura — De Fragmentada a Soberana" }, { name: "robots", content: "noindex, nofollow" }, { name: "description", content: "Espacio privado de escritura." }, { property: "og:title", content: "Panel de Escritura" }, { property: "og:description", content: "Espacio privado de escritura." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: AdminPanel,
});

type Mensaje = { id: string; created_at: string; name: string; email: string | null; message: string; public_response: string };

function AdminPanel() {
  const creator = useCreatorMode();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle().then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  if (!creator) return <main className="mx-auto max-w-xl px-6 py-24 text-center font-serif text-2xl italic">Página no encontrada.</main>;
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="eyebrow">Software privado de la autora</p>
      <h1 className="mt-4 font-serif text-5xl italic">Panel de Escritura</h1>
      <span className="kintsugi-rule mt-6 block" />
      {!session ? <Acceso /> : isAdmin === null ? <p className="mt-10 text-sm text-muted-foreground">Verificando acceso…</p> : !isAdmin ? (
        <div className="mt-10 space-y-4 text-sm"><p>Esta cuenta no tiene permiso de autora.</p><button className="underline" onClick={() => supabase.auth.signOut()}>Cerrar sesión</button></div>
      ) : (
        <><Escritura /><Buzon /><button className="mt-12 text-xs underline" onClick={() => supabase.auth.signOut()}>Cerrar sesión</button></>
      )}
    </main>
  );
}

function Acceso() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  async function go(e: FormEvent, nueva: boolean) {
    e.preventDefault(); setMsg("");
    const { error } = nueva
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin-panel?admin=true` } })
      : await supabase.auth.signInWithPassword({ email, password });
    setMsg(error ? error.message : nueva ? "Revisa tu correo para confirmar la cuenta." : "");
  }
  return (
    <form className="mt-10 space-y-6" onSubmit={(e) => go(e, false)}>
      <input className="editorial-input" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      <input className="editorial-input" type="password" required minLength={8} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="kintsugi-submit">Entrar</button>
        <button type="button" className="text-xs underline" onClick={(e) => go(e, true)}>Crear mi cuenta de autora</button>
      </div>
      {msg && <p role="status" className="text-sm text-muted-foreground">{msg}</p>}
    </form>
  );
}

function Escritura() {
  const qc = useQueryClient();
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("Mentalidad y Espiritualidad");
  const [contenido, setContenido] = useState("");
  const [guion, setGuion] = useState("");
  const [estado, setEstado] = useState("");
  async function publicar(e: FormEvent) {
    e.preventDefault(); setEstado("Publicando…");
    const { data, error } = await supabase.from("journal_posts").insert({ titulo: titulo.trim(), categoria, contenido: contenido.trim() }).select("id").single();
    if (error || !data) { setEstado("No se pudo publicar. Intenta de nuevo."); return; }
    if (guion.trim()) await supabase.from("journal_scripts").insert({ post_id: data.id, guion: guion.trim() });
    await qc.invalidateQueries({ queryKey: ["published-posts"] });
    setTitulo(""); setContenido(""); setGuion(""); setEstado("Publicado. Ya está al principio del diario.");
  }
  return (
    <form className="mt-10 space-y-7" onSubmit={publicar}>
      <div><label className="text-xs text-muted-foreground" htmlFor="t">Título de la entrada</label><input id="t" className="editorial-input" required maxLength={200} value={titulo} onChange={(e) => setTitulo(e.target.value)} /></div>
      <div><label className="text-xs text-muted-foreground" htmlFor="c">Pilar</label>
        <select id="c" className="editorial-input" value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria)}>{CATEGORIAS.map((c) => <option key={c.id}>{c.id}</option>)}</select></div>
      <div><label className="text-xs text-muted-foreground" htmlFor="r">Reflexión del diario</label><textarea id="r" className="editorial-input min-h-64 font-serif text-lg leading-8" required maxLength={20000} value={contenido} onChange={(e) => setContenido(e.target.value)} /></div>
      <div><label className="text-xs text-muted-foreground" htmlFor="g">Guion de TikTok (privado)</label><textarea id="g" className="editorial-input min-h-40" maxLength={20000} value={guion} onChange={(e) => setGuion(e.target.value)} /></div>
      <button type="submit" className="kintsugi-submit">Publicar</button>
      {estado && <p role="status" className="text-sm text-muted-foreground">{estado}</p>}
    </form>
  );
}

function Buzon() {
  const [items, setItems] = useState<Mensaje[]>([]);
  useEffect(() => { supabase.from("community_messages").select("id, created_at, name, email, message, public_response").order("created_at", { ascending: false }).limit(100).then(({ data }) => setItems((data ?? []) as Mensaje[])); }, []);
  return (
    <section className="mt-16">
      <h2 className="font-serif text-3xl italic">Buzón de Soberanía</h2>
      {items.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">Aún no hay mensajes.</p> : (
        <ul className="mt-6 space-y-6">{items.map((m) => (
          <li key={m.id} className="editorial-card rounded-lg p-6 text-sm">
            <p className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString("es-CL")} · {m.name} · {m.email} · Respuesta pública: {m.public_response}</p>
            <p className="mt-3 whitespace-pre-line leading-7">{m.message}</p>
            {m.email && <a className="mt-3 inline-block text-xs underline" href={`mailto:${m.email}`}>Responder</a>}
          </li>))}</ul>)}
    </section>
  );
}
