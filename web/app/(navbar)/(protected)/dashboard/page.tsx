import { ActivityCalendarCard } from "@/components/dashboard/activity-calendar";
import { JournalCard } from "@/components/dashboard/journal";
import { MoodCard } from "@/components/dashboard/mood";
import { TasksCard } from "@/components/dashboard/tasks";

const data = [
  {
    date: "2024-01-01",
    count: 2,
    level: 1
  },
  {
    date: "2024-06-23",
    count: 2,
    level: 1
  },
  {
    date: "2024-08-02",
    count: 16,
    level: 4
  },
  {
    date: "2024-12-31",
    count: 11,
    level: 3
  }
];

const Page = () => {
  return (
    <div className="ovreflow-hidden container mx-auto grid max-w-3xl grid-flow-row gap-8 py-8">
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">Daily</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <JournalCard />
          <MoodCard />
        </div>
        <TasksCard />
      </div>
      <div className="grid w-full gap-4 overflow-hidden">
        <h1 className="text-2xl font-bold">Stats</h1>
        <ActivityCalendarCard data={data} />
      </div>
    </div>
  );
};

export default Page;
