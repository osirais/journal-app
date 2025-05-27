"use client";

import { createClient } from "@/utils/supabase/client";
import { Ticket } from "lucide-react";
import React, { FC, useCallback, useEffect, useState } from "react";

interface StampCountCSRProps {
  userId: string;
  initialStamps: number | null;
}

export const StampCountCSR: FC<StampCountCSRProps> = ({ userId, initialStamps }) => {
  const [stamps, setStamps] = useState<number | null>(initialStamps);
  const [loading, setLoading] = useState(false);

  const fetchStamps = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("users_with_stamps")
      .select("stamps")
      .eq("id", userId)
      .single();

    if (data) setStamps(data.stamps);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    // @ts-ignore
    window.__refreshStamps = fetchStamps;
    return () => {
      // @ts-ignore
      delete window.__refreshStamps;
    };
  }, [fetchStamps]);

  if (stamps === null) return null;

  return (
    <div
      className="mt-1 grid grid-cols-[max-content_max-content] items-center gap-2"
      title="Stamps"
    >
      <span>{loading ? "..." : stamps}</span>
      <Ticket size={16} />
    </div>
  );
};
