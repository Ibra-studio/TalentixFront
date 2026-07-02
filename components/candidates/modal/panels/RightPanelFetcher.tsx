import { simulateGetCandidateById } from "@/lib/candidate/CandidateData";
import RightPanelClient from "./RightPanelClient";

interface RightPanelFetcherProps {
  candidateId: string;
}

export default async function RightPanelFetcher({ candidateId }: RightPanelFetcherProps) {
  // 1. On simule un délai de chargement spécifique au panneau de droite
  // (peut être différent du panneau de gauche !)
  await new Promise((resolve) => setTimeout(resolve, 1800));

  // 2. On récupère les données (tu pourrais avoir un fetch spécifique pour les notes/tâches)
  const candidate = await simulateGetCandidateById(candidateId);

  if (!candidate) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-muted-foreground">
        Données d'évaluation introuvables.
      </div>
    );
  }

  // On simule des données d'évaluation supplémentaires qui pourraient venir de la DB
  const evaluationData = {
    assignedDate: "28 Avr 2026",
    assignedLocation: candidate.location || "Amsterdam",
    hiredDate: "29 Avr 2026",
    startDate: "—",
    workLocation: candidate.location || "Amsterdam",
    notes: [
      {
        id: "1",
        authorInitials: "JT",
        authorName: "John the Assistant",
        authorColor: "bg-purple-600",
        timeAgo: "5h",
        text: "Je suis tellement content qu'on l'ait embauché ! Super travail !",
      }
    ]
  };

  return <RightPanelClient candidate={candidate} evaluation={evaluationData} />;
}