import { useState } from "react";
import type { Post } from "@/data/journal";
import { copiarGuion } from "@/lib/tiktok";

export function TikTokButton({ post, onScript }: { post: Post; onScript?: (s: string) => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        onScript?.(await copiarGuion(post));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-accent"
    >
      {copied ? "¡Guion copiado! ✓" : "Copiar Guion para TikTok"}
    </button>
  );
}
