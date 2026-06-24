"use client"

import * as React from "react"
import { 
  Search, SlidersHorizontal, Plus, ChevronDown, MoreHorizontal, Calendar, 
  FolderPlus, Star, X, Sidebar, ChevronLeft, Info, Trash, Bookmark, 
  UsersRound, UserPlus, UserRound
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useMemo } from "react"

// ─────────────────────────────────────────────────────────────
// Interfaces et Données Mockées
// ─────────────────────────────────────────────────────────────
interface Candidate {
  id: string
  name: string
  initial: string
  job: string
  status: string
  stage:string
  alert: string | null
  score: string
  date: string
  pool: string
  avatarColor: string
}

const mockCandidates: Candidate[] = [
  { id: "1", name: "Ismaïl Diarra", initial: "SH", job: "Senior Marketer",status:"Qualifié", stage: "Embauché", alert: null, score: "5", date: "il y a 15 jours", pool: "—", avatarColor: "bg-orange-500" },
  { id: "2", name: "Emanuel Kone", initial: "JS", job: "Senior Marketer",status:"Qualifié", stage: "Entretien sur site", alert: null, score: "5", date: "il y a 16 jours", pool: "Senior Marketer Pool", avatarColor: "bg-amber-600" },
  { id: "3", name: "Ibrahim Diabate", initial: "JD", job: "Senior Marketer",status:"Nouveau", stage: "Postulé", alert: null, score: "-", date: "il y a 18 jours", pool: "—", avatarColor: "bg-blue-500" },
  { id: "4", name: "Rokiatou ibrahim", initial: "WR", job: "Developpeur junior",status:"En retard", stage: "Évaluation", alert: "-1j", score: "-", date: "il y a 19 jours", pool: "—", avatarColor: "bg-orange-600" },
  { id: "5", name: "Mariela Vasquez", initial: "MV", job: "Java Developpeur", status:"Qualifié", stage: "Entretien téléphonique", alert: null, score: "4", date:"il y a 19 jours", pool: "—", avatarColor: "bg-pink-600" },
  { id:"6", name :"Conor Moreno", initial : "CM", job :"Recruteur", status :"Qualifié", stage :"Sourcé", alert : null , score :"—" , date : "il y a 21 jours" , pool : "—" , avatarColor: "bg-blue-600" },
  { id: "7", name: "Brooke Strosin", initial: "BS", job: "—", status:"Nouveau", stage: "Postulé", alert: null, score: "—", date: "il y a 23 jours", pool: "Pool Marketing", avatarColor: "bg-orange-400" },
]

const getStatusStyle = (stage: string) => {
  switch(stage) {
    case 'Embauché': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
    case 'Entretien sur site': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
    case 'Postulé': return 'bg-brand/10 text-brand border-brand/20';
    case 'Entretien téléphonique': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
    case 'Évaluation': return 'bg-muted text-muted-foreground border-border';
    case 'Sourcé': return 'bg-muted text-muted-foreground border-border';
    default: return 'text-muted-foreground border-transparent bg-transparent';
  }
}

export default function CandidatsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
  // États pour les filtres actifs
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStages, setActiveStages] = useState<Set<string>>(new Set())
  const [activeJobStatuses, setActiveJobStatuses] = useState<Set<string>>(new Set())
  const [activeCandidateStatuses, setActiveCandidateStatuses] = useState<Set<string>>(new Set())
  const [activeJobs, setActiveJobs] = useState<Set<string>>(new Set())
  
  // États pour la sélection de la table
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // État de visibilité des sections de filtres
  const [visibleFilters, setVisibleFilters] = useState({
    stage: true,
    jobStatus: true,
    candidateStatus: true,
    inJob: true
  })

  // ─────────────────────────────────────────────────────────────
  // Extraction dynamique des postes (Jobs) uniques
  // ─────────────────────────────────────────────────────────────
  const uniqueJobs = useMemo(() => {
    // On extrait tous les jobs, on retire les doublons avec Set, et on exclut "—"
    const jobs = new Set(mockCandidates.map(c => c.job).filter(job => job !== "—"))
    return Array.from(jobs)
  }, [])

  // ─────────────────────────────────────────────────────────────
  // Fonctions de gestion des filtres
  // ─────────────────────────────────────────────────────────────
  
  const toggleFilter = (set: Set<string>, label: string, updateFn: (s: Set<string>) => void) => {
    const newSet = new Set(set)
    if (newSet.has(label)) newSet.delete(label)
    else newSet.add(label)
    updateFn(newSet)
  }

  // Cacher un filtre et effacer ses sélections
  const removeFilterBlock = (filterKey: keyof typeof visibleFilters) => {
    setVisibleFilters(prev => ({ ...prev, [filterKey]: false }))
    if (filterKey === 'stage') setActiveStages(new Set())
    if (filterKey === 'jobStatus') setActiveJobStatuses(new Set())
    if (filterKey === 'candidateStatus') setActiveCandidateStatuses(new Set())
    if (filterKey === 'inJob') setActiveJobs(new Set())
  }

  // Afficher un filtre via le bouton "Add filter"
  const addFilterBlock = (filterKey: keyof typeof visibleFilters) => {
    setVisibleFilters(prev => ({ ...prev, [filterKey]: true }))
  }

  const clearFilters = () => {
    setActiveStages(new Set())
    setActiveJobStatuses(new Set())
    setActiveCandidateStatuses(new Set())
    setActiveJobs(new Set())
    setSearchQuery("")
  }

  // Filtrage combiné des candidats
  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.job.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStage = activeStages.size === 0 || activeStages.has(c.stage)
      const matchesCandStatus = activeCandidateStatuses.size === 0 || activeCandidateStatuses.has(c.status)
      const matchesJob = activeJobs.size === 0 || activeJobs.has(c.job)
      // Note: "Job Status" n'est pas appliqué ici car il n'est pas dans les propriétés du mock, on peut l'ajouter si besoin.
      
      return matchesSearch && matchesStage && matchesCandStatus && matchesJob
    })
  }, [searchQuery, activeStages, activeCandidateStatuses, activeJobs])

  // Logique de sélection dans la table
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds)
    if (newSelection.has(id)) newSelection.delete(id)
    else newSelection.add(id)
    setSelectedIds(newSelection)
  }

  const toggleAll = () => {
    if (selectedIds.size === filteredCandidates.length && filteredCandidates.length > 0) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredCandidates.map(c => c.id)))
    }
  }

  // Données des filtres statiques
  const jobStatusOptions = [
    { label: "Published", count: 8 },
    { label: "Internal", count: 5 },
    { label: "Closed", count: 0, disabled: true },
    { label: "Archived", count: 1 },
  ]

  const candidateStatusOptions = [
    { label: "Qualifié", count: 11 },
    { label: "Disqualifié", count: 1 },
    { label: "Nouveau", count: 2 },
    { label: "En retard", count: 2 },
  ]

  const stageOptions = [
    { label: "Sourcé", count: 1 },
    { label: "Postulé", count: 3 },
    { label: "Évaluation", count: 3 },
    { label: "Entretien téléphonique", count: 1 },
    { label: "Entretien sur site", count: 2 },
    { label: "Embauché", count: 1 },
  ]

  return (
    <div className="flex h-[calc(100vh-var(--header-height,3.5rem))] w-full overflow-hidden bg-background text-foreground">
      
      {/* ─────────────────────────────────────────────────────────────
          PANNEAU LATÉRAL : FILTRES
          ───────────────────────────────────────────────────────────── */}
      <aside 
        className={`h-full border-r border-border bg-card/50 flex flex-col shrink-0 transition-[width,opacity] duration-300 ease-in-out
          ${isSidebarOpen ? "w-[260px] opacity-100" : "w-0 opacity-0 pointer-events-none overflow-hidden"}`}
      >
        <div className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar select-none">
          {/* Favorites */}
          <div>
            <h4 className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase mb-3">Favoris</h4>
            <div className="space-y-0.5">
              {[
                { icon: <Trash size={16} /> , label:"Récemment supprimés", count: 0 },
                { icon: <UsersRound size={16} />, label: "Candidats qualifiés", count: 11 },
                { icon: <UserPlus size={16} />, label: "Nouveaux candidats", count: 2 },
                { icon : <UserRound size={16} /> ,label: "Non contactés", count: 12 },
                { icon : <Bookmark size={16} /> , label: "Candidats suivis", count: 0 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <span className="text-xs font-mono">{item.count}</span>
                </div>
              ))}
            </div>
            <Button variant="link" className="px-2 h-8 text-xs text-muted-foreground hover:text-foreground">Voir plus</Button>
          </div>

          <Separator />

          {/* Filters Section */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">Filtres</h4>

            {/* In stage (Dans l'étape) */}
            {visibleFilters.stage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">Dans l'étape</span>
                  <X className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => removeFilterBlock('stage')} />
                </div>
                <ul className="space-y-1.5">
                  {stageOptions.map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-xs group cursor-pointer">
                      <label className="flex items-center gap-2.5 cursor-pointer w-full">
                        <Checkbox 
                          checked={activeStages.has(item.label)} 
                          onCheckedChange={() => toggleFilter(activeStages, item.label, setActiveStages)} 
                          className="border-muted-foreground/50 data-[state=checked]:bg-brand data-[state=checked]:border-brand" 
                        />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                      </label>
                      <span className="text-muted-foreground">{item.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Job Status */}
            {visibleFilters.jobStatus && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Status de job</span>
                  <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => removeFilterBlock('jobStatus')} />
                </div>
                <div className="space-y-2">
                  {jobStatusOptions.map((item, idx) => (
                    <label key={idx} className={`flex items-center justify-between text-sm cursor-pointer group ${item.disabled ? 'opacity-40' : ''}`}>
                      <div className="flex items-center gap-2.5">
                        <Checkbox 
                          id={`status-${idx}`} 
                          disabled={item.disabled}
                          checked={activeJobStatuses.has(item.label)}
                          onCheckedChange={() => toggleFilter(activeJobStatuses, item.label, setActiveJobStatuses)}
                          className="border-muted-foreground/50 data-[state=checked]:bg-brand data-[state=checked]:border-brand" 
                        />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground/60">{item.count}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Candidate Status */}
            {visibleFilters.candidateStatus && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Status de candidat</span>
                  <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => removeFilterBlock('candidateStatus')} />
                </div>
                <div className="space-y-2">
                  {candidateStatusOptions.map((item, idx) => (
                    <label key={idx} className="flex items-center justify-between text-sm cursor-pointer group">
                      <div className="flex items-center gap-2.5">
                        <Checkbox 
                          id={`cand-${idx}`} 
                          checked={activeCandidateStatuses.has(item.label)}
                          onCheckedChange={() => toggleFilter(activeCandidateStatuses, item.label, setActiveCandidateStatuses)}
                          className="border-muted-foreground/50 data-[state=checked]:bg-brand data-[state=checked]:border-brand" 
                        />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground/60">{item.count}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* In job (Poste) */}
            {visibleFilters.inJob && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Dans le job</span>
                  <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => removeFilterBlock('inJob')} />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-between border border-border bg-background rounded-md px-3 py-1.5 cursor-pointer hover:border-muted-foreground/50">
                      <span className="text-xs text-muted-foreground truncate mr-2">
                        {activeJobs.size > 0 ? Array.from(activeJobs).join(", ") : "Ajouter un job"}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[220px] max-h-[250px] overflow-y-auto">
                    {uniqueJobs.length === 0 ? (
                      <DropdownMenuItem disabled>Aucun poste disponible</DropdownMenuItem>
                    ) : (
                      uniqueJobs.map((job, idx) => (
                        <DropdownMenuItem 
                          key={idx} 
                          className="flex items-center gap-2.5 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault(); // Empêche le menu de se fermer lors du clic
                            toggleFilter(activeJobs, job, setActiveJobs);
                          }}
                        >
                          <Checkbox 
                            checked={activeJobs.has(job)} 
                            className="border-muted-foreground/50 data-[state=checked]:bg-brand data-[state=checked]:border-brand pointer-events-none"
                          />
                          <span className="text-sm">{job}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Boutons d'action pour les filtres */}
            <div className="flex items-center gap-2 pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs bg-background cursor-pointer">
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Add filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {!visibleFilters.stage && (
                    <DropdownMenuItem onClick={() => addFilterBlock('stage')}>Dans l'étape</DropdownMenuItem>
                  )}
                  {!visibleFilters.jobStatus && (
                    <DropdownMenuItem onClick={() => addFilterBlock('jobStatus')}>Status de job</DropdownMenuItem>
                  )}
                  {!visibleFilters.candidateStatus && (
                    <DropdownMenuItem onClick={() => addFilterBlock('candidateStatus')}>Status de candidat</DropdownMenuItem>
                  )}
                  {!visibleFilters.inJob && (
                    <DropdownMenuItem onClick={() => addFilterBlock('inJob')}>Dans le job</DropdownMenuItem>
                  )}
                  {visibleFilters.stage && visibleFilters.jobStatus && visibleFilters.candidateStatus && visibleFilters.inJob && (
                    <DropdownMenuItem disabled>Tous les filtres sont affichés</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                Effacer
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Sidebar : Show/hide */}
        <div className="p-2 border-t border-border mt-auto">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-foreground h-9 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="flex items-center gap-2">
              <Sidebar className="h-4 w-4" />
              Afficher/Masquer
            </div>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          CONTENU PRINCIPAL
          ───────────────────────────────────────────────────────────── */}
     <main className="flex-1 flex flex-col min-w-0 overflow-hidden p-6 space-y-4">
        
        {/* Titre Principal */}
        <div className="flex items-center gap-2 select-none">
          <h1 className="text-xl font-semibold tracking-tight">Candidats</h1>
          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-60">
            <Star className="h-4 w-4" />
          </Button>
        </div>

        {/* Barre de Recherche Globale */}
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-60" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher des candidats par mot-clé (ex: John)" 
            className="pl-9 h-9 bg-accent/20 border-border/80 rounded-md text-sm w-full focus-visible:ring-1 focus-visible:ring-brand"
          />
        </div>

        {/* Barre d'actions & Filtres (Boutons supérieurs de la table) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 select-none">
          <div className="flex items-center gap-2">
            {!isSidebarOpen && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsSidebarOpen(true)}
                className="h-8 border-border/80 gap-2 font-normal"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 opacity-80" />
                <span className="text-xs">Filtres</span>
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-border/80 gap-1 text-xs text-muted-foreground font-normal">
                  <span className="text-foreground">1 - {filteredCandidates.length}</span> sur {filteredCandidates.length} candidats
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Afficher 25 par page</DropdownMenuItem>
                <DropdownMenuItem>Afficher 50 par page</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 bg-brand hover:bg-brand/90 text-black dark:text-white gap-1.5 text-xs font-medium rounded-md px-3">
              <Plus className="h-3.5 w-3.5" />
              Ajouter des candidats
            </Button>

            <Button variant="outline" size="sm" className="h-8 border-border/80 gap-1.5 text-xs font-normal">
              <Calendar className="h-3.5 w-3.5 opacity-60" />
              Date de création
              <ChevronDown className="h-3 w-3 opacity-60" />
            </Button>

            <Button variant="outline" size="icon" className="h-8 w-8 border-border/80">
              <FolderPlus className="h-3.5 w-3.5 opacity-70" />
            </Button>
            
            <Button variant="outline" size="icon" className="h-8 w-8 border-border/80">
              <MoreHorizontal className="h-3.5 w-3.5 opacity-70" />
            </Button>
          </div>
        </div>

        {/* Infobar Bleue d'information */}
        <div className="border border-[#C7E4FC] bg-[#C7E4FC] text-black text-xs rounded-md p-3 flex items-center gap-2.5">
          <div className="p-1 rounded-sm bg-[#C7E4FC] text-black shrink-0 mt-0.5">
            <Info className="h-3.5 w-3.5" />
          </div>
          <p className="leading-normal">
            Votre compte entreprise est rempli avec des données d'exemple. Lorsque vous serez prêt à recruter, vous pourrez <span className="underline underline-offset-2 cursor-pointer text-black">supprimer les données d'exemple</span>.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TABLE CONTENEUR COMPLET
            ───────────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 w-full border border-border/60 rounded-lg bg-card overflow-hidden flex flex-col">
          <div className="overflow-x-auto w-full flex-1 custom-scrollbar">
            <Table className="min-w-[900px] w-full relative">
              <TableHeader className="bg-muted/40 select-none">
                <TableRow className="border-b border-border/60 hover:bg-transparent">
                  <TableHead className="w-[40px] px-3">
                    <Checkbox 
                      checked={selectedIds.size === filteredCandidates.length && filteredCandidates.length > 0} 
                      onCheckedChange={toggleAll}
                      aria-label="Tout sélectionner" 
                      className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                    />
                  </TableHead>
                  <TableHead className="text-xs font-medium tracking-wide w-[220px]">Nom</TableHead>
                  <TableHead className="text-xs font-medium tracking-wide w-[200px]">Poste</TableHead>
                  <TableHead className="text-xs font-medium tracking-wide w-[150px]">Étape</TableHead>
                  <TableHead className="text-xs font-medium tracking-wide w-[120px]">Score d'évaluation</TableHead>
                  <TableHead className="text-xs font-medium tracking-wide w-[130px]">Date de création</TableHead>
                  <TableHead className="text-xs font-medium tracking-wide">Vivier de talents</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {filteredCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                      Aucun candidat ne correspond à votre recherche.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCandidates.map((candidate) => {
                    const isSelected = selectedIds.has(candidate.id);
                    
                    return (
                      <TableRow 
                        key={candidate.id} 
                        className={`border-b border-border/40 transition-colors group
                          ${isSelected ? 'bg-brand hover:bg-brand/10 dark:bg-brand/20 dark:hover:bg-brand/30' : 'hover:bg-brand/30'}`}
                      >
                        <TableCell className="px-3">
                          <Checkbox 
                            checked={isSelected} 
                            onCheckedChange={() => toggleSelection(candidate.id)} 
                            aria-label={`Sélectionner ${candidate.name}`} 
                            className="border-muted-foreground/40 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                          />
                        </TableCell>
                        
                        <TableCell className="font-medium text-sm">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-semibold shrink-0 ${candidate.avatarColor}`}>
                              {candidate.initial}
                            </div>
                            <span className="truncate text-foreground/90">{candidate.name} <span className="text-xs text-muted-foreground/40 font-normal">(Exemple)</span></span>
                          </div>
                        </TableCell>
                        
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {candidate.job !== "—" ? (
                            <div className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span className="truncate">{candidate.job}</span>
                            </div>
                          ) : (
                            <span className="opacity-40">—</span>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          {candidate.stage !== "—" ? (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={`text-[11px] px-2 py-0.5 font-normal tracking-wide rounded ${getStatusStyle(candidate.stage)}`}>
                                {candidate.stage}
                              </Badge>
                              {candidate.alert && (
                                <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm shrink-0">
                                  {candidate.alert}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs opacity-40">—</span>
                          )}
                        </TableCell>
                        
                        <TableCell className="text-xs text-muted-foreground/60 font-mono">
                          {candidate.score}
                        </TableCell>
                        
                        <TableCell className="text-xs text-muted-foreground/80">
                          {candidate.date}
                        </TableCell>
                        
                        <TableCell className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {candidate.pool !== "—" ? (
                            <div className="flex items-center gap-1.5 opacity-80">
                              <FolderPlus className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                              <span className="truncate">{candidate.pool}</span>
                            </div>
                          ) : (
                            <span className="opacity-40">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

      </main>
    </div>
  )
}