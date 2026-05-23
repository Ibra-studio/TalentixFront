import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button"
import { Activity, Bell, Settings } from "lucide-react"

export function Notifications() {
  const hasUnread = false // à brancher avec ta logique

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-lg"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {hasUnread && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="text-sm font-medium">Notifications</span>
          <div className="flex items-center gap-3">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Show all
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ✓ Mark all as read
            </button>
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <Bell className="h-8 w-8 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">No notifications. Enjoy the silence.</p>
        </div>

        {/* Footer */}
        <div className="border-t">
          <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Activity className="h-4 w-4" />
            View all
          </button>
          <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" />
            Adjust settings
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}