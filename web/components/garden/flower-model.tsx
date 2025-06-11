import { useEffect, useState } from "react";
import { Color, Group, MeshPhongMaterial } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export function FlowerModel({
  position,
  color
}: {
  position?: [number, number, number];
  color?: string;
}) {
  const [object, setObject] = useState<Group | null>(null);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath("/models/flowers/");
    mtlLoader.load("cartoon_flower.mtl", (materials) => {
      materials.preload();

      // override diffuse color (Kd) with custom color
      if (color) {
        const newColor = new Color(color);
        const materialKeys = Object.keys(materials.materials);
        const secondMatName = materialKeys[1];

        // second material is the petal color
        const secondMat = materials.materials[secondMatName] as MeshPhongMaterial;

        if (secondMat) {
          secondMat.color = newColor;
        }
      }

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("/models/flowers/");
      objLoader.load("cartoon_flower.obj", setObject);
    });
  }, [color]);

  return (
    object && <primitive object={object} position={position ?? [2, -2.5, 0]} scale={[4, 4, 4]} />
  );
}
