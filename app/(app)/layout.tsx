// app/(app)/layout.tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

export default function AppLayout({ 
  children,
  modal // 1. Ajout de la prop modal
}: { 
  children: React.ReactNode;
  modal: React.ReactNode; // 2. Typage de la prop
}) {
  return (
    <>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties}
      >
        <TooltipProvider>
          <AppSidebar variant="inset" />
        </TooltipProvider>
        <SidebarInset>
          <main className="w-full h-full relative">
            <SiteHeader />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
      
      {/* 3. Affichage du modal par-dessus le layout entier */}
      {modal}
    </>
  )
}