export const formatDateAgo = (input: Date | number) => {
  const now = Date.now();
  const then = typeof input === "number" ? input : input.getTime();
  const diff = Math.max(0, Math.floor((now - then) / 1000)); // in seconds

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return `${Math.floor(diff / 86400)}d ago`;
};
