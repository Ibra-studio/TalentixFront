"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch"; // Composant switch type Shadcn
import { Plus, X, Pencil, ArrowRight, Building2, Globe2, Home } from "lucide-react";
import { AboutTheRoleSection } from "@/components/jobs/edit/AboutTheRoleSection";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [workModel, setWorkModel] = useState<"on-site" | "remote" | "hybrid">("on-site");

  return (
    <div className="space-y-8">
      
      {/* 1. BASIC INFO */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Basic info</h2>
            <p className="text-sm text-muted-foreground">Define basic information about the job.</p>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">
            <Pencil className="w-3 h-3 mr-2" /> Manage fields
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Job title</label>
            <Input defaultValue="Marketer (Sample)" className="bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Department</label>
            <select className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>Select</option>
              <option>Marketing</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Tags</label>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1 font-normal bg-muted">Sample <X className="w-3 h-3 cursor-pointer" /></Badge>
            <Badge variant="secondary" className="flex items-center gap-1 font-normal bg-muted">Mid-level <X className="w-3 h-3 cursor-pointer" /></Badge>
            <Badge variant="secondary" className="flex items-center gap-1 font-normal bg-muted">Remote <X className="w-3 h-3 cursor-pointer" /></Badge>
            <Button variant="outline" size="icon" className="h-6 w-6 rounded-md"><Plus className="w-3 h-3" /></Button>
          </div>
        </div>
      </section>

      {/* 2. LIMIT JOB OPENINGS */}
      <section className="bg-card border border-border rounded-xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Switch id="limit-openings" /> Limit the number of job openings
          </h2>
          <p className="text-sm text-muted-foreground mt-1 ml-11">
            Reaching the limit for job openings will block further hires.
          </p>
        </div>
      </section>

      {/* 3. ABOUT THE ROLE */}
     <AboutTheRoleSection/>

      {/* 4. LOCATION */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Location</h2>
            <p className="text-sm text-muted-foreground">Assigned locations are displayed on the careers site.</p>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" /> Assign location
          </Button>
        </div>
        
        <div className="flex items-center justify-between border border-border rounded-lg p-4 bg-background">
          <div>
            <p className="font-semibold text-sm">Amsterdam</p>
            <p className="text-xs text-muted-foreground">Netherlands, Noord-Holland, Amsterdam</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><X className="w-4 h-4" /></Button>
          </div>
        </div>
      </section>

      {/* 5. WORK MODEL */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Work model</h2>
          <p className="text-sm text-muted-foreground">Applicants will see the selected work model on the careers site.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <WorkModelCard 
            selected={workModel === "on-site"} 
            onClick={() => setWorkModel("on-site")}
            icon={<Building2 className="w-5 h-5" />} 
            title="On-site" 
            desc="Employees work from a dedicated workspace." 
          />
          <WorkModelCard 
            selected={workModel === "remote"} 
            onClick={() => setWorkModel("remote")}
            icon={<Globe2 className="w-5 h-5" />} 
            title="Remote" 
            desc="Employees can work from anywhere." 
          />
          <WorkModelCard 
            selected={workModel === "hybrid"} 
            onClick={() => setWorkModel("hybrid")}
            icon={<Home className="w-5 h-5" />} 
            title="Hybrid" 
            desc="Employees work partly remotely and partly in an office space." 
          />
        </div>
      </section>

      {/* 6. EMPLOYMENT DETAILS & SALARY */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">Employment details</h2>
          <p className="text-sm text-muted-foreground">Below details will be visible to candidates...</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2"><label className="text-sm font-semibold">Employment type</label><Input defaultValue="Full-time, Permanent" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Category</label><Input defaultValue="Recruitment and HR" /></div>
          <div className="space-y-2"><label className="text-sm font-semibold">Required education</label><Input defaultValue="Bachelor's degree" /></div>
        </div>
      </section>

      {/* BOUTON SUIVANT (FLOTTANT OU EN BAS) */}
      <div className="flex justify-end pt-4">
        <Button 
          onClick={() => router.push(`/jobs/${params.id}/application`)}
          className="bg-muted hover:bg-muted/80 text-foreground"
        >
          Application <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

    </div>
  );
}

// Composant utilitaire pour les cartes "Work Model"
function WorkModelCard({ selected, onClick, icon, title, desc }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
        selected ? "border-[oklch(0.85_0.12_185)] bg-[oklch(0.35_0.04_185)]/10" : "border-border bg-background hover:border-muted-foreground/30"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className={selected ? "text-[oklch(0.85_0.12_185)]" : "text-muted-foreground"}>{icon}</div>
        {selected && <div className="w-5 h-5 rounded bg-[oklch(0.85_0.12_185)] text-background flex items-center justify-center text-xs">✓</div>}
      </div>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}