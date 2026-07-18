"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, ChevronDown, Trash2, Mail, ArrowRight, X, Ban, Plus, Sparkles } from "lucide-react"

import { Candidate } from "@/types/candidate"
import { CandidateTable } from "./CandidateTable"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface PipelineCandidatesClientProps {
  initialCandidates: Candidate[]
}

export function PipelineCandidatesClient({ initialCandidates }: PipelineCandidatesClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // --- ÉTATS GÉRÉS PAR L'URL ---
  const activeTab = searchParams.get("view") || "all"
  const searchQueryURL = searchParams.get("q") || ""
  const filterStatus = searchParams.get("status") || "all"
  const filterLocation = searchParams.get("location") || "all"
  const filterSource = searchParams.get("source") || "all"
  
  // Filtre Match IA
  const matchMin = parseInt(searchParams.get("matchMin") || "1", 10)
  const matchMax = parseInt(searchParams.get("matchMax") || "4", 10)
  const includeUnscored = searchParams.get("unscored") !== "false" // true par défaut

  const sortOrder = searchParams.get("sort") as "asc" | "desc" | null

  // --- ÉTATS LOCAUX ---
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [localSearch, setLocalSearch] = useState(searchQueryURL)
  const [localMatchRange, setLocalMatchRange] = useState([matchMin, matchMax])

  // --- EXTRACTION DES OPTIONS DYNAMIQUES ---
  const statuses = Array.from(new Set(initialCandidates.map(c => c.stage).filter(Boolean))).sort()
  const locations = Array.from(new Set(initialCandidates.map(c => c.location).filter(Boolean))).sort()
  const sources = Array.from(new Set(initialCandidates.map(c => c.source).filter(Boolean))).sort()

  // --- FONCTION DE MISE À JOUR DE L'URL ---
  const updateURLParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "all" || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    // scroll: false évite que la page remonte en haut à chaque filtre
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [searchParams, pathname, router])

  // --- DEBOUNCE POUR LA BARRE DE RECHERCHE ---
  useEffect(() => {
    const delay = setTimeout(() => {
      if (localSearch !== searchQueryURL) {
        updateURLParams({ q: localSearch })
      }
    }, 200) // 300ms de délai
    return () => clearTimeout(delay)
  }, [localSearch, searchQueryURL, updateURLParams])

  // --- GESTION DE LA SÉLECTION MULTIPLE ---
  const handleToggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) newSelected.delete(id)
    else newSelected.add(id)
    setSelectedIds(newSelected)
  }

  const handleToggleAll = (candidatesToSelect: Candidate[]) => {
    if (selectedIds.size === candidatesToSelect.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(candidatesToSelect.map(c => c.id)))
  }

  // --- GESTION DU TRI ---
  const handleSortByScore = () => {
    let newSort: "asc" | "desc" | null = null
    if (sortOrder === null) newSort = "desc"
    else if (sortOrder === "desc") newSort = "asc"
    updateURLParams({ sort: newSort })
  }

  // --- FILTRAGE ET TRI ACTIF ---
  const filteredAndSortedCandidates = useMemo(() => {
    let result = [...initialCandidates]

    // Filtre de vue (Tab)
    if (activeTab === "top") {
       // On simule que la shortlist = score >= 3
      result = result.filter(c => parseInt(c.score) >= 3)
    }

    // Filtre Recherche
    if (searchQueryURL) {
      const q = searchQueryURL.toLowerCase()
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.job.toLowerCase().includes(q)
      )
    }

    // Filtres basiques (Statut, Localisation, Source)
    if (filterStatus !== "all") result = result.filter(c => c.stage === filterStatus)
    if (filterLocation !== "all") result = result.filter(c => c.location === filterLocation)
    if (filterSource !== "all") result = result.filter(c => c.source === filterSource)

    // Filtre Match IA
    result = result.filter(c => {
      const scoreNum = parseInt(c.score)
      const hasScore = !isNaN(scoreNum)
      
      if (!hasScore) return includeUnscored
      return scoreNum >= matchMin && scoreNum <= matchMax
    })

    // Tri par score IA
    if (sortOrder) {
      result.sort((a, b) => {
        const scoreA = parseInt(a.score) || 0
        const scoreB = parseInt(b.score) || 0
        return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA
      })
    }

    return result
  }, [initialCandidates, activeTab, searchQueryURL, filterStatus, filterLocation, filterSource, matchMin, matchMax, includeUnscored, sortOrder])

  // Classes partagées pour le style "pilule" (pill) des filtres
  const triggerClass = "h-8 px-3 rounded-full border border-border bg-background text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 focus:ring-0 focus:ring-offset-0"

  return (
    <div className="flex flex-col w-full bg-background mt-4 rounded-md p-2 border border-border shadow-sm">
      
      {/* 1. Navigation des candidatures (Mini Tabs) */}
      <div className="flex p-1 max-w-fit rounded-md border border-border bg-muted/20 mb-2 ml-2 mt-1">
        <Button 
          variant="ghost"
          className={cn(
            "h-8 px-3 rounded transition-all", 
            activeTab === "all" ? "bg-brand text-brand-foreground hover:bg-brand/90 hover:text-brand-foreground shadow-sm" : "text-foreground hover:bg-muted"
          )}
          onClick={() => updateURLParams({ view: "all" })}
        >
            Toutes les candidatures
            <span className="text-[10px] bg-foreground/10 text-foreground px-1.5 py-0.5 rounded ml-2">
              {initialCandidates.length}
            </span>
        </Button>
        
        <div className="w-px bg-border mx-1 my-1 block"></div>
        
        <Button 
          variant="ghost"
          className={cn(
            "h-8 px-3 rounded transition-all", 
            activeTab === "top" ? "bg-brand text-brand-foreground hover:bg-brand/90 hover:text-brand-foreground shadow-sm" : "text-foreground hover:bg-muted"
          )}
          onClick={() => updateURLParams({ view: "top" })}
        >
            Shortlist 
            <span className="text-[10px] bg-foreground/10 text-foreground px-1.5 py-0.5 rounded ml-2">
              {initialCandidates.filter(c => parseInt(c.score) >= 3).length}
            </span>
        </Button>
      </div>

      <div className="p-2 md:p-4 flex flex-col gap-4">
        {/* 2. Barre de Recherche OU Barre d'Action Groupée */}
        <div className="h-10 relative w-full">
          {selectedIds.size > 0 ? (
            <div className="absolute inset-0 flex items-center justify-between bg-brand/5 border border-brand/20 rounded-md px-4 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedIds(new Set())}
                  className="p-1 hover:bg-brand/10 rounded-full text-foreground cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold text-foreground">
                  {selectedIds.size} sélectionné(s)
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded transition-colors">
                  <Ban className="w-4 h-4" /> Rejeter
                </Button>
                <Button variant="ghost" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded transition-colors">
                  <Mail className="w-4 h-4" /> Email
                </Button>
                <Button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-brand text-brand-foreground hover:bg-brand/90 rounded shadow-sm">
                 <Plus className="w-4 h-4 mr-1" /> Ajouter à la Pipeline
                </Button>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center border border-input rounded-md px-3 bg-background  text-primary  focus-within:ring-1 focus-within:ring-ring transition-all">
              <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Rechercher des candidats..." 
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* 3. Filtres Dynamiques avec Shadcn */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          
          {/* Filtre: Statut */}
          <Select value={filterStatus} onValueChange={(val) => updateURLParams({ status: val })}>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Filtre Spécial: Match IA (Slider 1 à 4) */}
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(triggerClass, (matchMin > 1 || matchMax < 4 || !includeUnscored) && "bg-brand/10 border-brand/30 text-brand font-semibold")}>
                <Sparkles className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                Match
                <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-5" align="start">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">Match IA</Label>
                    <span className="text-sm text-muted-foreground font-medium">{localMatchRange[0]} - {localMatchRange[1]}</span>
                  </div>
                  <Slider 
                    defaultValue={[matchMin, matchMax]} 
                    max={5} 
                    min={1} 
                    step={1}
                    value={localMatchRange}
                    onValueChange={setLocalMatchRange}
                    onValueCommit={(val) => updateURLParams({ matchMin: val[0].toString(), matchMax: val[1].toString() })}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground font-medium px-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between space-x-2 pt-2 border-t border-border">
                  <Label htmlFor="include-unscored" className="text-sm leading-snug cursor-pointer">
                    Inclure les candidats sans score de Match IA
                  </Label>
                  <Switch 
                    id="include-unscored" 
                    checked={includeUnscored}
                    onCheckedChange={(checked) => updateURLParams({ unscored: checked ? "true" : "false" })}
                    className="data-[state=checked]:bg-brand"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Filtre: Localisation */}
          <Select value={filterLocation} onValueChange={(val) => updateURLParams({ location: val })}>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Localisation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes localisations</SelectItem>
              {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Filtre: Source */}
          <Select value={filterSource} onValueChange={(val) => updateURLParams({ source: val })}>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes sources</SelectItem>
              {sources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>

        </div>

        <div className="text-sm text-muted-foreground mt-1 px-1">
          Affichage de <strong className="text-foreground">{filteredAndSortedCandidates.length}</strong> sur <strong className="text-foreground">{initialCandidates.length}</strong> candidats
        </div>
      </div>

      {/* 4. Le Tableau */}
      <CandidateTable 
        candidates={filteredAndSortedCandidates}
        selectedIds={selectedIds}
        onToggleSelection={handleToggleSelection}
        onToggleAll={() => handleToggleAll(filteredAndSortedCandidates)}
        sortDirection={sortOrder}
        onSortMatch={handleSortByScore}
      />
    </div>
  )
}