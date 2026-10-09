import { describe, expect, it } from 'vitest';
import { parseFavorites, toggleFavorite } from '@/lib/favorites';
import { contactSchema, newsletterSchema, tiktokEmbedUrl } from '@/lib/community';
describe('Comunidad y privacidad', () => {
  it('guarda y quita favoritos por ID sin duplicarlos', () => {
    expect(toggleFavorite([], '6')).toEqual(['6']);
    expect(toggleFavorite(['6'], '6')).toEqual([]);
    expect(parseFavorites('["6","6","desconocido"]')).toEqual(['6']);
    expect(parseFavorites('corrupto')).toEqual([]);
  });
  it('acepta únicamente Sí, Anónimo o No para respuesta pública', () => {
    for (const public_response of ['Sí', 'Anónimo', 'No']) expect(contactSchema.safeParse({ name: 'María', email: 'maria@example.com', message: 'Hola', public_response }).success).toBe(true);
    expect(contactSchema.safeParse({ name: 'María', email: 'maria@example.com', message: 'Hola', public_response: 'Cualquier cosa' }).success).toBe(false);
  });
  it('exige email válido en el buzón', () => {
    expect(contactSchema.safeParse({ name: 'María', email: '', message: 'Hola', public_response: 'No' }).success).toBe(false);
    expect(contactSchema.safeParse({ name: 'María', email: 'incorrecto', message: 'Hola', public_response: 'No' }).success).toBe(false);
  });
  it('exige nombre excepto si el envío es anónimo y elimina cualquier nombre escrito', () => {
    const input = { name: '', email: 'reader@example.com', message: 'Hola', public_response: 'No' };
    expect(contactSchema.safeParse(input).success).toBe(false);
    expect(contactSchema.parse({ ...input, name: 'Nombre secreto', anonymous: true }).name).toBe('Anónima');
    expect(contactSchema.safeParse({ ...input, anonymous: true, public_response: 'Sí' }).success).toBe(false);
  });
  it('requiere consentimiento y email válido para newsletter', () => {
    expect(newsletterSchema.safeParse({ email: 'reader@example.com', consent: true }).success).toBe(true);
    expect(newsletterSchema.safeParse({ email: 'reader@example.com', consent: false }).success).toBe(false);
    expect(newsletterSchema.safeParse({ email: 'sin-email', consent: true }).success).toBe(false);
  });
  it('normaliza videos reales y rechaza dominios externos o URLs inseguras', () => {
    expect(tiktokEmbedUrl('https://www.tiktok.com/@maria/video/123456789')).toBe('https://www.tiktok.com/player/v1/123456789');
    expect(tiktokEmbedUrl('https://www.tiktok.com/embed/v2/123456789')).toBe('https://www.tiktok.com/player/v1/123456789');
    expect(tiktokEmbedUrl('https://evil.com/video/123456789')).toBeNull();
    expect(tiktokEmbedUrl('javascript:alert(1)')).toBeNull();
    expect(tiktokEmbedUrl()).toBeNull();
  });
});
