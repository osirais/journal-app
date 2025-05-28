import { receiveStamps } from "@/utils/receive-stamps";
import { toast } from "sonner";

export const receiveReward = async (stampsMessage: string, streak: number) => {
  toast.success(`🔥 Congratulations! You have a streak of ${streak} day${streak === 1 ? "" : "s"}`);

  receiveStamps(stampsMessage);
};
