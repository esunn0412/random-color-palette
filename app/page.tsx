import { ThemeToggle } from '@/components/feature/themeToggle';

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">A Random Color Palette Generator</h1>
      <p className="text-muted-foreground mt-4 text-lg">
        Click the button below to generate a new palette!
      </p>

      <div className="mt-4 flex flex-col items-center">
        <ThemeToggle />
      </div>
    </main>
  );
}
