"use client"
import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export function SearchBar() {
  const [open, setOpen] = useState(false)

  // Active Ctrl+K
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

  return (
    <>
      {/* ton placeholder existant, cliquable */}
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
      <span className="flex-1 text-left">Search, jump to, and more</span>
      <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
        CTRL + K
      </kbd>
    </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search, jump to, and more..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>Candidates</CommandItem>
            <CommandItem>Jobs</CommandItem>
            <CommandItem>Analytics</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}