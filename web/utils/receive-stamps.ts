import { toast } from "sonner";

export const receiveStamps = async (message: string) => {
  toast.success(message);

  if (typeof window !== "undefined" && window.__refreshStamps) {
    window.__refreshStamps();
  }
};
