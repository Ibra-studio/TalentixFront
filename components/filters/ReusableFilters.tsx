"use client"

import * as React from "react"
import { X, ChevronDown, Plus, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FilterGroup } from "./types"

export interface ReusableFiltersProps {
  groups: FilterGroup[]
  visibleGroupIds: string[]
  onVisibilityChange?: (visibleIds: string[]) => void
  onClearAll: () => void
  layout?: 'sidebar' | 'popover'
  popoverTriggerLabel?: string
}

export function ReusableFilters({
  groups,
  visibleGroupIds,
  onVisibilityChange,
  onClearAll,
  layout = 'sidebar',
  popoverTriggerLabel = 'Filters',
}: ReusableFiltersProps) {
  // Check if a group is visible
  const isVisible = (id: string) => visibleGroupIds.includes(id)

  // Toggle filter option selection
  const handleToggleOption = (group: FilterGroup, optionLabel: string) => {
    const newValue = [...group.value]
    const idx = newValue.indexOf(optionLabel)
    if (idx > -1) {
      newValue.splice(idx, 1)
    } else {
      newValue.push(optionLabel)
    }
    group.onChange(newValue)
  }

  // Remove a filter group (hide it and clear its selected values)
  const handleRemoveGroup = (groupId: string) => {
    if (onVisibilityChange) {
      onVisibilityChange(visibleGroupIds.filter((id) => id !== groupId))
    }
    const group = groups.find((g) => g.id === groupId)
    if (group) {
      group.onChange([])
    }
  }

  // Add a filter group (make it visible)
  const handleAddGroup = (groupId: string) => {
    if (onVisibilityChange && !visibleGroupIds.includes(groupId)) {
      onVisibilityChange([...visibleGroupIds, groupId])
    }
  }

  // Count active selections across all filters
  const activeFiltersCount = React.useMemo(() => {
    return groups.reduce((acc, curr) => acc + curr.value.length, 0)
  }, [groups])

  // Groups that can be added (are currently hidden)
  const hiddenGroups = React.useMemo(() => {
    return groups.filter((g) => !isVisible(g.id))
  }, [groups, visibleGroupIds])

  // Helper to render filter sections content
  const renderFilterSections = () => {
    const visibleGroups = groups.filter((g) => isVisible(g.id))

    

    return (
      <div className="space-y-5">
        {visibleGroups.map((group) => (
          <div key={group.id} className="space-y-2">
            {/* Filter Group Header */}
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-foreground">{group.label}</span>
              {onVisibilityChange && (
                <X
                  className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleRemoveGroup(group.id)}
                />
              )}
            </div>

            {/* Filter Options Content */}
            {group.type === 'checkbox' ? (
              <ul className="space-y-1.5">
                {group.options.map((option, idx) => {
                  const isChecked = group.value.includes(option.label)
                  return (
                    <li
                      key={idx}
                      className={`flex items-center justify-between text-xs group cursor-pointer ${
                        option.disabled ? 'opacity-40 pointer-events-none' : ''
                      }`}
                    >
                      <label className="flex items-center gap-2.5 cursor-pointer w-full">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => handleToggleOption(group, option.label)}
                          disabled={option.disabled}
                          className="border-muted-foreground/50 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                        />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {option.label}
                        </span>
                      </label>
                      {option.count !== undefined && (
                        <span className="text-muted-foreground font-mono">{option.count}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            ) : (
              // Dropdown Selection (e.g. "Dans le job")
              <div className="space-y-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-between border border-border bg-background rounded-md px-3 py-1.5 cursor-pointer hover:border-muted-foreground/50">
                      <span className="text-xs text-muted-foreground truncate mr-2">
                        {group.value.length > 0 ? group.value.join(", ") : "Ajouter un choix"}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[220px] max-h-[250px] overflow-y-auto">
                    {group.options.length === 0 ? (
                      <DropdownMenuItem disabled>Aucune option disponible</DropdownMenuItem>
                    ) : (
                      group.options.map((option, idx) => {
                        const isChecked = group.value.includes(option.label)
                        return (
                          <DropdownMenuItem
                            key={idx}
                            className="flex items-center gap-2.5 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault() // Keep menu open
                              handleToggleOption(group, option.label)
                            }}
                          >
                            <Checkbox
                              checked={isChecked}
                              className="border-muted-foreground/50 data-[state=checked]:bg-brand data-[state=checked]:border-brand pointer-events-none"
                            />
                            <span className="text-sm">{option.label}</span>
                          </DropdownMenuItem>
                        )
                      })
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        ))}

        {/* Action Buttons (Add filter, Clear) */}
        <div className="flex items-center gap-2 pt-2">
          {onVisibilityChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs bg-background hover:bg-brand! cursor-pointer">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />  Ajouter un filtre
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {hiddenGroups.length === 0 ? (
                  <DropdownMenuItem disabled>Tous les filtres sont affichés</DropdownMenuItem>
                ) : (
                  hiddenGroups.map((g) => (
                    <DropdownMenuItem key={g.id} onClick={() => handleAddGroup(g.id)}>
                      {g.label}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-8 text-xs text-muted-foreground hover:bg-brand! disabled:opacity-40  disabled:pointer-events-auto! disabled:cursor-not-allowed! cursor-pointer flex-1"
            disabled={activeFiltersCount === 0}
          >
            Effacer 
          </Button>
        </div>
      </div>
    )
  }

  // RENDER LAYOUT
  if (layout === 'popover') {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-2 border-border/80 text-xs font-normal">
            <SlidersHorizontal className="h-3.5 w-3.5 opacity-80" />
            <span>{popoverTriggerLabel}</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-brand text-brand-foreground rounded-full text-[10px] font-bold">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown className="h-3 w-3 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[280px] p-4 space-y-4 max-h-[500px] overflow-y-auto bg-card border-border">
          {renderFilterSections()}
        </PopoverContent>
      </Popover>
    )
  }

  // Sidebar variant (just the content, standard layout)
  return (
    <div className="space-y-5">
      {renderFilterSections()}
    </div>
  )
}
