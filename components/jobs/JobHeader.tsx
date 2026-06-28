"use client";

import React, { useState } from "react";
import { 
  AlertTriangle, 
  ChevronDown, 
  Plus, 
  FileText, 
  Pencil, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CreateJobDialog } from "./CreateJobDialog";

export interface JobHeaderProps {
  // Permet de passer le nom du filtre actif depuis la page (ex: "Tous", "Publiés")
  activeFilterName?: string;
}

export default function JobHeader({ activeFilterName = "All" }: JobHeaderProps) {
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between p-6 bg-filter-sidebar-bg border-b border-border/50">
      {/* Titre dynamique basé sur le filtre */}
      <h1 className="text-xl font-bold tracking-tight text-foreground">
        {activeFilterName}
      </h1>

      <div className="flex items-center gap-3">
        {/* Dropdown : Quota de jobs (Popover) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="h-9 border-yellow-600/30 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400 gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>3 slots left</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 shadow-lg border-border" align="end">
            <div className="p-4 space-y-4">
              {/* Section Plan Actuel */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Current plan</p>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Grow</span>
                  <Badge variant="secondary" className="bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 border-none rounded-sm text-[10px] px-1.5 uppercase font-bold tracking-wider">
                    Trial plan
                  </Badge>
                </div>
              </div>

              <div className="h-px bg-border w-full" />

              {/* Section Slots */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">Job slots</p>
                <p className="text-sm">
                  <span className="font-medium">5 slots</span> • 2 in use, 3 available
                </p>
                <Button className="w-full bg-brand  hover:bg-brand/90">
                  Upgrade plan
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Bouton + Modale : Ajouter un job (Dialog) */}
       <Button 
          onClick={() => setIsNewJobModalOpen(true)}
          className="h-9 bg-brand text-white hover:bg-brand/90 gap-2 px-4"
        >
          <Plus className="h-4 w-4" />
          Ajouter un job
        </Button>
        
        {/* 3. La modale externalisée */}
        <CreateJobDialog 
          open={isNewJobModalOpen} 
          onOpenChange={setIsNewJobModalOpen} 
        />
      </div>
    </header>
  );
}