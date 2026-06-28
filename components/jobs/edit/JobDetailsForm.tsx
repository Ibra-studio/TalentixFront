"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Pencil, ArrowRight, Building2, Globe2, Home, CircleHelp } from "lucide-react";
import { AboutTheRoleSection } from "@/components/jobs/edit/AboutTheRoleSection";
import { EmploymentCategory, EmploymentCategoryLabels, EmploymentType, EmploymentTypeLabels, Job } from "@/types/Job";
import { Spinner } from "@/components/ui/spinner";

export function JobDetailsForm({  initialJob  }: {initialJob:Job}) {
  const router = useRouter();
  const [workModel, setWorkModel] = useState<"on-site" | "remote" | "hybrid">("on-site");
// On crée un état local avec la valeur initiale reçue du serveur
const [job, setJob] = useState<Job>(initialJob);


  const handleEmploymentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as EmploymentType;

    setJob((prev) => ({
      ...prev,
      employmentDetails: {
        ...prev.employmentDetails,
        type: newType,
      },
    }));
  };
  const handleEmploymentCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as EmploymentCategory;

    setJob((prev) => ({
      ...prev,
      employmentDetails: {
        ...prev.employmentDetails,
        category: newType,
      },
    }));
  };
  // Sécurité si job est null après chargement
  if (!job) {
    return <div>Erreur lors du chargement du job.</div>;
  }




  return (
    <div className="space-y-8">
      
      {/* 1. INFORMATIONS DE BASE */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Informations de base</h2>
            <p className="text-sm text-muted-foreground">Définissez les informations de base du poste.</p>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">
            <Pencil className="w-3 h-3 mr-2" /> Gérer les champs
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Titre du poste</label>
            <Input defaultValue={job.title==="Sans titre" ? "Sans titre"  :job.title} className="bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Département</label>
            <select className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option>Sélectionner</option>
              <option>Marketing</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Tags</label>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1 font-normal bg-muted">
              Exemple <X className="w-3 h-3 cursor-pointer" />
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 font-normal bg-muted">
              Intermédiaire <X className="w-3 h-3 cursor-pointer" />
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 font-normal bg-muted">
              À distance <X className="w-3 h-3 cursor-pointer" />
            </Badge>
            <Button variant="outline" size="icon" className="h-6 w-6 rounded-md">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* SECTION UTILISATION INTERNE */}
        <div className="pt-6 mt-6 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Pour utilisation interne
          </p>
          <div className="w-1/2 pr-3">
            <label className="text-sm font-semibold mb-2 block">Priorité</label>
            <select className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option>Sélectionner</option>
              <option>Haute</option>
              <option>Moyenne</option>
              <option>Basse</option>
            </select>
          </div>
        </div>
      </section>

      {/* 2. LIMITER LES OUVERTURES DE POSTE */}
      <section className="bg-card border border-border rounded-xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Switch id="limit-openings" /> Limiter le nombre d'ouvertures de poste
          </h2>
          <p className="text-sm text-muted-foreground mt-1 ml-11">
            Atteindre la limite d'ouvertures bloquera les futures embauches.
          </p>
        </div>
      </section>

      {/* 3. À PROPOS DU POSTE */}
      <AboutTheRoleSection />

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
        
        <div className="flex items-center justify-between border border-border rounded-lg p-4 bg-background">
          <div>
            <p className="font-semibold text-sm">Amsterdam</p>
            <p className="text-xs text-muted-foreground">Pays-Bas, Hollande-Septentrionale, Amsterdam</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><X className="w-4 h-4" /></Button>
          </div>
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
            selected={workModel === "on-site"} 
            onClick={() => setWorkModel("on-site")}
            icon={<Building2 className="w-5 h-5" />} 
            title="Sur site" 
            desc="Les employés travaillent depuis un espace de travail dédié." 
          />
          <WorkModelCard 
            selected={workModel === "remote"} 
            onClick={() => setWorkModel("remote")}
            icon={<Globe2 className="w-5 h-5" />} 
            title="À distance" 
            desc="Les employés peuvent travailler de n'importe où." 
          />
          <WorkModelCard 
            selected={workModel === "hybrid"} 
            onClick={() => setWorkModel("hybrid")}
            icon={<Home className="w-5 h-5" />} 
            title="Hybride" 
            desc="Les employés travaillent en partie à distance et en partie au bureau." 
          />
        </div>
      </section>

   
     {/* 6. DÉTAILS DE L'EMPLOI */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">Détails de l'emploi</h2>
          <p className="text-sm text-muted-foreground">Les détails ci-dessous seront visibles par les candidats sur le site carrières et les sites d'emploi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Première rangée */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Type d'emploi</label>
            <select value={job.employmentDetails.type} onChange={handleEmploymentTypeChange}  className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
             {Object.entries(EmploymentTypeLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                    {label}
                    </option>
                ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold">Catégorie</label>
            <select value={job.employmentDetails.category}  onChange={handleEmploymentCategoryChange} className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              {Object.entries(EmploymentCategoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                    {label}
                    </option>
                ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold">Formation requise</label>
            <select 
              className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              defaultValue="Licence (Bac+3)"
            >
              <option>Aucun diplôme requis</option>
              <option>Baccalauréat</option>
              <option>Formation professionnelle / Technicien (Bac+2)</option>
              <option>Licence (Bac+3)</option>
              <option>Master (Bac+5)</option>
              <option>Diplôme d'Ingénieur</option>
              <option>Doctorat</option>
            </select>
          </div>

          {/* Deuxième rangée */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Expérience requise</label>
            <select 
              className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              defaultValue="Intermédiaire"
            >
              <option>Débutant (0-2 ans)</option>
              <option>Intermédiaire (2-5 ans)</option>
              <option>Sénior (5-10 ans)</option>
              <option>Expert (10+ ans)</option>
            </select>
          </div>
          
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <label className="text-sm font-semibold">Heures par semaine</label>
            <div className="flex items-center gap-3">
              <Input defaultValue="40" className="w-20 bg-background" type="number" min="0" />
              <span className="text-sm text-muted-foreground font-medium">à</span>
              <Input defaultValue="40" className="w-20 bg-background" type="number" min="0" />
              <span className="text-sm text-muted-foreground">heures</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SALAIRE */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">Salaire</h2>
          <p className="text-sm text-muted-foreground">
            La fourchette salariale sera visible par les candidats sur le site carrières et les sites d'emploi.
          </p>
        </div>

        <div className="flex items-end gap-4">
          <div className="space-y-2 w-1/4">
            <label className="text-sm font-semibold flex items-center gap-1">
              Min <CircleHelp className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
            </label>
            <Input placeholder="Min" />
          </div>
          <div className="pb-2 text-sm font-medium text-muted-foreground">
            à
          </div>
          <div className="space-y-2 w-1/4">
            <label className="text-sm font-semibold flex items-center gap-1">
              Max <CircleHelp className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
            </label>
            <Input placeholder="Max" />
          </div>
          <div className="space-y-2 w-1/4">
            <label className="text-sm font-semibold">Période de paie</label>
            <select className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option>Sélectionner</option>
              <option>Annuelle</option>
              <option>Mensuelle</option>
              <option>Horaire</option>
            </select>
          </div>
          <div className="space-y-2 w-1/4">
            <label className="text-sm font-semibold">Devise</label>
            <select className="w-full flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option>Sélectionner</option>
              <option>EUR (€)</option>
              <option>MAD (DH)</option>
              <option>XOF (CFA)</option>
              <option>USD ($)</option>
            </select>
          </div>
        </div>
      </section>

      {/* BOUTON SUIVANT */}
      <div className="flex justify-end pt-4 pb-8">
        <Button 
          onClick={() => router.push(`?tab=application`)}
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

// Composant utilitaire pour les cartes "Work Model"
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