"use client";

import { FlowerModel } from "@/components/garden/flower-model";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FLOWER_PROGRESSION_STAGES } from "@/constants/flower-stages";
import { Canvas } from "@react-three/fiber";

function FlowerScene({
  letter,
  color,
  locked
}: {
  letter: string;
  color: string;
  locked: boolean;
}) {
  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-transparent md:h-24 md:w-24">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} />
        <FlowerModel letter={letter} color={color} />
      </Canvas>
      {locked && <div className="pointer-events-none absolute inset-0 rounded-md bg-black/50" />}
    </div>
  );
}

export function FlowerProgression({ progress, color }: { progress: number; color: string }) {
  const maxRequired = FLOWER_PROGRESSION_STAGES[FLOWER_PROGRESSION_STAGES.length - 1].required;
  const progressAmount = (progress / 100) * maxRequired;

  const stepsWithStatus = FLOWER_PROGRESSION_STAGES.map((step, index) => {
    if (progressAmount >= step.required) {
      return { ...step, status: "completed" };
    }
    const previous = FLOWER_PROGRESSION_STAGES[index - 1];
    if (previous && progressAmount >= previous.required && progressAmount < step.required) {
      return { ...step, status: "current" };
    }
    if (index === 0 && progressAmount < step.required) {
      return { ...step, status: "current" };
    }
    return { ...step, status: "upcoming" };
  });

  const completed = stepsWithStatus.filter((s) => s.status === "completed").length;
  const overallProgress = (completed / FLOWER_PROGRESSION_STAGES.length) * 100;

  return (
    <div className="rounded-xl border p-4 md:p-6">
      <h2 className="mb-2 text-lg md:text-xl">Flower Growth</h2>
      <div className="space-y-3 md:hidden">
        {stepsWithStatus.map((step, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
            <FlowerScene letter={step.letter} color={color} locked={step.status === "upcoming"} />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h4 className="truncate text-sm font-medium">{step.name}</h4>
              </div>
              <div className="text-muted-foreground text-xs">
                {Math.round(progressAmount)} / {step.required}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <div className="relative">
          <div className="flex items-start justify-between gap-6 overflow-x-auto">
            {stepsWithStatus.map((step, i) => (
              <div key={i} className="flex min-w-[120px] flex-1 flex-col items-center space-y-4">
                <FlowerScene
                  letter={step.letter}
                  color={color}
                  locked={step.status === "upcoming"}
                />
                <div className="border-primary bg-background relative z-10 h-4 w-4 rounded-full border-2">
                  {step.status === "completed" && (
                    <div className="absolute inset-0 rounded-full border-green-500 bg-green-500" />
                  )}
                  {step.status === "current" && (
                    <div className="bg-primary absolute left-0 top-0 h-full w-1/2 rounded-l-full" />
                  )}
                </div>
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <h4 className="text-sm font-medium">{step.name}</h4>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {Math.round(progressAmount)} / {step.required}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>Overall Progress</span>
          <span className="text-muted-foreground">{Math.round(overallProgress)}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>
    </div>
  );
}
