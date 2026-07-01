import { PipelineBoard } from "@/components/jobs/pipeline/PipelineBoard";
import PipelineFilter from "@/components/jobs/pipeline/PipelineFilter";
import PipelineHeader from "@/components/jobs/pipeline/PipelineHeader";
import { PipelineTabs } from "@/components/jobs/pipeline/PipelineTabs";
import { simulateGetCandidatesByJobId } from "@/lib/candidate/CandidateData";
import { simulateGetJobById } from "@/lib/job/JobData";
import { PipelineStage } from "@/types/Pipeline";

// 1. On passe l'objet `job` déjà récupéré pour éviter une double requête DB
async function getPipelineData(job: any, jobId: string, status: string): Promise<PipelineStage[]> {
  let candidates = await simulateGetCandidatesByJobId(jobId);

  // Filtrage Qualifié/Disqualifié
  if (status === "disqualifie") {
    
    candidates = candidates.filter(c => c.status.toLowerCase() === "disqualifie");
  } else {
    candidates = candidates.filter(c => c.status.toLowerCase() !== "disqualifie");
  }

  const pipelineStages: PipelineStage[] = job.workflowStages.map((stageName: string) => {
    return {
      id: stageName,
      title: stageName,
      candidates: candidates.filter(c => c.stage === stageName)
    };
  });

  return pipelineStages;
}

export default async function JobPipelinePage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await params; 
  const resolvedSearchParams = await searchParams;

  const jobId = resolvedParams.id;
  const status = (resolvedSearchParams.status as string) || "qualifie";
  const currentTab = (resolvedSearchParams.tab as string)?.toLowerCase() || "pipeline";
  
  // 2. On récupère le Job EN PREMIER (une seule fois)
  const job = await simulateGetJobById(jobId);
  if (!job) return <div className="w-full h-screen flex items-center justify-center"> Ce job n'existe pas</div>

  // 3. Rendu conditionnel optimisé : on ne charge les candidats que si on est sur la pipeline
  const renderTabContent = async () => {
    switch (currentTab) {
      case "pipeline":
        // Appel ciblé uniquement quand c'est nécessaire
        const initialStages = await getPipelineData(job, jobId, status);
        return <PipelineBoard key={status} initialStages={initialStages} jobId={jobId} />;
      case "filtre":
        return <PipelineFilter params={params} searchParams={searchParams}/>;
      case "diffusion":
        return <div className="w-full h-full flex items-center justify-center text-gray-400">Gérer la diffusion de l'offre ici...</div>;
      case "activité":
        return <div className="w-full h-full flex items-center justify-center text-gray-400">Historique des activités...</div>;
      case "notes":
        return <div className="w-full h-full flex items-center justify-center text-gray-400">Notes de l'équipe...</div>;
      case "fichiers":
        return <div className="w-full h-full flex items-center justify-center text-gray-400">Fichiers joints au poste...</div>;
      case "rapports":
        return <div className="w-full h-full flex items-center justify-center text-gray-400">Rapports et statistiques...</div>;
      default:
        // Fallback
        const defaultStages = await getPipelineData(job, jobId, status);
        return <PipelineBoard initialStages={defaultStages} jobId={jobId} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-white overflow-hidden">
      <div className="px-6 py-4 w-full flex flex-col gap-6">
       <PipelineHeader job={job}/>
       <PipelineTabs />
      </div>
      <div className="grid h-full px-6">
        {/* Note: Il faudra peut-être mettre à jour le Board ou un autre composant selon l'onglet actif si l'utilisateur n'est plus sur "Pipeline" */}
        {await renderTabContent()}
      </div>
    </div>
  );
}