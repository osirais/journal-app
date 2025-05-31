import { DropletCountCSR } from "@/components/navbar/droplet-count-csr";
import { createClient } from "@/utils/supabase/server";

interface DropletCountSSRProps {
  userId: string;
}

const DropletCountSSR = async ({ userId }: DropletCountSSRProps) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("users_with_droplets")
    .select("droplets")
    .eq("id", userId)
    .single();

  const initialDroplets = data?.droplets ?? null;

  return <DropletCountCSR userId={userId} initialDroplets={initialDroplets} />;
};

export default DropletCountSSR;
