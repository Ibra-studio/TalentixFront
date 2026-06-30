
import { PipelineBoard } from "@/components/jobs/pipeline/PipelineBoard";
import PipelineHeader from "@/components/jobs/pipeline/PipelineHeader";
import { PipelineTabs } from "@/components/jobs/pipeline/PipelineTabs";
import { simulateGetCandidatesByJobId } from "@/lib/candidate/CandidateData";
import { simulateGetJobById } from "@/lib/job/JobData";
import { PipelineStage } from "@/types/Pipeline";


// Simulation de l'appel API ou DB
async function getPipelineData(jobId: string): Promise<PipelineStage[]> {
  const job = await simulateGetJobById(jobId);
  const candidates = await simulateGetCandidatesByJobId(jobId);

  console.log(job)
  if (!job) throw new Error("Job non trouvé");

  // On construit les colonnes dynamiquement basées sur les workflowStages du Job
  const pipelineStages: PipelineStage[] = job.workflowStages.map((stageName) => {
    return {
      id: stageName, // On utilise le nom comme ID pour simplifier
      title: stageName,
      // On filtre les candidats qui appartiennent à cette colonne
      candidates: candidates.filter(c => c.stage === stageName)
    };
  });

  return pipelineStages;
}

export default async function JobPipelinePage({ params }: { params: { id: string } }) {
  const resolvedParams = await params; 
  const jobId = resolvedParams.id;
  const initialStages = await getPipelineData(jobId);
  const job=await simulateGetJobById(jobId)
  if(!job) return <div className="w-full h-screen flex items-center justify-center"> Ce job n'existe pas</div>

  return (
    <div className="flex flex-col h-screen bg-background text-white overflow-hidden">
      {/* Ligne de chargement (Simulée avec CSS) */}
      {/* <div className="h-1 w-full bg-brand animate-pulse" /> */}
      
      <div className="px-6 py-4 w-full flex flex-col gap-6">
       <PipelineHeader job={job}/>
        <PipelineTabs />
      </div>

      {/* Wrapper Client pour le Drag & Drop */}
      <div className="grid h-full px-6">
      <PipelineBoard initialStages={initialStages} jobId={jobId} />
      </div>
    </div>
  );
}