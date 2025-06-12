import { FlowerModel } from "@/components/garden/flower-model";
import { TreeModel } from "@/components/garden/tree-model";
import { FLOWER_COLORS } from "@/constants/flower-colors";
import { FLOWER_PROGRESSION_STAGES } from "@/constants/flower-stages";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

function getFlowerStageForCount(count: number) {
  let stage = undefined;
  for (const s of FLOWER_PROGRESSION_STAGES) {
    if (count >= s.required) stage = s;
  }

  // for when less than min requirement
  return (
    stage ?? {
      name: "",
      letter: "",
      required: 0
    }
  );
}

function generateFlowerData(dailyData: Record<string, number>, streakData: Record<string, number>) {
  const radius = 4;
  const height = 1;

  type Category = "journal" | "mood" | "tasks";
  const categories: Category[] = ["journal", "mood", "tasks"];
  const totalFlowers = categories.length * 2;

  const data: { position: [number, number, number]; color: string; letter: string }[] = [];

  categories.forEach((key, i) => {
    // index for daily flower
    const dailyIndex = i * 2;
    const dailyCount = dailyData[key];
    const dailyStage = getFlowerStageForCount(dailyCount);

    const dailyAngle = (dailyIndex / totalFlowers) * Math.PI * 2;
    const dailyX = Math.cos(dailyAngle) * radius;
    const dailyZ = Math.sin(dailyAngle) * radius;

    data.push({
      position: [dailyX, height, dailyZ],
      color: FLOWER_COLORS.daily[key],
      letter: dailyStage.letter
    });

    // index for streak flower
    const streakIndex = dailyIndex + 1;
    const streakCount = streakData[key];
    const streakStage = getFlowerStageForCount(streakCount);

    const streakAngle = (streakIndex / totalFlowers) * Math.PI * 2;
    const streakX = Math.cos(streakAngle) * radius;
    const streakZ = Math.sin(streakAngle) * radius;

    data.push({
      position: [streakX, height, streakZ],
      color: FLOWER_COLORS.streak[key],
      letter: streakStage.letter
    });
  });

  return data;
}

export function Garden({
  modelPath,
  dailyData,
  streakData
}: {
  modelPath: string;
  dailyData: Record<string, number>;
  streakData: Record<string, number>;
}) {
  const gardenRef = useRef<Group>(null);

  useFrame(() => {
    if (gardenRef.current) {
      gardenRef.current.rotation.y += 0.003;
    }
  });

  const flowerData = useMemo(
    () => generateFlowerData(dailyData, streakData),
    [dailyData, streakData]
  );

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
        position={[0, 0, 0]}
        scale={[0.5, 0.5, 1]}
      >
        <circleGeometry args={[10, 128]} />
        <meshStandardMaterial color="#4caf50" wireframe={false} />
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
