import { describe, expect, it } from "vitest";
import { CATEGORIAS, JOURNAL, entradasDiario, fragmentosLibro, rachaEditorial, SOBERANIA, type Post } from "@/data/journal";

describe("Reglas del diario y Centro de Soberanía", () => {
  it("clasifica Síndrome del Casi como diario normal en Mentalidad y Espiritualidad", () => {
    const post = JOURNAL.find((p) => p.id === "2026-10-05-sindrome-del-casi");
    expect(post?.esFragmentoLibro).toBe(false);
    expect(post?.categoria).toBe("Mentalidad y Espiritualidad");
    expect(entradasDiario("Mentalidad y Espiritualidad")).toContainEqual(post);
  });

  it("conserva exactamente las cinco categorías definitivas", () => {
    expect(CATEGORIAS.map((c) => c.id)).toEqual(["Financiero", "Cuerpo", "Maternidad", "Mujer", "Mentalidad y Espiritualidad"]);
  });

  const normal: Post = { id: "diario", fecha: "2026-10-01", titulo: "Reflexión", contenido: "Texto", categoria: "Mujer", esFragmentoLibro: false };
  const fragmento: Post = { ...normal, id: "libro", fecha: "2026-10-03", esFragmentoLibro: true };

  it("excluye extractos de Todas y de cada categoría y los reserva al libro", () => {
    const posts = [fragmento, normal];
    expect(entradasDiario("Todas", posts)).toEqual([normal]);
    for (const c of CATEGORIAS) expect(entradasDiario(c.id, posts)).not.toContainEqual(fragmento);
    expect(fragmentosLibro(posts)).toEqual([fragmento]);
  });

  it("muestra el prólogo de prueba solo en la pestaña El Libro", () => {
    const prologo = JOURNAL.find((p) => p.id === "2026-10-08-prologo");
    expect(prologo?.esFragmentoLibro).toBe(true);
    expect(prologo?.fecha).toBe("2026-10-08");
    expect(prologo?.titulo).toBe("Prólogo: El día que decidí dejar de estar fragmentada");
    expect(fragmentosLibro()).toContainEqual(prologo);
    expect(entradasDiario("Todas")).not.toContainEqual(prologo);
    expect(entradasDiario("Mentalidad y Espiritualidad")).not.toContainEqual(prologo);
  });

  it("ordena las reflexiones de más reciente a más antigua", () => {
    const reciente = { ...normal, id: "reciente", fecha: "2026-10-04" };
    expect(entradasDiario("Todas", [normal, reciente]).map((p) => p.id)).toEqual(["reciente", "diario"]);
  });

  it("racha activa suma días consecutivos", () => {
    expect(rachaEditorial(["2026-10-08", "2026-10-09", "2026-10-10"], "2026-10-10")).toEqual({ dias: 3, estado: "activa" });
  });

  it("1 o 2 días sin publicar congelan la racha en Respiro Consciente", () => {
    expect(rachaEditorial(["2026-10-07", "2026-10-08"], "2026-10-10")).toEqual({ dias: 2, estado: "respiro" });
    expect(rachaEditorial(["2026-10-07", "2026-10-08"], "2026-10-11")).toEqual({ dias: 2, estado: "respiro" });
  });

  it("publicar tras 2 días de pausa reactiva y suma sobre la racha congelada", () => {
    expect(rachaEditorial(["2026-10-07", "2026-10-08", "2026-10-11"], "2026-10-11")).toEqual({ dias: 3, estado: "activa" });
  });

  it("más de 3 días sin publicar devuelve la racha a 0", () => {
    expect(rachaEditorial(["2026-10-07", "2026-10-08"], "2026-10-12").dias).toBe(0);
    expect(rachaEditorial(["2026-10-01", "2026-10-05", "2026-10-06"], "2026-10-06").dias).toBe(2);
  });

  it("no queda ninguna métrica de porcentaje en el panel", () => {
    expect(JSON.stringify(SOBERANIA)).not.toContain("%");
  });
});
