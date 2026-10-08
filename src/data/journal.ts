export type Categoria = "Financiero" | "Cuerpo" | "Maternidad" | "Mujer" | "Mentalidad y Espiritualidad";

export type MetricasRef = { grasa?: string; rachaGym?: number; trading?: string };

export type Post = {
  id: string;
  fecha: string; // ISO yyyy-mm-dd; se muestra en español con formatFecha
  titulo: string;
  categoria: Categoria;
  contenido: string;
  tiktokUrl?: string;
  guion?: string; // guion TikTok escrito a mano; si existe se copia tal cual
  metricasRef?: MetricasRef;
  esFragmentoLibro: boolean; // true = extracto reservado a la sección independiente El Libro
};

export const CATEGORIAS: { id: Categoria; desc: string; color: string }[] = [
  { id: "Financiero", desc: "Trading, Abar Digital y solidez económica", color: "bg-cat-trading" },
  { id: "Cuerpo", desc: "Nutrición, fuerza, hipertrofia y disciplina", color: "bg-cat-sport" },
  { id: "Maternidad", desc: "Crianza y el caos del hogar", color: "bg-cat-mom" },
  { id: "Mujer", desc: "Autoestima, relaciones y amor propio", color: "bg-cat-woman" },
  { id: "Mentalidad y Espiritualidad", desc: "Conciencia, emociones y evolución interior", color: "bg-cat-digital" },
];

export const colorDe = (c: Categoria) => CATEGORIAS.find((x) => x.id === c)?.color ?? "bg-secondary";

export const formatFecha = (iso: string) =>
  new Intl.DateTimeFormat("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

// Ordenados del más reciente al más antiguo
export const JOURNAL: Post[] = [
  {
    id: "2026-10-08-prologo",
    fecha: "2026-10-08",
    categoria: "Mentalidad y Espiritualidad",
    esFragmentoLibro: true,
    titulo: "Prólogo: El día que decidí dejar de estar fragmentada",
    contenido: "Texto de marcador de posición para el prólogo del libro. Aquí irá el relato del día en que entendí que vivir a medias ya no era una opción, y que la soberanía se construye página a página.",
  },
  {
    id: "2026-10-05-sindrome-del-casi",
    fecha: "2026-10-05",
    categoria: "Mentalidad y Espiritualidad",
    esFragmentoLibro: false,
    titulo: "El 'Síndrome del Casi': La distancia entre fragmentación y soberanía",
    contenido: "Primer día de periodo, 40 años y las hormonas disparadas. Ganas de llorar y salir corriendo. ¿Por qué? Porque tengo las herramientas y aún así siento que no doy pie con bola. Hoy, escribiendo, me di cuenta de que padezco el 'Síndrome del Casi'. Me falta un 'casi' para el porcentaje de grasa ideal, un 'casi' para que los músculos se marquen, un 'casi' para ser rentable en trading de binarias (sí, binarias, donde busco demostrar que con estrategia innegociable se puede ganar a largo plazo). Ropa en maletas esperando fotos para venderse, una agencia digital andando pero sin solidificarse, y una relación de tres años donde desde el día uno me siento en la cuerda floja. Ganas de comerme el mundo sin la solidez financiera para hacerlo. 'Casi' no es Soy. 'Casi' no es Ser. Sigue sabiendo a fragmentación. Hoy me reconozco la valentía de escribirlo con el corazón acelerado por la ansiedad, sintiéndome perdedora pero con la convicción inquebrantable de que esto es solo aprendizaje y evolución.",
    guion: `[GANCHO 0-3 SEG]
Tengo 40 años y hoy me di cuenta de que sufro del "Síndrome del Casi". Casi tengo el cuerpo que de verdad quiero, casi soy rentable en el trading, casi solidifico mi agencia digital... pero "casi" no es SOY. "Casi" no es SER.

[DESARROLLO PRÁCTICO]
Hoy es el primer día de mi periodo, tengo las hormonas al límite, ganas de llorar y de salir corriendo. Te lo cuento así, de frente, porque me cansé de las vidas perfectas de internet. Sentía que teniendo las habilidades y las herramientas, no daba pie con bola.

Al sentarme a escribir en mi diario digital, descubrí esta verdad incómoda: el "casi" sigue teniendo ese sabor amargo a fragmentación, no a soberanía. Tengo bolsas de ropa guardadas esperando ser vendidas, una agencia andando pero sin explotar, y una relación de tres años donde desde el día uno me he sentido en la cuerda floja. Es una mierda sentir que te quieres comer el mundo pero no tienes la solidez financiera para respaldarlo.

[LLAMADO A LA ACCIÓN]
Escribo esto con el corazón acelerado por la ansiedad y con una fuerte sensación corporal de ir perdiendo, pero también con una convicción inquebrantable: esto es solo aprendizaje y evolución. Reconocer de frente dónde estás rota es el primer paso para reconstruirte. Si tú también estás atrapada en el "casi", sígueme. Vamos a reclamar nuestra soberanía, página a página.`,
  },
  { id: "6", fecha: "2026-10-05", esFragmentoLibro: false, categoria: "Financiero", titulo: "Lancé otra web con Lovable en una tarde", contenido: "En Abar Digital entregamos hoy una web completa para una clienta, construida en horas con Lovable. Y en la noche, avancé dos capítulos del libro en edición. Ser soberana digital es crear con tus propias manos.", metricasRef: { rachaGym: 14, grasa: "24%", trading: "+3,2% semanal" } },
  { id: "5", fecha: "2026-10-04", esFragmentoLibro: false, categoria: "Mujer", titulo: "Dejé de pedir permiso para brillar", contenido: "Durante años me hice pequeña para no incomodar. Hoy me miré al espejo y me dije: mereces ocupar espacio. La autoestima no es arrogancia, es dejar de abandonarte a ti misma." },
  { id: "4", fecha: "2026-10-03", esFragmentoLibro: false, categoria: "Maternidad", titulo: "Ropa sucia, risas limpias", contenido: "La casa era un desastre: juguetes, platos, una montaña de ropa. Y aun así, mi hijo me pidió bailar en la cocina. Bailamos. El orden puede esperar; estos momentos no vuelven." },
  { id: "3", fecha: "2026-10-02", esFragmentoLibro: false, categoria: "Financiero", titulo: "Perdí y no me vengué del mercado", contenido: "Dos operaciones en rojo seguidas. Antes habría duplicado la apuesta para recuperar. Hoy cerré la plataforma. Mi regla: máximo dos pérdidas por día. Proteger el capital es proteger mi paz mental.", metricasRef: { trading: "-1,1% hoy · regla respetada" } },
  { id: "2", fecha: "2026-10-01", esFragmentoLibro: false, categoria: "Cuerpo", titulo: "El día que no quería ir al gym", contenido: "La motivación no apareció. Fui igual. Sentadilla pesada, cuatro series, y en la tercera entendí que la disciplina es amor propio con zapatillas. La hipertrofia no se construye con ganas, se construye con constancia.", metricasRef: { rachaGym: 10 } },
  { id: "1", fecha: "2026-09-30", esFragmentoLibro: false, categoria: "Cuerpo", titulo: "No era hambre, era ansiedad", contenido: "Hoy abrí el refrigerador tres veces sin hambre real. Me detuve, respiré y anoté lo que sentía. Descubrí que no buscaba comida, buscaba calma. Preparé un bowl con proteína, avena y frutos rojos, y comí sentada, sin pantalla. Pequeños actos de presencia que cambian todo.", metricasRef: { grasa: "25%" } },
];

export function entradasDiario(categoria: Categoria | "Todas" = "Todas", posts: readonly Post[] = JOURNAL): Post[] {
  return posts
    .filter((post) => !post.esFragmentoLibro && (categoria === "Todas" || post.categoria === categoria))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function fragmentosLibro(posts: readonly Post[] = JOURNAL): Post[] {
  return posts.filter((post) => post.esFragmentoLibro).sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function ultimasMetricas(posts: readonly Post[] = JOURNAL): MetricasRef {
  const out: MetricasRef = {};
  for (const post of entradasDiario("Todas", posts).reverse()) {
    const m = post.metricasRef;
    if (m?.grasa !== undefined) out.grasa = m.grasa;
    if (m?.rachaGym !== undefined) out.rachaGym = m.rachaGym;
    if (m?.trading !== undefined) out.trading = m.trading;
  }
  return out;
}
