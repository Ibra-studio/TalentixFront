// src/components/dashboard/DashboardClient.tsx (ajuste le chemin si besoin)
"use client";

import React, { useState } from "react";
import { DashboardNav } from "@/components/dashboard/dashboardNav";

export function DashboardClient({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-background">
      {/* Menu horizontal de navigation */}
      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Zone principale de contenu */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
        {activeTab === "overview" ? (
          <>
            {/* Message de salutation */}
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                Bonjour Mamadou Ibrahim 👋
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Voici un aperçu de vos activités de recrutement pour aujourd'hui.
              </p>
            </div>

            {/* C'est ici que tous tes widgets serveurs seront injectés */}
            {children}
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