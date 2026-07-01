// app/layout.tsx
import { Geist_Mono, Figtree, Lora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const loraHeading = Lora({ subsets: ["latin"], variable: "--font-heading" })
const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <html
      lang="fr"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, figtree.variable, loraHeading.variable)}
    >
  
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}