"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { TREE_PROGRESSION_STAGES } from "@/constants/tree-stages";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type * as THREE from "three";

const yPosMap: Record<string, number> = {
  A: -1,
  B: -1.5,
  C: -2,
  D: -2.5,
  E: -3,
  F: -3.5,
  G: -4
};

function TreeModel({ letter }: { letter: string }) {
  const relativePath = TREE_PROGRESSION_STAGES.find((s) => s.letter === letter)?.path ?? "";
  const fullPath = `/models/tree_stages/${relativePath}`;
  const { scene } = useGLTF(fullPath);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[0, yPosMap[letter], 0]}>
      <primitive object={scene} />
    </group>
  );
}

const cameraPositions: Record<string, [number, number, number]> = {
  A: [0, 0, 4],
  B: [0, -0.3, 5],
  C: [0, -0.5, 6],
  D: [0, -0.8, 7],
  E: [0, -1.2, 8],
  F: [0, -1.5, 9],
  G: [0, -1.5, 10]
};

function TreeScene({ letter }: { letter: string }) {
  const position = cameraPositions[letter];

  return (
    <div className="h-16 w-16 overflow-hidden rounded-md border bg-transparent md:h-24 md:w-24">
      <Canvas
        camera={{ position, fov: 75 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} />
        <TreeModel letter={letter} />
      </Canvas>
    </div>
  );
}

export function TreeProgressionDrawer({ droplets }: { droplets: number }) {
  const [open, setOpen] = useState(false);

  function handleOpenChange(value: boolean) {
    setOpen(value);
    (window as any).__IS_DRAWER_OPEN__ = value;
    window.dispatchEvent(new Event("drawerToggle"));
  }

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
      <Button
        onClick={() => handleOpenChange(true)}
        variant="outline"
        size="sm"
        className="md:size-default cursor-pointer"
      >
        View Stages
      </Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[80vh] md:max-h-[600px]">
          <DrawerHeader className="pb-3 md:pb-4">
            <DrawerTitle className="text-lg md:text-xl">Growth Stages</DrawerTitle>
            <DrawerDescription>Track your development progress</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4 md:px-6">
            {/* mobile version */}
            <div className="space-y-3 md:hidden">
              {stepsWithStatus.map((step, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg border p-3">
                  <TreeScene letter={step.letter} />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="truncate text-sm font-medium">{step.name}</h4>
                      <Badge
                        variant={
                          step.status === "completed"
                            ? "default"
                            : step.status === "current"
                              ? "secondary"
                              : "outline"
                        }
                        className="shrink-0 text-xs"
                      >
                        {step.status === "completed" ? "✓" : step.status === "current" ? "→" : "○"}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {droplets} / {step.required} droplets
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* desktop version */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="flex items-start justify-between gap-6 overflow-x-auto">
                  {stepsWithStatus.map((step, index) => (
                    <div
                      key={index}
                      className="flex min-w-[120px] flex-1 flex-col items-center space-y-4"
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
                      <div className="space-y-2 text-center">
                        <div className="flex items-center justify-center gap-2">
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
                        <div className="text-muted-foreground text-xs">
                          {droplets} / {step.required}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:p-6">
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Overall Progress</span>
                <span className="text-muted-foreground">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full md:mx-auto md:block md:w-auto">
                Close
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
