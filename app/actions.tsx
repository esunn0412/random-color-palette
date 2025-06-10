'use server';
import { Palette } from '@/lib/types';
let palettes: Palette[] = [];

// Save palette to in-memory storage
export async function savePalette(palette: Palette): Promise<{ success: boolean }> {
  if (!palette || !palette.colors || palette.colors.length === 0) {
    return { success: false };
  }
  palettes = [palette, ...palettes.filter((p) => p.id !== palette.id)];
  return { success: true };
}

export async function getPalettes(): Promise<Palette[]> {
  return palettes;
}

// Delete saved palette
export async function deletePalette(id: string): Promise<{ success: boolean }> {
  if (!id) {
    return { success: false };
  }
  palettes = palettes.filter((p) => p.id !== id);
  return { success: true };
}
