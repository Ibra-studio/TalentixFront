"use client";

import { MessageSquarePlus, Plus, ChevronUp, MoreHorizontal, ChevronDown, ThumbsUp, Smile, Reply, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RightPanelClientProps {
  candidate: any;
  evaluation: any;
}

export default function RightPanelClient({ candidate, evaluation }: RightPanelClientProps) {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-muted/10 p-6 scrollbar-thin">
      
      {/* HEADER : Évaluer & Assigner */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
          <MessageSquarePlus className="size-4" />
          Évaluer
        </div>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground hover:text-foreground">
          <Plus className="size-4" />
          Assigner
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* CARTE 1 : Statut du Job */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          {/* Titre & Options */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                {candidate.job}
                <ChevronUp className="size-3 text-muted-foreground" />
              </h3>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>

          {/* Badge & Jauge */}
          <div className="flex justify-between items-start mb-6">
            <div>
              {/* Badge Embauché */}
              <button className="flex items-center gap-1.5 rounded-md bg-emerald-500/20 text-emerald-500 px-3 py-1.5 text-xs font-semibold mb-3 hover:bg-emerald-500/30 transition-colors">
                <span className="flex items-center gap-1.5">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                   Embauché
                </span>
                <ChevronDown className="size-3 ml-1 opacity-70" />
              </button>
              <p className="text-xs text-muted-foreground">
                Assigné le {evaluation.assignedDate} • {evaluation.assignedLocation}
              </p>
            </div>

            {/* Jauge d'évaluation (Reproduction CSS simple du dashboard) */}
            <div className="relative size-12 flex items-center justify-center rounded-full border-[3px] border-dashed border-border">
               <MessageSquarePlus className="size-4 text-muted-foreground opacity-50" />
            </div>
          </div>

          {/* Tableau de détails */}
          <div className="space-y-3 text-xs mb-5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date d'embauche</span>
              <span className="text-foreground">{evaluation.hiredDate} (il y a 14j)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date de début</span>
              <span className="text-foreground">{evaluation.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lieu de travail</span>
              <span className="text-foreground">{evaluation.workLocation}</span>
            </div>
          </div>

          {/* Bouton d'édition */}
          <Button variant="outline" className="w-full text-xs h-9 bg-transparent border-border hover:bg-muted/50 gap-2">
            <Edit2 className="size-3" />
            Modifier les détails d'embauche
          </Button>
        </div>

        {/* CARTE 2 : Tâches */}
        {/* <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 cursor-pointer">
            <h3 className="font-semibold text-sm">Tâches</h3>
            <ChevronUp className="size-3 text-muted-foreground" />
          </div>
          <Input 
            placeholder="Ajouter une tâche..." 
            className="h-10 text-sm bg-transparent border-border focus-visible:ring-1"
          />
        </div> */}

        {/* CARTE 3 : Notes */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 cursor-pointer">
            <h3 className="font-semibold text-sm">Notes</h3>
            <ChevronUp className="size-3 text-muted-foreground" />
          </div>
          <Input 
            placeholder="Ajouter une note..." 
            className="h-10 text-sm bg-transparent border-border mb-6 focus-visible:ring-1"
          />

          {/* Liste des Notes */}
          <div className="flex flex-col gap-6">
            {evaluation.notes.map((note: any) => (
              <div key={note.id} className="flex gap-3">
                <Avatar className={`size-8 ${note.authorColor}`}>
                  <AvatarFallback className="text-xs text-white font-medium">{note.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">{note.authorName}</span>
                    <span className="text-xs text-muted-foreground">{note.timeAgo}</span>
                  </div>
                  <p className="text-sm text-muted-foreground pb-2">
                    {note.text}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <button className="text-muted-foreground hover:text-foreground transition-colors"><ThumbsUp className="size-3.5" /></button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors"><Smile className="size-3.5" /></button>
                    <button className="text-xs text-muted-foreground font-medium hover:text-foreground transition-colors flex items-center gap-1">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}