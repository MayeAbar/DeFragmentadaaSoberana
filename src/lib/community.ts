import { z } from 'zod';
export const contactSchema = z.object({
  name: z.string().trim().max(100),
  anonymous: z.boolean().default(false),
  email: z.string().trim().toLowerCase().email('Escribe un email válido.').max(254),
  message: z.string().trim().min(1, 'Escribe tu mensaje.').max(5000),
  public_response: z.enum(['Sí', 'Anónimo', 'No']),
}).superRefine((data, ctx) => {
  if (!data.anonymous && !data.name) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['name'], message: 'Escribe tu nombre o elige enviar de forma anónima.' });
  if (data.anonymous && data.public_response === 'Sí') ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['public_response'], message: 'Un mensaje anónimo no puede autorizar publicar tu nombre.' });
}).transform(data => ({ ...data, name: data.anonymous ? 'Anónima' : data.name }));
export const newsletterSchema = z.object({ email: z.string().trim().toLowerCase().email('Escribe un email válido.').max(254), consent: z.literal(true) });
export function tiktokEmbedUrl(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !['www.tiktok.com', 'tiktok.com'].includes(url.hostname)) return null;
    const id = url.pathname.match(/\/(?:video|v|player\/v1|embed\/v2)\/(\d+)(?:\.html)?(?:\/|$)/)?.[1];
    return id ? `https://www.tiktok.com/player/v1/${id}` : null;
  } catch { return null; }
}
export function pageHead(title: string, description: string) {
  const fullTitle = `${title} — De Fragmentada a Soberana`;
  return { meta: [{ title: fullTitle }, { name: 'description', content: description }, { property: 'og:title', content: fullTitle }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
