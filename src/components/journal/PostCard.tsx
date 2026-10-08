import { colorDe, formatFecha, type Post } from "@/data/journal";
import { useCreatorMode } from "@/lib/admin";
import { TikTokButton } from "./TikTokButton";

export function PostCard({ post, onOpen, index }: { post: Post; onOpen: () => void; index: number }) {
  const creator = useCreatorMode();
  return (
    <article
      onClick={onOpen}
      style={{ animationDelay: `${index * 70}ms` }}
      className={`card-enter group flex ${post.esFragmentoLibro ? "book-excerpt" : "glass"} cursor-pointer flex-col rounded-2xl p-6 transition hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between gap-2">
        {post.esFragmentoLibro ? (
          <span className="rounded-full border border-accent/50 px-3 py-1 font-serif text-xs italic text-accent">Fragmento del Libro</span>
        ) : (
          <span className={`${colorDe(post.categoria)} rounded-full px-3 py-1 text-xs font-medium`}>{post.categoria}</span>
        )}
        <time className="text-xs capitalize text-muted-foreground">{formatFecha(post.fecha)}</time>
      </div>
      <h3 className="mt-4 font-serif text-2xl italic leading-snug group-hover:text-accent">{post.titulo}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">{post.contenido}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="text-xs text-muted-foreground">Leer entrada →</span>
        {creator && <TikTokButton post={post} />}
      </div>
    </article>
  );
}

export function BookBadge() {
  return (
    <p className="mt-5 flex items-center gap-3 font-serif text-sm italic text-accent">
      <span className="h-px flex-1 bg-accent/40" />
      ❦ Extracto del Libro: De Fragmentada a Soberana
      <span className="h-px flex-1 bg-accent/40" />
    </p>
  );
}
