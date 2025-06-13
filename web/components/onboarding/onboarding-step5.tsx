"use client";

import { Garden } from "@/components/garden/garden";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TREE_PROGRESSION_STAGES } from "@/constants/tree-stages";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type * as THREE from "three";

interface OnboardingStep5Props {
  onSuccess: () => void;
}

function TreeModel() {
  const { scene } = useGLTF("/models/tree_onboarding_stages/A/Grass_2_A_Color1.gltf");
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

export function OnboardingStep5({ onSuccess }: OnboardingStep5Props) {
  return (
    <>
      <Card className="flex h-full w-full flex-col">
        <CardHeader className="text-center">
          <CardTitle>This is your garden</CardTitle>
          <p className="text-muted-foreground mx-auto max-w-md">Get droplets to make it grow</p>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col items-center justify-center p-0">
          <div className="relative h-96 w-full max-w-md">
            <Canvas camera={{ position: [10, 1, 0] }} className="absolute inset-0">
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Suspense fallback={null}>
                <Garden
                  modelPath={TREE_PROGRESSION_STAGES[0].path}
                  dailyData={{}}
                  streakData={{}}
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
        </CardContent>
      </Card>
      <div className="flex justify-end pt-4">
        <Button onClick={onSuccess} className="cursor-pointer">
          Next
        </Button>
      </div>
    </>
  );
}
