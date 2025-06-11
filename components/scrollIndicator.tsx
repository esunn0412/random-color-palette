import { ArrowBigDown } from 'lucide-react';

export default function ScrollIndicator({
  inView,
  savedPalettes,
}: {
  inView: boolean;
  savedPalettes: boolean;
}) {
  return (
    <>
      {savedPalettes && !inView && (
        <div className="fixed right-0 bottom-4 left-0 flex animate-bounce justify-center sm:bottom-8">
          <div className="bg-background/80 flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
            <ArrowBigDown className="text-muted-foreground size-6" />
            <p className="text-muted-foreground">Saved palettes below</p>
          </div>
        </div>
      )}
    </>
  );
}
