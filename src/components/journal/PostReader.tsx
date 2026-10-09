import { useEffect, useState } from "react";
import { colorDe, formatFecha, type Post } from "@/data/journal";
import { useCreatorMode } from "@/lib/admin";
import { TikTokButton } from "./TikTokButton";
import { BookBadge } from "./PostCard";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FavoriteButton } from "@/components/community/FavoriteButton";
import { tiktokEmbedUrl } from "@/lib/community";

export function PostReader({ post, onClose }: { post: Post; onClose: () => void }) {
  const creator = useCreatorMode();
  const [guion, setGuion] = useState<string | null>(null);
  const video = tiktokEmbedUrl(post.tiktokUrl);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-foreground/30 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <article
        onClick={(e) => e.stopPropagation()}
        role="dialog" aria-modal="true" aria-labelledby="reader-title"
        className={`mx-4 my-10 max-w-2xl rounded-lg p-6 sm:mx-auto ${post.esFragmentoLibro ? "book-excerpt bg-background" : "border bg-background"} shadow-2xl animate-in slide-in-from-bottom-4 duration-500 md:p-12`}
      >
        <div className="flex items-center justify-between">
          <span className={`${colorDe(post.categoria)} rounded-full px-3 py-1 text-xs font-medium`}>{post.categoria}</span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar" autoFocus><X strokeWidth={1.3}/></Button>
        </div>
        {post.esFragmentoLibro && <BookBadge />}
        <time className="mt-6 block text-xs capitalize text-muted-foreground">{formatFecha(post.fecha)}</time>
        <h2 id="reader-title" className="mt-2 font-serif text-4xl italic leading-tight md:text-5xl">{post.titulo}</h2>
        <p className="mt-8 whitespace-pre-line text-[17px] leading-8">{post.contenido}</p>
        <div className="mt-5 flex justify-end"><FavoriteButton id={post.id}/></div>
        {video && <div className="mt-8 border-t pt-8"><iframe src={video} className="mx-auto aspect-[9/16] w-full max-w-[325px] rounded-lg" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen loading="lazy" title={`TikTok: ${post.titulo}`} referrerPolicy="strict-origin-when-cross-origin"/><a href={post.tiktokUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-xs underline underline-offset-4">Ver en TikTok</a></div>}
        {creator && (
          <>
            <div className="mt-8"><TikTokButton post={post} onScript={setGuion} /></div>
            {guion && <pre className="mt-5 whitespace-pre-wrap rounded-xl border bg-muted/60 p-5 font-sans text-sm leading-relaxed">{guion}</pre>}
            {!video && <div className="mt-8 rounded-lg border border-dashed p-5 text-center text-xs text-muted-foreground">Espacio reservado para tu video de TikTok</div>}
          </>
        )}
      </article>
    </div>
  );
}
