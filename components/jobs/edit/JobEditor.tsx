"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Briefcase, FileText, Users, GitFork, Share2, Globe, Eye, MoreHorizontal, ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobDetailsForm } from "@/components/jobs/edit/JobDetailsForm";
import { simulateGetJobById } from "@/lib/job/JobData";
import { useEffect, useState } from "react";
import { Job } from "@/types/Job";
import { JobApplicationForm } from "./JobApplicationForm";

export function JobEditor({ initialJob, jobId }: { initialJob: Job | null; jobId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = searchParams.get("tab") || "job-details";

  const [job, setJob] = useState<Job | null>(initialJob); // 2. State pour le job
  

  const tabs = [
    { id: "job-details", label: "Job details", icon: Pencil },
    { id: "application", label: "Formulaire de candidature", icon: FileText },
    { id: "team", label: "Team", icon: Users },
    { id: "workflow", label: "Workflow", icon: GitFork },
    { id: "sharing", label: "Social sharing", icon: Share2 },
    { id: "careers", label: "Careers page", icon: Globe },
  ];


  const handleTabChange = (tabId: string) => {
    router.replace(`${pathname}?tab=${tabId}`, { scroll: false });
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* HEADER */}
      <header className="h-16 shrink-0 border-b border-border flex items-center justify-between px-6 bg-card z-10">
        <div className="flex items-center gap-4">
          {/* <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push('/jobs')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button> */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {/* Tu pourras remplacer par le vrai titre dynamique */}
              <h1 className="text-lg font-bold text-foreground">{job?.title}</h1>
              <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded uppercase">
                #{jobId}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Saved just now</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Partager <span className="ml-1 text-[10px]">▼</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Eye className="w-4 h-4 mr-2" /> Previsualiser
          </Button>
          <Button variant="outline" size="sm">Save changes</Button>
          <Button size="sm" className="bg-brand text-white ">
            Publier <span className="ml-2 border-l border-white/20 pl-2">▼</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* CONTENU (Sidebar + Main) */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 border-r border-border bg-card overflow-y-auto p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {activeTab === "job-details" && <JobDetailsForm initialJob={job} onTabChange={handleTabChange} />}
            {activeTab === "application" && <JobApplicationForm initialJob={job} onTabChange={handleTabChange}  />}
            {/* Autres onglets ici... */}
          </div>
        </main>
      </div>
    </div>
  );
}