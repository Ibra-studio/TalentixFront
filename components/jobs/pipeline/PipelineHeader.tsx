"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, MapPin, Building2, Hash, Briefcase, 
  Share2, ExternalLink, Bookmark, Plus, Pencil 
} from "lucide-react";
import { HugeiconsIcon } from '@hugeicons/react'
import { Notification03Icon } from '@hugeicons/core-free-icons'

// Imports de shadcn/ui
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
interface PipelineHeaderProps {
  job: Job;
}

export default function PipelineHeader({ job }: PipelineHeaderProps) {
  // État pour gérer le bouton "Suivre"
  const [isFollowing, setIsFollowing] = useState(false);
  
  // État pour gérer l'ouverture/fermeture des statistiques
  const [isStatsOpen, setIsStatsOpen] = useState(true);

  // Mock des statistiques basées sur la capture d'écran
  const pipelineStats = [
    { label: "Nouveau", count: "6"},
    { label: "En revue", count: "9" },
    { label: "Entretien technique", count: "5" },
    { label: "Test technique", count: "-" },
    { label: "Embauché", count: "0"},
    { label: "Tous actifs", count: "20" },
    { label: "Rejeté", count: "-"},
  ];

  return (
    // On englobe le composant dans le Collapsible pour lier le trigger et le contenu
    <Collapsible
      open={isStatsOpen}
      onOpenChange={setIsStatsOpen}
      className="w-full flex flex-col bg-background p-6"
    >
      {/* --- LIGNE SUPÉRIEURE : DÉTAILS ET ACTIONS --- */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        
        {/* Partie Gauche : Détails du Job */}
        <div className="flex flex-col gap-3">
          {/* Titre et Statut */}
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${job.status === "PUBLISHED" ? 'bg-green-500' : 'bg-gray-500'}`}></span>
            <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
              {job.title}
              
              {/* Le bouton pour ouvrir/fermer (CollapsibleTrigger) */}
              <CollapsibleTrigger asChild>
                <Button className="p-1 hover:bg-muted rounded-md transition-colors outline-none  text-primaryfocus:ring-2 focus:ring-ring">
                  <ChevronDown 
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      isStatsOpen ? "rotate-180" : "rotate-0"
                    }`} 
                  /> {isStatsOpen ? "Masquer les statistiques" : "Afficher les statistiques"}
                </Button>
              </CollapsibleTrigger>
            </h1>
          </div>

          {/* Badges d'informations */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <div className="flex items-center gap-1 bg-tags/20 px-2.5 py-1.5 rounded-md text-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 bg-tags/20 px-2.5 py-1.5 rounded-md text-foreground">
              <Building2 className="w-3.5 h-3.5" />
              <span>{job.workModel}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Hash className="w-3.5 h-3.5" />
              
              <span>2</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Briefcase className="w-3.5 h-3.5" />
              <span>3</span>
            </div>
          </div>
        </div>

        {/* Partie Droite : Actions */}
        <div className="flex items-start gap-3 mt-4 md:mt-0 text-sm font-medium">
          <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-brand hover:text-white rounded-md text-primary transition-colors cursor-pointer">
            <Share2 className="w-4 h-4" />
            <span>Partager</span>
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-brand hover:text-white rounded-md text-primary transition-colors cursor-pointer">
            <ExternalLink className="w-4 h-4" />
            <span>Aperçu</span>
          </button>

          {/* Bouton Suivre */}
          <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200 ${
              isFollowing ? 'text-brand bg-brand/10' : 'hover:bg-brand text-primary'
            }`}
          >
            <Bookmark 
              className={`w-4 h-4 ${isFollowing ? 'fill-brand text-brand' : 'text-primary'}`} 
            />
            <span>Suivre</span>
          </button>

          <button className="p-1.5 hover:bg-gray-800 rounded-full border border-gray-700 transition-colors">
            <Plus className="w-4 h-4" />
          </button>

          {/* Bouton Modifier */}
          <Link href={`/jobs/${job.id}/edit`}>
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-brand hover:bg-brand/90 border border-gray-700 rounded-md transition-colors text-white cursor-pointer">
              <Pencil className="w-4 h-4" />
              <span>Modifier</span>
            </button>
          </Link>
        </div>
      </div>

      {/* --- NOUVELLE LIGNE : STATISTIQUES DE LA PIPELINE ENVELOPPÉES DANS COLLAPSIBLE CONTENT --- */}
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down transition-all">
        <div className="mt-8 pt-2">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {pipelineStats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-lg min-w-[100px] flex-1 py-2.5 px-3 flex flex-col items-center justify-center shadow-sm cursor-default hover:border-muted-foreground/30 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-foreground leading-none">{stat.count}</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1.5 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}