import { useEffect, useState } from "react";
import { Play, ShieldCheck } from "lucide-react";
import { track } from "../analytics";
import { CommentList } from "../components/Comments";

const A = import.meta.env.BASE_URL + "assets";

const CHECKOUT_BASE = "https://pay.hotmart.com/R107426993S?checkoutMode=10";

/** forwards utm/query params onto the checkout URL, same behaviour as the original */
function checkoutUrl() {
  const inParams = new URLSearchParams(window.location.search);
  const out = new URLSearchParams();
  if (!inParams.has("src") && inParams.has("utm_source")) out.set("src", inParams.get("utm_source")!);
  if (!inParams.has("sck") && inParams.has("utm_campaign")) out.set("sck", inParams.get("utm_campaign")!);
  inParams.forEach((v, k) => {
    if (!k.startsWith("__")) out.set(k, v);
  });
  try {
    const fbc = localStorage.getItem("meta_fbc");
    if (fbc && !out.has("sck")) out.set("sck", fbc);
  } catch (e) {
    /* localStorage unavailable */
  }
  return out.toString() ? `${CHECKOUT_BASE}&${out.toString()}` : CHECKOUT_BASE;
}

function CheckoutLink({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      id="btncheckout"
      href={checkoutUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("checkout_click")}
      className={className}
    >
      {children}
    </a>
  );
}

const BENEFITS = [
  {
    type: "looks",
    title: "300 looks listos",
    description:
      "Looks listos y clasificados por clima y ocasión para que los recrees rápido y sin complicaciones. Basta de perder tiempo al vestirte: ten siempre la combinación perfecta a tu alcance.",
  },
  {
    type: "links",
    title: "Enlaces de todas las prendas",
    description: (
      <>
        Acceso a enlaces <strong>actualizados cada semana</strong> con prendas en <strong>distintos rangos</strong> de
        precio y para diversas ocasiones. Elige tus favoritas y renueva tu estilo sin esfuerzo.
      </>
    ),
  },
  {
    type: "climas",
    title: "Adaptación a diferentes climas",
    description:
      "Sugerencias de ajustes en las prendas para que estés siempre con estilo y cómoda, sin importar la temperatura de tu región.",
  },
  {
    type: "masterclass",
    title: "Masterclass: las prendas que van a salvar tu clóset",
    description:
      "Aprende a elegir cortes, colores y características de las prendas correctas para multiplicar tu clóset, creando combinaciones versátiles y elegantes con facilidad.",
  },
] as const;

const BONUS = [
  "Clóset con colores y estampados.",
  "Clóset de trabajo.",
  "Clóset de verano.",
  "Guías de combinación de prendas, materiales generales con combinaciones por tipo de prenda: blusa, pantalón, falda y otras (para quienes envíen sus looks).",
];

const RESULT_IMGS: { src: string; name: string }[] = [
  { src: `${A}/looks-adriely-Cwcudlr2.jpg`, name: "Ximena" },
  { src: `${A}/looks-clara-0m-JWbhg.jpg`, name: "Andrea" },
  { src: `${A}/looks-indianara-B8zhfQTC.jpg`, name: "Paulina" },
  { src: `${A}/looks-juliana-Bwzs0WJ2.jpg`, name: "Mariana" },
  { src: `${A}/looks-gabriela-lDo2dx3c.jpg`, name: "Alejandra" },
  { src: `${A}/looks-analuiza-wygCx5_v.jpg`, name: "Renata" },
  { src: `${A}/looks-rosana-BQG3EoyS.jpg`, name: "Carolina" },
  { src: `${A}/looks-lais-BNyPyCoE.jpg`, name: "Mónica" },
];

const BEFORE = [
  "Looks siempre iguales",
  "Inseguridad en los looks",
  "Tiempo perdido pensando qué ponerte",
  "Métodos complicados y difíciles de aplicar",
  "Looks sin coherencia",
];

const AFTER = [
  "Looks variados",
  "Seguridad al combinar las prendas",
  "Combinaciones rápidas y automáticas",
  "Un método simple y fácil de seguir",
  "Looks más interesantes y elegantes",
];

const CARD_BTN =
  "w-full h-14 md:h-16 bg-destructive hover:bg-destructive/90 text-white text-base md:text-lg font-semibold rounded-xl shadow-lg flex items-center justify-center";

function useName() {
  const [name, setName] = useState("");
  useEffect(() => setName(localStorage.getItem("quiz_name") || ""), []);
  return name;
}

/** Mini header shown inside the benefit-preview mockups (in place of the PT screenshots). */
function MockHeader() {
  return (
    <div className="flex items-center gap-2 px-3 pt-3">
      <img src={`${A}/av-patricia.jpg`} alt="Patricia Álvarez" className="w-6 h-6 rounded-full object-cover" />
      <div className="leading-tight">
        <p className="text-[10px] font-semibold text-foreground">Patricia Álvarez</p>
        <p className="text-[9px] text-muted-foreground">@patyalvarez</p>
      </div>
    </div>
  );
}

function MockLinks() {
  return (
    <div className="w-full h-full overflow-hidden bg-background flex flex-col">
      <MockHeader />
      <div className="px-3 mt-1">
        <p className="text-[11px] text-foreground">Enlaces de las 30 prendas</p>
        <p className="text-xs font-bold text-foreground border-b border-border pb-1">Calzado</p>
      </div>
      <div className="grid grid-cols-3 gap-1 px-3 mt-2">
        {["shoe-heel", "shoe-sandalheel", "shoe-sneaker"].map((s) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <img src={`${A}/${s}.png`} alt="" className="h-10 object-contain" />
            <span className="text-[8px] font-bold text-white bg-green-700 rounded px-2 py-0.5">Opción 1</span>
            <span className="text-[8px] font-bold text-white bg-green-700 rounded px-2 py-0.5">Opción 2</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockClimas() {
  return (
    <div className="w-full h-full overflow-hidden bg-background flex flex-col">
      <MockHeader />
      <p className="text-xs font-bold text-foreground text-center px-3 mt-1 leading-tight">
        Sustituciones para climas más fríos ❄️
      </p>
      <img src={`${A}/clima-row0.png`} alt="Sustituciones de prendas para frío" className="w-full object-contain mt-1 px-2" />
      <p className="text-[8px] text-muted-foreground px-3 mt-1 leading-tight">
        Tops sin mangas → blusas térmicas de manga larga (en negro y blanco).
      </p>
    </div>
  );
}

function Benefits() {
  const name = useName();
  return (
    <section id="sobre" className="py-12 md:py-16 bg-cream">
      <div className="container mx-auto px-5 md:px-16">
        <div className="text-center mb-10 md:mb-14 space-y-3 max-w-2xl mx-auto">
          <h2 className="text-foreground text-2xl md:text-4xl font-serif font-bold leading-tight">
            {name ? `${name}, ` : ""}¡transforma tu clóset!
          </h2>
          <p className="text-foreground text-base md:text-xl font-semibold">
            30 prendas, 300 looks increíbles y tú con más confianza.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto">
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-navy/30 bg-navy/5 p-3 md:p-6 space-y-3 md:space-y-4"
            >
              <div className="rounded-xl overflow-hidden bg-background aspect-[4/3] flex items-center justify-center">
                {b.type === "looks" && (
                  <div className="flex w-full h-full">
                    <img src={`${A}/look-1-DCRjKqkL.jpg`} alt="Look 1" className="w-1/2 h-full object-cover" />
                    <img src={`${A}/look-2-CYMxGEya.jpg`} alt="Look 2" className="w-1/2 h-full object-cover" />
                  </div>
                )}
                {b.type === "links" && <MockLinks />}
                {b.type === "climas" && <MockClimas />}
                {b.type === "masterclass" && (
                  <div className="relative w-full h-full">
                    <img
                      src={`${A}/masterclass-video-DmrqZ6a3.jpg`}
                      alt="Masterclass Patricia"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/15">
                      <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-navy fill-navy ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="text-foreground text-sm md:text-xl font-bold flex items-start gap-2">
                <span aria-hidden>✅</span>
                <span>{b.title}</span>
              </h3>
              <p className="text-foreground/80 text-xs md:text-base leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto mt-12 md:mt-16 space-y-4">
          <h3 className="text-center text-foreground text-2xl md:text-3xl font-bold">
            Y vamos a los bonos <span aria-hidden>👇</span>
          </h3>
          <ul className="space-y-3 pt-2">
            {BONUS.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground text-base leading-relaxed">
                <span aria-hidden className="text-xl shrink-0">
                  🎁
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  const [left, setLeft] = useState(583);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <section id="oferta" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-5 md:px-16 max-w-xl">
        <div className="space-y-6 mb-8">
          <div className="text-center">
            <span className="inline-block bg-foreground text-background text-2xl md:text-3xl font-bold px-4 py-1.5 rounded">
              Acceso de por vida
            </span>
          </div>
          <p className="text-foreground text-base md:text-lg leading-relaxed">
            Hoy haces un único pago de US$ 9,90 (en vez de US$ 197) y tienes acceso al material de por vida.
          </p>
          <div className="text-center pt-2">
            <span className="inline-block bg-foreground text-background text-2xl md:text-3xl font-bold px-4 py-1.5 rounded">
              Riesgo CERO
            </span>
          </div>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Garantizamos el reembolso total del valor pagado dentro de los 7 días posteriores a la compra.
          </p>
        </div>

        <div className="rounded-xl bg-destructive/10 py-3 text-center mb-3">
          <span className="text-destructive font-medium">
            El precio de lanzamiento termina hoy · {mm}:{ss}
          </span>
        </div>

        <div className="rounded-xl border-2 border-navy overflow-hidden mb-3">
          <div className="bg-navy text-cream text-center py-2 text-sm font-semibold">
            Precio de lanzamiento · solo hoy
          </div>
          <div className="bg-background p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-foreground text-lg md:text-xl font-bold">Todo esto por:</p>
              <p className="text-muted-foreground text-sm md:text-base">
                De <span className="line-through">US$ 197</span> — hoy solo pagas
              </p>
            </div>
            <div className="bg-muted rounded-lg px-4 py-3 text-center shrink-0">
              <p className="text-foreground text-2xl md:text-3xl font-bold">US$ 9,90</p>
              <p className="text-[10px] text-muted-foreground">pago único</p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mb-3">
          El pago es seguro y en la página de pago verás el precio convertido a la moneda de tu país.
        </p>
        <CheckoutLink className={CARD_BTN}>¡Sí, quiero mis 300 looks!</CheckoutLink>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-5 md:px-16 max-w-2xl">
        <h2 className="text-center text-foreground text-2xl md:text-3xl font-bold leading-tight mb-8">
          Únete a las mujeres que están aprovechando esta oportunidad.
        </h2>
        <CommentList className="mb-8" />
        <div className="space-y-4">
          {RESULT_IMGS.map((r, i) => (
            <div key={i} className="relative">
              <img src={r.src} alt={`Resultado de ${r.name}`} className="w-full rounded-xl border border-border" />
              <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/95 text-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {r.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadCta() {
  return (
    <section className="py-10 md:py-12 bg-background">
      <div className="container mx-auto px-5 max-w-xl text-center space-y-5">
        <h2 className="text-foreground text-2xl md:text-3xl font-bold">Descarga ahora tu guía</h2>
        <p className="text-sm text-muted-foreground">
          El pago es seguro y verás el precio en la moneda de tu país.
        </p>
        <CheckoutLink className={CARD_BTN}>¡Quiero transformar mi imagen!</CheckoutLink>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-5 md:px-16 max-w-2xl space-y-6">
        <div className="rounded-2xl bg-muted p-6 md:p-8 space-y-4">
          <h3 className="text-foreground text-xl md:text-2xl font-bold leading-tight">
            La vida antes del método 30 prendas 300 looks
          </h3>
          <ul className="space-y-3">
            {BEFORE.map((t) => (
              <li key={t} className="flex items-start gap-2 text-foreground/80 text-base">
                <span aria-hidden>❌</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-[hsl(120_60%_92%)] p-6 md:p-8 space-y-4">
          <h3 className="text-foreground text-xl md:text-2xl font-bold leading-tight">La vida después del método</h3>
          <ul className="space-y-3">
            {AFTER.map((t) => (
              <li key={t} className="flex items-start gap-2 text-foreground text-base">
                <span aria-hidden>✅</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-5 md:px-16 max-w-2xl space-y-6">
        <h2 className="text-center text-foreground text-2xl md:text-3xl font-bold">Sobre mí</h2>
        <p className="text-foreground leading-relaxed">
          Patricia Álvarez es consultora de imagen y comenzó su camino compartiendo el dolor de muchas mujeres: la
          insatisfacción con la imagen personal y la dificultad de encajar en los estándares impuestos en el universo de
          la moda, el estilo y la imagen.
        </p>
        <p className="text-foreground leading-relaxed">
          Ya suma más de <strong>20.000 mujeres</strong> atendidas con su método.
        </p>
        <img
          src={`${A}/patricia-DtoQARG9.jpg`}
          alt="Patricia Álvarez, consultora de imagen"
          className="w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="py-10 bg-cream">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <CheckoutLink className="inline-block bg-gold text-navy hover:bg-gold/90 font-bold text-base px-10 py-4 rounded-full shadow-gold">
            ¡Quiero transformar mi imagen!
          </CheckoutLink>
          <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-gold" />
          </div>
          <h2 className="text-foreground text-3xl md:text-4xl font-serif">Garantía incondicional de 7 días</h2>
          <p className="text-muted-foreground leading-relaxed">
            Confiamos en el potencial de esta guía para que veas muchas más posibilidades en tu clóset, con looks más
            elegantes y más prácticos en el día a día.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Por eso tienes 7 días para entrar, ver todo con calma y decidir. Si por cualquier motivo sientes que no es
            para ti, solo escríbenos por WhatsApp pidiendo el reembolso.
          </p>
          <p className="text-foreground font-serif text-lg">
            Sin trámites. Sin preguntas.
            <br />
            Hacemos la solicitud de reembolso de inmediato.
          </p>
          <p className="text-foreground font-serif text-xl italic">El riesgo es todo nuestro.</p>
        </div>
      </div>
    </section>
  );
}

export default function Oferta() {
  useEffect(() => {
    track("oferta_view");
  }, []);
  return (
    <main className="overflow-hidden">
      <Benefits />
      <Offer />
      <SocialProof />
      <DownloadCta />
      <BeforeAfter />
      <About />
      <Guarantee />
      <footer className="py-8 bg-navy border-t border-gold/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-cream/30 text-sm">© 2026, Patricia Álvarez. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
