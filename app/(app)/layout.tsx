import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SearchProvider } from "@/context/SearchContext"

export default function AppLayout({ 
  children,
  modal 
}: { 
  children: React.ReactNode;
  modal: React.ReactNode; 
}) {
  return (
  
    <>
    <SearchProvider>

    
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
      {modal}
      </SearchProvider>
      </>
  
  )
}