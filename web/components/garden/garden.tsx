import { FlowerModel } from "@/components/garden/flower-model";
import { TreeModel } from "@/components/garden/tree-model";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

export function Garden({ modelPath }: { modelPath: string }) {
  const gardenRef = useRef<Group>(null);

  useFrame(() => {
    if (gardenRef.current) {
      gardenRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={gardenRef}>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 7]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 5, 5]} intensity={0.6} />
      <TreeModel modelPath={modelPath} position={[0, -2.5, 0]} />
      <FlowerModel position={[2, -2.5, 0]} />
    </group>
  );
}
