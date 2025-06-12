import { FLOWER_PROGRESSION_STAGES } from "@/constants/flower-stages";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Group, MeshPhongMaterial } from "three";
import { MTLLoader, OBJLoader } from "three-stdlib";

export function FlowerModel({ letter, color }: { letter: string; color: string }) {
  const stage = FLOWER_PROGRESSION_STAGES.find((s) => s.letter === letter);
  const groupRef = useRef<Group>(null);

  const gltfPath = stage?.gltf ? `/models/flower_stages/${stage.gltf}` : null;
  const gltf = useGLTF(gltfPath ?? "/models/flower_stages/A/Grass_2_A_Color1.gltf");

  const clonedScene = useMemo(() => {
    if (!gltf) return null;
    return gltf.scene.clone();
  }, [gltf]);

  const [object, setObject] = useState<Group | null>(null);

  useEffect(() => {
    if (!stage) return;

    if (stage.obj && stage.mtl) {
      const mtlLoader = new MTLLoader();
      mtlLoader.setPath("/models/flower_stages/");
      mtlLoader.load(stage.mtl, (materials) => {
        materials.preload();

        if (color) {
          const matKeys = Object.keys(materials.materials);
          const secondMatName = matKeys[1];
          const secondMat = materials.materials[secondMatName] as MeshPhongMaterial;
          if (secondMat) {
            secondMat.color = new Color(color);
          }
        }

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("/models/flower_stages/");
        objLoader.load(stage.obj, setObject);
      });
    } else {
      setObject(null);
    }
  }, [letter, color, stage]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  if (stage?.gltf && clonedScene) {
    return (
      <group ref={groupRef} position={[0, -1.5, 0]}>
        <primitive object={clonedScene} scale={[2, 2, 2]} />
      </group>
    );
  }

  if (object) {
    return (
      <group ref={groupRef} position={[0, -1.5, 0]}>
        <primitive object={object} scale={[8, 8, 8]} />
      </group>
    );
  }

  return null;
}
