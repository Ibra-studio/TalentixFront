

import { use } from "react";
import { ArrowLeft, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobEditor } from "@/components/jobs/edit/JobEditor";
import { simulateGetJobById } from "@/lib/job/JobData";

export  default async function JobEditPage({ params }: { params: Promise<{ id: string }> }) {
 const resolvedParams = await params;
  const jobId = resolvedParams.id;

  const  Job= await simulateGetJobById(jobId)
  if(!Job) {
    console.log("introuvable")
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* INJECTION DU JOB EDITOR (qui contient la sidebar interne) */}
      <div className="flex-1 overflow-hidden relative">
        <JobEditor jobId={jobId} initialJob={Job ?? null}/>
      </div>

    </div>
  );
}