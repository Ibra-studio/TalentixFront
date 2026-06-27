export interface SalaryRange {
  min: number | null;
  max: number | null;
  period: string; // "Monthly", "Yearly", etc.
  currency: string; // "MAD", "EUR", "XOF", etc.
}

export interface EmploymentDetails {
  type: string; // "Full-time", "Part-time", etc.
  category: string;
  requiredEducation: string;
  requiredExperience: string;
  hoursPerWeekMin: number;
  hoursPerWeekMax: number;
}

export interface ApplicationField {
  id: string;
  label: string;
  type: "text" | "file" | "select" | "boolean";
  required: boolean;
  enabled: boolean;
}

export interface Job {
  // --- Métadonnées globales (Liste & Pipeline) ---
  id: string;
  title: string;
  department: string;
  location: string;
  workModel: string; // "Présentiel", "Télétravail", "Hybride"
  status: "Brouillon" | "Publié" | "Fermé";
  candidatesCount: number;
  dateCreated: string; // Format YYYY-MM-DD pour correspondre à DateOnly / DateTime
  isFollow: boolean;

  // --- 1 & 2. Job Details & Limites ---
  tags: string[];
  limitOpenings: boolean;
  maxOpenings: number | null;

  // --- 3. About the role ---
  description: string;
  requirements: string;
  jobHighlights: string;

  // --- 5 & 6. Détails du contrat & Salaire ---
  employmentDetails: EmploymentDetails;
  salary: SalaryRange;

  // --- Configuration des autres onglets (Application, Team, Workflow) ---
  applicationForm: ApplicationField[];
  teamIds: string[]; // IDs des recruteurs assignés
  workflowStages: string[]; // Liste ordonnée des étapes du Kanban (ex: ["Sourced", "Applied"])
}