'use server';
import { Palette } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Validate individual color
const ColorSchema = z.object({
  hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid HEX color'),
});

// Validate entire palette
const PaletteSchema = z.object({
  id: z.string(),
  colors: z.array(ColorSchema).min(1).max(5), // 1-10 colors
});

let palettes: Palette[] = [];

interface ActionState {
  success: boolean;
  message: string;
  errors?: z.ZodIssue[];
}

// Save palette to in-memory storage
export async function savePaletteAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  // Validate palette
  const rawData = {
    id: formData.get('id') as string,
    colors: JSON.parse(formData.get('colors') as string), // Parse JSON array
  };

  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay for testing

  const result = PaletteSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: result.error.issues,
    };
  }

  const newPalette = result.data;
  try {
    palettes = [newPalette, ...palettes.filter((p) => p.id !== newPalette.id)];
    revalidatePath('/');
    return {
      success: true,
      message: 'Palette saved successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to save palette',
    };
  }
}

export async function getPalettes(): Promise<Palette[]> {
  return palettes;
}

// Delete saved palette
export async function deletePalette(id: string): Promise<ActionState> {
  try {
    if (!id) {
      throw new Error('ID required');
    }

    palettes = palettes.filter((p) => p.id !== id);
    revalidatePath('/');

    return {
      success: true,
      message: 'Palette deleted',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Deletion failed',
    };
  }
}
