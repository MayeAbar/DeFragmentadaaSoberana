import { describe, expect, it } from "vitest";
import { CATEGORIAS, JOURNAL, entradasDiario, fragmentosLibro, ultimasMetricas, type Post } from "@/data/journal";

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

  it("ordena las reflexiones de más reciente a más antigua", () => {
    const reciente = { ...normal, id: "reciente", fecha: "2026-10-04" };
    expect(entradasDiario("Todas", [normal, reciente]).map((p) => p.id)).toEqual(["reciente", "diario"]);
  });

  it("mantiene +3,2% semanal en soberanía financiera", () => {
    expect(ultimasMetricas().trading).toBe("+3,2% semanal");
  });

  it("mantiene 14 días de racha y 24% de grasa en soberanía del cuerpo", () => {
    expect(ultimasMetricas().rachaGym).toBe(14);
    expect(ultimasMetricas().grasa).toBe("24%");
  });

  it("no publica métricas de capítulos ni toma métricas del libro", () => {
    expect(Object.keys(ultimasMetricas()).sort()).toEqual(["grasa", "rachaGym", "trading"]);
    expect(ultimasMetricas([{ ...fragmento, metricasRef: { rachaGym: 99, grasa: "90%", trading: "+99%" } }])).toEqual({});
  });
});