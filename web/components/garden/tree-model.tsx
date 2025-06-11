import { useGLTF } from "@react-three/drei";

export function TreeModel({
  modelPath,
  position
}: {
  modelPath: string;
  position?: [number, number, number];
}) {
  const fullPath = `/models/tree_stages_current/${modelPath}`;
  const { scene } = useGLTF(fullPath);
  return <primitive object={scene} position={position ?? [0, -2.5, 0]} />;
}
