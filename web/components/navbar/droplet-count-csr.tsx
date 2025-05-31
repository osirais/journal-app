"use client";

import { createClient } from "@/utils/supabase/client";
import { Droplet } from "lucide-react";
import React, { FC, useCallback, useEffect, useState } from "react";

interface DropletCountCSRProps {
  userId: string;
  initialDroplets: number | null;
}

export const DropletCountCSR: FC<DropletCountCSRProps> = ({ userId, initialDroplets }) => {
  const [droplets, setDroplets] = useState<number | null>(initialDroplets);
  const [loading, setLoading] = useState(false);

  const fetchDroplets = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("users_with_droplets")
      .select("droplets")
      .eq("id", userId)
      .single();

    if (data) setDroplets(data.droplets);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    // @ts-ignore
    window.__refreshDroplets = fetchDroplets;
    return () => {
      // @ts-ignore
      delete window.__refreshDroplets;
    };
  }, [fetchDroplets]);

  if (droplets === null) return null;

  return (
    <div className="grid grid-cols-[max-content_max-content] items-center gap-2" title="Droplets">
      <span>{loading ? "..." : droplets}</span>
      <Droplet size={16} />
    </div>
  );
};
