// app/candidates/page.tsx (ajuste le chemin selon ton arborescence)

import { CandidatesClient } from "@/components/candidates/CandidatesClient"
import { simulateGetAllCandidates } from "@/lib/candidate/CandidateData"
import { Candidate } from "@/types/candidate"


export default async function CandidatesPage() {
  // Récupération des données côté serveur
  const candidates = await simulateGetAllCandidates()

  return (
    // Passage des données au composant client
    <CandidatesClient initialCandidates={candidates} />
  )
}