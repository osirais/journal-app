import { toast } from "sonner";

export const receiveDroplets = async (message: string) => {
  toast.success(message);

  // @ts-ignore
  if (typeof window !== "undefined" && window.__refreshDroplets) {
    // @ts-ignore
    window.__refreshDroplets();
  }
};
