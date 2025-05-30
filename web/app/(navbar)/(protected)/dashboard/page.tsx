import { ActivityCalendarSSR } from "@/components/dashboard/activity-calendar-ssr";
import { JournalCard } from "@/components/dashboard/journal";
import { MoodChartSSR } from "@/components/dashboard/mood-chart-ssr";
import { MoodCardSSR } from "@/components/dashboard/mood-ssr";
import { TasksCardSSR } from "@/components/dashboard/tasks-ssr";
import { TreeCard } from "@/components/dashboard/tree-card";

const Page = () => {
  return (
    <div className="hide-scrollbar h-screen snap-y snap-mandatory overflow-y-scroll">
      <section className="flex min-h-screen snap-start snap-always justify-center pt-6">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Tree</h1>
            <TreeCard />
          </div>
        </div>
      </section>
      <section className="flex min-h-screen snap-start snap-always justify-center pt-6">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Daily</h1>
            <div className="grid gap-4 md:grid-cols-2">
              <JournalCard />
              <MoodCardSSR />
            </div>
            <TasksCardSSR />
          </div>
        </div>
      </section>
      <section className="flex min-h-screen snap-start snap-always justify-center pt-6">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Stats</h1>
            <div className="space-y-4">
              <ActivityCalendarSSR />
              <MoodChartSSR />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
