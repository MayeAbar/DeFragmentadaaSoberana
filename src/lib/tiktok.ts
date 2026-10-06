import type { Post } from "@/data/journal";

export function generarGuionTikTok(p: Post): string {
  if (p.guion) return p.guion;
  const frases = p.contenido.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [p.contenido];
  const gancho = frases[0];
  const desarrollo = frases.slice(1).map((s) => `• ${s}`).join("\n") || `• ${p.contenido}`;
  return `${p.titulo} — ${p.categoria}\n\n[GANCHO 3 SEG]\n"${gancho}"\n\n[DESARROLLO]\n${desarrollo}\n\n[CALL TO ACTION]\n¿Te ha pasado? Cuéntamelo en comentarios y sígueme para más de "De Fragmentada a Soberana" 🤍`;
}

export async function copiarGuion(p: Post): Promise<string> {
  const g = generarGuionTikTok(p);
  try { await navigator.clipboard.writeText(g); } catch { /* sin portapapeles */ }
  return g;
}
