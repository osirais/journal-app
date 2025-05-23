"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Clock, FileEdit } from "lucide-react";
import { formatDateAgo } from "@/utils/format-date-ago";

type Journal = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
};

export default function JournalsPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/journals")
      .then((res) => {
        setJournals(res.data.journals || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to load journals");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="mb-2 text-3xl font-bold">Journals</h1>
      <p className="text-muted-foreground mb-6">Your collection of journals</p>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : journals.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            No journals found. Create your first journal to get started.
          </div>
        ) : (
          journals.map((journal) => (
            <Card
              key={journal.id}
              className="cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
            >
              <CardContent className="p-0">
                <div className="flex items-start p-4">
                  {journal.thumbnail_url ? (
                    <div className="mr-4 flex-shrink-0">
                      <img
                        src={journal.thumbnail_url || "/placeholder.svg"}
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bg-muted mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded">
                      <FileEdit className="text-muted-foreground h-8 w-8" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-medium">{journal.title}</h3>

                    {journal.description && (
                      <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                        {journal.description}
                      </p>
                    )}

                    <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        <span>Created {formatDateAgo(new Date(journal.created_at))}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Updated {formatDateAgo(new Date(journal.updated_at))}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
