import { ActivityCalendarCard } from "@/components/dashboard/activity-calendar";
import { JournalCard } from "@/components/dashboard/journal";
import { TodoListCard } from "@/components/dashboard/todo-list";

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
    <div className="container mx-auto grid max-w-3xl grid-flow-row gap-6 py-8">
      <div className="grid grid-cols-2 gap-6">
        <JournalCard />
        <TodoListCard />
      </div>
      <ActivityCalendarCard data={data} />
    </div>
  );
};

export default Page;
