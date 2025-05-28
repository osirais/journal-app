import { ActivityCalendarCSR } from "@/components/dashboard/activity-calendar-csr";
import { createClient } from "@/utils/supabase/server";

interface ActivityData {
  date: string;
  count: number;
  level: number;
}

interface UserActivitySummary {
  user_id: string;
  date: string;
  entries_created: number;
}

export async function ActivityCalendarSSR() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const { data, error } = await supabase
    .from("user_activity_summary")
    .select("date, entries_created")
    .eq("user_id", user!.id)
    .gte("date", oneYearAgo.toISOString().split("T")[0])
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching activity data:", error);
    return <p>Error loading activity data.</p>;
  }

  const activityMap = new Map<string, number>();

  data?.forEach((item: Omit<UserActivitySummary, "user_id">) => {
    activityMap.set(item.date, item.entries_created);
  });

  const activityData: ActivityData[] = [];
  const currentDate = new Date(oneYearAgo);
  const today = new Date();

  while (currentDate <= today) {
    const dateString = currentDate.toISOString().split("T")[0];
    const count = activityMap.get(dateString) || 0;

    let level = 0;
    if (count > 0) level = 1;
    if (count >= 3) level = 2;
    if (count >= 5) level = 3;
    if (count >= 8) level = 4;

    activityData.push({
      date: dateString,
      count,
      level
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return <ActivityCalendarCSR data={activityData} />;
}
