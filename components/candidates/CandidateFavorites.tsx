"use client"

import * as React from "react"
import { Trash, UsersRound, UserPlus, UserRound, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CandidateFavorites() {
  const favorites = [
    { icon: <Trash size={16} />, label: "Récemment supprimés", count: 0 },
    { icon: <UsersRound size={16} />, label: "Candidats qualifiés", count: 11 },
    { icon: <UserPlus size={16} />, label: "Nouveaux candidats", count: 2 },
    { icon: <UserRound size={16} />, label: "Non contactés", count: 12 },
    { icon: <Bookmark size={16} />, label: "Candidats suivis", count: 0 },
  ]

  return (
    <div>
      <h4 className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase mb-3 select-none">
        Favoris
      </h4>
      <div className="space-y-0.5 select-none">
        {favorites.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md hover:bg-brand cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
            <span className="text-xs font-mono">{item.count}</span>
          </div>
        ))}
      </div>
      <Button
        variant="link"
        className="px-2 h-8 text-xs text-muted-foreground hover:text-foreground"
      >
        Voir plus
      </Button>
    </div>
  )
}
