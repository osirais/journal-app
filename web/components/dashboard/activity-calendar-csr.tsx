"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

interface ActivityData {
  date: string;
  count: number;
  level: number;
}

interface ActivityCalendarCSRProps {
  data: ActivityData[];
}

export function ActivityCalendarCSR({ data }: ActivityCalendarCSRProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // filter data to only include the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const filteredData = data.filter((activity) => {
    const activityDate = new Date(activity.date);
    return activityDate >= sixMonthsAgo;
  });

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Activity Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-[200px] items-center justify-center">
          {!mounted ? (
            <LoaderCircle className="text-muted-foreground h-6 w-6 animate-spin" />
          ) : (
            <div className="overflow-x-auto py-2">
              <ActivityCalendar
                data={filteredData}
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
                  totalCount: "{{count}} entries in {{year}}"
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}
