import { FlowerModel } from "@/components/garden/flower-model";
import { TreeModel } from "@/components/garden/tree-model";
import { FLOWER_COLORS } from "@/constants/flower-colors";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

function getAllFlowerColors() {
  const dailyColors = Object.values(FLOWER_COLORS.daily);
  const streakColors = Object.values(FLOWER_COLORS.streak);
  return [...dailyColors, ...streakColors];
}

function generateFlowerData() {
  const radius = 4;
  const height = 1;
  const colors = getAllFlowerColors();

  const data: { position: [number, number, number]; color: string; letter: string }[] = [];
  const totalCount = colors.length;

  for (let i = 0; i < totalCount; i++) {
    const angle = (i / totalCount) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const color = colors[i % colors.length];
    const letter = "C"; // constant (temporary)

    data.push({ position: [x, height, z], color, letter });
  }

  return data;
}

export function Garden({ modelPath }: { modelPath: string }) {
  const gardenRef = useRef<Group>(null);

  useFrame(() => {
    if (gardenRef.current) {
      gardenRef.current.rotation.y += 0.003;
    }
  });

  const flowerData = useMemo(() => generateFlowerData(), []);

  return (
    <group ref={gardenRef} position={[0, -3, 0]}>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 7]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 5, 5]} intensity={0.6} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        position={[0, -10, 0]}
        scale={[5, 5, 1]} // flatten vertically
      >
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
      <TreeModel modelPath={modelPath} position={[0, 0.1, 0]} />
      {flowerData.map((data, i) => (
        <group key={i} position={data.position}>
          <FlowerModel letter={data.letter} color={data.color} />
        </group>
      ))}
    </group>
  );
}
