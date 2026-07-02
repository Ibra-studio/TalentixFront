"use client";

import React from "react";
import { 
  ArrowLeft, ArrowRight, Plus, Pencil, Trash2, 
  ChevronDown, GripVertical, HelpCircle, Zap,
  Calendar, Banknote, Languages, Folder, Sparkles
} from "lucide-react";

// --- IMPORTS SHADCN ---
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Job } from "@/types/job";

interface JobWorkflowFormProps {
  initialJob: Job;
  onTabChange: (tabId: string) => void;
}

export function JobWorkflowForm({ initialJob, onTabChange }: JobWorkflowFormProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. AUTOMATISATION DU PROCESSUS (Workflow automations) */}
      <section className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Automatisations du processus</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Créez des automatisations pour ce poste en définissant ce qui doit se passer lors d'événements clés. <a href="#" className="text-primary hover:underline">En savoir plus</a>
            </p>
          </div>
          <Button variant="outline" size="sm" className="bg-background text-foreground border-border hover:bg-muted">
            <Zap className="w-4 h-4 mr-2 text-muted-foreground" /> Nouvelle automatisation
          </Button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
          <span className="text-sm text-muted-foreground">Aucune automatisation pour le moment</span>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">0</Badge>
        </div>
      </section>

      {/* 2. PIPELINE */}
      <section className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Pipeline de recrutement</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Créez un pipeline de recrutement pour gérer facilement les candidats. <a href="#" className="text-primary hover:underline">En savoir plus</a>
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-border">
                <GripVertical className="w-4 h-4 mr-2 text-muted-foreground" /> Sélectionner <ChevronDown className="w-3 h-3 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Modèle standard</DropdownMenuItem>
              <DropdownMenuItem>Modèle technique</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-6">
          {/* Sous-section : Candidats (Applicants) */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              Nouveaux candidats <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <PipelineItem name="Recommandé" dotColor="bg-slate-400" />
            <PipelineItem name="Sourcé" dotColor="bg-slate-400" />
            <PipelineItem name="A postulé" dotColor="bg-slate-400" />
          </div>

          {/* Sous-section : Processus en cours (Active process) */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              Processus en cours <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <PipelineItem name="Entretien téléphonique" dotColor="bg-blue-400" />
            <PipelineItem name="Entretien sur site" dotColor="bg-blue-500" />
            <PipelineItem name="Évaluation" dotColor="bg-cyan-500" />
            <PipelineItem name="Offre" dotColor="bg-slate-600" />
            
            <Button variant="outline" className="w-full border-dashed text-muted-foreground hover:text-foreground h-10">
              <Plus className="w-4 h-4 mr-2" /> Ajouter une étape
            </Button>
          </div>

          {/* Sous-section : Embauches (Hires) */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              Embauches <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <PipelineItem name="Embauché" dotColor="bg-emerald-500" hideAutomation />
            
            <Button variant="outline" className="w-full border-dashed text-muted-foreground hover:text-foreground h-10">
              <Plus className="w-4 h-4 mr-2" /> Ajouter une étape
            </Button>
          </div>
        </div>
      </section>

      {/* 3. CHAMPS DU PROFIL DU CANDIDAT (Candidate profile fields) */}
      <section className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Champs du profil du candidat</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Vous pourrez remplir ces champs sur le profil du candidat. <a href="#" className="text-primary hover:underline">Comment ça marche</a>
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-border">
                <GripVertical className="w-4 h-4 mr-2 text-muted-foreground" /> Aucun <ChevronDown className="w-3 h-3 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Par défaut</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <ProfileFieldItem icon={<Calendar className="w-4 h-4 text-muted-foreground" />} name="Disponibilité" />
          <ProfileFieldItem icon={<Banknote className="w-4 h-4 text-muted-foreground" />} name="Salaire" />
          <ProfileFieldItem 
            icon={<Languages className="w-4 h-4 text-muted-foreground" />} 
            name="Compétences linguistiques" 
            badgeText="EXTRAIT DU CV" 
          />
          <ProfileFieldItem 
            icon={<Folder className="w-4 h-4 text-muted-foreground" />} 
            name="Compétences" 
            badgeText="EXTRAIT DU CV" 
          />

          <Button variant="outline" className="w-full border-dashed text-muted-foreground hover:text-foreground h-10 mt-2">
            <Plus className="w-4 h-4 mr-2" /> Ajouter un nouveau
          </Button>
        </div>
      </section>

      {/* 4. NAVIGATION (BOTTOM) */}
      <div className="flex justify-between items-center pt-4 pb-8">
        <Button 
          variant="ghost" 
          onClick={() => onTabChange("team")} 
          className="text-muted-foreground hover:text-foreground bg-card border border-border hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Équipe
        </Button>
        <Button 
          onClick={() => onTabChange("sharing")} 
          className="bg-card border border-border hover:bg-muted text-foreground"
        >
          Partage de l'offre <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

    </div>
  );
}

// --- SOUS-COMPOSANTS UTILITAIRES ---

/**
 * Composant pour un élément de la pipeline (ex: Entretien téléphonique)
 */
function PipelineItem({ name, dotColor, hideAutomation = false }: { name: string, dotColor: string, hideAutomation?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-lg border border-border bg-background group hover:border-muted-foreground/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${dotColor}`} />
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <div className="flex items-center gap-1">
        {!hideAutomation && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Zap className="w-4 h-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Pencil className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

/**
 * Composant pour un champ du profil candidat (ex: Salaire, Compétences)
 */
function ProfileFieldItem({ icon, name, badgeText }: { icon: React.ReactNode, name: string, badgeText?: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-lg border border-border bg-background group hover:border-muted-foreground/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-5 flex justify-center">{icon}</div>
        <span className="text-sm font-medium text-foreground">{name}</span>
        {badgeText && (
          <Badge variant="secondary" className="text-[10px] font-bold uppercase bg-muted text-muted-foreground ml-2 flex items-center gap-1 border border-border">
            <Sparkles className="w-3 h-3" /> {badgeText}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-400">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}