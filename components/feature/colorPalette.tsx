import { Color } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ColorPalette({ palette }: { palette: Color[] }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Color copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy color.');
      });
  };

  return (
    <div className="container flex gap-4 px-2">
      {palette.map((color, index) => (
        <Card
          onClick={() => copyToClipboard(color.hex)}
          key={index}
          className="flex aspect-square w-sm cursor-pointer items-center justify-center"
          style={{ backgroundColor: color.hex }}
        >
          <p className="pt-3 text-center text-lg font-bold">{color.hex}</p>
        </Card>
      ))}
    </div>
  );
}
