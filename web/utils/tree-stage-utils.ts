import { TREE_PROGRESSION_STAGES } from "@/constants/tree-stages";

export function getCurrentTreeStage(droplets: number) {
  for (let i = TREE_PROGRESSION_STAGES.length - 1; i >= 0; i--) {
    if (droplets >= TREE_PROGRESSION_STAGES[i].required) {
      return TREE_PROGRESSION_STAGES[i];
    }
  }
  return TREE_PROGRESSION_STAGES[0];
}

export function getNextRequiredDroplets(droplets: number) {
  for (const stage of TREE_PROGRESSION_STAGES) {
    if (stage.required > droplets) {
      return stage.required;
    }
  }
  return null;
}
