import { useState, type FormEvent } from 'react';
import { ArrowRight, AudioLines, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { newsletterSchema } from '@/lib/community';
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError('');
    const result = newsletterSchema.safeParse({ email, consent });
    if (!result.success) { setError(consent ? 'Escribe un email válido.' : 'Acepta recibir las notas para suscribirte.'); return; }
    setState('sending');
    try {
      const { error: failure } = await supabase.from('voice_subscribers').insert(result.data);
      if (failure && failure.code !== '23505') throw failure;
      setState('success');
    } catch { setError('No se pudo registrar tu suscripción. Inténtalo de nuevo.'); setState('idle'); }
  }
  return <section className="border-y border-border bg-muted/40"><div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-2 md:gap-16"><div><AudioLines strokeWidth={1.2} className="mb-4 size-6 text-muted-foreground"/><p className="eyebrow">Una pausa, cada domingo</p><h2 className="mt-3 font-serif text-4xl italic">Notas de Voz Soberanas</h2><p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">Palabras para escucharnos con calma. Un boletín dominical de audio, de mi voz a tu mundo.</p></div><div className="flex items-center">{state === 'success' ? <p role="status" className="flex items-center gap-3 font-serif text-2xl italic"><Check strokeWidth={1.2}/> Gracias. Tu suscripción quedó registrada.</p> : <form onSubmit={submit} className="w-full"><label htmlFor="newsletter-email" className="text-xs text-muted-foreground">Tu email</label><div className="mt-2 flex border-b border-foreground/40"><input id="newsletter-email" type="email" autoComplete="email" maxLength={254} required value={email} onChange={e => setEmail(e.target.value)} placeholder="hola@tucorreo.com" className="editorial-input min-w-0 flex-1 border-0"/><Button type="submit" variant="ghost" size="icon" aria-label="Suscribirme a Notas de Voz Soberanas" title="Suscribirme" disabled={state === 'sending'} className="my-auto"><ArrowRight strokeWidth={1.2}/></Button></div><label className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 accent-primary"/>Quiero recibir Notas de Voz Soberanas por email.</label>{error && <p role="alert" className="mt-3 text-sm text-foreground">{error}</p>}{state === 'sending' && <p role="status" className="mt-3 text-xs text-muted-foreground">Registrando…</p>}</form>}</div></div></section>;
}
