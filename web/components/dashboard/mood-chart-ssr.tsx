import { MoodChartCSR } from "@/components/dashboard/mood-chart-csr";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMoodHistory } from "@/lib/actions/mood-actions";

export const MoodChartSSR = async () => {
  const { data, error } = await getMoodHistory();

  if (error) {
    console.error("Error fetching mood history:", error);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Mood Trend</CardTitle>
          <CardDescription>Unable to display mood history</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center">
          <p className="text-muted-foreground">Failed to load mood history</p>
        </CardContent>
      </Card>
    );
  }

  return <MoodChartCSR data={data} />;
};
