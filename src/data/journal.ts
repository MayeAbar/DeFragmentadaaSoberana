export type Categoria = "Alimentación" | "Deporte" | "Trading" | "Maternidad" | "Mujer" | "Soberana Digital";

export type MetricasRef = { grasa?: string; capsLibro?: number; rachaGym?: number; trading?: string };

export type Post = {
  id: string;
  fecha: string; // ISO yyyy-mm-dd; se muestra en español con formatFecha
  titulo: string;
  categoria: Categoria;
  contenido: string;
  tiktokUrl?: string;
  metricasRef?: MetricasRef;
};

export const CATEGORIAS: { id: Categoria; desc: string; color: string }[] = [
  { id: "Alimentación", desc: "Nutrición, macros, recetas y ansiedad", color: "bg-cat-food" },
  { id: "Deporte", desc: "Fuerza, hipertrofia y disciplina", color: "bg-cat-sport" },
  { id: "Trading", desc: "Bitácora de binarias y psicología", color: "bg-cat-trading" },
  { id: "Maternidad", desc: "Crianza y el caos del hogar", color: "bg-cat-mom" },
  { id: "Mujer", desc: "Autoestima, mentalidad y amor propio", color: "bg-cat-woman" },
  { id: "Soberana Digital", desc: "Abar Digital, Lovable y mi libro", color: "bg-cat-digital" },
];

export const colorDe = (c: Categoria) => CATEGORIAS.find((x) => x.id === c)?.color ?? "bg-secondary";

export const formatFecha = (iso: string) =>
  new Intl.DateTimeFormat("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

// Ordenados del más reciente al más antiguo
export const JOURNAL: Post[] = [
  { id: "6", fecha: "2026-10-05", categoria: "Soberana Digital", titulo: "Lancé otra web con Lovable en una tarde", contenido: "En Abar Digital entregamos hoy una web completa para una clienta, construida en horas con Lovable. Y en la noche, avancé dos capítulos del libro en edición. Ser soberana digital es crear con tus propias manos.", metricasRef: { capsLibro: 9, rachaGym: 14, grasa: "24%", trading: "+3,2% semanal" } },
  { id: "5", fecha: "2026-10-04", categoria: "Mujer", titulo: "Dejé de pedir permiso para brillar", contenido: "Durante años me hice pequeña para no incomodar. Hoy me miré al espejo y me dije: mereces ocupar espacio. La autoestima no es arrogancia, es dejar de abandonarte a ti misma." },
  { id: "4", fecha: "2026-10-03", categoria: "Maternidad", titulo: "Ropa sucia, risas limpias", contenido: "La casa era un desastre: juguetes, platos, una montaña de ropa. Y aun así, mi hijo me pidió bailar en la cocina. Bailamos. El orden puede esperar; estos momentos no vuelven." },
  { id: "3", fecha: "2026-10-02", categoria: "Trading", titulo: "Perdí y no me vengué del mercado", contenido: "Dos operaciones en rojo seguidas. Antes habría duplicado la apuesta para recuperar. Hoy cerré la plataforma. Mi regla: máximo dos pérdidas por día. Proteger el capital es proteger mi paz mental.", metricasRef: { trading: "-1,1% hoy · regla respetada" } },
  { id: "2", fecha: "2026-10-01", categoria: "Deporte", titulo: "El día que no quería ir al gym", contenido: "La motivación no apareció. Fui igual. Sentadilla pesada, cuatro series, y en la tercera entendí que la disciplina es amor propio con zapatillas. La hipertrofia no se construye con ganas, se construye con constancia.", metricasRef: { rachaGym: 10 } },
  { id: "1", fecha: "2026-09-30", categoria: "Alimentación", titulo: "No era hambre, era ansiedad", contenido: "Hoy abrí el refrigerador tres veces sin hambre real. Me detuve, respiré y anoté lo que sentía. Descubrí que no buscaba comida, buscaba calma. Preparé un bowl con proteína, avena y frutos rojos, y comí sentada, sin pantalla. Pequeños actos de presencia que cambian todo.", metricasRef: { grasa: "25%" } },
];

export const META_LIBRO = 15;
