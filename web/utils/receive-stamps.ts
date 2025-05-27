import { toast } from "sonner";

export const receiveStamps = async (message: string) => {
  toast.success(message);

  // @ts-ignore
  if (typeof window !== "undefined" && window.__refreshStamps) {
    // @ts-ignore
    window.__refreshStamps();
  }
};
