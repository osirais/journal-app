import React from "react";
import { Card } from "@/components/ui/card";
import { ActivityCalendar } from "react-activity-calendar";

interface ActivityData {
  date: string;
  count: number;
  level: number;
}

interface ActivityCalendarCardProps {
  data: ActivityData[];
}

export const ActivityCalendarCard: React.FC<ActivityCalendarCardProps> = ({ data }) => {
  return (
    <Card className="w-full overflow-hidden p-6">
      <h3 className="mb-3 text-lg font-semibold">Activity Calendar</h3>
      <div className="overflow-x-auto py-2">
        <ActivityCalendar
          data={data}
          labels={{
            legend: {
              less: "Less",
              more: "More"
            },
            months: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            totalCount: "{{count}} activities in {{year}}"
          }}
          hideColorLegend={false}
          hideMonthLabels={false}
          hideTotalCount={false}
          showWeekdayLabels={true}
          style={{
            borderRadius: "0.5rem",
            margin: "0 auto"
          }}
        />
      </div>
    </Card>
  );
};
