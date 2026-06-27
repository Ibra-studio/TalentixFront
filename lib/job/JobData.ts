import { Job } from "@/types/Job";

export const mockJobs: Job[] = [
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
  },
  {
    id: "JOB-002",
    title: "Responsable RH (Exemple)",
    department: "RH",
    location: "En ligne",
    workModel: "Télétravail",
    status: "Publié",
    candidatesCount: 16,
    dateCreated: "2026-06-22",
    isFollow: true,
  },
  {
    id: "JOB-003",
    title: "Developpeur Frontend (Exemple)",
    department: "Developpement",
    location: "En ligne",
    workModel: "Télétravail",
    status: "Brouillon",
    candidatesCount: 5,
    dateCreated: "2026-06-25",
    isFollow:true,
  },
  {
    id: "JOB-004",
    title: "Developpeur Backend (Exemple)",
    department: "Developpement",
    location: "En ligne",
    workModel: "Télétravail",
    status: "Fermé",
    candidatesCount: 5,
    dateCreated: "2026-06-25",
    isFollow:true,
  }
]