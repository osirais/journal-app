import { ActivityCalendarSSR } from "@/components/dashboard/activity-calendar-ssr";
import { JournalCard } from "@/components/dashboard/journal";
import { MoodChartSSR } from "@/components/dashboard/mood-chart-ssr";
import { MoodCardSSR } from "@/components/dashboard/mood-ssr";
import { TasksCard } from "@/components/dashboard/tasks";

const Page = () => {
  return (
    <div className="container mx-auto grid max-w-3xl grid-flow-row gap-8 overflow-hidden py-8">
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">Daily</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <JournalCard />
          <MoodCardSSR />
        </div>
        <TasksCard />
      </div>
      <div className="grid w-full gap-4 overflow-hidden">
        <h1 className="text-2xl font-bold">Stats</h1>
        <ActivityCalendarSSR />
        <MoodChartSSR />
      </div>
    </div>
  );
};

export default Page;
