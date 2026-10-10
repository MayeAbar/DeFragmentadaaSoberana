import { createFileRoute, Link } from '@tanstack/react-router';
import { pageHead } from '@/lib/community';
import kintsugiImage from '@/assets/kintsugi-manifesto.jpg';

export const Route = createFileRoute('/acerca-de-mi')({
  head: () => pageHead('Acerca de Mí · Manifiesto Kintsugi', 'Dejé de pedir permiso para ocupar espacio: un manifiesto sobre reconstruir las piezas rotas con oro y recuperar la soberanía.'),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Acerca de Mí · Patricia Abar</p>
        <h1 className="mt-5 font-serif text-5xl italic leading-tight md:text-6xl">Dejé de pedir permiso para ocupar espacio</h1>
        <p className="mt-5 font-serif text-xl text-muted-foreground">El manifiesto de mi reconstrucción</p>
        <span className="kintsugi-rule mx-auto mt-8 block" />
      </header>
      <img src={kintsugiImage} width={1536} height={1024} alt="Un cuenco de cerámica reconstruido con delicadas uniones de oro Kintsugi" className="mt-10 aspect-[2/1] w-full object-cover" />
      <article className="mx-auto mt-12 max-w-2xl">
        <p className="font-serif text-3xl italic leading-snug">No quiero borrar mis grietas. Quiero aprender a habitarlas.</p>
        <div className="mt-8 space-y-7 font-serif text-2xl leading-9 text-foreground">
          <p>El Kintsugi es el arte de unir con oro las piezas de una cerámica rota. No esconde la fractura ni intenta fingir que nunca ocurrió. La reconoce, la cuida y la convierte en parte de una belleza nueva.</p>
          <p>Encuentro en esa imagen una forma de nombrar mi camino: recoger las partes de mí que fui dejando atrás, mirarlas sin vergüenza y darles un lugar. No para volver a ser la de antes, sino para construir una vida en la que pueda estar entera.</p>
          <p>Durante demasiado tiempo, ocupar espacio pareció exigir permiso. Permiso para querer más, para decir que no, para cambiar de dirección. Hoy elijo dejar de hacerme pequeña para encajar.</p>
          <p>Mi oro no es una vida perfecta. Es la conciencia con la que aprendo, los límites que sostengo y la constancia de volver a mí. Es reconocer el miedo sin entregarle todas mis decisiones.</p>
          <p>Financiero. Cuerpo. Maternidad. Mujer. Mentalidad y Espiritualidad. Cinco pilares que no compiten por fragmentarme: se encuentran para sostener una misma vida.</p>
          <p>Este diario es una parte de esa reconstrucción. Aquí hay preguntas, avances y días difíciles. No necesito tener todas las respuestas para comenzar a escribir mi propia historia.</p>
          <p className="border-l border-accent pl-6 italic">No soy menos valiosa por lo que se rompió. Soy una mujer aprendiendo a unir sus piezas con intención. De fragmentada a soberana.</p>
        </div>
        <p className="mt-10 font-serif text-3xl italic">María</p>
        <Link to="/hablemos" className="mt-8 inline-block border-b border-accent pb-2 text-sm">Buzón de Soberanía →</Link>
      </article>
    </main>
  );
}
