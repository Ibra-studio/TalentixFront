// app/dashboard/page.tsx
import React from "react";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { CandidateChart } from "@/components/charts/CandidateChart";
import { CandidateLists } from "@/components/dashboard/CandidateLists";
import { JobsTags } from "@/components/dashboard/JobTags";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

// N'oublie pas d'importer tes fonctions de simulation
import { simulateGetAllJobs } from "@/lib/job/JobData";
import { simulateGetAllCandidates } from "@/lib/candidate/CandidateData";

export default async function Page() {
  // 1. Récupération globale des données (centralisée)
  const jobs = await simulateGetAllJobs();
  const allCandidates = await simulateGetAllCandidates();

  // 2. Filtrage des candidats
  // (Ajuste les conditions selon les valeurs exactes de ton modèle)
  const nouveauxCandidats = allCandidates.filter(candidate => candidate.status === "Nouveau");
  const candidatsEnRetard = allCandidates.filter(candidate => candidate.status === "En_retard");

  return (
    <DashboardClient>
      <CalendarWidget />
      
      {/* On passe toutes les données pertinentes aux widgets qui en ont besoin */}
      <CandidateChart  />
      
      <CandidateLists 
        // nouveaux={nouveauxCandidats} 
        // enRetard={candidatsEnRetard} 
      />
      
      <JobsTags jobs={jobs} />
      
      <DashboardFooter />
    </DashboardClient>
  );
}