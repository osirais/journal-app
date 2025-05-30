"use client";

import { TreeProgressionDrawer } from "@/components/tree/tree-progression-drawer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function TreeModel() {
  const { scene } = useGLTF("/models/Tree_4_A_Color1.gltf");
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

export function TreehouseCard() {
  return (
    <Card className="h-[80vh] w-full">
      <CardHeader>
        <CardTitle>Treehouse</CardTitle>
        <CardDescription>This feature is still under development.</CardDescription>
      </CardHeader>
      <CardContent className="relative grid grid-rows-[4fr_1fr] p-0">
        <Canvas camera={{ position: [4.25, 1, 0] }} className="h-full w-full">
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <TreeModel />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={(3 * Math.PI) / 7}
            maxPolarAngle={(3 * Math.PI) / 7}
          />
        </Canvas>
        <div className="ml-auto grid h-full w-max place-items-center pb-6 pr-4">
          <TreeProgressionDrawer />
        </div>
      </CardContent>
    </Card>
  );
}
