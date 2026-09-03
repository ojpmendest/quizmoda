import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Check, AlertTriangle } from "lucide-react";
import { track } from "../analytics";
import { CommentList } from "../components/Comments";

const A = import.meta.env.BASE_URL + "assets";

const STEPS = [
  "intro_start",
  "age",
  "challenge",
  "climate",
  "name",
  "feeling",
  "desire",
  "loading1",
  "motivation",
  "intro",
  "plan",
  "loading2",
] as const;
type Step = (typeof STEPS)[number];

type Variant = "elegantes" | "gastando" | "versatil" | "impulsivas";

const VARIANT_COPY: Record<Variant, { intro: string; body: string }> = {
  elegantes: {
    intro: "¡Mereces un estilo que transmita sofisticación y personalidad!",
    body: "aprenderás a armar combinaciones refinadas y con mucho encanto, sin esfuerzo.",
  },
  gastando: {
    intro: "¡Estar bien vestida no significa gastar una fortuna!",
    body: "harás las elecciones correctas, maximizando tu estilo sin que se note en el bolsillo.",
  },
  versatil: {
    intro: "¡Basta de sentir que no tienes qué ponerte!",
    body: "aprenderás a crear múltiples looks con pocas prendas, con versatilidad y practicidad en el día a día.",
  },
  impulsivas: {
    intro: "¡Basta de gastar dinero en ropa que casi no usas!",
    body: "aprenderás a tomar decisiones inteligentes, armando un clóset funcional y sin desperdicios.",
  },
};

const PRELOAD: Partial<Record<Step, string[]>> = {
  age: [`${A}/age-1-BXGbnnI4.jpg`, `${A}/age-2-Dsu6hjrq.jpg`, `${A}/age-3-CQ5ERWLX.jpg`, `${A}/age-4-CbsciYeo.jpg`],
  loading2: [`${A}/patricia-DtoQARG9.jpg`],
};

function Shell({
  title,
  subtitle,
  centered,
  children,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-6 ${centered ? "justify-center flex-1" : ""}`}>
      <div className="space-y-2 text-center">
        <h1 className="font-serif text-2xl md:text-3xl text-foreground font-bold leading-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full h-14 bg-navy hover:bg-navy/90 text-cream text-base rounded-xl disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function OptionList({
  options,
  onSelect,
}: {
  options: { emoji: string; text: string }[];
  onSelect: (text: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((o) => (
        <button
          key={o.text}
          onClick={() => onSelect(o.text)}
          className="w-full flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-navy hover:bg-navy/5 transition-colors text-left"
        >
          <span className="text-2xl shrink-0">{o.emoji}</span>
          <span className="flex-1 text-sm md:text-base text-foreground">{o.text}</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ label }: { label: string }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 3000;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / dur) * 100));
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-foreground font-medium gap-3">
        <span className="text-sm md:text-base">{label}</span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-navy transition-[width] duration-100 ease-linear" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function LooksChart() {
  return (
    <div className="bg-background rounded-xl p-4 text-left">
      <p className="text-sm font-semibold mb-3">La cantidad de looks en tu clóset:</p>
      <svg viewBox="0 0 300 160" className="w-full h-40">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="gFill" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M10,140 Q60,120 90,90 T180,55 T290,20 L290,150 L10,150 Z" fill="url(#gFill)" />
        <path d="M10,140 Q60,120 90,90 T180,55 T290,20" stroke="url(#g)" strokeWidth="3" fill="none" />
        <circle cx="40" cy="132" r="6" fill="hsl(var(--navy))" />
        <text x="52" y="128" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600">
          Sin la guía
        </text>
        <circle cx="270" cy="28" r="6" fill="hsl(var(--navy))" />
        <text x="262" y="22" fontSize="11" fill="hsl(var(--foreground))" fontWeight="600" textAnchor="end">
          Con la guía
        </text>
      </svg>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Bajo</span>
        <span>Medio</span>
        <span>Alto</span>
      </div>
    </div>
  );
}

export default function Quiz() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const step = STEPS[index];
  const [name, setName] = useState("");
  const [feelings, setFeelings] = useState<string[]>([]);
  const [variant, setVariant] = useState<Variant>("versatil");
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const progress = ((index + 1) / STEPS.length) * 100;

  const next = () => setIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const back = () => setIndex((i) => Math.max(i - 1, 0));

  const answer = (key: string, value: unknown) => {
    setAnswers((prev) => {
      const merged = { ...prev, [key]: value };
      track("quiz_answer", { step: key, value });
      return merged;
    });
  };

  useEffect(() => {
    track("quiz_start");
  }, []);

  // back-guard: al intentar salir con "atrás" (ya empezado el quiz), mostramos un aviso en vez de dejar salir
  const [showExit, setShowExit] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("back_guard_done")) return;
    history.pushState(null, "", window.location.href);
    const onPop = () => {
      if (sessionStorage.getItem("back_guard_done")) return;
      history.pushState(null, "", window.location.href);
      setShowExit(true);
      track("back_guard_shown");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const stayInQuiz = () => {
    setShowExit(false);
    track("back_guard_stay");
  };
  const leaveQuiz = () => {
    sessionStorage.setItem("back_guard_done", "1");
    track("back_guard_leave");
    window.location.hash = "#/oferta";
  };

  // one funnel event per step view — this is what PostHog reads to show drop-off
  useEffect(() => {
    track("quiz_step", { step_index: index, step_name: step });
  }, [index, step]);

  useEffect(() => {
    if (name.trim()) localStorage.setItem("quiz_name", name.trim());
  }, [name]);

  // preload upcoming images
  useEffect(() => {
    for (let i = index; i < STEPS.length; i++) {
      PRELOAD[STEPS[i]]?.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [index]);

  useEffect(() => {
    if (step === "loading1") {
      const t = setTimeout(next, 3000);
      return () => clearTimeout(t);
    }
    if (step === "loading2") {
      const t = setTimeout(() => {
        track("quiz_complete", { answers });
        navigate("/oferta");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [step, navigate, answers]);

  const greeting = useMemo(() => (name ? `${name}, ` : ""), [name]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {showExit && (
        <div className="fixed inset-0 z-50 bg-navy/70 flex items-center justify-center p-5">
          <div className="bg-background rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl border-2 border-destructive">
            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="font-serif text-xl md:text-2xl text-foreground font-bold">
              Si sales ahora, este quiz se cierra
            </h2>
            <p className="text-foreground text-sm">
              Es de acceso único. Si lo cierras <strong>no vas a poder volver a hacerlo</strong> y pierdes tu lista
              personalizada de 30 piezas y tus 300 looks.
            </p>
            <button
              onClick={stayInQuiz}
              className="w-full h-12 rounded-xl text-cream font-semibold"
              style={{ background: "linear-gradient(90deg, hsl(145 35% 45%), hsl(145 45% 55%))" }}
            >
              {index === 0 ? "No, quiero empezar" : "No, quiero terminar"}
            </button>
            <button onClick={leaveQuiz} className="text-xs text-muted-foreground underline">
              Salir y perder mi acceso
            </button>
          </div>
        </div>
      )}
      <div className="w-full px-4 pt-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={back}
            disabled={index === 0}
            aria-label="Volver"
            className="shrink-0 text-foreground disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden flex-1">
            <div className="h-full bg-navy transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="flex-1 container max-w-2xl mx-auto px-5 py-8 md:py-12 flex flex-col">
        {step === "intro_start" && (
          <div className="flex flex-col justify-center flex-1 gap-5 text-center">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Guía 30 piezas · 300 looks
            </p>
            <h1 className="font-serif text-2xl md:text-4xl text-foreground leading-tight">
              Tu clóset está lleno y aún así no tienes nada que ponerte.
            </h1>
            <p className="text-foreground text-base md:text-lg -mt-2">
              Empieza de cero con <strong>30 piezas estratégicas</strong>.
            </p>
            <img
              src={`${A}/antes-despues.jpg`}
              alt="Antes y después: de no saber qué ponerte a tener 300 looks con 30 piezas"
              className="w-full rounded-2xl shadow-md"
            />
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Responde unas preguntas rápidas —tu clima, tu rutina y tu estilo— y descubre tu lista de 30 piezas, los{" "}
              300 looks ya armados y los enlaces de cada pieza.
            </p>
            <button
              onClick={next}
              className="w-full h-14 md:h-16 rounded-xl text-cream text-base md:text-lg font-semibold shadow-md hover:opacity-95 transition-opacity"
              style={{ background: "linear-gradient(90deg, hsl(145 35% 45%), hsl(145 45% 55%))" }}
            >
              Ver mis 30 piezas
            </button>
            <p className="text-xs text-muted-foreground">Menos de 2 minutos</p>
          </div>
        )}

        {step === "age" && (
          <Shell title="¿Cuál es tu edad?">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "18-29", img: `${A}/age-1-BXGbnnI4.jpg` },
                { label: "29-39", img: `${A}/age-2-Dsu6hjrq.jpg` },
                { label: "39-49", img: `${A}/age-3-CQ5ERWLX.jpg` },
                { label: "50+", img: `${A}/age-4-CbsciYeo.jpg` },
              ].map((o) => (
                <button
                  key={o.label}
                  onClick={() => {
                    answer("age", o.label);
                    next();
                  }}
                  className="rounded-2xl overflow-hidden bg-navy shadow-md hover:scale-[1.02] transition-transform text-left"
                >
                  <img src={o.img} alt={o.label} className="w-full aspect-square object-cover" />
                  <div className="px-4 py-3 text-cream text-sm font-medium">{o.label}</div>
                </button>
              ))}
            </div>
          </Shell>
        )}

        {step === "challenge" && (
          <Shell title="¿Cuál de estos desafíos enfrentas a la hora de vestirte?">
            <OptionList
              onSelect={(v) => {
                answer("challenge", v);
                next();
              }}
              options={[
                { emoji: "🤯", text: "Siento que no tengo nada que ponerme, aunque el clóset esté lleno." },
                { emoji: "😬", text: "Siempre uso las mismas prendas y me aburro de mis looks." },
                { emoji: "🙂", text: "Gasto mucho dinero en ropa que queda guardada sin usar." },
                { emoji: "🧐", text: "Me cuesta armar looks prácticos y elegantes." },
              ]}
            />
          </Shell>
        )}

        {step === "climate" && (
          <Shell title="¿Cómo es el clima en tu ciudad?">
            <OptionList
              onSelect={(v) => {
                answer("climate", v);
                next();
              }}
              options={[
                { emoji: "🥵", text: "Cálido la mayor parte del año" },
                { emoji: "🥶", text: "Frío la mayor parte del año" },
                { emoji: "🙂", text: "Clima variado (tengo las cuatro estaciones)" },
              ]}
            />
          </Shell>
        )}

        {step === "name" && (
          <Shell title="¿Cuál es tu nombre?" centered>
            <div className="space-y-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre..."
                className="w-full h-14 text-base rounded-xl border border-border bg-background px-4 outline-none focus:border-navy"
              />
              <PrimaryButton
                disabled={!name.trim()}
                onClick={() => {
                  answer("name", name.trim());
                  next();
                }}
              >
                Continuar
              </PrimaryButton>
            </div>
          </Shell>
        )}

        {step === "feeling" && (
          <Shell
            title="¿Cómo te sientes cuando no sabes qué ponerte?"
            subtitle="Selecciona una o más opciones para avanzar"
          >
            <div className="space-y-3">
              {[
                { emoji: "🤔", text: "Perdida y sin creatividad. No logro combinar prendas ni crear un look armonioso." },
                { emoji: "😪", text: "Frustrada. Con la sensación de tener muchas opciones, pero ninguna parece la indicada." },
                { emoji: "🙁", text: "Insegura. Dudo si lo que llevo puesto es adecuado o tiene estilo." },
                {
                  emoji: "😩",
                  text: "Desesperada. Con la sensación de que el clóset es un problema complejo y difícil de resolver.",
                },
              ].map((o) => {
                const on = feelings.includes(o.text);
                return (
                  <button
                    key={o.text}
                    onClick={() => setFeelings((p) => (on ? p.filter((x) => x !== o.text) : [...p, o.text]))}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border bg-background text-left transition-colors ${
                      on ? "border-navy bg-navy/5" : "border-border"
                    }`}
                  >
                    <span className="text-2xl shrink-0">{o.emoji}</span>
                    <span className="flex-1 text-sm text-foreground">{o.text}</span>
                    <span
                      className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center ${
                        on ? "bg-navy border-navy text-cream" : "border-border"
                      }`}
                    >
                      {on && <Check className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                );
              })}
              <PrimaryButton
                disabled={feelings.length === 0}
                onClick={() => {
                  answer("feeling", feelings);
                  next();
                }}
              >
                Continuar
              </PrimaryButton>
            </div>
          </Shell>
        )}

        {step === "desire" && (
          <Shell title={`${greeting}¿cuál es tu mayor deseo al vestirte?`}>
            <div className="space-y-3">
              {[
                { emoji: "🧥", text: "Tener looks más elegantes y con estilo.", key: "elegantes" as Variant },
                { emoji: "💸", text: "Vestirme bien gastando poco.", key: "gastando" as Variant },
                { emoji: "👚", text: "Tener un clóset versátil que me dé muchos looks.", key: "versatil" as Variant },
                { emoji: "🛍️", text: "Evitar compras innecesarias e impulsivas.", key: "impulsivas" as Variant },
              ].map((o) => (
                <button
                  key={o.text}
                  onClick={() => {
                    setVariant(o.key);
                    answer("desire", o.key);
                    next();
                  }}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-navy hover:bg-navy/5 transition-colors text-left"
                >
                  <span className="text-2xl shrink-0">{o.emoji}</span>
                  <span className="flex-1 text-sm md:text-base text-foreground">{o.text}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </Shell>
        )}

        {step === "loading1" && (
          <div className="space-y-6">
            <ProgressBar label="Cargando..." />
            <p className="text-center text-muted-foreground text-sm">Preparando las siguientes preguntas...</p>
            <CommentList className="pt-2" />
          </div>
        )}

        {step === "motivation" && (
          <Shell title="¿Cuál es tu nivel de motivación para mejorar tus looks?">
            <OptionList
              onSelect={(v) => {
                answer("motivation", v);
                next();
              }}
              options={[
                { emoji: "🥳", text: "¡Estoy muy decidida!" },
                { emoji: "😊", text: "Quiero aprender de a poco." },
                { emoji: "😮", text: "Quiero, pero tengo miedo de equivocarme al elegir las prendas." },
              ]}
            />
          </Shell>
        )}

        {step === "intro" && (
          <Shell title={`${greeting}¡te vamos a ayudar!`} centered>
            <div className="space-y-5 text-center">
              <p className="text-muted-foreground">{VARIANT_COPY[variant].intro}</p>
              <p className="text-foreground">
                Con nuestro método de <strong>300 looks con apenas 30 prendas</strong>, {VARIANT_COPY[variant].body}
              </p>
              <PrimaryButton onClick={next}>Continuar</PrimaryButton>
            </div>
          </Shell>
        )}

        {step === "plan" && (
          <Shell title="Armé un plan práctico para ti." centered>
            <div className="space-y-5 text-center">
              <p className="text-muted-foreground">
                Según tus respuestas, ¡estás lista para multiplicar tus looks!
              </p>
              <p className="text-foreground">
                Con el método <strong>Clóset Casual Chic</strong> vas a armar looks increíbles con apenas 30 prendas.
              </p>
              <LooksChart />
              <PrimaryButton onClick={next}>Quiero saber más...</PrimaryButton>
            </div>
          </Shell>
        )}

        {step === "loading2" && (
          <div className="flex flex-col items-center justify-center flex-1 space-y-8 py-10">
            <img
              src={`${A}/patricia-DtoQARG9.jpg`}
              alt="Patricia Álvarez"
              className="w-56 h-56 md:w-64 md:h-64 rounded-3xl object-cover shadow-lg"
            />
            <ProgressBar label="Analizando tu perfil según tus respuestas" />
          </div>
        )}
      </div>

      <footer className="text-center text-xs text-muted-foreground py-4 px-4">
        © 2026 · Guía 30 prendas, 300 looks · Contenido propietario
      </footer>
    </main>
  );
}
