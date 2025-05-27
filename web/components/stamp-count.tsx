"use client";

import { createClient } from "@/utils/supabase/client";
import { Ticket } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface StampCountProps {
  userId: string;
}

export const StampCount: FC<StampCountProps> = ({ userId }) => {
  const [stamps, setStamps] = useState<number | null>(null);

  const fetchStamps = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("users_with_stamps")
      .select("stamps")
      .eq("id", userId)
      .single();

    if (data) setStamps(data.stamps);
  };

  useEffect(() => {
    fetchStamps();
    window.__refreshStamps = fetchStamps;
  }, []);

  if (stamps === null) return null;

  return (
    <div
      className="mt-1 grid grid-cols-[max-content_max-content] items-center gap-2"
      title="Stamps"
    >
      <span>{stamps}</span>
      <Ticket size={16} />
    </div>
  );
};

// @ts-ignore
declare global {
  interface Window {
    __refreshStamps?: () => void;
  }
}
