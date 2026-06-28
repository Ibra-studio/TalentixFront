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
    workModel: "ON_SITE",
    status: "PUBLISHED",
    candidatesCount: 150,
    dateCreated: "2026-06-20",
    isFollow: false,
    tags: ["Marketing", "Social Media"],
    limitOpenings: true,
    maxOpenings: 300,
    description: "<p>Nous recherchons un Community Manager talentueux...</p>",
    requirements: "<p>Expérience de 2 ans minimum en gestion de communauté...</p>",
    jobHighlights: "Équipe jeune, locaux en plein centre-ville",
    employmentDetails: {
      type: "CONTRACT",
      category: "Marketing",
      requiredEducation: "BAC_3",
      requiredExperience: "INTERMEDIATE",
      hoursPerWeekMin: 40,
      hoursPerWeekMax: 40
    },
    salary: { min: 7000, max: 10000, period: "MONTHLY", currency: "MAD" },
    applicationForm: [],
    teamIds: ["user-1"],
    workflowStages: ["À trier", "Entretien Téléphonique", "Test Technique", "Offre"]
  },
  {
    id: "JOB-002",
    title: "Responsable RH (Exemple)",
    department: "RH",
    location: "Casablanca",
    workModel: "HYBRID",
    status: "PUBLISHED",
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
      requiredEducation: "BAC_5",
      requiredExperience: "SENIOR",
      hoursPerWeekMin: 40,
      hoursPerWeekMax: 40
    },
    salary: { min: 150000, max: 200000, period: "MONTHLY", currency: "XOF" },
    applicationForm: [],
    teamIds: ["user-1", "user-2"],
    workflowStages: ["Sélection", "Entretien RH", "Entretien Direction", "Engagé"]
  }
];
}

const mockJobs = globalForJobs.mockJobs;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function simulateCreateJobDraft(): Promise<string> {
  await delay(800); 
  const newId = `JOB-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  
  const today = new Date();
  const localDateStr = today.toLocaleDateString("fr-CA");

  const newDraftJob: Job = {
    id: newId,
    title: "Sans titre",
    department: "Marketing",
    location: "",
    workModel: "ON_SITE",
    status: "DRAFT",
    candidatesCount: 0,
    dateCreated: localDateStr,
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
      requiredEducation: "BAC_3",
      requiredExperience: "BEGINNER",
      hoursPerWeekMin: 40,
      hoursPerWeekMax: 40
    },
    salary: { min: null, max: null, period: "MONTHLY", currency: "XOF" },
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

export async function simulateGetJobById(id: string): Promise<Job | undefined> {
  await delay(800); 
  return mockJobs.find((job) => job.id === id);
}

export async function simulateGetAllJobs(): Promise<Job[]> {
  await delay(500);
  return mockJobs;
}