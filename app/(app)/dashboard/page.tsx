"use client";

import React, { useState } from "react";
import { DashboardNav } from "@/components/dashboard/dashboardNav";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { CandidateChart } from "@/components/charts/CandidateChart";
import { CandidateLists } from "@/components/dashboard/CandidateLists";
import { JobsTags } from "@/components/JobTags";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

export default function Page() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-background">
      {/* Menu horizontal de navigation */}
      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Zone principale de contenu */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
        {activeTab === "overview" ? (
          <>
            {/* Message de salutation personnalisé */}
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                Bonjour Mamadou Ibrahim 👋
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Voici un aperçu de vos activités de recrutement pour aujourd'hui.
              </p>
            </div>

            {/* Widget Calendrier & Bannière de connexion */}
            <CalendarWidget />

            {/* Graphique analytique d'acquisition */}
            <CandidateChart />

            {/* Grille : Nouveaux Candidats & Retards de traitement */}
            <CandidateLists />

            {/* Grille : Offres d'emploi & Tags/Sources */}
            <JobsTags />

            {/* Pied de page informatif et onboarding */}
            <DashboardFooter />
          </>
        ) : (
          /* Conteneur temporaire pour les autres onglets du menu */
          <div className="flex items-center justify-center min-h-[400px] border border-dashed rounded-xl bg-card">
            <p className="text-sm text-muted-foreground font-medium">
              L'interface pour l'onglet "{activeTab}" sera configurée prochainement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}