"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { FilterGroup } from "@/components/filters/types"

import { CandidateToolbar } from "@/components/candidates/CandidateToolbar"
import { CandidateTable } from "@/components/candidates/CandidateTable"
import { InfoBar } from "@/components/InfoBar"
import { FilterSidebar } from "@/components/FilterSidebar"
import { CandidateFavorites } from "@/components/candidates/CandidateFavorites"
import { ReusableFilters } from "@/components/filters/ReusableFilters"
import { Candidate } from "@/types/candidate" // Assure-toi que le chemin est correct

// ─────────────────────────────────────────────────────────────
// Données statiques pour les filtres (Peuvent aussi venir de l'API plus tard)
// ─────────────────────────────────────────────────────────────
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

interface CandidatesClientProps {
  initialCandidates: Candidate[];
}

export function CandidatesClient({ initialCandidates }: CandidatesClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sortBy, setSortBy] = useState<string>("date_created")

  // États pour les filtres actifs
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStages, setActiveStages] = useState<Set<string>>(new Set())
  const [activeJobStatuses, setActiveJobStatuses] = useState<Set<string>>(new Set())
  const [activeCandidateStatuses, setActiveCandidateStatuses] = useState<Set<string>>(new Set())
  const [activeJobs, setActiveJobs] = useState<Set<string>>(new Set())

  // États pour la sélection de la table
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // État de visibilité des filtres
  const [visibleFilterIds, setVisibleFilterIds] = useState<string[]>([
    "stage",
    "jobStatus",
    "candidateStatus",
    "inJob",
  ])

  // Extraction dynamique des postes (Jobs) uniques basés sur les données reçues
  const uniqueJobs = useMemo(() => {
    const jobs = new Set(initialCandidates.map((c) => c.job).filter((job) => job !== "—"))
    return Array.from(jobs)
  }, [initialCandidates])

  // Configuration des filtres
  const filterGroups: FilterGroup[] = useMemo(() => [
    {
      id: "stage",
      label: "Dans l'étape",
      type: "checkbox",
      options: stageOptions,
      value: Array.from(activeStages),
      onChange: (val) => setActiveStages(new Set(val)),
    },
    {
      id: "jobStatus",
      label: "Status de job",
      type: "checkbox",
      options: jobStatusOptions,
      value: Array.from(activeJobStatuses),
      onChange: (val) => setActiveJobStatuses(new Set(val)),
    },
    {
      id: "candidateStatus",
      label: "Status de candidat",
      type: "checkbox",
      options: candidateStatusOptions,
      value: Array.from(activeCandidateStatuses),
      onChange: (val) => setActiveCandidateStatuses(new Set(val)),
    },
    {
      id: "inJob",
      label: "Dans le job",
      type: "dropdown",
      options: uniqueJobs.map((job) => ({ label: job })),
      value: Array.from(activeJobs),
      onChange: (val) => setActiveJobs(new Set(val)),
    },
  ], [activeStages, activeJobStatuses, activeCandidateStatuses, activeJobs, uniqueJobs])

  // Gestion de la visibilité
  const handleVisibilityChange = (newVisibleIds: string[]) => {
    if (!newVisibleIds.includes("stage")) setActiveStages(new Set())
    if (!newVisibleIds.includes("jobStatus")) setActiveJobStatuses(new Set())
    if (!newVisibleIds.includes("candidateStatus")) setActiveCandidateStatuses(new Set())
    if (!newVisibleIds.includes("inJob")) setActiveJobs(new Set())
    setVisibleFilterIds(newVisibleIds)
  }

  const clearFilters = () => {
    setActiveStages(new Set())
    setActiveJobStatuses(new Set())
    setActiveCandidateStatuses(new Set())
    setActiveJobs(new Set())
    setSearchQuery("")
  }

  // Filtrage combiné des candidats basés sur "initialCandidates"
  const filteredAndSortedCandidates = useMemo(() => {
    let result = initialCandidates.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.job.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStage = activeStages.size === 0 || activeStages.has(c.stage)
      const matchesCandStatus = activeCandidateStatuses.size === 0 || activeCandidateStatuses.has(c.status)
      const matchesJob = activeJobs.size === 0 || activeJobs.has(c.job)

      return matchesSearch && matchesStage && matchesCandStatus && matchesJob
    })

    return result.sort((a, b) => {
      switch (sortBy) {
        case "job":
          return a.job.localeCompare(b.job)
        case "pipeline_stage":
          return a.stage.localeCompare(b.stage)
        case "talent_pool":
          return a.pool.localeCompare(b.pool)
        case "evaluation_score":
        case "average_evaluation_score":
          const scoreA = parseFloat(String(a.score)) || 0
          const scoreB = parseFloat(String(b.score)) || 0
          return scoreB - scoreA
        case "date_created":
        case "last_activity":
        default:
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()
          return dateB - dateA
      }
    })
  }, [initialCandidates, searchQuery, activeStages, activeCandidateStatuses, activeJobs, sortBy])

  // Logique de sélection
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds)
    if (newSelection.has(id)) newSelection.delete(id)
    else newSelection.add(id)
    setSelectedIds(newSelection)
  }

  const toggleAll = () => {
    if (selectedIds.size === filteredAndSortedCandidates.length && filteredAndSortedCandidates.length > 0) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredAndSortedCandidates.map((c) => c.id)))
    }
  }

  return (
   <div className="flex h-[calc(100vh-var(--header-height,3.5rem))] w-full overflow-hidden bg-background text-foreground">
      <FilterSidebar
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
        topContent={<CandidateFavorites/>}
        filterTitle="Filtres"
      >
        <ReusableFilters
          groups={filterGroups}
          visibleGroupIds={visibleFilterIds}
          onVisibilityChange={handleVisibilityChange}
          onClearAll={clearFilters}
          layout="sidebar"
        />
      </FilterSidebar>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden p-6 space-y-4">
        <CandidateToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(true)}
          filteredCandidatesCount={filteredAndSortedCandidates.length}
          totalCandidatesCount={initialCandidates.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <InfoBar />
       <div className="grid">
        <CandidateTable
          candidates={filteredAndSortedCandidates}
          selectedIds={selectedIds}
          onToggleSelection={toggleSelection}
          onToggleAll={toggleAll}
        />

       </div>
      </main>
    </div>
  )
}