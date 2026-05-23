"use client"

import { Bell, Briefcase, ChevronRight, HelpCircle, LayoutSidebar, LogOut, Moon, Plus, Settings, Star, Upload, User, UserPlus, Users, Activity, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Notifications } from "./NotificationsBadge"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ProfileMenu } from "./ProfileMenuBadge"
import { SearchBar } from "./SearchBar"
import { QuickActions } from "./QuickActionsBadge"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { GetStartedSheetContent } from "./GetStartedSheet"
// ─────────────────────────────────────────────
// Subscription / Trial badge  → remplace par <Sheet> quand prêt
// ─────────────────────────────────────────────
function SubscriptionBadge() {
  return (
    // TODO: remplacer ce Button par un SheetTrigger + Sheet de shadcn
    <Button
      variant="outline"
      size="sm"
      className="h-8 rounded-full gap-1.5 text-xs font-normal"
    >
      Your trial
      <ChevronRight className="h-3 w-3 opacity-60" />
    </Button>
  )
}

// ─────────────────────────────────────────────
// Search placeholder → remplace par <CommandDialog> quand prêt
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Quick Actions  (+)
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Notifications
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
// Profile menu
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// SiteHeader  (assemblage)
// ─────────────────────────────────────────────
export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center   gap-2 px-4 lg:gap-2 lg:px-6">

        {/* Left – sidebar toggle + trial */}
        
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4" />
        <SubscriptionBadge />
        

        {/* Center – search */}
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        {/* Right – actions */}
        <div className="flex items-center gap-1">
          <QuickActions />
          <Sheet>
            <SheetTrigger asChild>
             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" aria-label="Help">
               <HelpCircle className="h-4 w-4" />
              </Button>
            </SheetTrigger>

             <GetStartedSheetContent userName="Ibrahim" />
           </Sheet>
          
          <Notifications />
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4" />
          <ProfileMenu />
        </div>

      </div>
    </header>
  )
}