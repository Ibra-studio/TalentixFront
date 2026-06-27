"use client"

import * as React from "react"
import { Sidebar as SidebarIcon, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ReusableFilters } from "@/components/filters/ReusableFilters"
import { FilterGroup } from "@/components/filters/types"

export interface FilterSidebarProps {
  isSidebarOpen: boolean
  onCloseSidebar: () => void
  topContent?: React.ReactNode 
  filterTitle?: string 
  children?: React.ReactNode
}

export function FilterSidebar({
  isSidebarOpen,
  onCloseSidebar,
  // 1. On donne des valeurs par défaut ici pour satisfaire TypeScript
 
  topContent,
  filterTitle,
  children,
}: FilterSidebarProps) {
  return (
    <aside
      className={`h-full border-r border-border bg-filter-sidebar-bg flex flex-col shrink-0 transition-[width,opacity] duration-300 ease-in-out ${
        isSidebarOpen ? "w-[260px] opacity-100" : "w-0 opacity-0 pointer-events-none overflow-hidden"
      }`}
    >
      <div className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar select-none">
        
        {/* Section dynamique (ex: Favoris Candidats ou Favoris Jobs) */}
        {topContent && (
          <>
            {topContent}
            <Separator />
          </>
        )}

        {/* Panneau de filtres partagé */}
        {children && (
        <div className="space-y-5">
          <h4 className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
            {filterTitle}
          </h4>
         
          {children}
         
        </div>
        )}
      </div>

      {/* Footer Sidebar : Show/hide */}
      <div className="p-2 border-t border-border mt-auto">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between text-xs text-muted-foreground hover:bg-brand! h-9 cursor-pointer"
          onClick={onCloseSidebar}
        >
          <div className="flex items-center gap-2">
            <SidebarIcon className="h-4 w-4" />
            Afficher/Masquer
          </div>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  )
}