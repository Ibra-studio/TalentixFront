"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Users } from "lucide-react";

const jobs = [
  { id: 1, title: "Chargé de Recrutement (Test)", location: "Dakar, Sénégal", candidates: 1, status: "active" },
  { id: 2, title: "Responsable Marketing (Test)", location: "Abidjan, Côte d'Ivoire", candidates: 0, status: "draft" },
  { id: 3, title: "Senior Business Developer (Test)", location: "Casablanca, Maroc", candidates: 1, status: "active" },
];

const tags = [
  { name: "Exemple", count: 14 },
  { name: "Sénior", count: 5 },
  { name: "Junior", count: 4 },
  { name: "Middle", count: 4 },
  { name: "Recruté", count: 2 },
];

const sources = [
  { name: "Indeed", count: 6 },
  { name: "Site Carrière", count: 2 },
  { name: "CV reçu", count: 2 },
  { name: "LinkedIn", count: 2 },
  { name: "Recommandation", count: 1 },
  { name: "Facebook", count: 1 },
];

export function JobsTags() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Colonne de Gauche : Emplois */}
      <Card className="bg-card flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold">Offres d'emploi</CardTitle>
              <Badge variant="secondary" className="bg-muted text-muted-foreground text-[11px] px-1.5 py-0">3</Badge>
            </div>
            <span className="text-xs text-muted-foreground cursor-pointer hover:underline">Tous les départements</span>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between border-b border-border/40 pb-3 last:border-none last:pb-0">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${job.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground/50'}`} />
                    <p className="text-xs font-semibold hover:underline cursor-pointer">{job.title}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground pl-4">{job.location}</p>
                </div>
                {job.candidates > 0 && (
                  <Badge variant="secondary" className="bg-brand/20 text-brand-foreground hover:bg-brand/30 text-[10px] flex items-center gap-1 font-semibold">
                    <Users className="h-3 w-3" /> {job.candidates}
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </div>
        <CardContent className="pt-0 border-t border-border/40 mt-2">
          <button className="text-xs text-muted-foreground hover:text-foreground pt-3 w-full text-left font-medium">Voir plus</button>
        </CardContent>
      </Card>

      {/* Colonne de Droite : Tags & Sources */}
      <div className="space-y-4">
        {/* Box Tags */}
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold">Tags</CardTitle>
              <Badge variant="secondary" className="bg-muted text-muted-foreground text-[11px] px-1.5 py-0">5</Badge>
            </div>
            <Settings className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
          </CardHeader>
          <CardContent className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 bg-background border border-border text-[11px] px-2 py-1 rounded-md text-foreground cursor-pointer hover:border-brand transition-colors">
                {tag.name} <span className="text-[10px] text-muted-foreground bg-muted px-1 rounded">{tag.count}</span>
              </span>
            ))}
          </CardContent>
        </Card>

        {/* Box Sources */}
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold">Sources</CardTitle>
              <Badge variant="secondary" className="bg-muted text-muted-foreground text-[11px] px-1.5 py-0">7</Badge>
            </div>
            <Settings className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
          </CardHeader>
          <CardContent className="flex flex-wrap gap-1.5">
            {sources.map((src, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 bg-background border border-border text-[11px] px-2 py-1 rounded-md text-foreground cursor-pointer hover:border-brand transition-colors">
                {src.name} <span className="text-[10px] text-muted-foreground bg-muted px-1 rounded">{src.count}</span>
              </span>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}