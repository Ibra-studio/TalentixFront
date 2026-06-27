"use client"

import * as React from "react"
import {
  Search,
  Star,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  FolderPlus,
  MoreHorizontal,
  ListFilter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface CandidateToolbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  isSidebarOpen: boolean
  onToggleSidebar: () => void
  filteredCandidatesCount: number
  totalCandidatesCount: number
  // Nouvelles props pour la gestion du tri
  sortBy: string
  onSortChange: (sortId: string) => void
}

// Les options extraites de "Screenshot 2026-06-24 100736.png"
const SORT_OPTIONS = [
  { id: "average_evaluation_score", label: "Score d'évaluation moyen" },
  { id: "job", label: "Poste" },
  { id: "pipeline_stage", label: "Étape du pipeline" },
  { id: "evaluation_score", label: "Score d'évaluation" },
  { id: "talent_pool", label: "Vivier de talents" },
  { id: "date_created", label: "Date de création" },
  { id: "last_activity", label: "Dernière activité" },
  { id: "disqualified_by", label: "Disqualifié par" },
]

export function CandidateToolbar({
  searchQuery,
  onSearchChange,
  isSidebarOpen,
  onToggleSidebar,
  filteredCandidatesCount,
  totalCandidatesCount,
  sortBy,
  onSortChange,
}: CandidateToolbarProps) {
  // On récupère le label de l'option sélectionnée, avec un fallback de sécurité
  const selectedSortLabel =
    SORT_OPTIONS.find((opt) => opt.id === sortBy)?.label || "Date de création"

  return (
    <div className="space-y-4 select-none">
      {/* Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Candidats
        </h1>
        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-60 hover:opacity-100">
          <Star className="h-4 w-4" />
        </Button>
      </div>

      {/* Global Search Bar */}
      <div className="relative w-full max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-60" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher des candidats par mot-clé (nom, job, prenom ...)"
          className="pl-9 h-9 bg-accent/20 border-border/80 rounded-md text-sm w-full focus-visible:ring-1 focus-visible:ring-brand"
        />
      </div>

      {/* Actions and sort buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          {!isSidebarOpen && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleSidebar}
              className="h-8 border-border/80 gap-2 font-normal"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 opacity-80" />
              <span className="text-xs">Filtres</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-border/80 gap-1 text-xs text-muted-foreground font-normal"
              >
                <span className="text-foreground">
                  1 - {filteredCandidatesCount}
                </span>{" "}
                sur {totalCandidatesCount} candidats
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-fit">
              <DropdownMenuItem>Afficher 25 par page</DropdownMenuItem>
              <DropdownMenuItem>Afficher 50 par page</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 bg-brand hover:bg-brand/90 dark:text-white gap-1.5 text-xs font-medium rounded-md px-3"
          >
            <Plus className="h-3.5 w-3.5" />
            Ajouter des candidats
          </Button>

          {/* Menu déroulant de tri */}
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      size="sm"
     className="h-8 border-border/80 gap-1.5 text-xs font-normal transition-colors data-[state=open]:bg-brand! data-[state=open]:text-black dark:data-[state=open]:text-white data-[state=open]:border-brand"
    >
      <ListFilter className="h-3.5 w-3.5 opacity-60" />
      {selectedSortLabel}
      <ChevronDown className="h-3 w-3 opacity-60" />
    </Button>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent align="end" className="w-[220px]" onCloseAutoFocus={(e) => e.preventDefault()}>
    {/* === HEADER DU MENU === */}
    <DropdownMenuLabel className="text-[11px] text-center font-bold  bg-brand uppercase tracking-wider px-2 py-1.5 select-none">
      Trié par
    </DropdownMenuLabel>
    <DropdownMenuSeparator className="bg-border/50" />

    {/* === OPTIONS DE TRI === */}
    {SORT_OPTIONS.map((option) => (
      <DropdownMenuItem
        key={option.id}
        onClick={() => onSortChange(option.id)}
        className="flex items-center justify-between text-xs"
      >
        {option.label}
        {sortBy === option.id && (
          <ListFilter className="h-3.5 w-3.5 text-black dark:text-white" />
        )}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

          <Button variant="outline" size="icon" className="h-8 w-8 border-border/80">
            <FolderPlus className="h-3.5 w-3.5 opacity-70" />
          </Button>

          <Button variant="outline" size="icon" className="h-8 w-8 border-border/80">
            <MoreHorizontal className="h-3.5 w-3.5 opacity-70" />
          </Button>
        </div>
      </div>
    </div>
  )
}