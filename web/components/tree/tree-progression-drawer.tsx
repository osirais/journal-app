"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type * as THREE from "three";

const treeModelPaths: Record<string, string> = {
  A: "/models/tree_stages/A/Grass_2_A_Color1.gltf",
  B: "/models/tree_stages/B/Grass_2_B_Color1.gltf",
  C: "/models/tree_stages/C/Tree_2_A_Color1.gltf",
  D: "/models/tree_stages/D/Tree_2_B_Color1.gltf",
  E: "/models/tree_stages/E/Tree_2_C_Color1.gltf",
  F: "/models/tree_stages/F/Tree_2_D_Color1.gltf",
  G: "/models/tree_stages/G/Tree_2_E_Color1.gltf"
};

function TreeModel({ letter }: { letter: string }) {
  const path = treeModelPaths[letter];
  const { scene } = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function TreeScene({ letter }: { letter: string }) {
  return (
    <div className="h-28 w-28 overflow-hidden rounded-lg border bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 90 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <TreeModel letter={letter} />
      </Canvas>
    </div>
  );
}

export function TreeProgressionDrawer() {
  const [open, setOpen] = useState(false);

  const progressionSteps = [
    { name: "Sprout", letter: "A", progress: 14, status: "completed" },
    { name: "Sapling", letter: "B", progress: 28, status: "completed" },
    { name: "Young Tree", letter: "C", progress: 42, status: "completed" },
    { name: "Mature Tree", letter: "D", progress: 56, status: "current" },
    { name: "Elder Tree", letter: "E", progress: 70, status: "upcoming" },
    { name: "Ancient Tree", letter: "F", progress: 85, status: "upcoming" },
    { name: "Mythic Tree", letter: "G", progress: 100, status: "upcoming" }
  ];

  const currentStep = progressionSteps.findIndex((step) => step.status === "current");
  const overallProgress =
    currentStep >= 0 ? ((currentStep + 1) / progressionSteps.length) * 100 : 0;

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" size="lg" className="cursor-pointer">
        View Stages
      </Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[450px]">
          <DrawerHeader className="pb-2 text-center">
            <DrawerTitle className="text-xl font-bold">
              Growth Progression Timeline (WIP)
            </DrawerTitle>
            <DrawerDescription>Your journey through each stage of development</DrawerDescription>
          </DrawerHeader>
          <div className="x-6 flex-1">
            <div className="relative">
              <div className="relative flex items-start justify-between gap-4 overflow-x-auto px-4">
                {progressionSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex min-w-[80px] flex-1 flex-col items-center space-y-3"
                  >
                    <TreeScene letter={step.letter} />
                    <div
                      className={`relative z-10 h-4 w-4 rounded-full border-2 ${
                        step.status === "completed"
                          ? "border-green-500 bg-green-500"
                          : step.status === "current"
                            ? "bg-primary border-primary"
                            : "bg-background border-muted-foreground"
                      }`}
                    />
                    <div className="space-y-1 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <h4 className="text-sm font-medium">{step.name}</h4>
                        <Badge
                          variant={
                            step.status === "completed"
                              ? "default"
                              : step.status === "current"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {step.status === "completed"
                            ? "✓"
                            : step.status === "current"
                              ? "→"
                              : "○"}
                        </Badge>
                      </div>
                      <div className="text-xs font-medium">{step.progress}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-6 space-y-2 px-32">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-muted-foreground text-sm">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          <DrawerFooter className="flex-row gap-2 pt-4">
            <div className="mx-auto">
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1 cursor-pointer">
                  Close
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
