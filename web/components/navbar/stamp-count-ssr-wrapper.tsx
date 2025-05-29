import { StampCountCSR } from "@/components/navbar/stamp-count-csr";
import { createClient } from "@/utils/supabase/server";

interface StampCountSSRProps {
  userId: string;
}

const StampCountSSR = async ({ userId }: StampCountSSRProps) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("users_with_stamps")
    .select("stamps")
    .eq("id", userId)
    .single();

  const initialStamps = data?.stamps ?? null;

  return <StampCountCSR userId={userId} initialStamps={initialStamps} />;
};

export default StampCountSSR;
