'use client';

import { ThemeToggle } from '@/components/feature/themeToggle';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { savePalette, getPalettes, deletePalette } from '@/app/actions';
import { Color, Palette } from '@/lib/types';
import { useEffect } from 'react';
import ColorPalette from '@/components/feature/colorPalette';
import { X } from 'lucide-react';
import { createHash } from 'crypto';
import { Toaster, toast } from 'sonner';
import { useInView } from 'react-intersection-observer';
import { useActionState } from 'react';
import ScrollIndicator from '@/components/scrollIndicator';

export default function Home() {
  const [palette, setPalette] = useState<Color[]>([]);
  const [savedPalettes, setSavedPalettes] = useState<Palette[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.6,
    // triggerOnce: true,
  });

  useEffect(() => {
    const load = async () => {
      const palettes = await getPalettes();
      setSavedPalettes(palettes);
    };
    load();
  }, []);

  const generateContentHash = (colors: Color[]): string => {
    const hash = createHash('sha256');
    colors.forEach((color) => hash.update(color.hex));
    return hash.digest('hex');
  };

  const generatePalette = (): Color[] => {
    const colors: Color[] = [];
    for (let i = 0; i < 3; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')}`;
      colors.push({ hex: randomColor });
    }
    return colors;
  };

  const handleGenerate = () => {
    setPalette(generatePalette());
  };

  const handleSave = async () => {
    if (palette.length === 0) return;

    const newPalette: Palette = {
      id: generateContentHash(palette),
      colors: [...palette],
    };

    const exists = savedPalettes.some((p) => p.id === newPalette.id);
    if (exists) {
      toast.error('Palette already saved!');
      return;
    }

    await savePalette(newPalette);
    const updatedPalettes = await getPalettes();
    setSavedPalettes(updatedPalettes);
  };

  const handleDelete = async (id: string) => {
    await deletePalette(id);
    const updatedPalettes = await getPalettes();
    setSavedPalettes(updatedPalettes);
  };

  return (
    <main className="relative container mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 caret-transparent sm:px-6">
      {/* Theme toggle button - positioned at the top left corner */}
      <div className="absolute top-4 z-10 cursor-pointer">
        <ThemeToggle />
      </div>
      <Toaster richColors />

      {/* main content */}
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="dark:text-primary text-3xl font-bold sm:text-4xl md:text-5xl">
          A Random Color Palette Generator
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Click the button below to generate a new palette!
        </p>

        <div className="mt-6 flex items-center gap-4">
          <Button
            onClick={handleGenerate}
            variant="outline"
            className="bg-primary/80 dark:border-primary/30 cursor-pointer"
          >
            Generate
          </Button>
          {palette.length > 0 && (
            <Button
              onClick={handleSave}
              variant="secondary"
              className="bg-primary/20 cursor-pointer"
            >
              Save Palette
            </Button>
          )}
        </div>

        {/* generated palette */}
        {palette.length > 0 && (
          <div className="mt-8 w-full max-w-2xl gap-4 px-4">
            <ColorPalette palette={palette} />
          </div>
        )}
      </div>

      {/* Scroll indicator - positioned at bottom of viewport */}
      <ScrollIndicator inView={inView} savedPalettes={savedPalettes.length > 0} />

      {/* saved palettes */}
      {savedPalettes.length > 0 && (
        <div ref={ref} className="container mt-8 flex flex-col gap-4 py-20">
          <h2 className="text-2xl font-bold">Saved Palettes</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedPalettes.map((palette) => (
              <Card
                key={palette.id}
                className="relative flex flex-col items-center justify-center p-4"
              >
                <ColorPalette palette={palette.colors} />
                <Button
                  onClick={() => handleDelete(palette.id)}
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 size-6 cursor-pointer"
                >
                  <X />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
