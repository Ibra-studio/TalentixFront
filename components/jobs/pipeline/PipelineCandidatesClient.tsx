"use client"

import React, { useState, useMemo } from "react"
import { Search, ChevronDown, Trash2, Mail, ArrowRight, X, Ban, Plus } from "lucide-react"

import { Candidate } from "@/types/candidate"
import { CandidateTable } from "./CandidateTable"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PipelineCandidatesClientProps {
  initialCandidates: Candidate[]
}

export function PipelineCandidatesClient({ initialCandidates }: PipelineCandidatesClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | "top">("all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)

  // Gestion de la sélection multiple
  const handleToggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const handleToggleAll = (candidatesToSelect: Candidate[]) => {
    if (selectedIds.size === candidatesToSelect.length) {
      setSelectedIds(new Set()) // Tout désélectionner
    } else {
      setSelectedIds(new Set(candidatesToSelect.map(c => c.id))) // Tout sélectionner
    }
  }

  // Logique de tri par Score (Match IA)
  const handleSortByScore = () => {
    setSortOrder(current => {
      if (current === null) return "desc"
      if (current === "desc") return "asc"
      return null
    })
  }

  // Filtrage et Tri des données
  const filteredAndSortedCandidates = useMemo(() => {
    let result = [...initialCandidates]

    // Filtre basique par recherche
    if (searchQuery) {
      result = result.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.job.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtre "Top applicants" (exemple: on garde ceux avec un score > 80 ou les 3 meilleurs)
    if (activeTab === "top") {
      result = result.filter(c => parseInt(c.score) >= 80)
    }

    // Tri par score
    if (sortOrder) {
      result.sort((a, b) => {
        const scoreA = parseInt(a.score) || 0
        const scoreB = parseInt(b.score) || 0
        return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA
      })
    }

    return result
  }, [initialCandidates, searchQuery, activeTab, sortOrder])

  return (
    <div className="flex flex-col w-full bg-background mt-4 rounded-md p-2 border border-border shadow-sm">
      
      {/* 1. Navigation des candidatures (Mini Tabs) */}
      
       <div className="flex  p-1 max-w-fit rounded-md border border-foreground/20">
            <Button 
              variant="ghost"
              className={cn(
                "h-8 px-3 rounded", 
                activeTab === "all" ? "bg-brand! text-white  hover:text-white" : "text-primary hover:text-gray-200 hover:bg-brand!"
              )}
              onClick={() => setActiveTab("all")}
            >
                Toutes les candidatures
                {/* Remarque: Le chiffre 4 est statique ici, l'idéal serait de le recevoir en props depuis la DB */}
                <span className="text-[10px] bg-tags text-white px-1.5 py-0.5 rounded ml-2">200</span>
            </Button>
            
            <div className="w-px bg-gray-700 mx-1 my-1 block"></div>
            
            <Button 
              variant="ghost"
              className={cn(
                "h-8 px-3 rounded", 
                activeTab === "top" ? "bg-brand! text-white  hover:text-white" : "text-primary hover:text-gray-200 hover:bg-brand!"
              )}
              onClick={() => setActiveTab("top")}
            >
                Shortlist 
                <span className="text-[10px] bg-tags text-white px-1.5 py-0.5 rounded ml-2">2</span>
            </Button>
       </div>

      <div className="p-4 flex flex-col gap-4">
        {/* 2. Barre de Recherche OU Barre d'Action Groupée */}
        <div className="h-10 relative w-full">
          {selectedIds.size > 0 ? (
            // BARRE D'ACTION (S'affiche quand des candidats sont sélectionnés)
            <div className="absolute inset-0 flex items-center justify-between bg-tags/20  border border-tags rounded-md px-4 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedIds(new Set())}
                  className="p-1 hover:bg-brand rounded-full text-primary hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold text-primary">
                  {selectedIds.size} sélectionné(s)
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium  bg-none!  text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded border border-transparent hover:border-tags transition-colors" variant={"destructive"}>
                  <Ban className="w-4 h-4" /> Rejeter
                </Button>
                <Button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-brand hover:text-white rounded-md text-primary transition-colors cursor-pointers">
                  <Mail className="w-4 h-4" /> Email
                </Button>
                <Button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-brand text-white hover:opacity-90 rounded transition-opacity shadow-sm">
                 <Plus className="w-4 h-4 mr-2" /> Ajouter à la Pipeline
                </Button>
              </div>
            </div>
          ) : (
            // BARRE DE RECHERCHE NORMALE
            <div className="absolute inset-0 flex items-center border border-input rounded-md px-3 bg-background focus-within:ring-1 focus-within:ring-ring transition-all">
              <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Rechercher des candidats..." 
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* 3. Filtres Dropdowns */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["Statut", "Note", "Match IA", "Questions de filtrage", "Localisation", "Source", "Plus"].map((filter) => (
            <button key={filter} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-full hover:bg-muted transition-colors whitespace-nowrap">
              {filter}
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          ))}
        </div>

        <div className="text-sm text-muted-foreground mt-2">
          Affichage de <strong className="text-foreground">{filteredAndSortedCandidates.length}</strong> candidat(s)
        </div>
      </div>

      {/* 4. Le Tableau */}
      <CandidateTable 
        candidates={filteredAndSortedCandidates}
        selectedIds={selectedIds}
        onToggleSelection={handleToggleSelection}
        onToggleAll={() => handleToggleAll(filteredAndSortedCandidates)}
        sortOrder={sortOrder}
        onSortScore={handleSortByScore}
      />
    </div>
  )
}