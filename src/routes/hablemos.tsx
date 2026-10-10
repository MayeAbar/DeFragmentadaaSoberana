import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { contactSchema, pageHead } from '@/lib/community';

export const Route = createFileRoute('/hablemos')({
  head: () => pageHead('Buzón de Soberanía', 'Deposita aquí tus grietas: comparte tus preguntas, opiniones o desahogos con Patricia y elige si autorizas una respuesta pública.'),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [publicResponse, setPublicResponse] = useState<'Sí' | 'Anónimo' | 'No'>('No');
  const [state, setState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError('');
    const parsed = contactSchema.safeParse({ name, email, anonymous, message, public_response: publicResponse });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Revisa los campos del mensaje.'); return; }
    setState('sending');
    try {
      const { error: failure } = await supabase.from('community_messages').insert(parsed.data);
      if (failure) throw failure;
      setState('success'); setMessage('');
    } catch { setError('No se pudo enviar tu mensaje. Inténtalo de nuevo.'); setState('idle'); }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <header className="text-center">
        <p className="eyebrow">Buzón de Soberanía</p>
        <h1 className="mt-5 font-serif text-5xl italic leading-tight md:text-6xl">Deposita aquí tus grietas</h1>
        <span className="kintsugi-rule mx-auto mt-8 block" />
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground">Usa este buzón para enviar tus preguntas, opiniones o desahogos. Si lo deseas, responderé tu mensaje de forma abierta en mis próximas reflexiones diarios.</p>
      </header>
      {state === 'success' ? (
        <div role="status" className="py-20 text-center">
          <Check className="mx-auto size-8 text-accent" strokeWidth={1} />
          <h2 className="mt-6 font-serif text-3xl italic">Gracias por confiarme tus palabras.</h2>
          <p className="mt-4 text-sm text-muted-foreground">Tu mensaje quedó recibido con la preferencia que elegiste.</p>
          <Button variant="link" className="mt-5" onClick={() => setState('idle')}>Escribir otro mensaje</Button>
        </div>
      ) : (
        <form className="mx-auto mt-12 max-w-xl space-y-8" onSubmit={submit}>
          <div>
            <label className="mb-5 flex items-center gap-3 text-sm"><input type="checkbox" checked={anonymous} onChange={e => { setAnonymous(e.target.checked); if (e.target.checked && publicResponse === 'Sí') setPublicResponse('Anónimo'); }} className="accent-primary" />Enviar de forma Anónima</label>
            {!anonymous && <><label htmlFor="contact-name" className="text-xs text-muted-foreground">Nombre</label><input id="contact-name" autoComplete="name" required maxLength={100} value={name} onChange={e => setName(e.target.value)} className="editorial-input" placeholder="¿Cómo te llamas?" /></>}
          </div>
          <div><label htmlFor="contact-email" className="text-xs text-muted-foreground">Email</label><input id="contact-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} className="editorial-input" placeholder="hola@tucorreo.com" /><p className="mt-3 text-xs leading-5 text-muted-foreground">Tu email es privado y nunca se incluirá en una respuesta pública. El envío anónimo oculta tu nombre, no tu email para Patricia.</p></div>
          <div><label htmlFor="contact-message" className="text-xs text-muted-foreground">Mensaje</label><textarea id="contact-message" required maxLength={5000} rows={7} value={message} onChange={e => setMessage(e.target.value)} className="editorial-input resize-y" placeholder="Aquí hay espacio para lo que sientes…" /></div>
          <div>
            <label htmlFor="public-response" className="text-sm leading-6">¿Quieres que responda esto de forma pública en mi diario/TikTok?</label>
            <select id="public-response" className="editorial-input mt-2" value={publicResponse} onChange={e => { const value = e.target.value; if (value === 'Sí' || value === 'Anónimo' || value === 'No') setPublicResponse(value); }}>
              {!anonymous && <option value="Sí">Sí</option>}<option value="Anónimo">Anónimo</option><option value="No">No</option>
            </select>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">{publicResponse === 'Sí' ? 'Autorizas que tu mensaje y nombre se incluyan en una respuesta pública.' : publicResponse === 'Anónimo' ? 'Autorizas una respuesta pública sin mostrar tu nombre.' : 'Tu mensaje no se publicará.'}</p>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">Al enviar, aceptas que Patricia reciba tu mensaje y email para leer y responder tu reflexión. No se publicará automáticamente.</p>
          {error && <p role="alert" className="text-sm">{error}</p>}
          <div className="flex justify-end"><Button type="submit" disabled={state === 'sending'} className="kintsugi-submit h-12 rounded-none px-7">{state === 'sending' ? 'Enviando…' : 'Enviar mensaje'}<ArrowRight strokeWidth={1.2} /></Button></div>
        </form>
      )}
    </main>
  );
}
