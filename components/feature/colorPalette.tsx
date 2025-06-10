import { Color } from '@/lib/types';
import { Card } from '@/components/ui/card';

export default function ColorPalette({ palette }: { palette: Color[] }) {
  return (
    <div className="container flex gap-4">
      {palette.map((color, index) => (
        <Card
          key={index}
          className="flex aspect-square w-sm items-center justify-center"
          style={{ backgroundColor: color.hex }}
        >
          <p className="pt-6 text-center text-xl font-bold">{color.hex}</p>
        </Card>
      ))}
    </div>
  );
}
