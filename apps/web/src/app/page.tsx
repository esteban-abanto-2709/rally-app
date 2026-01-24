import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          shadcn/ui está funcionando ✅
        </h1>

        <p className="text-muted-foreground">
          Si ves este botón con estilos, todo está bien instalado
        </p>

        <div className="flex gap-4 justify-center">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  );
}
