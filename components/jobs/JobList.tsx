"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Globe, 
  Megaphone, 
  Pencil, 
  MoreHorizontal, 
  Bookmark 
} from "lucide-react";
import { Job } from "@/types/Job";
import Link from "next/link";

interface JobListProps {
  jobs: Job[];
  onToggleFollow: (id: string) => void;
}

export function JobList({ jobs, onToggleFollow }: JobListProps) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      {jobs.map((job) => (
        <Card 
          key={job.id} 
          className="p-4 flex flex-col gap-4 bg-card/50 hover:bg-accent/5 transition-colors border-border/60"
        >
          {/* Haut de la carte */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-base flex items-center gap-2">
                {job.title} 
                <span className="text-xs text-muted-foreground font-normal">
                  #{job.id.split('-')[1]}
                </span>
              </h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                {job.workModel === "Présentiel" && (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5"/> Présentiel
                  </span>
                )}
                {job.workModel === "Télétravail" && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5"/> Télétravail
                  </span>
                )}
              </div>
            </div>
            
            {/* Actions rapides */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-xs font-medium hover:bg-brand/10">
                <Megaphone className="w-3.5 h-3.5 mr-1.5"/> Promouvoir
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs font-medium hover:bg-brand/10">
              <Link href={`/jobs/${job.id}/edit`} className="flex">
              
                <Pencil className="w-3.5 h-3.5 mr-1.5"/> Modifier
              </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4"/>
              </Button>
            </div>
          </div>

          <div className="h-[1px] bg-border w-full" />

          {/* Bas de la carte */}
          <div className="flex justify-between items-center text-sm">
            <div className="font-semibold text-sm">
              {job.candidatesCount} <span className="text-muted-foreground font-normal">Candidats qualifiés</span>
            </div>
            
            <div className="flex items-center gap-5 text-muted-foreground font-medium text-xs">
              <span 
                onClick={() => onToggleFollow(job.id)}
                className="flex items-center gap-1.5 cursor-pointer hover:text-brand transition-colors"
              >
                <Bookmark className={`w-3.5 h-3.5 ${job.isFollow ? "fill-brand text-brand" : ""}`}/> 
                {job.isFollow ? "Suivi" : "Suivre"}
              </span>
              
              <span className="flex items-center gap-1.5 text-foreground">
                <div className={`w-2 h-2 rounded-full ${
                  job.status === 'Publié' ? 'bg-green-500' : 
                  job.status === 'Brouillon' ? 'bg-yellow-500' : 'bg-red-500'
                }`} /> 
                {job.status}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}