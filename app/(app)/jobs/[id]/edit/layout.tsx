import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share, Eye, Save, Send, MoreHorizontal, Pencil, FileText, Users, Workflow, Share2, Globe } from "lucide-react";

export default function JobEditorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* HEADER FIXE */}
      <header className="h-16 shrink-0 border-b border-border flex items-center justify-between px-6 bg-card z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-foreground">Marketer (Sample)</h1>
            <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 rounded">#tflfn</span>
          </div>
          <span className="text-xs text-muted-foreground">Saved just now</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Share <span className="ml-1 text-[10px]">▼</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Eye className="w-4 h-4 mr-2" /> Preview
          </Button>
          <Button variant="outline" size="sm">
            Save changes
          </Button>
          <Button size="sm" className="bg-brand text-white hover:bg-icon">
            Publish <span className="ml-2 border-l border-white/20 pl-2">▼</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* CONTENU PRINCIPAL (Sidebar + Contenu scrollable) */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR GAUCHE */}
        <aside className="w-64 shrink-0 border-r border-border bg-card overflow-y-auto p-4 space-y-1">
          <NavItem href={`/jobs/${params.id}`} icon={<Pencil />} label="Job details" active />
          <NavItem href={`/jobs/${params.id}/application`} icon={<FileText />} label="Application" />
          <NavItem href={`/jobs/${params.id}/team`} icon={<Users />} label="Team" />
          <NavItem href={`/jobs/${params.id}/workflow`} icon={<Workflow />} label="Workflow" />
          <NavItem href={`/jobs/${params.id}/sharing`} icon={<Share2 />} label="Social sharing" />
          <NavItem href={`/jobs/${params.id}/careers`} icon={<Globe />} label="Careers page" />
        </aside>

        {/* CONTENU DU FORMULAIRE SCROLLABLE */}
        <main className="flex-1 overflow-y-auto bg-background p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto pb-20 w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Sous-composant pour la navigation de la sidebar
function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? "bg-brand text-[oklch(0.85_0.12_185)]" // Vos couleurs Oklch
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
      {label}
    </Link>
  );
}