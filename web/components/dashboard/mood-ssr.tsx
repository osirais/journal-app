import { MoodCardCSR } from "@/components/dashboard/mood-csr";
import { getCurrentMood } from "@/lib/actions/mood-actions";

export async function MoodCardSSR() {
  const { mood, error } = await getCurrentMood();

  if (error) {
    console.error("Error fetching mood:", error);
  }

  return <MoodCardCSR initialMood={mood} />;
}
