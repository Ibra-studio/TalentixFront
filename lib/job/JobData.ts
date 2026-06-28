"use server";


import { Job } from "@/types/Job";

const globalForJobs = global as typeof global & {
  mockJobs: Job[];
};

if(!globalForJobs.mockJobs){
    globalForJobs.mockJobs= [
  {
    id: "JOB-001",
    title: "Community manager (Exemple)",
    department: "Marketing",
    location: "Casablanca",
    workModel: "Présentiel",
    status: "Publié",
    candidatesCount: 150,
    dateCreated: "2026-06-20",
    isFollow: false,
    tags: ["Marketing", "Social Media"],
    limitOpenings: false,
    maxOpenings: null,
    description: "<p>Nous recherchons un Community Manager talentueux...</p>",
    requirements: "<p>Expérience de 2 ans minimum en gestion de communauté...</p>",
    jobHighlights: "Équipe jeune, locaux en plein centre-ville",
    employmentDetails: {
      type: "CONTRACT",
      category: "Marketing",
      requiredEducation: "Bac+3 / Licence",
      requiredExperience: "Confirmé (2-5 ans)",
      hoursPerWeekMin: 40,
      hoursPerWeekMax: 40
    },
    salary: { min: 7000, max: 10000, period: "Mensuel", currency: "MAD" },
    applicationForm: [],
    teamIds: ["user-1"],
    workflowStages: ["À trier", "Entretien Téléphonique", "Test Technique", "Offre"]
  },
  {
    id: "JOB-002",
    title: "Responsable RH (Exemple)",
    department: "RH",
    location: "Casablanca",
    workModel: "Hybride",
    status: "Publié",
    candidatesCount: 16,
    dateCreated: "2026-06-22",
    isFollow: true,
    tags: ["RH", "Management"],
    limitOpenings: true,
    maxOpenings: 1,
    description: "<p>Supervision complète des processus RH...</p>",
    requirements: "<p>Master en Ressources Humaines ou équivalent...</p>",
    jobHighlights: "Flexibilité horaire, couverture médicale premium",
    employmentDetails: {
      type: "FULL_TIME",
      category: "RH",
      requiredEducation: "Bac+5 / Master",
      requiredExperience: "Senior (+5 ans)",
      hoursPerWeekMin: 40,
      hoursPerWeekMax: 40
    },
    salary: { min: 15000, max: 20000, period: "Mensuel", currency: "MAD" },
    applicationForm: [],
    teamIds: ["user-1", "user-2"],
    workflowStages: ["Sélection", "Entretien RH", "Entretien Direction", "Engagé"]
  }
];
}

const mockJobs=globalForJobs.mockJobs




const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simuler le POST : Création d'un brouillon avec Initialisation complète
export async function simulateCreateJobDraft(): Promise<string> {
  await delay(800); 
  const newId = `JOB-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  
  // Génération de la date du jour locale au format YYYY-MM-DD
  const today = new Date();
  const localDateStr = today.toLocaleDateString("fr-CA"); // Génère "YYYY-MM-DD" de manière fiable

  const newDraftJob: Job = {
    id: newId,
    title: "Sans titre",
    department: "",
    location: "",
    workModel: "Présentiel",
    status: "Brouillon",
    candidatesCount: 0,
    dateCreated: localDateStr, // Date locale dynamique
    isFollow: false,
    tags: ["Exemple",""],
    limitOpenings: false,
    maxOpenings: null,
    description: "",
    requirements: "",
    jobHighlights: "",
    employmentDetails: {
      type: "FULL_TIME",
      category: "Tech",
      requiredEducation: "",
      requiredExperience: "",
      hoursPerWeekMin: 40,
      hoursPerWeekMax: 40
    },
    salary: { min: null, max: null, period: "Select", currency: "Select" },
    applicationForm: [
      { id: "f1", label: "Nom complet", type: "text", required: true, enabled: true },
      { id: "f2", label: "Email", type: "text", required: true, enabled: true },
      { id: "f3", label: "CV", type: "file", required: true, enabled: true }
    ],
    teamIds: [],
    workflowStages: ["Sourced", "Applied", "Interview", "Hired"]
  };

  mockJobs.push(newDraftJob);
  return newId;
}

// Simuler le GET : Récupérer un job par son ID
export async function simulateGetJobById(id: string): Promise<Job | undefined> {
  await delay(800); 
  console.log("Recherche de l'ID:", id); // AJOUTE CECI
  console.log("Dans le tableau:", mockJobs.map(j => j.id)); // AJOUTE CECI
  return mockJobs.find((job) => job.id === id);
}
export async function simulateGetAllJobs(): Promise<Job[]> {
  await delay(500);
  
  return mockJobs;
}