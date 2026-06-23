"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Données calquées sur image_1a70e0.png
const newCandidates = [
  { id: 1, name: "John Doe (Sample)", role: "Senior Marketer (Sample)", time: "18 days ago", status: "full" },
  { id: 2, name: "Max Mustermann (Sample)", role: "Recruiter (Sample)", time: "23 days ago", status: "half" },
];

const overdueCandidates = [
  { id: 1, name: "Serena Uppin (Sample)", role: "Recruiter (Sample)", delay: "-1d", status: "half" },
  { id: 2, name: "Wilma Roelandsen (Sample)", role: "Senior Marketer (Sample)", delay: "-1d", status: "full" },
];

// Composant interne pour le petit indicateur circulaire (Plein ou Moitié)
function StatusDot({ type }: { type: string }) {
  if (type === "full") {
    return <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 inline-block" />;
  }
  // Rendu du cercle divisé verticalement (vert / transparent)
  return (
    <svg className="h-2 w-2 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
      <path d="M12 2a10 10 0 0 0 0 20V2z" fill="currentColor" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function CandidateLists() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Box Nouveaux Candidats */}
      <Card className="bg-card p-6 flex flex-col justify-between border-border/40">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-6">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold text-foreground">New candidates</CardTitle>
              <span className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">2</span>
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px] h-7 text-xs bg-transparent border-border/60 text-muted-foreground rounded-md px-2.5">
                <SelectValue placeholder="All departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="p-0 space-y-5">
            {newCandidates.map((c) => (
              <div key={c.id} className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-brand  text-xs font-bold">
                      {c.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-foreground hover:underline cursor-pointer">{c.name}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <StatusDot type={c.status} />
                      <span>{c.role}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground pt-0.5 font-medium">{c.time}</span>
              </div>
            ))}
          </CardContent>
        </div>

        <div className="pt-6">
          <button className="text-xs text-muted-foreground hover:text-foreground font-semibold transition-colors">
            Show more
          </button>
        </div>
      </Card>

      {/* Box Retards de Traitement */}
      <Card className="bg-card p-6 flex flex-col justify-between border-border/40">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-6">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold text-foreground">Overdue candidates</CardTitle>
              <span className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">2</span>
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px] h-7 text-xs bg-transparent border-border/60 text-muted-foreground rounded-md px-2.5">
                <SelectValue placeholder="All departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="p-0 space-y-5">
            {overdueCandidates.map((c) => (
              <div key={c.id} className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-brand  text-xs font-bold">
                      {c.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-foreground hover:underline cursor-pointer">{c.name}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <StatusDot type={c.status} />
                      <span>{c.role}</span>
                    </div>
                  </div>
                </div>
                <span className="bg-[#FF5C35] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 tracking-wider">
                  {c.delay}
                </span>
              </div>
            ))}
          </CardContent>
        </div>

        <div className="pt-6">
          <button className="text-xs text-muted-foreground hover:text-foreground font-semibold transition-colors">
            Show more
          </button>
        </div>
      </Card>

    </div>
  );
}