
import { AlertCircle } from "lucide-react"; // Optionnel pour l'UI d'erreur
import { LeftPanelClient } from "./LeftPanelClient";
import { simulateGetCandidateById } from "@/lib/candidate/CandidateData";

interface LeftPanelFetcherProps {
  candidateId: string;
}

export default async function LeftPanelFetcher({ candidateId }: LeftPanelFetcherProps) {
  // Appel à notre fausse base de données avec le délai réseau simulé
  const candidate = await simulateGetCandidateById(candidateId);

  // Gestion de l'erreur si l'ID ne correspond à aucun candidat
  if (!candidate) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-3 bg-background p-6 text-muted-foreground">
        <AlertCircle className="size-8 text-destructive/50" />
        <p className="text-sm font-medium">Ce candidat est introuvable.</p>
        <p className="text-xs">Il a peut-être été supprimé ou l'URL est invalide.</p>
      </div>
    );
  }

  // On passe le vrai candidat récupéré au composant client
  return <LeftPanelClient candidate={candidate} />;
}