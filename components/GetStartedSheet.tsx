"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import {
  Rocket,
  Settings,
  Globe,
  MessageSquare,
  Briefcase,
  Users,
  Store,
  ChevronDown,
  ChevronUp,
  Check,
  Circle,
  X,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step {
  id: string
  title: string
  description?: string
  done: boolean
  tourRoute?: string
  tourKey?: string
}

interface Section {
  id: string
  title: string
  icon: React.ReactNode
  steps: Step[]
}

// ─── Données ─────────────────────────────────────────────────────────────────

const SECTIONS: Section[] = [
  {
    id: "get-started",
    title: "Commencer",
    icon: <Rocket className="size-4" />,
    steps: [
      { id: "gs-1", title: "Créer votre compte", done: true },
      { id: "gs-2", title: "Inviter un membre de l'équipe", done: true },
      {
        id: "gs-3",
        title: "Publier votre premier poste",
        done: false,
        description: "Publiez une offre d'emploi pour commencer à recevoir des candidatures.",
        tourRoute: "/jobs",
        tourKey: "post-first-job",
      },
      {
        id: "gs-4",
        title: "Configurer le pipeline",
        done: false,
        tourRoute: "/jobs",
        tourKey: "pipeline-setup",
      },
      {
        id: "gs-5",
        title: "Explorer le tableau de bord",
        done: false,
        tourRoute: "/",
        tourKey: "dashboard-overview",
      },
    ],
  },
  {
    id: "settings",
    title: "Ajuster les paramètres",
    icon: <Settings className="size-4" />,
    steps: [
      { id: "st-1", title: "Configurer les notifications", done: false },
      { id: "st-2", title: "Personnaliser votre profil", done: false },
      { id: "st-3", title: "Gérer les permissions", done: false },
    ],
  },
  {
    id: "careers",
    title: "Créer un site carrières",
    icon: <Globe className="size-4" />,
    steps: [
      { id: "ca-1", title: "Choisir un modèle", done: true },
      { id: "ca-2", title: "Personnaliser le design", done: true },
      {
        id: "ca-3",
        title: "Publier le site",
        done: false,
        tourRoute: "/careers",
        tourKey: "publish-careers",
      },
    ],
  },
  {
    id: "messaging",
    title: "Composer vos messages",
    icon: <MessageSquare className="size-4" />,
    steps: [
      {
        id: "ms-1",
        title: "Créer un modèle d'e-mail",
        done: false,
        tourRoute: "/mailbox",
        tourKey: "email-templates",
      },
      { id: "ms-2", title: "Configurer la signature", done: false },
    ],
  },
  {
    id: "jobs",
    title: "Publier votre premier poste",
    icon: <Briefcase className="size-4" />,
    steps: [
      {
        id: "jo-1",
        title: "Rédiger une offre d'emploi",
        done: false,
        tourRoute: "/jobs/new",
        tourKey: "write-job",
      },
      { id: "jo-2", title: "Diffuser sur les jobboards", done: false },
    ],
  },
  {
    id: "candidates",
    title: "Gérer les candidats",
    icon: <Users className="size-4" />,
    steps: [
      { id: "cd-1", title: "Vue d'ensemble du pipeline", done: true },
      {
        id: "cd-2",
        title: "Planifier des entretiens",
        done: false,
        tourRoute: "/candidates",
        tourKey: "schedule-interviews",
      },
      {
        id: "cd-3",
        title: "Recrutement collaboratif",
        done: false,
        description: "Ajoutez une note, une tâche ou partagez un candidat avec le reste de l'équipe.",
        tourRoute: "/candidates",
        tourKey: "manage-candidates",
      },
      {
        id: "cd-4",
        title: "Évaluer les candidats",
        done: false,
        tourRoute: "/candidates",
        tourKey: "evaluate-candidates",
      },
      {
        id: "cd-5",
        title: "Avancer ou disqualifier",
        done: false,
        tourRoute: "/candidates",
        tourKey: "proceed-or-disqualify",
      },
    ],
  },
  {
    id: "marketplace",
    title: "Visiter la marketplace",
    icon: <Store className="size-4" />,
    steps: [
      { id: "mk-1", title: "Explorer les intégrations", done: false },
      { id: "mk-2", title: "Connecter un outil RH", done: false },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeProgress(sections: Section[]) {
  const allSteps = sections.flatMap((s) => s.steps)
  const done = allSteps.filter((s) => s.done).length
  return { done, total: allSteps.length, pct: Math.round((done / allSteps.length) * 100) }
}

function sectionProgress(section: Section) {
  const done = section.steps.filter((s) => s.done).length
  return { done, total: section.steps.length }
}

// ─── Cercle de progression SVG ───────────────────────────────────────────────

function CircleProgress({ pct }: { pct: number }) {
  const r = 22
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <div className="relative flex items-center justify-center size-14">
      <svg className="size-14 -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={r} stroke="currentColor" strokeWidth="4" fill="none" className="text-muted/30" />
        <circle
          cx="28" cy="28" r={r}
          stroke="currentColor" strokeWidth="4" fill="none"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-violet-500 transition-all duration-500"
        />
      </svg>
      <span className="absolute text-xs font-semibold text-foreground">{pct}%</span>
    </div>
  )
}

// ─── Badge progress section ───────────────────────────────────────────────────

function SectionBadge({ section }: { section: Section }) {
  const { done, total } = sectionProgress(section)

  if (done === total) {
    return (
      <div className="flex size-9 items-center justify-center rounded-full bg-violet-500/20 text-violet-500">
        {section.icon}
      </div>
    )
  }

  if (done === 0) {
    return (
      <div className="flex size-9 items-center justify-center rounded-full border border-violet-500/40 text-violet-400">
        {section.icon}
      </div>
    )
  }

  const r = 14
  const circ = 2 * Math.PI * r
  const offset = circ - (done / total) * circ

  return (
    <div className="relative flex size-9 items-center justify-center">
      <svg className="absolute size-9 -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r={r} stroke="currentColor" strokeWidth="2.5" fill="none" className="text-muted/30" />
        <circle
          cx="18" cy="18" r={r}
          stroke="currentColor" strokeWidth="2.5" fill="none"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-violet-500"
        />
      </svg>
      <span className="relative z-10 text-[10px] font-bold text-violet-400">{done}/{total}</span>
    </div>
  )
}

// ─── Step Item ────────────────────────────────────────────────────────────────

function StepItem({
  step,
  isActive,
  onActivate,
  onMarkDone,
  onShowMe,
}: {
  step: Step
  isActive: boolean
  onActivate: () => void
  onMarkDone: () => void
  onShowMe: () => void
}) {
  return (
    <div
      className={cn(
        "rounded-lg border transition-colors",
        step.done
          ? "border-border/40 bg-muted/20"
          : isActive
          ? "border-violet-500/30 bg-muted/40"
          : "border-border/40 bg-muted/10 cursor-pointer hover:bg-muted/30",
      )}
      onClick={() => !step.done && !isActive && onActivate()}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        {step.done ? (
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
            <Check className="size-3 text-white" />
          </div>
        ) : (
          <Circle className="size-5 shrink-0 text-muted-foreground/50" />
        )}
        <span className={cn("text-sm font-medium", step.done ? "text-muted-foreground line-through" : "text-foreground")}>
          {step.title}
        </span>
      </div>

      {isActive && !step.done && (
        <div className="px-3 pb-3 pt-0">
          {step.description && (
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            {step.tourRoute && (
              // SheetClose ferme le sheet avant la navigation
              <SheetClose asChild>
                <Button
                  size="sm"
                  className="h-7 bg-violet-600 text-white hover:bg-violet-700"
                  onClick={(e) => { e.stopPropagation(); onShowMe() }}
                >
                  Montrer
                </Button>
              </SheetClose>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
              onClick={(e) => { e.stopPropagation(); onMarkDone() }}
            >
              Marquer comme fait
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Section Accordion ────────────────────────────────────────────────────────

function SectionAccordion({
  section,
  defaultOpen,
  onShowMe,
  onMarkDone,
}: {
  section: Section
  defaultOpen?: boolean
  onShowMe: (step: Step) => void
  onMarkDone: (sectionId: string, stepId: string) => void
}) {
  const [open, setOpen] = React.useState(defaultOpen ?? false)
  const [activeStep, setActiveStep] = React.useState<string | null>(
    section.steps.find((s) => !s.done)?.id ?? null
  )

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-3 rounded-lg border border-border/40 bg-card px-3 py-2.5 hover:bg-muted/30 transition-colors">
        <SectionBadge section={section} />
        <span className="flex-1 text-left text-sm font-semibold text-foreground">
          {section.title}
        </span>
        <span className="text-xs text-muted-foreground mr-1">
          {section.steps.length} étapes
        </span>
        {open
          ? <ChevronUp className="size-4 text-muted-foreground" />
          : <ChevronDown className="size-4 text-muted-foreground" />
        }
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="mt-1.5 flex flex-col gap-1.5 pl-2">
          {section.steps.map((step) => (
            <StepItem
              key={step.id}
              step={step}
              isActive={activeStep === step.id}
              onActivate={() => setActiveStep(step.id)}
              onMarkDone={() => {
                onMarkDone(section.id, step.id)
                const idx = section.steps.findIndex((s) => s.id === step.id)
                const next = section.steps.slice(idx + 1).find((s) => !s.done)
                setActiveStep(next?.id ?? null)
              }}
              onShowMe={() => onShowMe(step)}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── Export principal : uniquement le contenu ─────────────────────────────────

export function GetStartedSheetContent({ userName = "Ibrahim" }: { userName?: string }) {
  const router = useRouter()
  const [sections, setSections] = React.useState<Section[]>(SECTIONS)
  const { pct } = computeProgress(sections)

  function handleMarkDone(sectionId: string, stepId: string) {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id !== sectionId ? sec : {
          ...sec,
          steps: sec.steps.map((st) => st.id === stepId ? { ...st, done: true } : st),
        }
      )
    )
  }

  function handleShowMe(step: Step) {
    if (!step.tourRoute) return
    localStorage.setItem("pendingTour", step.tourKey ?? "")
    router.push(step.tourRoute)
  }

  return (
    <SheetContent side="right" className="flex w-full max-w-sm flex-col gap-0 p-0 sm:max-w-sm">

      {/* Header violet */}
      <SheetHeader className="flex-row items-center gap-3 bg-violet-700 px-4 py-3">
        <Rocket className="size-4 text-white/80" />
        <SheetTitle className="text-sm font-semibold text-white">
          Prise en main
        </SheetTitle>
        <SheetClose asChild>
          <Button
            size="icon"
            variant="ghost"
            className="ml-auto size-6 text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="size-3.5" />
          </Button>
        </SheetClose>
      </SheetHeader>

      {/* Hero */}
      <div className="flex items-center justify-between bg-card px-4 py-4 border-b border-border/40">
        <div>
          <p className="text-base font-bold text-foreground">👋 Bonjour {userName} !</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Complétez toutes les étapes pour maîtriser la plateforme.
          </p>
        </div>
        <CircleProgress pct={pct} />
      </div>

      {/* Sections scrollables */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {sections.map((section, i) => (
          <SectionAccordion
            key={section.id}
            section={section}
            defaultOpen={i === 0}
            onShowMe={handleShowMe}
            onMarkDone={handleMarkDone}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border/40 px-4 py-3">
        <SheetClose asChild>
          <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
            Ignorer ce guide
          </Button>
        </SheetClose>
      </div>

    </SheetContent>
  )
}