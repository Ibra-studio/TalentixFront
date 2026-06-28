"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Briefcase, BarChart, Pencil, Columns3, FileText, ChartPie, BriefcaseBusiness } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Job } from "@/types/Job"




export function SearchBar({jobs}:{jobs:Job[]}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Active Ctrl+K / Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Fonction utilitaire pour exécuter une action et fermer la modale
  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      {/* Bouton déclencheur dans le Header */}
      <Button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 h-8 w-full max-w-sm",
          "rounded-lg border border-border bg-muted/50",
          "px-3 text-sm text-muted-foreground",
          "hover:bg-muted transition-colors",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="flex-1 text-left">Rechercher, naviguer et plus</span>
        <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
          CTRL + K
        </kbd>
      </Button>

      {/* Modale de Commande */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher, naviguer et plus" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* GROUPE 1 : PAGES PRINCIPALES */}
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push("/candidates"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Candidatures</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/jobs"))}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Jobs</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
              <ChartPie className="mr-2 h-4 w-4" />
              <span>Rapports</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* GROUPE 2 : ACCÈS RAPIDE AUX PIPELINES DES JOBS */}
          <CommandGroup heading="Pipelines (Kanban)">
            {jobs.map((job) => (
              <CommandItem 
                key={`pipeline-${job.id}`}
                // Le mot-clé permet de trouver cet item en tapant "pipeline nom_du_job"
                keywords={["pipeline", "board", job.title]} 
                onSelect={() => runCommand(() => router.push(`/jobs/${job.id}`))}
              >
                <Columns3 className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{job.title} - Pipeline</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* GROUPE 3 : ACCÈS RAPIDE À L'ÉDITION DES JOBS */}
          <CommandGroup heading="Edit Jobs">
            {jobs.map((job) => (
              <CommandItem 
                key={`edit-${job.id}`}
                // Le mot-clé permet de trouver cet item en tapant "edit nom_du_job" ou "modifier nom_du_job"
                keywords={["edit", "modifier", "setup", job.title]} 
                onSelect={() => runCommand(() => router.push(`/jobs/${job.id}/edit`))}
              >
                <Pencil className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{job.title} - Configuration</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
        </CommandList>
      </CommandDialog>
    </>
  )
}