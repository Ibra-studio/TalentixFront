import { Suspense } from "react";
import { simulateGetJobById } from "@/lib/job/JobData";
import { JobEditor } from "@/components/jobs/edit/JobEditor";
import JobEditModalClient from "./JobEditModalClient";
import { Loader2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

// 1. On crée un sous-composant serveur qui gère l'attente des données
async function JobDataLoader({ jobId }: { jobId: string }) {
  const job = await simulateGetJobById(jobId);
  if(!job) {
    console.log("job introuvable")
  }
  return <JobEditor jobId={jobId} initialJob={job ?? null} />;
}

// 2. La page principale qui s'affiche instantanément
export default async function JobEditModal({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; 
  const jobId = resolvedParams.id;

  return (
    // La coquille s'affiche immédiatement
    <JobEditModalClient>
      {/* Suspense prend le relais : il affiche le 'fallback' tant que JobDataLoader n'a pas fini */}
      <Suspense 
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-card">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Spinner className="size-8"/>
              <p className="text-sm">Chargement du poste...</p>
            </div>
          </div>
        }
      >
        <JobDataLoader jobId={jobId} />
      </Suspense>
    </JobEditModalClient>
  );
}