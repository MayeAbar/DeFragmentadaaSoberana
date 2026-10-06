export type CategoryId = "alimentacion" | "deporte" | "trading" | "maternidad" | "mujer" | "digital";

export const CATEGORIES: { id: CategoryId; label: string; desc: string; color: string }[] = [
  { id: "alimentacion", label: "Alimentación", desc: "Nutrición, macros, recetas y ansiedad", color: "bg-cat-food" },
  { id: "deporte", label: "Deporte", desc: "Fuerza, hipertrofia y disciplina", color: "bg-cat-sport" },
  { id: "trading", label: "Trading", desc: "Bitácora de binarias y psicología", color: "bg-cat-trading" },
  { id: "maternidad", label: "Maternidad", desc: "Crianza y el caos del hogar", color: "bg-cat-mom" },
  { id: "mujer", label: "Mujer", desc: "Autoestima, mentalidad y amor propio", color: "bg-cat-woman" },
  { id: "digital", label: "Soberana Digital", desc: "Abar Digital, Lovable y mi libro", color: "bg-cat-digital" },
];

export type Entry = { id: string; category: CategoryId; title: string; body: string; tiktokUrl?: string };

export const ENTRIES: Entry[] = [
  { id: "1", category: "alimentacion", title: "No era hambre, era ansiedad", body: "Hoy abrí el refrigerador tres veces sin hambre real. Me detuve, respiré y anoté lo que sentía. Descubrí que no buscaba comida, buscaba calma. Preparé un bowl con proteína, avena y frutos rojos, y comí sentada, sin pantalla. Pequeños actos de presencia que cambian todo." },
  { id: "2", category: "deporte", title: "El día que no quería ir al gym", body: "La motivación no apareció. Fui igual. Sentadilla pesada, cuatro series, y en la tercera entendí que la disciplina es amor propio con zapatillas. La hipertrofia no se construye con ganas, se construye con constancia." },
  { id: "3", category: "trading", title: "Perdí y no me vengué del mercado", body: "Dos operaciones en rojo seguidas. Antes habría duplicado la apuesta para recuperar. Hoy cerré la plataforma. Mi regla: máximo dos pérdidas por día. Proteger el capital es proteger mi paz mental." },
  { id: "4", category: "maternidad", title: "Ropa sucia, risas limpias", body: "La casa era un desastre: juguetes, platos, una montaña de ropa. Y aun así, mi hijo me pidió bailar en la cocina. Bailamos. El orden puede esperar; estos momentos no vuelven." },
  { id: "5", category: "mujer", title: "Dejé de pedir permiso para brillar", body: "Durante años me hice pequeña para no incomodar. Hoy me miré al espejo y me dije: mereces ocupar espacio. La autoestima no es arrogancia, es dejar de abandonarte a ti misma." },
  { id: "6", category: "digital", title: "Lancé otra web con Lovable en una tarde", body: "En Abar Digital entregamos hoy una web completa para una clienta, construida en horas con Lovable. Y en la noche, avancé dos capítulos del libro en edición. Ser soberana digital es crear con tus propias manos." },
];

export function toTikTokScript(e: Entry, catLabel: string) {
  const sentences = e.body.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [e.body];
  const hook = sentences[0];
  const dev = sentences.slice(1).map((s) => `• ${s}`).join("\n") || `• ${e.body}`;
  return `🎬 GUION TIKTOK — ${e.title}\nCategoría: ${catLabel}\n\n⚡ GANCHO (0-3 seg)\n"${hook}"\n\n📖 DESARROLLO DEL CONTENIDO\n${dev}\n\n📣 LLAMADO A LA ACCIÓN (CTA)\n¿Te ha pasado? Cuéntame en comentarios y sígueme para más de "De Fragmentada a Soberana" 🤍`;
}
