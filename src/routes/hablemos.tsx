import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { contactSchema, pageHead } from '@/lib/community';
export const Route = createFileRoute('/hablemos')({ head: () => pageHead('Hablemos', 'Comparte tu reflexión con María Barros Coronado y elige si quieres recibir una respuesta pública, anónima o privada.'), component: ContactPage });
function ContactPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [publicResponse, setPublicResponse] = useState<'Sí' | 'Anónimo' | 'No'>('No');
  const [state, setState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError('');
    const parsed = contactSchema.safeParse({ name, message, public_response: publicResponse });
    if (!parsed.success) { setError('Completa tu nombre y mensaje.'); return; }
    setState('sending');
    try {
      const { error: failure } = await supabase.from('community_messages').insert(parsed.data);
      if (failure) throw failure;
      setState('success'); setMessage('');
    } catch { setError('No se pudo enviar tu mensaje. Inténtalo de nuevo.'); setState('idle'); }
  }
  return <main className="mx-auto max-w-3xl px-6 py-14"><header className="text-center"><p className="eyebrow">Entre tú y yo</p><h1 className="mt-4 font-serif text-5xl italic md:text-6xl">Hablemos</h1><p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">Hay historias que merecen ser escuchadas.<br/>Este espacio también es tuyo.</p></header>{state === 'success' ? <div role="status" className="py-20 text-center"><Check className="mx-auto size-8" strokeWidth={1}/><h2 className="mt-6 font-serif text-3xl italic">Gracias por abrir este espacio conmigo.</h2><p className="mt-4 text-sm text-muted-foreground">Tu mensaje quedó recibido con la preferencia que elegiste.</p><Button variant="link" className="mt-5" onClick={() => setState('idle')}>Escribir otro mensaje</Button></div> : <form className="mx-auto mt-12 max-w-xl space-y-8" onSubmit={submit}><div><label htmlFor="contact-name" className="text-xs text-muted-foreground">Nombre</label><input id="contact-name" autoComplete="name" required maxLength={100} value={name} onChange={e => setName(e.target.value)} className="editorial-input" placeholder="¿Cómo te llamas?"/></div><div><label htmlFor="contact-message" className="text-xs text-muted-foreground">Mensaje</label><textarea id="contact-message" required maxLength={5000} rows={5} value={message} onChange={e => setMessage(e.target.value)} className="editorial-input resize-y" placeholder="Lo que quieras compartir…"/></div><div><label htmlFor="public-response" className="text-sm leading-6">¿Quieres que responda esto de forma pública en mi diario/TikTok?</label><select id="public-response" className="editorial-input mt-2" value={publicResponse} onChange={e => { const value = e.target.value; if (value === 'Sí' || value === 'Anónimo' || value === 'No') setPublicResponse(value); }}><option value="Sí">Sí</option><option value="Anónimo">Anónimo</option><option value="No">No</option></select><p className="mt-3 text-xs leading-5 text-muted-foreground">{publicResponse === 'Sí' ? 'Autorizas que tu mensaje y nombre se incluyan en una respuesta pública.' : publicResponse === 'Anónimo' ? 'Autorizas una respuesta pública sin mostrar tu nombre.' : 'Tu mensaje no se publicará.'}</p></div><p className="text-xs leading-5 text-muted-foreground">Al enviar, aceptas que María reciba tu nombre y mensaje para leer tu reflexión. No se publicará automáticamente.</p>{error && <p role="alert" className="text-sm">{error}</p>}<div className="flex justify-end"><Button type="submit" disabled={state === 'sending'} className="rounded-none px-6">{state === 'sending' ? 'Enviando…' : 'Enviar mensaje'}<ArrowRight strokeWidth={1.2}/></Button></div></form>}</main>;
}
