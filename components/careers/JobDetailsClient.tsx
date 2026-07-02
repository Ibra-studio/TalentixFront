"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Job, EmploymentTypeLabels, WorkModelLabels, DepartmentLabels } from "@/types/job";
import { Organization } from "@/types/organisation";

interface JobDetailsClientProps {
  job: Job;
  organization: Organization;
}

export function JobDetailsClient({ job, organization }: JobDetailsClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "application">("overview");

  // Couleur de thème de l'entreprise (ou couleur par défaut)
  const themeColor = organization.themeColor || "var(--landing-tag-bg)";

  return (
    <div className="w-full flex flex-col bg-[var(--landing-bg)]">
      
      {/* 1. EN-TÊTE DU JOB (Centré) */}
      <section className="w-full py-12 px-6 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--landing-dark)] mb-4">
          {job.title}
        </h1>
        
        {/* Meta Infos */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--landing-muted)] mb-6">
          <span>{WorkModelLabels[job.workModel] || job.workModel}</span>
          <span>•</span>
          <span>{DepartmentLabels[job.department] || job.department}</span>
          <span>•</span>
          <span>{job.employmentDetails?.type ? EmploymentTypeLabels[job.employmentDetails.type] : ""}</span>
        </div>

        {/* Localisation détaillée (comme sur la maquette) */}
        <div className="text-sm text-[var(--landing-body-text)] leading-relaxed">
          {job.location.split(',').map((loc, idx) => (
            <div key={idx}>{loc.trim()}</div>
          ))}
        </div>
      </section>

      {/* 2. NAVIGATION COLLANTE (Sticky Tabs) */}
      <div className="sticky top-0 z-50 w-full bg-[var(--landing-navbar-bg)] border-y border-[var(--landing-border)] shadow-sm">
        <div className="max-w-3xl mx-auto flex justify-center gap-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-4 text-sm font-bold tracking-wide uppercase transition-colors relative`}
            style={{ 
              color: activeTab === "overview" ? themeColor : "var(--landing-muted)"
            }}
          >
            Aperçu
            {activeTab === "overview" && (
              <span 
                className="absolute bottom-0 left-0 w-full h-0.5" 
                style={{ backgroundColor: themeColor }} 
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("application")}
            className={`py-4 text-sm font-bold tracking-wide uppercase transition-colors relative`}
            style={{ 
              color: activeTab === "application" ? themeColor : "var(--landing-muted)"
            }}
          >
            Candidature
            {activeTab === "application" && (
              <span 
                className="absolute bottom-0 left-0 w-full h-0.5" 
                style={{ backgroundColor: themeColor }} 
              />
            )}
          </button>
        </div>
      </div>

      {/* 3. CONTENU DES ONGLETS */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        {activeTab === "overview" ? (
          <div className="space-y-12 animate-in fade-in duration-500">
            
            {/* Description */}
            <section className="space-y-6">
              <div className="flex justify-between items-center border-b border-[var(--landing-border)] pb-2">
                <h2 className="text-xl font-bold text-[var(--landing-dark)]">Description</h2>
                <button 
                  className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: themeColor }}
                >
                  Partager cette offre d'emploi <Share2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Contenu HTML injecté (Description) */}
              <div 
                className="prose prose-sm md:prose-base max-w-none text-[var(--landing-body-text)] 
                           prose-p:leading-relaxed prose-li:list-disc prose-ul:pl-5"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </section>

            {/* Exigences */}
            {job.requirements && (
              <section className="space-y-6">
                <div className="border-b border-[var(--landing-border)] pb-2">
                  <h2 className="text-xl font-bold text-[var(--landing-dark)]">Exigences</h2>
                </div>
                <div 
                  className="prose prose-sm md:prose-base max-w-none text-[var(--landing-body-text)]
                             prose-p:leading-relaxed prose-li:list-disc prose-ul:pl-5"
                  dangerouslySetInnerHTML={{ __html: job.requirements }}
                />
              </section>
            )}

            {/* Pourquoi nous rejoindre (Job Highlights) */}
            {job.jobHighlights && (
              <section className="space-y-6">
                <div className="border-b border-[var(--landing-border)] pb-2">
                  <h2 className="text-xl font-bold text-[var(--landing-dark)]">Pourquoi se joindre à {organization.name} ?</h2>
                </div>
                <div className="text-[var(--landing-body-text)] leading-relaxed whitespace-pre-wrap">
                  {job.jobHighlights}
                </div>
              </section>
            )}

            {/* Bouton Postuler du bas */}
            <div className="pt-8 flex justify-center">
              <Button 
                onClick={() => setActiveTab("application")}
                className="px-12 py-6 text-white text-base font-bold rounded-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: themeColor }}
              >
                Postuler à cette offre d'emploi
              </Button>
            </div>

          </div>
        ) : (
          <div className="animate-in fade-in duration-500 py-12 text-center">
            {/* ICI VIENDRA TON COMPOSANT DE FORMULAIRE DE CANDIDATURE */}
            <h2 className="text-2xl font-bold text-[var(--landing-dark)] mb-4">Postuler pour : {job.title}</h2>
            <p className="text-[var(--landing-muted)] mb-8">Remplissez le formulaire ci-dessous pour soumettre votre candidature.</p>
            
            <div className="p-12 border border-dashed border-[var(--landing-border)] rounded-xl bg-white text-[var(--landing-muted)]">
              [Le formulaire dynamique de candidature sera intégré ici]
            </div>
          </div>
        )}
      </main>

    </div>
  );
}