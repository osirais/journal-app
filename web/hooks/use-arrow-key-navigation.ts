import { useEffect } from "react";

export function useArrowKeyNavigation({
  onUp,
  onDown,
  onLeft,
  onRight,
  enabled = true
}: {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  enabled?: boolean;
}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.hasAttribute("contenteditable")
      )
        return;

      if (e.key === "ArrowUp") onUp?.();
      if (e.key === "ArrowDown") onDown?.();
      if (e.key === "ArrowLeft") onLeft?.();
      if (e.key === "ArrowRight") onRight?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUp, onDown, onLeft, onRight, enabled]);
}
