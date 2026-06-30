"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Pencil, ArrowRight, Building2, Globe2, Home, CircleHelp } from "lucide-react";
import { AboutTheRoleSection } from "@/components/jobs/edit/AboutTheRoleSection";
import { 
  Job, 
  EmploymentType, EmploymentTypeLabels, 
  EmploymentCategory, EmploymentCategoryLabels,
  Department, DepartmentLabels,
  EducationLevel, EducationLevelLabels,
  ExperienceLevel, ExperienceLevelLabels,
  SalaryPeriod, SalaryPeriodLabels,
  Currency, CurrencyLabels,
  WorkModel
} from "@/types/Job";


interface JobDetailsFormProps {
    initialJob : Job,
    onTabChange : (tabId: string) =>void
}

export function JobDetailsForm({ initialJob , onTabChange}: JobDetailsFormProps) {
  const router = useRouter();
  
  // Le state unique qui contrôle tout le formulaire
  const [job, setJob] = useState<Job>(initialJob);

  // --- Handlers génériques pour la mise à jour ---

  const updateBaseField = (field: keyof Job, value: any) => {
    setJob((prev) => ({ ...prev, [field]: value }));
  };

  const updateEmploymentDetails = (field: keyof Job["employmentDetails"], value: any) => {
    setJob((prev) => ({
      ...prev,
      employmentDetails: { ...(prev.employmentDetails || {}), [field]: value },
    }));
  };

  const updateSalary = (field: keyof Job["salary"], value: any) => {
    setJob((prev) => ({
      ...prev,
      salary: { ...(prev.salary || {}), [field]: value },
    }));
  };

  if (!job) return <div>Erreur lors du chargement du job.</div>;

  return (
    <div className="space-y-8">
      
      {/* 1. INFORMATIONS DE BASE */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Informations de base</h2>
            <p className="text-sm text-muted-foreground">Définissez les informations de base du poste.</p>
          </div>
          {/* <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">
            <Pencil className="w-3 h-3 mr-2" /> Gérer les champs
          </Button> */}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Titre du poste</label>
            <Input 
              value={job.title === "Sans titre" ? "" : job.title} 
              placeholder="Ex: Développeur React"
              onChange={(e) => updateBaseField("title", e.target.value)}
              className="bg-background" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Département</label>
            <select 
              value={job.department || ""} 
              onChange={(e) => updateBaseField("department", e.target.value as Department)}
              className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Sélectionner</option>
              {Object.entries(DepartmentLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Tags</label>
          <div className="flex items-center gap-2">
            {job.tags.map((tag)=> (
                     <Badge key={tag} variant="secondary" className="flex items-center gap-1 font-normal bg-muted">
              {tag} <X className="w-3 h-3 cursor-pointer" />
            </Badge>
            ))}
         
            <Button variant="outline" size="icon" className="h-6 w-6 rounded-md">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. LIMITER LES OUVERTURES DE POSTE */}
      <section className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Switch 
                id="limit-openings" 
                checked={job.limitOpenings}
                onCheckedChange={(checked) => updateBaseField("limitOpenings", checked)}
              /> 
              Limiter le nombre d'ouvertures de poste
            </h2>
            <p className="text-sm text-muted-foreground mt-1 ml-11">
              Atteindre la limite d'ouvertures bloquera les futures embauches.
            </p>
          </div>
        </div>
        
        {/* Rendu conditionnel du champ numérique */}
        {job.limitOpenings && (
          <div className="mt-4 ml-11 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-sm font-semibold text-foreground">Nombre de postes max :</label>
            <Input 
              type="number" 
              min="1"
              // Assure-toi d'avoir maxOpenings dans ton interface Job
              value={job.maxOpenings || ""} 
              onChange={(e) => updateBaseField("maxOpenings", Number(e.target.value))}
              placeholder="Ex: 3"
              className="w-24 bg-background" 
            />
          </div>
        )}
      </section>

      {/* 3. À PROPOS DU POSTE */}
      <AboutTheRoleSection job={job} />

      {/* 4. LIEU */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Lieu</h2>
            <p className="text-sm text-muted-foreground">Les lieux attribués sont affichés sur le site carrières.</p>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" /> Attribuer un lieu
          </Button>
        </div>
      </section>

      {/* 5. MODÈLE DE TRAVAIL */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Modèle de travail</h2>
          <p className="text-sm text-muted-foreground">Les candidats verront le modèle de travail sélectionné sur le site carrières.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <WorkModelCard 
            selected={job.workModel === "ON_SITE"} 
            onClick={() => updateBaseField("workModel", "ON_SITE")}
            icon={<Building2 className="w-5 h-5" />} 
            title="Sur site" 
            desc="Les employés travaillent depuis un espace de travail dédié." 
          />
          <WorkModelCard 
            selected={job.workModel === "REMOTE"} 
            onClick={() => updateBaseField("workModel", "REMOTE")}
            icon={<Globe2 className="w-5 h-5" />} 
            title="À distance" 
            desc="Les employés peuvent travailler de n'importe où." 
          />
          <WorkModelCard 
            selected={job.workModel === "HYBRID"} 
            onClick={() => updateBaseField("workModel", "HYBRID")}
            icon={<Home className="w-5 h-5" />} 
            title="Hybride" 
            desc="Les employés travaillent en partie à distance et en partie au bureau." 
          />
        </div>
      </section>

      {/* 6. DÉTAILS DE L'EMPLOI  */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div>
            <h2 className="text-lg font-bold text-foreground">Détails de l'emploi</h2>
          <p className="text-sm text-muted-foreground">Les détails ci-dessous seront visibles par les candidats sur le site carrières et les sites d'emploi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Type d'emploi</label>
            <select 
              value={job.employmentDetails.type} 
              onChange={(e) => updateEmploymentDetails("type", e.target.value as EmploymentType)} 
              className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Sélectionner</option>
              {Object.entries(EmploymentTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold">Catégorie</label>
            <select 
              value={job.employmentDetails.category} 
              onChange={(e) => updateEmploymentDetails("category", e.target.value as EmploymentCategory)} 
              className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Sélectionner</option>
              {Object.entries(EmploymentCategoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold">Formation requise</label>
            <select 
              value={job.employmentDetails.requiredEducation}
              onChange={(e) => updateEmploymentDetails("requiredEducation", e.target.value as EducationLevel)}
              className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Sélectionner</option>
              {Object.entries(EducationLevelLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Expérience requise</label>
            <select 
              value={job.employmentDetails.requiredExperience}
              onChange={(e) => updateEmploymentDetails("requiredExperience", e.target.value as ExperienceLevel)}
              className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Sélectionner</option>
              {Object.entries(ExperienceLevelLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <label className="text-sm font-semibold">Heures par semaine</label>
            <div className="flex items-center gap-3">
              <Input 
                value={job.employmentDetails.hoursPerWeekMin} 
                onChange={(e) => updateEmploymentDetails("hoursPerWeekMin", Number(e.target.value))}
                className="w-20 bg-background" 
                type="number" min="0" 
              />
              <span className="text-sm text-muted-foreground font-medium">à</span>
              <Input 
                value={job.employmentDetails.hoursPerWeekMax} 
                onChange={(e) => updateEmploymentDetails("hoursPerWeekMax", Number(e.target.value))}
                className="w-20 bg-background" 
                type="number" min="0" 
              />
              <span className="text-sm text-muted-foreground">heures</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SALAIRE */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">Salaire</h2>
          <p className="text-sm text-muted-foreground">La fourchette salariale sera visible par les candidats.</p>
        </div>

        <div className="flex items-end gap-4">
          <div className="space-y-2 w-1/4">
            <label className="text-sm font-semibold flex items-center gap-1">Min</label>
            <Input 
              type="number"
              value={job.salary?.min || ""} 
              onChange={(e) => updateSalary("min", e.target.value ? Number(e.target.value) : null)}
              placeholder="Min" 
            />
          </div>
          <div className="pb-2 text-sm font-medium text-muted-foreground">à</div>
          <div className="space-y-2 w-1/4">
            <label className="text-sm font-semibold flex items-center gap-1">Max</label>
            <Input 
              type="number"
              value={job.salary?.max || ""} 
              onChange={(e) => updateSalary("max", e.target.value ? Number(e.target.value) : null)}
              placeholder="Max" 
            />
          </div>
          <div className="space-y-2 w-1/4">
            <label className="text-sm font-semibold">Période de paie</label>
            <select 
              value={job.salary.period}
              onChange={(e) => updateSalary("period", e.target.value as SalaryPeriod)}
              className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Sélectionner</option>
              {Object.entries(SalaryPeriodLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 w-1/4">
            <label className="text-sm font-semibold">Devise</label>
            <select 
              value={job.salary.currency}
              onChange={(e) => updateSalary("currency", e.target.value as Currency)}
              className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Sélectionner</option>
              {Object.entries(CurrencyLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* BOUTON SUIVANT */}
      <div className="flex justify-end pt-4 pb-8">
        <Button 
          onClick={() => onTabChange("application")}
          className="bg-muted hover:bg-muted/80 text-foreground"
        >
          Candidature <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// Typage strict pour éviter les erreurs TypeScript
interface WorkModelCardProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function WorkModelCard({ selected, onClick, icon, title, desc }: WorkModelCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
        selected 
          ? "border-icon bg-[oklch(0.35_0.04_185)]/10" 
          : "border-border bg-background hover:border-muted-foreground/30"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className={selected ? "text-icon" : "text-muted-foreground"}>
          {icon}
        </div>
        {selected && (
          <div className="w-5 h-5 rounded bg-icon text-background flex items-center justify-center text-xs">
            ✓
          </div>
        )}
      </div>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}