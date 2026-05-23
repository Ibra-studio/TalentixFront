import { Geist, Geist_Mono, Figtree, Lora } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { SidebarHeader, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

const loraHeading = Lora({subsets:['latin'],variable:'--font-heading'});

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", figtree.variable, loraHeading.variable)}
    >
      <body>
        <ThemeProvider>

        <SidebarProvider style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
        >  
          <TooltipProvider>
          <AppSidebar  variant="inset" />
          </TooltipProvider>
          
            <SidebarInset>
              <main className="w-full h-full">
              <SiteHeader/>
              {children}
              </main>
            </SidebarInset>
          
        
          
        </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
