"use client"

import * as React from "react"
import { Trash, UsersRound, UserPlus, UserRound, Bookmark, BriefcaseBusiness, FolderDown, FolderCheck, Archive, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JobFavorites() {
  const favorites = [
    { icon: <BriefcaseBusiness size={16} />, label: "Tous", count: 0 },
    { icon: <Bookmark size={16} />, label: "Suivis", count: 11 },
    { icon: <UserCheck size={16} />, label: "Je suis impliqué dedans", count: 2 },
    { icon: <FolderCheck size={16} />, label: "Publiés", count: 12 },
    { icon: <Archive size={16} />, label: "Archivés", count: 0 },
    { icon: <Trash size={16} />, label: "Fermés", count: 0 },
  ]

  return (
    <div>
      <h4 className="text-[13px] font-bold text-muted-foreground tracking-wider uppercase mb-3 select-none">
        Jobs
      </h4>
      <div className="space-y-0.5 select-none">
        {favorites.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md hover:bg-brand! cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
            <span className="text-xs font-mono">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
