import { colorDe, formatFecha, type Post } from "@/data/journal";
import { TikTokButton } from "./TikTokButton";

export function PostCard({ post, onOpen, index }: { post: Post; onOpen: () => void; index: number }) {
  return (
    <article
      onClick={onOpen}
      style={{ animationDelay: `${index * 70}ms` }}
      className="card-enter glass group flex cursor-pointer flex-col rounded-2xl p-6 transition hover:-translate-y-1"
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`${colorDe(post.categoria)} rounded-full px-3 py-1 text-xs font-medium`}>{post.categoria}</span>
        <time className="text-xs capitalize text-muted-foreground">{formatFecha(post.fecha)}</time>
      </div>
      <h3 className="mt-4 font-serif text-2xl italic leading-snug group-hover:text-accent">{post.titulo}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">{post.contenido}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="text-xs text-muted-foreground">Leer entrada →</span>
        <TikTokButton post={post} />
      </div>
    </article>
  );
}
