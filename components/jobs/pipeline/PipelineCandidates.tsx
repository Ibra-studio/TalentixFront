import { PipelineCandidatesClient } from './PipelineCandidatesClient';
import { simulateGetCandidatesByJobId } from '@/lib/candidate/CandidateData';

export default async function PipelineCandidates({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await params;
  const jobId = resolvedParams.id;
  
  // Récupération des données côté serveur
  const initialCandidates = await simulateGetCandidatesByJobId(jobId);
  
  return (
    <div className='w-full h-fit flex flex-col'>
       <PipelineCandidatesClient initialCandidates={initialCandidates}/>
    </div>
  )
}