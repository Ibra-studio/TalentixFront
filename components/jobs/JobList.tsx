"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
import { Job } from "@/types/job";
import Link from "next/link";

interface JobListProps {
  jobs: Job[];
  onToggleFollow: (id: string) => void;
}

export function JobList({ jobs, onToggleFollow }: JobListProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 pb-10">
      {jobs.map((job) => (
        <Card 
          key={job.id} 
          // "group" : permet aux enfants (titre, icône) de réagir au hover
          // de CETTE carte précise via group-hover:*.
          // onClick au niveau de la Card : navigue vers la pipeline.
          // C'est pour ça qu'on n'utilise PAS de <Link> englobant — un <Link>
          // autour de toute la carte interdirait d'avoir des <Link>/<button>
          // cliquables à l'intérieur (imbrication de liens invalide en HTML).
          onClick={() => router.push(`/jobs/${job.id}/pipeline`)}
          className="group p-4 flex flex-col gap-4 bg-card/50 hover:bg-accent/5 transition-colors border-border/60 cursor-pointer"
        >
          {/* Haut de la carte */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-base flex items-center gap-2 group-hover:underline">
                {job.title} 
                <span className="text-xs text-muted-foreground font-normal">
                  #{job.id.split('-')[1]}
                </span>
              </h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                {job.workModel === "ON_SITE" && (
                  <span className="flex items-center gap-1.5">
                    {/* group-hover sur l'icône comme demandé : elle devient
                        visuellement "interactive" en même temps que le reste */}
                    <Building2 className="w-3.5 h-3.5 group-hover:text-foreground transition-colors"/> Présentiel
                  </span>
                )}
                {job.workModel === "REMOTE" && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 group-hover:text-foreground transition-colors"/> Télétravail
                  </span>
                )}
              </div>
            </div>
            
            {/* Actions rapides — chaque élément stoppe la propagation du clic
                pour ne PAS déclencher la navigation de la carte parente */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs font-medium hover:bg-brand/10"
                onClick={(e) => e.stopPropagation()}
              >
                <Megaphone className="w-3.5 h-3.5 mr-1.5"/> Promouvoir
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs font-medium hover:bg-brand/10"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={`/jobs/${job.id}/edit`} className="flex">
                  <Pencil className="w-3.5 h-3.5 mr-1.5"/> Modifier
                </Link>
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
              >
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
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFollow(job.id);
                }}
                className="flex items-center gap-1.5 cursor-pointer hover:text-brand transition-colors"
              >
                <Bookmark className={`w-3.5 h-3.5 ${job.isFollow ? "fill-brand text-brand" : ""}`}/> 
                {job.isFollow ? "Suivi" : "Suivre"}
              </span>
              
              <span className="flex items-center gap-1.5 text-foreground">
                <div className={`w-2 h-2 rounded-full ${
                  job.status === 'PUBLISHED' ? 'bg-green-500' : 
                  job.status === 'DRAFT' ? 'bg-yellow-500' : 'bg-red-500'
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