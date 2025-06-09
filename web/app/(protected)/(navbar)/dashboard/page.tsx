import { ActivityCalendarSSR } from "@/components/dashboard/activity-calendar-ssr";
import DashboardCarousel from "@/components/dashboard/dashboard-carousel";
import { JournalCard } from "@/components/dashboard/journal";
import { MoodChartSSR } from "@/components/dashboard/mood-chart-ssr";
import { MoodCardSSR } from "@/components/dashboard/mood-ssr";
import { TasksCardSSR } from "@/components/dashboard/tasks-ssr";
import { TreeCard } from "@/components/dashboard/tree-card";
import TourDialog from "@/components/tour/tour-dialog";

export const metadata = {
  title: "Dashboard"
};

export default function Page() {
  return (
    <>
      <TourDialog />
      {/* find way to add this back in later */}
      {/* <DashboardCarousel> */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Tree</h1>
        <TreeCard />
      </div>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Daily</h1>
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
      {/* </DashboardCarousel> */}
    </>
  );
}
