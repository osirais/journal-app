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
import { TREE_PROGRESSION_STAGES } from "@/constants/tree-stages";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type * as THREE from "three";

function TreeModel({ letter }: { letter: string }) {
  const relativePath = TREE_PROGRESSION_STAGES.find((s) => s.letter === letter)?.path ?? "";
  const fullPath = `/models/tree_stages/${relativePath}`;
  const { scene } = useGLTF(fullPath);
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

export function TreeProgressionDrawer({ droplets }: { droplets: number }) {
  const [open, setOpen] = useState(false);

  const stepsWithStatus = TREE_PROGRESSION_STAGES.map((step, index) => {
    if (droplets >= step.required) {
      return { ...step, status: "completed" };
    }
    const previousStep = TREE_PROGRESSION_STAGES[index - 1];
    if (previousStep && droplets >= previousStep.required && droplets < step.required) {
      return { ...step, status: "current" };
    }
    if (index === 0 && droplets < step.required) {
      return { ...step, status: "current" };
    }
    return { ...step, status: "upcoming" };
  });

  const completedSteps = stepsWithStatus.filter((s) => s.status === "completed").length;
  const overallProgress = (completedSteps / TREE_PROGRESSION_STAGES.length) * 100;

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
                {stepsWithStatus.map((step, index) => (
                  <div
                    key={index}
                    className="flex min-w-[80px] flex-1 flex-col items-center space-y-3"
                  >
                    <TreeScene letter={step.letter} />
                    <div className="border-primary bg-background relative z-10 h-4 w-4 rounded-full border-2">
                      {step.status === "completed" && (
                        <div className="absolute inset-0 rounded-full border-green-500 bg-green-500" />
                      )}
                      {step.status === "current" && (
                        <div className="bg-primary absolute left-0 top-0 h-full w-1/2 rounded-l-full" />
                      )}
                    </div>
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
                      <div className="text-xs font-medium">
                        {droplets} / {step.required}
                      </div>
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
