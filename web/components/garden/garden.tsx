import { FlowerModel } from "@/components/garden/flower-model";
import { TreeModel } from "@/components/garden/tree-model";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

const pastelColors = [
  "#ffb3ba",
  "#ffdfba",
  "#ffffba",
  "#baffc9",
  "#bae1ff",
  "#d7baff",
  "#ffbaed",
  "#baffd9",
  "#ffd6ba",
  "#c9baff"
];

function generateFlowerData(count: number) {
  const radius = 3;
  const data: { position: [number, number, number]; color: string }[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const color = pastelColors[i % pastelColors.length];
    data.push({ position: [x, -2.5, z], color });
  }

  return data;
}

export function Garden({
  modelPath,
  flowerCount = 6
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

  const flowerData = useMemo(() => generateFlowerData(flowerCount), [flowerCount]);

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
      {flowerData.map((data, i) => (
        <FlowerModel key={i} position={data.position} color={data.color} />
      ))}
    </group>
  );
}
