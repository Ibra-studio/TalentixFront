// app/(app)/jobs/page.tsx
import { simulateGetAllJobs } from "@/lib/job/JobData";
import  JobsViewWrapper  from "./JobsViewWrapper"; // Un nouveau petit composant client

export default async function JobsPage() {
  // On appelle la Server Action directement ici
  const jobs = await simulateGetAllJobs();

  // On passe la donnée initiale au composant client qui gère l'affichage
  return <JobsViewWrapper initialJobs={jobs} />;
}