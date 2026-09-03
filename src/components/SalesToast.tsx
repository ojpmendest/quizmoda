import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";

/**
 * Notificaciones de venta — DATOS SINTÉTICOS.
 * Los nombres, ciudades y tiempos son aleatorios, NO vienen de Hotmart.
 * Ajusta o quita `PEOPLE` / los intervalos según lo que quieras mostrar.
 */

const PEOPLE = [
  ["María Fernanda", "Ciudad de México"],
  ["Regina", "Monterrey"],
  ["Valeria", "Guadalajara"],
  ["Paulina", "Puebla"],
  ["Andrea", "Querétaro"],
  ["Mariana", "Mérida"],
  ["Alejandra", "León"],
  ["Ximena", "Toluca"],
  ["Daniela", "Tijuana"],
  ["Carolina", "San Luis Potosí"],
  ["Fernanda", "Aguascalientes"],
  ["Gabriela", "Cancún"],
  ["Renata", "Morelia"],
  ["Sofía", "Chihuahua"],
];

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

export function SalesToast() {
  const [item, setItem] = useState<{ name: string; city: string; mins: number } | null>(null);

  useEffect(() => {
    let hideT: ReturnType<typeof setTimeout>;
    let nextT: ReturnType<typeof setTimeout>;
    let queue = shuffle(PEOPLE);

    const show = () => {
      if (queue.length === 0) queue = shuffle(PEOPLE);
      const [name, city] = queue.shift()!;
      setItem({ name, city, mins: 2 + Math.floor(Math.random() * 38) });
      hideT = setTimeout(() => setItem(null), 5000);
      nextT = setTimeout(show, 6000);
    };

    const first = setTimeout(show, 6000);
    return () => {
      clearTimeout(first);
      clearTimeout(hideT);
      clearTimeout(nextT);
    };
  }, []);

  if (!item) return null;
  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-[300px] animate-[fadeIn_0.3s_ease]">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background shadow-lg p-3">
        <div className="w-9 h-9 shrink-0 rounded-full bg-navy/10 flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 text-navy" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground leading-snug">
            <span className="font-semibold">{item.name}</span> de {item.city} acaba de obtener la guía
          </p>
          <p className="text-xs text-muted-foreground">hace {item.mins} min</p>
        </div>
        <button onClick={() => setItem(null)} aria-label="Cerrar" className="text-muted-foreground shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
