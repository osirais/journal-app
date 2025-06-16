import { PaletteSelector } from "@/components/navbar/palette-selector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTransition } from "react";

export function OnboardTheme({ onSuccess }: { onSuccess: () => void }) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      onSuccess();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
      <Card className="h-128 flex w-full max-w-5xl flex-row items-stretch overflow-hidden p-0 shadow-xl">
        <div className="bg-secondary flex flex-1 flex-col justify-center gap-2 p-8">
          <h2 className="text-2xl font-semibold">Customize your experience</h2>
          <p className="text-secondary-foreground">Choose a theme that suits your style.</p>
        </div>
        <div className="bg-background flex flex-1 flex-col justify-center p-4">
          <PaletteSelector />
        </div>
      </Card>
      <div className="mt-4 flex w-full max-w-4xl justify-end">
        <Button type="submit" disabled={isPending} className="cursor-pointer">
          {isPending ? "Saving..." : "Next"}
        </Button>
      </div>
    </form>
  );
}
