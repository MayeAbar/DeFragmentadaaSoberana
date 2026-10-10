export type Categoria = "Financiero" | "Cuerpo" | "Maternidad" | "Mujer" | "Mentalidad y Espiritualidad";

export type Post = {
  id: string;
  fecha: string; // ISO yyyy-mm-dd; se muestra en español con formatFecha
  titulo: string;
  categoria: Categoria;
  contenido: string;
  tiktokUrl?: string;
  guion?: string; // guion TikTok escrito a mano; si existe se copia tal cual
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
];

export function entradasDiario(categoria: Categoria | "Todas" = "Todas", posts: readonly Post[] = JOURNAL): Post[] {
  return posts
    .filter((post) => !post.esFragmentoLibro && (categoria === "Todas" || post.categoria === categoria))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function fragmentosLibro(posts: readonly Post[] = JOURNAL): Post[] {
  return posts.filter((post) => post.esFragmentoLibro).sort((a, b) => b.fecha.localeCompare(a.fecha));
}

/** Valores que la autora actualiza a mano: lenguaje humano, sin porcentajes. */
export const SOBERANIA = {
  cuerpo: { valor: 14, etiqueta: "Días de Enfoque Físico" },
  financiera: { estado: "Gestión de Riesgo: Innegociable", detalle: "Paz Financiera: Bajo Plan" },
};

export type EstadoRacha = "activa" | "respiro" | "sin-racha";

const diaUTC = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 86400000;

/**
 * Racha Editorial con días de gracia: se pueden saltar 1 o 2 días (la racha se congela
 * en "respiro"); con más de 3 días sin publicar (72 h) vuelve a 0.
 * Cuenta los días distintos con publicación dentro de la cadena vigente.
 */
export function rachaEditorial(fechas: readonly string[], hoy: string): { dias: number; estado: EstadoRacha } {
  const dias = [...new Set(fechas.map((f) => f.slice(0, 10)))].map(diaUTC).sort((a, b) => b - a);
  const h = diaUTC(hoy);
  const recientes = dias.filter((d) => d <= h);
  if (!recientes.length || h - recientes[0] > 3) return { dias: 0, estado: "sin-racha" };
  let n = 1;
  for (let i = 1; i < recientes.length && recientes[i - 1] - recientes[i] <= 3; i++) n++;
  return { dias: n, estado: h - recientes[0] <= 1 ? "activa" : "respiro" };
}

export const hoySantiago = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date());
