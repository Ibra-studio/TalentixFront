"use client"

import * as React from "react"
import { ChevronDown, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface FilterOption {
  label: string
  count?: number
  disabled?: boolean
}

export interface FilterGroup {
  id: string
  label: string
  type: "checkbox" | "dropdown"
  options: FilterOption[]
  value: string[] // Valeurs actuellement sélectionnées
  onChange: (values: string[]) => void
}

interface CandidateFilterPillsProps {
  filterGroups: FilterGroup[]
  onClearAll?: () => void
}

const pillTriggerClass =
  "h-8 px-3 rounded-full border border-border/80 bg-background text-xs font-medium text-foreground hover:bg-muted/60 transition-colors flex items-center gap-1.5 focus:ring-0 focus:ring-offset-0 cursor-pointer shadow-none"

export function CandidateFilterPills({ filterGroups, onClearAll }: CandidateFilterPillsProps) {
  // Calcul du nombre total de filtres actifs
  const totalActiveFilters = filterGroups.reduce((acc, g) => acc + g.value.length, 0)

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filterGroups.map((group) => {
        const activeCount = group.value.length
        const isActive = activeCount > 0

        return (
          <Popover key={group.id}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  pillTriggerClass,
                  isActive && "bg-brand/10 border-brand/40 text-brand font-semibold"
                )}
              >
                <span>{group.label}</span>
                {isActive && (
                  <span className="ml-0.5 rounded-full bg-brand/20 text-brand px-1.5 py-0.2 text-[10px] font-bold">
                    {activeCount}
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-0.5" />
              </button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-56 p-2 space-y-1">
              <div className="text-xs font-semibold px-2 py-1 text-muted-foreground border-b border-border/50 mb-1 flex items-center justify-between">
                <span>{group.label}</span>
                {isActive && (
                  <button
                    onClick={() => group.onChange([])}
                    className="text-[10px] text-destructive hover:underline"
                  >
                    Effacer
                  </button>
                )}
              </div>

              <div className="max-h-56 overflow-y-auto space-y-1 custom-scrollbar">
                {group.options.map((option) => {
                  const isChecked = group.value.includes(option.label)

                  const handleToggle = () => {
                    if (isChecked) {
                      group.onChange(group.value.filter((v) => v !== option.label))
                    } else {
                      group.onChange([...group.value, option.label])
                    }
                  }

                  return (
                    <div
                      key={option.label}
                      onClick={() => !option.disabled && handleToggle()}
                      className={cn(
                        "flex items-center justify-between px-2 py-1.5 rounded-md text-xs cursor-pointer transition-colors",
                        option.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-muted/80",
                        isChecked && "bg-accent/50 font-medium"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          disabled={option.disabled}
                          onCheckedChange={handleToggle}
                        />
                        <Label className="text-xs cursor-pointer font-normal">
                          {option.label}
                        </Label>
                      </div>
                      {option.count !== undefined && (
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {option.count}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
        )
      })}

      {/* Bouton pour réinitialiser tous les filtres actifs */}
      {totalActiveFilters > 0 && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground rounded-full gap-1"
        >
          <X className="w-3.5 h-3.5" /> Effacer ({totalActiveFilters})
        </Button>
      )}
    </div>
  )
}