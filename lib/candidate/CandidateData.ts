// data/CandidateData.ts
"use server";

import { Candidate } from "@/types/candidate";

// Pattern pour conserver les données en mémoire pendant le développement
const globalForCandidates = global as typeof global & {
  mockCandidates: Candidate[];
};

if (!globalForCandidates.mockCandidates) {
  globalForCandidates.mockCandidates = [
    { 
      id: "1", 
      jobId: "JOB-001", // Lié au Community Manager
      name: "Ismaïl Diarra", 
      initial: "ID", 
      job: "Community manager (Exemple)", 
      status: "Qualifié", 
      stage: "Offre", // Doit correspondre aux workflowStages du Job
      alert: null, 
      score: "5", 
      date: "il y a 15 jours", 
      pool: "—", 
      avatarColor: "bg-orange-500" ,
      location: "Bamako",
      avatarUrl:"https://images.unsplash.com/photo-1656313836297-0cd072f08f43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJsYWNrJTIwcHJvZmVzc2lvbm5lbCUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
    },
    { 
      id: "2", 
      jobId: "JOB-001", 
      name: "Emanuel Kone", 
      initial: "EK", 
      job: "Community manager (Exemple)", 
      status: "Qualifié", 
      stage: "Entretien Téléphonique", 
      alert: null, 
      score: "5", 
      date: "il y a 16 jours", 
      pool: "Marketing Pool", 
      avatarColor: "bg-amber-600",
      location: "Bamako",
      avatarUrl:"https://images.unsplash.com/photo-1645736593932-2c877741fd6c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      id: "3", 
      jobId: "JOB-002", // Lié au Responsable RH
      name: "Ibrahim Diabate", 
      initial: "ID", 
      job: "Responsable RH (Exemple)", 
      status: "Nouveau", 
      stage: "Sélection", 
      alert: null, 
      score: "-", 
      date: "il y a 18 jours", 
      pool: "—", 
      avatarColor: "bg-blue-500",
      location: "Bamako",
      avatarUrl:"https://images.unsplash.com/photo-1605569184719-8acf480acf51?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      id: "4", 
      jobId: "JOB-002", 
      name: "Rokiatou ibrahim", 
      initial: "RI", 
      job: "Responsable RH (Exemple)", 
      status: "En retard", 
      stage: "Entretien RH", 
      alert: "-1j", 
      score: "-", 
      date: "il y a 19 jours", 
      pool: "—", 
      avatarColor: "bg-orange-600" ,
      location: "Bamako"
    },
    { 
      id: "5", 
      jobId: "JOB-001", 
      name: "Mariela Vasquez", 
      initial: "MV", 
      job: "Community manager (Exemple)", 
      status: "Disqualifie", 
      stage: "Test Technique", 
      alert: null, 
      score: "4", 
      date: "il y a 19 jours", 
      pool: "—", 
      avatarColor: "bg-pink-600",
      location: "Bamako",
      avatarUrl:"https://images.unsplash.com/photo-1636144896336-b056be4a8dfe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];
}

const mockCandidates = globalForCandidates.mockCandidates;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- FONCTIONS DE FETCH ---

/**
 * Récupère absolument tous les candidats de la plateforme.
 */
export async function simulateGetAllCandidates(): Promise<Candidate[]> {
  await delay(600);
  return mockCandidates;
}

/**
 * Récupère uniquement les candidats postulant à un job précis.
 * C'est cette fonction qui sera appelée dans ton JobPipelinePage.
 */
export async function simulateGetCandidatesByJobId(jobId: string): Promise<Candidate[]> {
  await delay(600);
  return mockCandidates.filter((candidate) => candidate.jobId === jobId);
}

/**
 * Met à jour le stage (l'étape) d'un candidat.
 * Très utile pour l'action de Drag & Drop dans la pipeline.
 */
export async function simulateUpdateCandidateStage(candidateId: string, newStage: string): Promise<Candidate | null> {
  await delay(400); // Latence réseau simulée
  
  const candidateIndex = mockCandidates.findIndex(c => c.id === candidateId);
  if (candidateIndex === -1) return null;

  // Mise à jour de la donnée
  mockCandidates[candidateIndex] = {
    ...mockCandidates[candidateIndex],
    stage: newStage
  };

  return mockCandidates[candidateIndex];
}

// --- FONCTIONS UTILITAIRES UI ---

