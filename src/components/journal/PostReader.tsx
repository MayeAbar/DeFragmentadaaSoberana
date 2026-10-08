import { useEffect, useState } from "react";
import { colorDe, formatFecha, type Post } from "@/data/journal";
import { useCreatorMode } from "@/lib/admin";
import { TikTokButton } from "./TikTokButton";
import { BookBadge } from "./PostCard";

export function PostReader({ post, onClose }: { post: Post; onClose: () => void }) {
  const creator = useCreatorMode();
  const [guion, setGuion] = useState<string | null>(null);
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
        className={`mx-auto my-10 max-w-2xl rounded-2xl p-8 ${post.esFragmentoLibro ? "book-excerpt bg-background" : "border bg-background"} shadow-2xl animate-in slide-in-from-bottom-4 duration-500 md:p-12`}
      >
        <div className="flex items-center justify-between">
          <span className={`${colorDe(post.categoria)} rounded-full px-3 py-1 text-xs font-medium`}>{post.categoria}</span>
          <button onClick={onClose} aria-label="Cerrar" className="text-2xl leading-none text-muted-foreground hover:text-foreground">×</button>
        </div>
        {post.esFragmentoLibro && <BookBadge />}
        <time className="mt-6 block text-xs capitalize text-muted-foreground">{formatFecha(post.fecha)}</time>
        <h2 className="mt-2 font-serif text-4xl italic leading-tight md:text-5xl">{post.titulo}</h2>
        <p className="diary-lines mt-8 text-[17px] leading-8">{post.contenido}</p>
        {creator && (
          <>
            <div className="mt-8"><TikTokButton post={post} onScript={setGuion} /></div>
            {guion && <pre className="mt-5 whitespace-pre-wrap rounded-xl border bg-muted/60 p-5 font-sans text-sm leading-relaxed">{guion}</pre>}
            <div className="mt-8 rounded-xl border border-dashed p-5 text-center text-xs text-muted-foreground">
              {post.tiktokUrl ? (
                <iframe src={post.tiktokUrl} className="mx-auto h-[575px] w-full max-w-[325px]" allowFullScreen title="TikTok" />
              ) : "Espacio reservado para tu video de TikTok"}
            </div>
          </>
        )}
      </article>
    </div>
  );
}
