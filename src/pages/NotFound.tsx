import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-5">
      <h1 className="font-serif text-4xl text-foreground">404</h1>
      <p className="text-muted-foreground">Esta página no existe.</p>
      <Link to="/" className="text-navy underline">
        Volver al inicio
      </Link>
    </main>
  );
}
