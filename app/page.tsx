// HomePage Component actualizado
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function HomePage() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Fondo animado */}
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        // Sin dimensiones fijas para evitar overflow
      />

      {/* Contenido principal */}
      <div className="relative z-10 text-center space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Hello, I am{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Raul Herrera
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Systems Engineer and Software Developer focused on creating efficient
          and scalable solutions.
        </p>
      </div>
    </section>
  );
}
