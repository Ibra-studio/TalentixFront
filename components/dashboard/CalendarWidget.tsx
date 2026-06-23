"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  AlertCircle, 
  Plus, 
  Calendar as CalendarIcon, 
  Users, 
  ChevronDown,
  SlidersHorizontal 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GoogleCalendar, Outlook } from "../landing/Icons";

export function CalendarWidget() {
  const [date, setDate] = React.useState<Date | undefined>(new Date()); 
  const [activeSubTab, setActiveSubTab] = useState("week"); // week | today | past
  const [eventFilter, setEventFilter] = useState("all"); // all | me
  
  // Simulation du rôle (à lier plus tard avec votre système d'authentification/Rôles)
  const isAdmin = true; 

  return (
    <div className="space-y-4">
      {/* 1. Bannière d'état de synchronisation (Optimisée couleur Brand Talentix) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border border-brand/40 bg-brand text-brand-foreground">
        <div className="flex gap-3">
          
          <div>
            <p className="font-semibold text-sm">Votre calendrier n'est pas encore connecté</p>
            <p className="text-xs opacity-90">
              Ajoutez vos disponibilités pour accélérer la planification et gérer vos entretiens au même endroit.
            </p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 w-full md:w-auto justify-end">
          <Button variant="outline" size="lg" className="bg-card text-foreground text-xs border-border/60">
          <GoogleCalendar/>
            Google Calendar
          </Button>
          <Button variant="outline" size="lg" className="bg-card text-foreground text-xs border-border/60">
          <Outlook/>
            Microsoft (Outlook)
          </Button>
        </div>
      </div>

      {/* 2. Bloc Unique Calendrier + Événements (Modèle fidèle à Screenshot 2026-06-23 110321.png) */}
      <Card className="flex flex-col lg:flex-row border border-border bg-card overflow-hidden">
        
        {/* --- PARTIE GAUCHE : LISTE DES ÉVÉNEMENTS (Prend 2/3 de l'espace) --- */}
        <div className="lg:w-2/3 flex flex-col justify-between min-h-[380px]">
          {/* Header de la liste */}
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 bg-muted/20">
            {/* Sous-onglets de navigation temporelle */}
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveSubTab("week")}
                className={cn(
                  "text-xs font-semibold pb-2.5 pt-1 relative border-b-3 border-transparent transition-colors text-muted-foreground hover:text-foreground",
                  activeSubTab === "week" && "text-foreground border-brand"
                )}
              >
                Cette semaine
              </button>
              <button
                onClick={() => setActiveSubTab("today")}
                className={cn(
                  "text-xs font-semibold pb-2.5 pt-1 relative border-b-3 border-transparent transition-colors text-muted-foreground hover:text-foreground",
                  activeSubTab === "today" && "text-foreground border-brand"
                )}
              >
                Aujourd'hui
              </button>
              <button
                onClick={() => setActiveSubTab("past")}
                className={cn(
                  "text-xs font-semibold pb-2.5 pt-1 relative border-b-3 border-transparent transition-colors text-muted-foreground hover:text-foreground",
                  activeSubTab === "past" && "text-foreground border-brand"
                )}
              >
                Événements passés
              </button>
            </div>

            {/* Filtre de portée : Tout le monde VS Mes événements (Conditionné Admin) */}
            <div>
              {isAdmin ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-8 gap-1.5 px-2">
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      <span>
                        {eventFilter === "all" ? "Événements de tous" : "Mes événements uniquement"}
                      </span>
                      <ChevronDown className="h-3 w-3 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border border-border w-fit">
                    <DropdownMenuItem className="text-xs cursor-pointer" onClick={() => setEventFilter("all")}>
                      <Users className="h-3.5 w-3.5 mr-2 opacity-70" /> Événements de tous
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs cursor-pointer" onClick={() => setEventFilter("me")}>
                      <CalendarIcon className="h-3.5 w-3.5 mr-2 opacity-70" /> Mes événements uniquement
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <span className="text-xs text-muted-foreground font-medium px-2 py-1 bg-muted rounded">
                  Mes événements
                </span>
              )}
            </div>
          </div>

          {/* Corps de la liste - État vide */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
            <div className="relative opacity-60 dark:opacity-40 mb-3 flex items-center justify-center h-16 w-16 rounded-full bg-muted/60">
              <CalendarIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Aucun événement pour le moment
            </p>
            <p className="text-[11px] text-muted-foreground/70 max-w-[280px] mt-0.5">
              Les entretiens ou réunions planificados pour cette période apparaîtront ici.
            </p>
          </div>
        </div>

        {/* --- PARTIE DROITE : MINI-CALENDRIER & ACTIONS (Prend 1/3 de l'espace) --- */}
        {/* border-t pour mobile, border-l et border-border/30 pour une ligne verticale très discrète sur desktop */}
        <div className="lg:w-1/3 p-4 flex flex-col justify-between bg-muted/5 gap-4 border-t lg:border-t-0 lg:border-l border-border/30">
          
          {/* Conteneur fluide pour le calendrier */}
        <div className="w-full flex justify-center [& > *]:w-full">
              <Calendar

            mode="single"

            selected={date}

            onSelect={setDate}

            className="rounded-md border-none w-full"

          /> 
          </div>

          {/* Boutons d'action empilés en bas */}
          <div className="flex flex-col gap-2 w-full pt-2 border-t border-border/30">
            <Button variant="outline" size="sm" className="w-full text-xs h-9 bg-card">
              Ouvrir le calendrier complet
            </Button>
            <Button size="sm" className="w-full text-xs h-9 bg-brand text-brand-foreground hover:bg-brand/90 gap-1.5 font-semibold">
              <Plus className="h-4 w-4" /> Planifier un événement
            </Button>
          </div>

        </div>
      </Card>
    </div>
  );
}