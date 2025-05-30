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

function TreeModel({ letter }: { letter: string }) {
  const { scene } = useGLTF(`/models/tree_stages/${letter}/Tree_2_${letter}_Color1.gltf`);
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

function SpinningTree({ scale = 1, color = "#22c55e" }: { scale?: number; color?: string }) {
  const treeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={treeRef} scale={scale}>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.2, 8, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function TreeScene({ letter }: { letter: string }) {
  return (
    <div className="h-20 w-20 overflow-hidden rounded-lg border bg-transparent">
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
    {
      name: "Sprout",
      progress: 20,
      status: "completed",
      letter: "A"
    },
    {
      name: "Sapling",
      progress: 40,
      status: "completed",
      letter: "B"
    },
    {
      name: "Young Tree",
      progress: 60,
      status: "current",
      letter: "C"
    },
    {
      name: "Mature Tree",
      progress: 80,
      status: "upcoming",
      letter: "D"
    },
    {
      name: "Elder Tree",
      progress: 100,
      status: "upcoming",
      letter: "E"
    }
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
        <DrawerContent className="h-[400px]">
          <DrawerHeader className="pb-2 text-center">
            <DrawerTitle className="text-xl font-bold">
              Growth Progression Timeline (WIP)
            </DrawerTitle>
            <DrawerDescription>Your journey through each stage of development</DrawerDescription>
          </DrawerHeader>
          <div className="x-6 flex-1">
            <div className="relative">
              <div className="relative flex items-start justify-between gap-4">
                {progressionSteps.map((step, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center space-y-3">
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
