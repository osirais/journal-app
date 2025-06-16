"use client";

import { SearchDialog } from "@/components/search/search-dialog";
import { useEffect, useState } from "react";

export const DialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SearchDialog />
    </>
  );
};
