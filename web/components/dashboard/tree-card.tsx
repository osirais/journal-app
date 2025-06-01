"use client";

import { useDropletStore } from "@/app/stores/droplets-store";
import { TreeProgressionDrawer } from "@/components/tree/tree-progression-drawer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentTreeStage, getNextRequiredDroplets } from "@/utils/tree-stage-utils";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type * as THREE from "three";

function TreeModel({ modelPath }: { modelPath: string }) {
  const fullPath = `/models/tree_stages_current/${modelPath}`;
  const { scene } = useGLTF(fullPath);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export function TreeCard() {
  const droplets = useDropletStore((state) => state.droplets) ?? 0;
  const currentStage = getCurrentTreeStage(droplets);
  const nextRequired = getNextRequiredDroplets(droplets);

  return (
    <Card className="flex h-[80vh] w-full flex-col pb-0">
      <CardHeader>
        <CardTitle>Tree</CardTitle>
        <CardDescription>This feature is still under development.</CardDescription>
      </CardHeader>
      <CardContent className="relative flex-1 overflow-hidden p-0">
        <div className="grid h-full grid-rows-[4fr_1fr]">
          <div className="relative h-full w-full">
            <Canvas camera={{ position: [4.25, 1, 0] }} className="absolute inset-0">
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Suspense fallback={null}>
                <TreeModel modelPath={currentStage.path} />
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
              {nextRequired ? `${droplets} / ${nextRequired}` : `${droplets} / —`} droplets
            </div>
            <TreeProgressionDrawer droplets={droplets} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
