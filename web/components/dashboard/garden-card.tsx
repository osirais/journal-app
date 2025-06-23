"use client";

import { Garden } from "@/components/garden/garden";
import { TreeProgressionDrawer } from "@/components/garden/tree-progression-drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TREE_PROGRESSION_STAGES } from "@/constants/tree-stages";
import { useDropletStore } from "@/stores/droplets-store";
import { getCurrentTreeStage, getNextRequiredDroplets } from "@/utils/tree-stage-utils";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

interface GardenCardProps {
  dailyData: Record<string, number>;
  streakData: Record<string, number>;
}

export function GardenCard({ dailyData, streakData }: GardenCardProps) {
  const droplets = useDropletStore((state) => state.droplets) ?? 0;
  const currentStage = getCurrentTreeStage(droplets);
  const nextRequired = getNextRequiredDroplets(droplets);
  const nextStage = TREE_PROGRESSION_STAGES.find((s) => s.required === nextRequired)?.name;
  const currentRequired = currentStage.required;

  return (
    <Card className="flex h-[80vh] w-full flex-col pb-0">
      <CardHeader>
        <CardTitle id="tour-garden">Garden</CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1 overflow-hidden p-0">
        <div className="grid h-full grid-rows-[4fr_1fr]">
          <div className="relative h-full w-full">
            <Canvas camera={{ position: [10, 1, 0] }} className="absolute inset-0">
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Suspense fallback={null}>
                <Garden
                  modelPath={currentStage.path}
                  dailyData={dailyData}
                  streakData={streakData}
                />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={(3 * Math.PI) / 7}
                maxPolarAngle={(3 * Math.PI) / 7}
              />
            </Canvas>
          </div>
          <div className="ml-auto mt-auto w-max pb-6 pr-6">
            <div className="mb-2 text-right font-mono text-sm text-gray-700">
              {nextRequired
                ? `${droplets} / ${nextRequired} droplets to ${nextStage}`
                : `${droplets} / ${currentRequired} droplets`}
            </div>
            <div className="ml-auto w-max">
              <TreeProgressionDrawer droplets={droplets} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
