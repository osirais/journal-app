import { receiveDroplets } from "@/utils/receive-droplets";
import { toast } from "sonner";

export const receiveReward = async (dropletsMessage: string, streak: number) => {
  toast.success(`🔥 Congratulations! You have a streak of ${streak} day${streak === 1 ? "" : "s"}`);

  receiveDroplets(dropletsMessage);
};
