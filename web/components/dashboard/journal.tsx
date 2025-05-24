import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export const JournalCard: React.FC = () => {
  return (
    <Card className="p-6">
      <h3 className="mb-3 text-lg font-semibold">Journal</h3>
      <div className="grid h-full place-items-center">
        <div className="grid place-items-center gap-6">
          <Link href="/journals">
            <Button variant="outline" className="mt-auto cursor-pointer">
              Create Entry
            </Button>
          </Link>
          <p className="mb-4 text-center text-sm text-gray-500">
            Record your thoughts and experiences
          </p>
        </div>
      </div>
    </Card>
  );
};
