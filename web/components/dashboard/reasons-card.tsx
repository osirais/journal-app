import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserOrThrow } from "@/utils/get-user-throw";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Link from "next/link";

export async function ReasonsCard() {
  const supabase = await createClient();
  const user = await getUserOrThrow(supabase);

  const { data: reasons } = await supabase
    .from("reason")
    .select("id, text, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <Card className="flex max-h-[400px] w-full flex-col">
      <CardHeader>
        <CardTitle id="tour-reasons">Reasons</CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1 space-y-4 overflow-y-auto">
        {reasons && reasons.length > 0 ? (
          reasons.map((reason) => (
            <div key={reason.id} className="rounded-lg border p-3 shadow-sm">
              <p className="text-sm">{reason.text}</p>
              <div className="text-muted-foreground mt-2 text-sm">
                <span>{format(new Date(reason.created_at), "MMM d, yyyy h:mm a")}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No reasons provided yet.</p>
        )}
        <Link href="/reasons" className="w-max">
          <Button variant="outline" className="w-max cursor-pointer">
            Manage Reasons
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
