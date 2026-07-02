"use client";

import { useState, useTransition } from "react";
import { Calendar, Share, Bookmark, MoreHorizontal } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OverviewTab } from "./tabs/OverviewTab"; // Chemin à vérifier
import { Candidate } from "@/types/candidate"; // Chemin à vérifier

// Les onglets traduits en français
const TABS = ["Aperçu", "Messages", "Événements", "Évaluation", "Fichiers", "Activité", "WhatsApp"];

interface LeftPanelClientProps {
  candidate: Candidate;
}

export function LeftPanelClient({ candidate }: LeftPanelClientProps) {
  // Par défaut, l'onglet actif est "Aperçu"
  const [activeTab, setActiveTab] = useState("Aperçu");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tab: string) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      
      {/* --- NOUVEAU HEADER --- */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        {/* Partie gauche : Avatar et Nom */}
        <div className="flex items-center gap-4">
          <Avatar className={`size-18 ${candidate.avatarColor} ring`}>
            {candidate.avatarUrl && (
              <AvatarImage 
                src={candidate.avatarUrl} 
                alt={candidate.name} 
                className="object-cover object-top" 
              />
            )}
            <AvatarFallback className="text-lg font-medium text-white">
              {candidate.initial}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-foreground">{candidate.name}</h2>
        </div>

        {/* Partie droite : Boutons d'action */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Calendar className="size-4" />
            Planifier
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Share className="size-4" />
            Partager
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Bookmark className="size-4" />
            Suivre
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </div>
      {/* ---------------------- */}

      {/* Navigation des onglets */}
      <div className="flex border-b border-border px-6 pt-2 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {/* L'indicateur actif avec la couleur de marque */}
            {activeTab === tab && (
              <span
                className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-md"
                style={{ backgroundColor: "var(--color-brand)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Zone de contenu défilable */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        {isPending ? (
          <div className="flex h-full w-full items-center justify-center">
             <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Spinner className="size-6" style={{ color: "var(--color-brand)" }} />
              <p className="text-xs">Chargement de l'onglet...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Affichage conditionnel basé sur la traduction */}
            {activeTab === "Aperçu" && <OverviewTab candidate={candidate} />}
            
            {/* Fallback pour les autres onglets en attendant qu'ils soient construits */}
            {activeTab !== "Aperçu" && (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-8 text-muted-foreground">
                <p>Contenu de l'onglet <strong className="text-foreground">{activeTab}</strong> en cours de construction.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}