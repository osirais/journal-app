import { FlowerModel } from "@/components/garden/flower-model";
import { TreeModel } from "@/components/garden/tree-model";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

// pseudo-random number generator
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateFlowerPositions(count: number, seed = 42) {
  const rand = mulberry32(seed);
  const radius = 2.5;
  const positions: [number, number, number][] = [];

  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const distance = radius + rand() * 1.5;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    positions.push([x, -2.5, z]);
  }

  return positions;
}

export function Garden({
  modelPath,
  flowerCount = 6 // placeholder count
}: {
  modelPath: string;
  flowerCount?: number;
}) {
  const gardenRef = useRef<Group>(null);

  useFrame(() => {
    if (gardenRef.current) {
      gardenRef.current.rotation.y += 0.003;
    }
  });

  const flowerPositions = useMemo(() => generateFlowerPositions(flowerCount), [flowerCount]);

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
      {flowerPositions.map((pos, i) => (
        <FlowerModel key={i} position={pos} />
      ))}
    </group>
  );
}
