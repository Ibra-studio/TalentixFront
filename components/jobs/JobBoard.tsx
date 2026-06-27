"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Job } from "@/types/Job";

interface JobBoardProps {
  jobs: Job[];
}

export function JobBoard({ jobs }: JobBoardProps) {
  const statuses = ["Publié", "Brouillon", "Fermé","interne"];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-fit w-fitflex-1 min-h-0">
      {statuses.map((status) => {
        const columnJobs = jobs.filter((j) => j.status === status);
        
        return (
          <div key={status} className="flex-none w-[300px] flex flex-col gap-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm text-foreground capitalize">{status}</h3>
              <Badge variant="outline" className="text-xs">{columnJobs.length}</Badge>
            </div>

            {columnJobs.map((job) => (
              <Card 
                key={job.id} 
                className="p-3 flex flex-col gap-2 cursor-grab active:cursor-grabbing hover:border-brand/50 transition-colors shadow-sm"
              >
                <div className="font-medium text-sm text-foreground/90">{job.title}</div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <span>{job.department}</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {job.candidatesCount}
                  </span>
                </div>
              </Card>
            ))}

            {columnJobs.length === 0 && (
              <div className="h-24 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center text-xs text-muted-foreground bg-muted/20">
                Aucun job
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}