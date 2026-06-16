import { Briefcase, Plus, Star, Upload, UserPlus, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"

const QUICK_ACTIONS = [
  { icon: UserPlus, label: "Candidate" },
  { icon: Upload,   label: "CV or resume upload" },
  { icon: Briefcase,label: "Job" },
  { icon: Star,     label: "Talent pool" },
  { icon: Users,    label: "Team member" },
]

export function QuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="h-8 w-8 rounded-lg hover:bg-muted active:bg-primary"
          aria-label="Quick actions"
          variant={"ghost"}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
          <DropdownMenuItem key={label} className="gap-2.5">
            <Icon className="h-4 w-4 text-muted-foreground" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
