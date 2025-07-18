import { ActivityCalendarSSR } from "@/components/dashboard/activity-calendar-ssr";
import DashboardCarousel from "@/components/dashboard/dashboard-carousel";
import { GardenCard } from "@/components/dashboard/garden-card";
import { JournalCard } from "@/components/dashboard/journal";
import { MoodChartSSR } from "@/components/dashboard/mood-chart-ssr";
import { MoodCardSSR } from "@/components/dashboard/mood-ssr";
import { ReasonsCard } from "@/components/dashboard/reasons-card";
import { TasksCardSSR } from "@/components/dashboard/tasks-ssr";
import { TourTrigger } from "@/components/tour/tour-trigger";
import { useDialogStore } from "@/hooks/use-dialog-store";
import { getUserAchievementsData } from "@/lib/actions/achievement-actions";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Dashboard"
};

export default async function Page() {
  const { dailyData, streakData } = await getUserAchievementsData();

  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: profile } = await supabase
    .from("users")
    .select("completed_tour")
    .eq("id", user.id)
    .single();

  const shouldTriggerTour = !profile?.completed_tour;

  return (
    <>
      <TourTrigger shouldTrigger={shouldTriggerTour} />
      <DashboardCarousel>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Garden</h1>
          <GardenCard dailyData={dailyData} streakData={streakData} />
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Daily</h1>
          <ReasonsCard />
          <div className="grid gap-4 md:grid-cols-2">
            <JournalCard />
            <MoodCardSSR />
          </div>
          <TasksCardSSR />
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Stats</h1>
          <div className="space-y-4">
            <ActivityCalendarSSR />
            <MoodChartSSR />
          </div>
        </div>
      </DashboardCarousel>
    </>
  );
}
