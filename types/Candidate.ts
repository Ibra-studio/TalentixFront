// types/candidate.ts

export interface Candidate {
  id: string;
  jobId: string; 
  name: string;
  initial: string;
  job: string;   
  status: string;
  stage: string; 
  alert: string | null;
  score: string;
  date: string;
  pool: string;
  avatarColor: string;
  avatarUrl?: string; // Optionnel car on a le fallback avec l'initiale

  // --- Champs spécifiques pour la CandidateCard (Pipeline) ---
  isNew?: boolean;
  timeInStage?: string; 
  notesCount?: number;
  tasksCount?: number;
  location?: string;
}