import { Navbar } from "@/components/navbar/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { ArrowRight, BookOpen, Heart, TrendingUp } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const signedIn = !!user;

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main id="main-content" className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              ✨ Transform your thoughts
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Your personal space for
              <br />
              <span className="text-muted-foreground">growth and reflection</span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
              Build better habits, track your progress, and unlock insights about yourself through
              the power of journaling (in a fun way).
            </p>
          </div>
          <div className="flex flex-col place-items-center justify-center gap-4 sm:flex-row">
            <Link href={signedIn ? "/dashboard" : "/login"}>
              <Button size="lg" className="group cursor-pointer text-lg has-[>svg]:px-8">
                {signedIn ? "To Dashboard" : "Get Started"}
                <ArrowRight className="size-5 transform transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground text-sm">Free & private • Your space to grow</p>
        </div>
        <div className="mx-auto mt-24 grid max-w-6xl gap-6 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-primary/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-lg">
                <BookOpen className="text-primary size-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Daily Journaling</h3>
              <p className="text-muted-foreground text-sm">
                Capture your thoughts, feelings, and experiences with our intuitive writing
                interface.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-primary/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-lg">
                <TrendingUp className="text-primary size-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Track Progress</h3>
              <p className="text-muted-foreground text-sm">
                Visualize your growth over time with insights and analytics about your journaling
                habits.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-primary/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-lg">
                <Heart className="text-primary size-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Self-Discovery</h3>
              <p className="text-muted-foreground text-sm">
                Discover patterns in your thoughts and emotions to better understand yourself.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="mt-24 border-t">
        <div className="text-muted-foreground container mx-auto px-4 py-8 text-center text-sm">
          <p>todo: add text here</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
