"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, ArrowRight, Plus, X, ChevronDown, Search, Users 
} from "lucide-react";

// --- IMPORTS SHADCN ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Job } from "@/types/job";
import CandidateAvatar from "@/components/CandidateAvatar";

interface JobTeamFormProps {
  initialJob: Job;
  onTabChange: (tabId: string) => void;
}

export function JobTeamForm({ initialJob, onTabChange }: JobTeamFormProps) {
  // États pour le Recruteur
  const [recruiterQuery, setRecruiterQuery] = useState("");
  const [selectedRecruiter, setSelectedRecruiter] = useState<string | null>(null);

  // États pour le Responsable du recrutement
  const [managerQuery, setManagerQuery] = useState("");
  const [selectedManager, setSelectedManager] = useState<string | null>(null);

  // Exemple de liste de membres pour la recherche
  const teamMembersMock = [
    { name: "Mamadou Ibrahim Diakité", initials: "MI" }
  ];

  // Filtrage distinct pour chaque liste
  const filteredRecruiters = teamMembersMock.filter(member =>
    member.name.toLowerCase().includes(recruiterQuery.toLowerCase())
  );

  const filteredManagers = teamMembersMock.filter(member =>
    member.name.toLowerCase().includes(managerQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. PRENEURS DE DECISION */}
      <section className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">Preneurs de decision</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Membres de l'équipe responsables du processus de recrutement et des exigences du poste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recruiter (Maintenant sous forme de DropdownMenu Shadcn) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Recruteur</label>
            <div className="relative">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-input/50 border-border font-normal hover:bg-input text-muted-foreground data-[state=open]:ring-2 data-[state=open]:ring-primary data-[state=open]:border-primary"
                  >
                    {selectedRecruiter || "Selectionner"}
                    <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent 
                  align="start" 
                  className="w-[--radix-dropdown-menu-trigger-width] p-2 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="p-1 border-b border-border mb-1">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
                      <Input 
                        className="pl-9 bg-background border-none focus-visible:ring-1 focus-visible:ring-primary h-9" 
                        placeholder="Rechercher"
                        value={recruiterQuery}
                        onChange={(e) => setRecruiterQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="max-h-[200px] overflow-y-auto space-y-0.5">
                    {filteredRecruiters.length > 0 ? (
                      filteredRecruiters.map((member, index) => (
                        <button 
                          key={index}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-muted rounded-md transition-colors"
                          onClick={() => {
                            setSelectedRecruiter(member.name);
                          }}
                        >
                          <CandidateAvatar>
                            {member.initials}
                          </CandidateAvatar>
                          <span className="font-medium text-foreground truncate">{member.name}</span>
                        </button>
                      ))
                    ) : (
                      <div className="text-xs text-muted-foreground text-center py-3">
                        Aucun membre trouvé
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Hiring Manager */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Responsable du recrutement</label>
            <div className="relative">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-input/50 border-border font-normal hover:bg-input text-muted-foreground data-[state=open]:ring-2 data-[state=open]:ring-primary data-[state=open]:border-primary"
                  >
                    {selectedManager || "Selectionner"}
                    <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent 
                  align="start" 
                  className="w-[--radix-dropdown-menu-trigger-width] p-2 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="p-1 border-b border-border mb-1">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
                      <Input 
                        className="pl-9 bg-background border-none focus-visible:ring-1 focus-visible:ring-primary h-9" 
                        placeholder="Rechercher"
                        value={managerQuery}
                        onChange={(e) => setManagerQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="max-h-[200px] overflow-y-auto space-y-0.5">
                    {filteredManagers.length > 0 ? (
                      filteredManagers.map((member, index) => (
                        <button 
                          key={index}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-muted rounded-md transition-colors"
                          onClick={() => {
                            setSelectedManager(member.name);
                          }}
                        >
                          <CandidateAvatar>
                            {member.initials}
                          </CandidateAvatar>
                          <span className="font-medium text-foreground truncate">{member.name}</span>
                        </button>
                      ))
                    ) : (
                      <div className="text-xs text-muted-foreground text-center py-3">
                        Aucun membre trouvé
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEAM MEMBERS */}
      <section className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Membres de l'équipe</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Les membres de l'équipe auront accès à ce poste et à tous les candidats.
          </p>
        </div>

        <div className="flex flex-col border border-border rounded-lg bg-background/50 divide-y divide-border mt-2">
          
          {/* Member 1: Mamadou Ibrahim Diakite */}
          <div className="flex items-center justify-between p-4 group">
            <div className="flex items-center gap-3">
              <CandidateAvatar>
                MI
              </CandidateAvatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">Mamadou Ibrahim Diakité</span>
                <span className="text-xs text-muted-foreground">Administrateur</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Member 2: Administrator Group */}
          <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">Administrateur</span>
                <span className="text-xs text-muted-foreground">1 membre d'équipe peut accéder à tous les postes</span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>

        </div>

        <div>
          <Button variant="outline" className="mt-2 bg-transparent border-border text-foreground hover:bg-muted">
            <Plus className="w-4 h-4 mr-2" /> Ajouter un membre d'équipe
          </Button>
        </div>
      </section>

      {/* 3. NAVIGATION (BOTTOM) */}
      <div className="flex justify-between items-center pt-4 pb-8">
        <Button 
          variant="ghost" 
          onClick={() => onTabChange("application")} 
          className="text-muted-foreground hover:text-foreground bg-card border border-border hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Formulaire de candidature
        </Button>
        <Button 
          onClick={() => onTabChange("workflow")} 
          className="bg-card border border-border hover:bg-muted text-foreground"
        >
          Processus de recrutement <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

    </div>
  );
}