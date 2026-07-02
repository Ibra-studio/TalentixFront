import CandidateModalClient from "@/components/candidates/modal/CandidateModalClient";
import LeftPanelFetcher from "@/components/candidates/modal/LeftPanelFetcher";
import { LeftPanelSkeleton } from "@/components/candidates/modal/LeftPanelSkeleton";
import { Suspense } from "react";


function RightPanelFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted/10 p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground italic">Chargement des évaluations...</p>
      </div>
    </div>
  );
}

export default async function CandidateModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const candidateId = resolvedParams.id;

  return (
    <CandidateModalClient>
      <div className="w-[60%] h-full flex flex-col bg-background relative overflow-hidden border-r border-border">
        <Suspense fallback={<LeftPanelSkeleton />}>
          <LeftPanelFetcher candidateId={candidateId} />
        </Suspense>
      </div>

      <div className="w-[40%] h-full bg-muted/20 relative">
        <Suspense fallback={<RightPanelFallback />}>
           <div className="p-8 text-muted-foreground text-center mt-20">
             Le panneau de droite chargera ses propres données ici.
           </div>
        </Suspense>
      </div>
    </CandidateModalClient>
  );
}