import { Heart } from "lucide-react";

const A = import.meta.env.BASE_URL + "assets";

/**
 * Cards de comentário estilo Instagram, em espanhol — substituem os screenshots
 * (depo-*.jpg) do funil original. Para usar fotos reais no avatar, troque
 * `avatar` (inicial) por uma <img>.
 */

type Comment = {
  user: string;
  time: string;
  byAuthor?: boolean;
  likes?: number;
  avatar?: string;
  text: string;
};

export const COMMENTS: Comment[] = [
  {
    user: "valentina.rmz",
    time: "hace 15 min",
    avatar: `${A}/av-vanessa.jpg`,
    text:
      "¡Vale muchííísimo!!! Testimonio sincero: me impresionó que entrega mucho más de lo que está vendiendo. Ya compré otros ebooks que no entregan ni la mitad de este contenido. ¡Felicitaciones Patricia y gracias por el excelente trabajo!",
  },
  {
    user: "sofi.vega",
    time: "hace 1 h",
    text:
      "Chicas, compré el e-book y me encantó. Ya vi a otras personas vendiendo e-books así, pero no eran tan buenos como parecían. El de @pathyalvarenga es sensacional 🙌",
  },
  {
    user: "dani.gtz",
    time: "hace 14 h",
    avatar: `${A}/av-erica.jpg`,
    text:
      "Vengo a elogiar el e-book (estoy encantada); entrega mucho más de lo que imaginaba. ¡Estoy feliz!!!! 😍 ¡felicitaciones por el trabajo!",
  },
  {
    user: "fer.castillo",
    time: "hace 6 sem",
    byAuthor: true,
    likes: 4,
    avatar: `${A}/av-beta.jpg`,
    text:
      "Pathy, quería agradecerte por el e-book, ¡fue un antes y un después en mi vida!!! Entregas mucho más de lo que prometes. Es un cambio de vida jaja!! Ahora logro hacer compras con intención, y de a poco estoy entrenando mi mirada para lo que de verdad encaja en mi clóset. Y cuando me da pereza pensar en el look, entro al e-book y elijo fácil qué ponerme. ¡Muchas gracias de verdad!!! ❤️👏",
  },
  {
    user: "cami.mrn",
    time: "hace 19 h",
    byAuthor: true,
    likes: 4,
    avatar: `${A}/av-camila.jpg`,
    text:
      'Durante mucho tiempo dejé de arreglarme por esos comentarios y porque "llamaba mucho la atención". Pero desde hace un tiempo dejé de darles importancia y volví a vestirme mejor. Compré tu guía para rehacer mi clóset literalmente desde cero. Doné todo lo que tenía y me estoy inspirando en tu guía, que me ha ayudado muchísimo.',
  },
  {
    user: "regina.luna_",
    time: "hace 13 min",
    avatar: `${A}/av-antunes.jpg`,
    text:
      "@pathyalvarenga ¡Compré la guía y me encantó!!! ¡Ya tengo muchas ideas de cómo armar los looks con lo que ya tengo!!! ❤️",
  },
];

const AVATAR_COLORS = ["#c2410c", "#b91c1c", "#a16207", "#4d7c0f", "#0f766e", "#6d28d9", "#be185d"];

function avatarColor(name: string) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function CommentCard({ c }: { c: Comment }) {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-background p-4 text-left">
      {c.avatar ? (
        <img
          src={c.avatar}
          alt={c.user}
          className="w-9 h-9 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-semibold"
          style={{ background: avatarColor(c.user) }}
          aria-hidden
        >
          {c.user[0].toUpperCase()}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">
          <span className="font-semibold">{c.user}</span>{" "}
          <span className="text-foreground/90">{c.text}</span>
        </p>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span>{c.time}</span>
          {typeof c.likes === "number" && <span>{c.likes} Me gusta</span>}
          <span className="font-medium">Responder</span>
          {c.byAuthor && <span className="italic">· del autor</span>}
        </div>
      </div>
      <Heart className="w-4 h-4 shrink-0 text-muted-foreground" />
    </div>
  );
}

export function CommentList({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {COMMENTS.map((c) => (
        <CommentCard key={c.user} c={c} />
      ))}
    </div>
  );
}
