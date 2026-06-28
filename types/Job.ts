export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
export type EmploymentCategory = "RH" | "Marketing" | "Tech" | "Commercial" | "Finance";
export type WorkModel = "ON_SITE" | "REMOTE" | "HYBRID";
export type JobStatus = "DRAFT" | "PUBLISHED" | "CLOSED";
export type Department = "RH" | "Marketing" | "Tech" | "Commercial" | "Finance" | "Operations" ;
export type EducationLevel = "NONE" | "BAC" | "BAC_2" | "BAC_3" | "BAC_5" | "ENGINEER" | "PHD";
export type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "SENIOR" | "EXPERT";
export type SalaryPeriod = "HOURLY" | "MONTHLY" | "YEARLY" ;
export type Currency = "MAD" | "EUR" | "USD" | "XOF" ;

// --- Dictionnaires de Labels (Pour l'affichage UI) ---

export const EmploymentTypeLabels: Record<EmploymentType, string> = {
  FULL_TIME: "Temps plein, CDI",
  PART_TIME: "Temps partiel",
  CONTRACT: "CDD",
  INTERNSHIP: "Stage",
  FREELANCE: "Freelance / Consultant",
};

export const EmploymentCategoryLabels: Record<EmploymentCategory, string> = {
  RH: "Recrutement & RH",
  Marketing: "Marketing & Communication",
  Tech: "Ingénierie & Tech",
  Commercial: "Vente & Commercial",
  Finance: "Administration & Finance",
};

export const DepartmentLabels: Record<Department, string> = {
  RH: "Ressources Humaines",
  Marketing: "Marketing",
  Tech: "Technologie / IT",
  Commercial: "Commercial / Vente",
  Finance: "Finance",
  Operations: "Opérations",
};

export const EducationLevelLabels: Record<EducationLevel,string > = {
  NONE: "Aucun diplôme requis",
  BAC: "Baccalauréat",
  BAC_2: "Formation professionnelle / Technicien (Bac+2)",
  BAC_3: "Licence (Bac+3)",
  BAC_5: "Master (Bac+5)",
  ENGINEER: "Diplôme d'Ingénieur",
  PHD: "Doctorat",
};

export const ExperienceLevelLabels: Record<ExperienceLevel,string> = {
  BEGINNER: "Débutant (0-2 ans)",
  INTERMEDIATE: "Intermédiaire (2-5 ans)",
  SENIOR: "Sénior (5-10 ans)",
  EXPERT: "Expert (10+ ans)",
};

export const SalaryPeriodLabels: Record<SalaryPeriod,string> = {
  HOURLY: "Horaire",
  MONTHLY: "Mensuelle",
  YEARLY: "Annuelle",
};

export const CurrencyLabels: Record<Currency, string> = {
  MAD: "MAD (DH)",
  EUR: "EUR (€)",
  USD: "USD ($)",
  XOF: "XOF (CFA)",
};

// --- Interfaces ---

export interface SalaryRange {
  min: number | null;
  max: number | null;
  period: SalaryPeriod;
  currency: Currency;
}

export interface EmploymentDetails {
  type: EmploymentType;
  category: EmploymentCategory;
  requiredEducation: EducationLevel;
  requiredExperience: ExperienceLevel;
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
  id: string;
  title: string;
  department: Department;
  location: string;
  workModel: WorkModel;
  status: JobStatus;
  candidatesCount: number;
  dateCreated: string; 
  isFollow: boolean;
  tags: string[];
  limitOpenings: boolean;
  maxOpenings: number | null;
  description: string;
  requirements: string;
  jobHighlights: string;
  employmentDetails: EmploymentDetails;
  salary: SalaryRange;
  applicationForm: ApplicationField[];
  teamIds: string[];
  workflowStages: string[];
}