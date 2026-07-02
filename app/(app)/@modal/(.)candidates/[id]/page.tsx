import CandidateModalClient from "@/components/candidates/modal/CandidateModalClient";
import LeftPanelFetcher from "@/components/candidates/modal/panels/LeftPanelFetcher";
import { Suspense } from "react";
import { RightPanelSkeleton } from "@/components/candidates/modal/panels/RightPanelSkeleton";
import RightPanelFetcher from "@/components/candidates/modal/panels/RightPanelFetcher";
import { LeftPanelSkeleton } from "@/components/candidates/modal/panels/LeftPanelSkeleton";



export default async function CandidateModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const candidateId = resolvedParams.id;

  return (
    <CandidateModalClient>
      <div className="flex h-full">
        <div className="w-[60%] h-full flex flex-col bg-background relative overflow-hidden border-r border-border">
          <Suspense fallback={<LeftPanelSkeleton />}>
            <LeftPanelFetcher candidateId={candidateId} />
          </Suspense>
        </div>

        {/* Panneau de DROITE (40%) */}
        <div className="w-[40%] h-full bg-muted/20 relative overflow-hidden">
          <Suspense fallback={<RightPanelSkeleton />}>
            <RightPanelFetcher candidateId={candidateId} />
          </Suspense>
        </div>
      </div>
    </CandidateModalClient>
  );
}