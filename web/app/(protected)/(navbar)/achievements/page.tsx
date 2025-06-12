import { FlowerProgression } from "@/components/garden/flower-progression";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FLOWER_COLORS } from "@/constants/flower-colors";

export const metadata = {
  title: "Achievements"
};

const dailyData = {
  journal: 10,
  mood: 5,
  tasks: 8
};

const streakData = {
  journal: 4,
  mood: 3,
  tasks: 6
};

const Page = () => {
  return (
    <div className="mx-auto max-w-3xl py-20">
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="daily" className="cursor-pointer">
            Daily
          </TabsTrigger>
          <TabsTrigger value="streak" className="cursor-pointer">
            Streak
          </TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <div className="space-y-6">
            <div>
              <h3 className="mb-1 text-lg font-semibold">Journal</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Journaled for {dailyData.journal} day{dailyData.journal !== 1 ? "s" : ""}
              </p>
              <FlowerProgression progress={dailyData.journal} color={FLOWER_COLORS.daily.journal} />
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">Mood</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Mood tracked for {dailyData.mood} day{dailyData.mood !== 1 ? "s" : ""}
              </p>
              <FlowerProgression progress={dailyData.mood} color={FLOWER_COLORS.daily.mood} />
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">Tasks</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Completed tasks for {dailyData.tasks} day{dailyData.tasks !== 1 ? "s" : ""}
              </p>
              <FlowerProgression progress={dailyData.tasks} color={FLOWER_COLORS.daily.tasks} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="streak">
          <div className="space-y-6">
            <div>
              <h3 className="mb-1 text-lg font-semibold">Journal</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Longest journal streak: {streakData.journal} day
                {streakData.journal !== 1 ? "s" : ""}
              </p>
              <FlowerProgression
                progress={streakData.journal}
                color={FLOWER_COLORS.streak.journal}
              />
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">Mood</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Longest mood streak: {streakData.mood} day{streakData.mood !== 1 ? "s" : ""}
              </p>
              <FlowerProgression progress={streakData.mood} color={FLOWER_COLORS.streak.mood} />
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">Tasks</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Longest task streak: {streakData.tasks} day{streakData.tasks !== 1 ? "s" : ""}
              </p>
              <FlowerProgression progress={streakData.tasks} color={FLOWER_COLORS.streak.tasks} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
