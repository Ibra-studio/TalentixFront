"use client"

import * as React from "react"
import { Sparkles, ScanLine, MoreVertical, ArrowUp, ArrowDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Candidate } from "@/types/candidate"
import Link from "next/link"

// Composant utilitaire pour générer des étoiles de notation
const RatingStars = ({ rating = 0 }: { rating?: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// Composant utilitaire pour la couleur du badge de score IA
const getScoreBadgeColor = (scoreStr: string) => {
  const score = parseInt(scoreStr) || 0;
  if (score >= 4) return "bg-[#10845d] text-white ";
  if (score >= 3) return "bg-[#9cd2a8] text-black/70 ";
  if (score >= 2) return "bg-amber-100 text-amber-700 ";
  return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
}

export interface CandidateTableProps {
  candidates: Candidate[]
  selectedIds: Set<string>
  onToggleSelection: (id: string) => void
  onToggleAll: () => void
  sortOrder: "asc" | "desc" | null
  onSortScore: () => void
}

export function CandidateTable({
  candidates,
  selectedIds,
  onToggleSelection,
  onToggleAll,
  sortOrder,
  onSortScore
}: CandidateTableProps) {
  const isAllSelected = candidates.length > 0 && selectedIds.size === candidates.length

  return (
    <div className="min-w-0 w-full overflow-hidden flex flex-col">
      <div className="overflow-x-auto w-full flex-1 custom-scrollbar">
        <Table className="min-w-[900px] w-full relative">
          <TableHeader className="bg-transparent select-none">
            <TableRow className="border-y border-border hover:bg-transparent">
              <TableHead className="w-[40px] px-4">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onToggleAll}
                  aria-label="Tout sélectionner"
                 className="border-muted-foreground/40 data-[state=checked]:bg-brand data-[state=checked]:border-brand cursor-pointer"
                />
              </TableHead>
              <TableHead className="text-xs font-semibold text-foreground tracking-wide w-[280px]">Candidat</TableHead>
              
              {/* Colonne Triable Match IA */}
              <TableHead 
                className="text-xs font-semibold text-foreground tracking-wide w-[120px] cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={onSortScore}
              >
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  Match (IA)
                  {sortOrder === "asc" && <ArrowUp className="w-3.5 h-3.5 ml-1" />}
                  {sortOrder === "desc" && <ArrowDown className="w-3.5 h-3.5 ml-1" />}
                </div>
              </TableHead>
              
              <TableHead className="text-xs font-semibold text-foreground tracking-wide w-[150px]">Source</TableHead>
              <TableHead className="text-xs font-semibold text-foreground tracking-wide w-[150px]">Localisation</TableHead>
              <TableHead className="text-xs font-semibold text-foreground tracking-wide w-[150px]">Étape</TableHead>
              <TableHead className="text-xs font-semibold text-foreground tracking-wide w-[120px]">Evaluation</TableHead>
              <TableHead className="text-xs font-semibold text-foreground tracking-wide">Postulé le</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-32 text-muted-foreground">
                  Aucun candidat trouvé.
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => {
                const isSelected = selectedIds.has(candidate.id)

                return (
                  <TableRow
                    key={candidate.id}
                    className={`border-b border-border transition-colors group ${
                      isSelected
                        ? "bg-brand/20 hover:bg-brand/20 dark:bg-brand dark:hover:bg-brand"
                        : "hover:bg-brand/30"
                    }`}
                  >
                    <TableCell className="px-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onToggleSelection(candidate.id)}
                        className="border-muted-foreground/40 data-[state=checked]:bg-brand data-[state=checked]:border-brand cursor-pointer"
                      />
                    </TableCell>
                    
                    {/* Colonne Candidat */}
                    <TableCell className="font-medium text-sm">
                      <div className="flex items-center justify-between">
                        <Link href={`/candidates/${candidate.id}`} className="block">
                                                <div className="flex items-center gap-2.5">
                                                 <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex-shrink-0 border border-gray-800">
                                                    {candidate.avatarUrl ? (
                                                      <img src={candidate.avatarUrl} alt={candidate.name} className="w-full h-full object-cover object-top" />
                                                    ) : (
                                                      <div className="w-full h-full flex items-center justify-center text-xs font-bold bg-gradient-to-br from-gray-600 to-gray-800 text-gray-300">
                                                        {candidate.initial || candidate.name.charAt(0)}
                                                      </div>
                                                    )}
                                                  </div>
                                                
                                                <span className="truncate text-foreground/90 group-hover:underline">
                                                  {candidate.name}{" "}
                                                  <span className="text-xs text-muted-foreground/40 font-normal">
                                                    (Exemple)
                                                  </span>
                                                </span>
                                                </div>
                         </Link>
                        
                        {/* Actions au survol (Scan & Menu) */}
                       
                      </div>
                    </TableCell>

                    {/* Colonne Match IA */}
                    <TableCell>
                      <div className={`inline-flex items-center justify-center px-2 py-0.5 rounded font-bold text-xs ${getScoreBadgeColor(candidate.score)}`}>
                        {candidate.score}
                      </div>
                    </TableCell>

                    {/* Colonne Source */}
                    <TableCell className="text-xs text-muted-foreground">
                      <div className="flex flex-col">
                        <span className="text-foreground">Default Career</span>
                        <span>Page</span>
                      </div>
                    </TableCell>

                    {/* Colonne Localisation */}
                    <TableCell className="text-xs text-muted-foreground">
                       <div className="flex flex-col">
                        <span className="text-foreground">London</span>
                        <span>UK</span>
                      </div>
                    </TableCell>

                    {/* Colonne Statut */}
                    <TableCell className="text-xs">
                       <div className="flex flex-col">
                        <span className="text-foreground">{candidate.stage}</span>
                        <span className="text-muted-foreground">Juin 17, 2025</span>
                      </div>
                    </TableCell>

                    {/* Colonne Note */}
                    <TableCell>
                      {/* Simule une note aléatoire basée sur la longueur de l'ID pour l'exemple, à remplacer par candidate.rating */}
                      <RatingStars rating={(candidate.id.length % 5) + 1} />
                    </TableCell>

                    {/* Colonne Postulé le */}
                    <TableCell className="text-xs text-muted-foreground">
                      {candidate.date}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}