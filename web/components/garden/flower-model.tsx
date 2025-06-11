import { useEffect, useState } from "react";
import { Group } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export function FlowerModel({ position }: { position?: [number, number, number] }) {
  const [object, setObject] = useState<Group | null>(null);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath("/models/flowers/");
    mtlLoader.load("cartoon_flower.mtl", (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("/models/flowers/");
      objLoader.load("cartoon_flower.obj", setObject);
    });
  }, []);

  return (
    object && <primitive object={object} position={position ?? [2, -2.5, 0]} scale={[4, 4, 4]} />
  );
}
