"use client"

import * as React from "react"
import { FolderPlus } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Candidate } from "@/types/candidate"
import { getStatusStyle } from "@/lib/candidate/status-style"
import Link from "next/link"

export interface CandidateTableProps {
  candidates: Candidate[]
  selectedIds: Set<string>
  onToggleSelection: (id: string) => void
  onToggleAll: () => void
}

export function CandidateTable({
  candidates,
  selectedIds,
  onToggleSelection,
  onToggleAll,
}: CandidateTableProps) {
  const isAllSelected = candidates.length > 0 && selectedIds.size === candidates.length

  return (
    <div className=" min-w-0 w-full border border-foreground/20 rounded-lg bg-card overflow-hidden flex flex-col">
      <div className="overflow-x-auto w-full flex-1 custom-scrollbar">
        <Table className="min-w-[900px] w-full relative">
          <TableHeader className="bg-muted/40 select-none">
            <TableRow className="border-b border-foreground/20 hover:bg-transparent">
              <TableHead className="w-[40px] px-3">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onToggleAll}
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
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                  Aucun candidat ne correspond à votre recherche.
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => {
                const isSelected = selectedIds.has(candidate.id)

                return (
                  <TableRow
                    key={candidate.id}
                    className={`border-b border-foreground/20 transition-colors group ${
                      isSelected
                        ? "bg-brand hover:bg-brand/10 dark:bg-brand/20 dark:hover:bg-brand/30"
                        : "hover:bg-brand/30"
                    }`}
                  >
                    <TableCell className="px-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onToggleSelection(candidate.id)}
                        aria-label={`Sélectionner ${candidate.name}`}
                        className="border-muted-foreground/40 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                      />
                    </TableCell>
                    
                    <Link href={`/candidates/${candidate.id}`}>
                   
                    <TableCell className="font-medium text-sm hover:cursor-pointer">
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
                    </TableCell>
                    </Link>

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
                          <Badge
                            variant="outline"
                            className={`text-[11px] px-2 py-0.5 font-normal tracking-wide rounded ${getStatusStyle(
                              candidate.stage
                            )}`}
                          >
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
  )
}
