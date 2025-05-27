import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Lock, Star, Target, Trophy, Zap } from "lucide-react";
import type React from "react";
import { FC } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "locked" | "available" | "completed";
  progress?: number;
  position: { x: number; y: number };
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Getting Started",
    description: "Complete your first task",
    icon: <Target className="size-6" />,
    status: "completed",
    position: { x: 50, y: 10 }
  },
  {
    id: "2",
    title: "First Milestone",
    description: "Reach your first goal",
    icon: <Star className="size-6" />,
    status: "available",
    progress: 60,
    position: { x: 20, y: 25 }
  },
  {
    id: "3",
    title: "Speed Demon",
    description: "Complete tasks quickly",
    icon: <Zap className="size-6" />,
    status: "locked",
    position: { x: 70, y: 40 }
  },
  {
    id: "4",
    title: "Perfectionist",
    description: "Achieve perfect scores",
    icon: <Award className="size-6" />,
    status: "locked",
    position: { x: 30, y: 55 }
  },
  {
    id: "5",
    title: "Champion",
    description: "Master all challenges",
    icon: <Trophy className="size-6" />,
    status: "locked",
    position: { x: 60, y: 70 }
  },
  {
    id: "6",
    title: "Legend",
    description: "Ultimate achievement",
    icon: <Trophy className="size-6" />,
    status: "locked",
    position: { x: 40, y: 85 }
  }
];

function AchievementNode({ achievement }: { achievement: Achievement }) {
  const getNodeStyles = () => {
    switch (achievement.status) {
      case "completed":
        return "bg-green-500/20 border-green-500/40 text-green-600 dark:text-green-400 hover:bg-green-500/30 dark:bg-green-500/10 dark:border-green-500/30";
      case "available":
        return "bg-blue-500/20 border-blue-500/40 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30 cursor-pointer dark:bg-blue-500/10 dark:border-blue-500/30";
      case "locked":
        return "bg-muted/50 border-muted-foreground/20 text-muted-foreground";
      default:
        return "bg-muted/50 border-muted-foreground/20 text-muted-foreground";
    }
  };

  const getIconColor = () => {
    switch (achievement.status) {
      case "completed":
        return "text-green-600 dark:text-green-400";
      case "available":
        return "text-blue-600 dark:text-blue-400";
      case "locked":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 transform"
      style={{
        left: `${achievement.position.x}%`,
        top: `${achievement.position.y}%`
      }}
    >
      <Card
        className={`flex size-16 items-center justify-center border-2 backdrop-blur-sm transition-all duration-200 ${getNodeStyles()}`}
      >
        {achievement.status === "locked" ? (
          <Lock className="size-5" />
        ) : (
          <div className={getIconColor()}>{achievement.icon}</div>
        )}
      </Card>

      {achievement.status === "available" && achievement.progress && (
        <div className="absolute -bottom-6 left-1/2 w-12 -translate-x-1/2 transform">
          <Progress value={achievement.progress} className="h-1.5" />
        </div>
      )}

      <div className="absolute left-1/2 top-20 min-w-max -translate-x-1/2 transform text-center">
        <p className="text-foreground text-sm font-medium">{achievement.title}</p>
        <p className="text-muted-foreground mt-0.5 text-xs">{achievement.description}</p>
      </div>
    </div>
  );
}

function PathLine({ from, to }: { from: { x: number; y: number }; to: { x: number; y: number } }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
      <line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6,4"
        className="text-border opacity-40"
      />
    </svg>
  );
}

export const AchievementsMap: FC = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            Achievements (Placeholder, WIP)
          </h1>
          <p className="text-muted-foreground mb-6">
            Track your progress and unlock new milestones
          </p>
          <div className="flex justify-center gap-3">
            <Badge
              variant="secondary"
              className="border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
            >
              <Star className="mr-1 size-3" />2 Completed
            </Badge>
            <Badge
              variant="secondary"
              className="border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
            >
              <Target className="mr-1 size-3" />1 In Progress
            </Badge>
            <Badge
              variant="secondary"
              className="bg-muted/50 text-muted-foreground border-muted-foreground/20"
            >
              <Lock className="mr-1 size-3" />3 Locked
            </Badge>
          </div>
        </div>

        <div className="relative h-[800px] w-full overflow-hidden">
          {achievements.slice(0, -1).map((achievement, index) => (
            <PathLine
              key={`path-${achievement.id}`}
              from={achievement.position}
              to={achievements[index + 1].position}
            />
          ))}

          {achievements.map((achievement) => (
            <AchievementNode key={achievement.id} achievement={achievement} />
          ))}

          <div className="text-muted-foreground absolute right-4 top-4">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-green-500/40"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-blue-500/40"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="bg-muted-foreground/40 size-2 rounded-full"></div>
                <span>Locked</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-muted-foreground mt-8 text-center text-sm">
          Complete achievements to unlock new challenges
        </div>
      </div>
    </div>
  );
};
