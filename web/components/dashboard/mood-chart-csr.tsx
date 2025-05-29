"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface MoodData {
  date: string;
  mood: number | null;
  formattedDate: string;
}

interface MoodChartCSRProps {
  data: MoodData[];
}

const chartConfig = {
  mood: {
    label: "Mood",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig;

const moodLabels = {
  1: "Very Sad",
  2: "Sad",
  3: "Neutral",
  4: "Happy",
  5: "Very Happy"
};

const moodEmojis = {
  1: "😢",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😄"
};

const getCurrentMonthDates = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const result: { date: string; formattedDate: string }[] = [];

  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    const isoDate = d.toISOString().split("T")[0];
    result.push({
      date: isoDate,
      formattedDate: `${d.getMonth() + 1}/${d.getDate()}`
    });
  }

  return result;
};

export const MoodChartCSR = ({ data }: MoodChartCSRProps) => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const dateMap = new Map(data.map((item) => [item.date, item]));

  const chartData = getCurrentMonthDates().map((d) => ({
    date: d.date,
    formattedDate: d.formattedDate,
    mood: dateMap.get(d.date)?.mood ?? null
  }));

  const nonNullData = chartData.filter((item) => item.mood !== null);

  const averageMood =
    nonNullData.length > 0
      ? nonNullData.reduce((sum, item) => sum + (item.mood || 0), 0) / nonNullData.length
      : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const mood = payload[0].value;
      return (
        <div className="bg-background rounded-lg border p-2 shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-muted-foreground text-sm">
            {moodEmojis[mood as keyof typeof moodEmojis]}{" "}
            {moodLabels[mood as keyof typeof moodLabels]}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Mood Trend <span className="text-muted-foreground text-sm">({currentMonth})</span>
        </CardTitle>
        <CardDescription>
          Your mood this month
          {averageMood > 0 && (
            <span className="ml-2 text-sm">
              • Average: {averageMood.toFixed(1)}/5{" "}
              {moodEmojis[Math.round(averageMood) as keyof typeof moodEmojis]}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {nonNullData.length === 0 ? (
          <div className="flex h-[200px] w-full items-center justify-center">
            <p className="text-muted-foreground">No mood data available for {currentMonth}</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="formattedDate"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                interval="preserveStartEnd"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[1, 5]}
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => moodEmojis[value as keyof typeof moodEmojis]}
                height={120}
              />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Area
                dataKey="mood"
                type="monotone"
                fill="var(--color-mood)"
                fillOpacity={0.4}
                stroke="var(--color-mood)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-mood)",
                  strokeWidth: 2,
                  r: 4
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2
                }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
