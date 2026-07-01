import { CandidatesClient } from '@/components/candidates/CandidatesClient';
import { simulateGetCandidatesByJobId } from '@/lib/candidate/CandidateData';

export default  async function PipelineFilter({ params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const resolvedParams = await params;
//   const resolvedSearchParams = await searchParams;

  const jobId = resolvedParams.id;
  const initialCandidates= await simulateGetCandidatesByJobId(jobId)
  
  return (
    <div className='grid w-full h-fit'>
       <CandidatesClient initialCandidates={initialCandidates}/>
    </div>
  )
}
