"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { createRoot } from "react-dom/client";

export function TreehouseCard() {
  return (
    <Card className="h-[80vh] w-full">
      <CardHeader>
        <CardTitle>Treehouse</CardTitle>
        <CardDescription>This feature is still under development.</CardDescription>
      </CardHeader>
      <CardContent>
        <Canvas>
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </CardContent>
    </Card>
  );
}
