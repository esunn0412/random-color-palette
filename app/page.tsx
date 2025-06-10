import { ThemeToggle } from '@/components/feature/themeToggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="relative container flex min-h-screen min-w-screen flex-col items-center justify-center caret-transparent">
      <div className="absolute top-4 right-4 z-10 cursor-pointer">
        <ThemeToggle />
      </div>

      <h1 className="text-primary text-4xl font-bold">A Random Color Palette Generator</h1>
      <p className="text-muted-foreground mt-4 text-lg">
        Click the button below to generate a new palette!
      </p>

      <div className="mt-4 flex items-center">
        <Button variant="outline" className="dark:border-primary/30 cursor-pointer">
          Generate
        </Button>
      </div>
    </main>
  );
}
