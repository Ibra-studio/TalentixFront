"use client"

import * as React from "react"
import { 
  Search, 
  ListFilter, 
  LayoutList, 
  Kanban, 
  AlignJustify,
  MoreHorizontal,
  LayoutGrid,
  ListPlus,
  ChevronRight,
  SlidersHorizontal
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface JobToolbarProps {
  searchQuery: string
  onSearchChange: (val: string) => void
  view: "list" | "table" 
  onViewChange: (view: "list" | "table" ) => void
 isSidebarOpen: boolean
  onToggleSidebar: () => void
  sortBy: string
  onSortChange: (val: string) => void
  groupBy: string
  onGroupChange: (val: string) => void
}

const SORT_OPTIONS = [
  { id: "none", label: "None" },
  { id: "title", label: "Title" },
  { id: "status", label: "Status" },
  { id: "department", label: "Department" },
  { id: "date_created", label: "Date created" },
]

const GROUP_OPTIONS = [
  { id: "none", label: "No group" },
  { id: "department", label: "Department" },
  { id: "status", label: "Status" },
  { id: "location", label: "Location" },
  { id: "work_model", label: "Work model" },
]

export function JobToolbar({
  searchQuery,
  onSearchChange,
  view,
  onViewChange,
   isSidebarOpen,
  onToggleSidebar,
  sortBy,
  onSortChange,
  groupBy,
  onGroupChange
}: JobToolbarProps) {
  
  return (
    <div className="flex items-center justify-between gap-4 pb-4">
        <div className="flex gap-2">
         
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onToggleSidebar}
                      className="h-8 border-border/80 gap-2 font-normal"
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5 opacity-80" />
                      <span className="text-xs">Filtres</span>
                    </Button>
                  
      {/* Recherche */}
      <div className="relative min-w-[350px] max-w-xl">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un job (nom , departement)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>
        </div>
       

      {/* Actions (Filtres, Vues, Plus) */}
      <div className="flex items-center gap-2">

        <div className="flex bg-muted p-0.5 rounded-md">
        {/* Menu Trier par */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9  rounded-none  data-[state=open]:bg-brand data-[state=open]:text-black dark:data-[state=open]:text-white focus-visible:ring-0 focus-visible:ring-offset-0">
              <ListFilter className="h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-wider px-2 py-1.5 select-none">
              Sort by
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.id}
                onClick={() => onSortChange(option.id)}
                className="group flex items-center justify-between text-xs cursor-pointer focus:bg-brand focus:text-black dark:focus:text-white"
              >
                {option.label}
                {sortBy === option.id && <ListFilter className="h-3 w-3 text-brand group-focus:text-black dark:group-focus:text-white" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>


         {/* Menu Grouper par */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-none data-[state=open]:bg-brand data-[state=open]:text-black dark:data-[state=open]:text-white focus-visible:ring-0 focus-visible:ring-offset-0">
              <LayoutGrid className="h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuLabel className="text-[10px] text-center bg-brand! font-bold text-muted-foreground/80 uppercase tracking-wider px-2 py-1.5 select-none">
              Group by
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            {GROUP_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.id}
                onClick={() => onGroupChange(option.id)}
                className="group flex items-center justify-between text-xs cursor-pointer focus:bg-brand focus:text-black dark:focus:text-white"
              >
                {option.label}
                {groupBy === option.id && <ListFilter className="h-3 w-3 text-brand group-focus:text-black dark:group-focus:text-white" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9  rounded-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <MoreHorizontal className="h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuLabel className="text-[10px] text-center bg-brand! font-bold text-muted-foreground/80 uppercase tracking-wider px-2 py-1.5 select-none">
              Paramètre de vue
            </DropdownMenuLabel>
            <div className="grid grid-cols-2 gap-1 p-1 bg-muted rounded-lg  w-full mb-4 mt-4">
                {["list", "table"].map((v) => {
                    // Définition des icônes pour chaque type
                    const Icon = v === "list" ? AlignJustify :  LayoutList 
                    
                    return (
                    <button
                        key={v}
                        onClick={() => onViewChange(v as any)}
                        className={`flex flex-col items-center justify-center py-2 rounded-md text-xs font-medium transition-all
                        ${view === v 
                            ? "bg-background shadow-sm border border-border text-foreground" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Icon className="h-4 w-4 mb-1" />
                        <span className="capitalize">{v}</span>
                    </button>
                    );
                })}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                    <div  className="flex items-center gap-2">
                         <ListPlus/>
                         <div className="flex flex-col items-start">
                         <span>Proprietés</span>
                         <span className="text-xs text-muted-foreground">9 visible, 14 hidden</span>
                         </div>
                    </div>
                
                    <ChevronRight/>
                </div>
            </DropdownMenuItem>
            
            {/* <DropdownMenuItem className="text-xs cursor-pointer text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>


        </div>

        {/* Menu More */}
       
      </div>
    </div>
  )
}