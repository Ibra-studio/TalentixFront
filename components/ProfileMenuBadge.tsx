import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ChevronRight, Ghost, LogOut, Moon, User } from "lucide-react"
import { Button } from "./ui/button"
export function ProfileMenu() {
  const user = {
    name: "Mamadou ibrahim Diakite",
    role: "Owner",
    initials: "MD",
    workspace: "ibrahim studio",
    workspaceInitial: "I",
    verified: false,
    theme: "Dark" as "Light" | "Dark" | "System",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" aria-label="Profile menu" variant={"ghost"}>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="bg-primary text-black text-xs font-semibold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          {!user.verified && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 p-0" sideOffset={8}>

        {/* User info */}
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="bg-[#FDF3E1] text-black text-sm font-semibold">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>

          {/* Verification warning */}
          {!user.verified && (
            <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-2.5">
              <div className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold mb-1">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                Account verification required
              </div>
              <p className="text-xs text-amber-500/70 mb-2">
                Verify account to remove trial limitations.
              </p>
              <Button
                size="sm"
                variant="secondary"
                className="h-7 text-xs"
              >
                Verify account
              </Button>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* Workspace */}
        <DropdownMenuItem className="gap-2.5 py-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold shrink-0">
            {user.workspaceInitial}
          </div>
          <span className="flex-1 truncate">{user.workspace}</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2.5 py-2">
          <User className="h-4 w-4 text-muted-foreground" />
          Profile settings
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2.5 py-2">
          {/* heart icon */}
          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Ambassador Program
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2.5 py-2">
          <Moon className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1">Appearance: {user.theme}</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2.5 py-2 text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
