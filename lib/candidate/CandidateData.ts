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
      jobId: "JOB-001",
      name: "Ismaïl Diarra", 
      initial: "ID", 
      job: "Community manager (Exemple)", 
      status: "Qualifié", 
      stage: "Offre",
      alert: null, 
      score: "5", 
      date: "il y a 15 jours", 
      pool: "—", 
      avatarColor: "bg-orange-500",
      location: "Bamako",
      avatarUrl: "https://images.unsplash.com/photo-1656313836297-0cd072f08f43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJsYWNrJTIwcHJvZmVzc2lvbm5lbCUyMHBvcnRyYWl0fGVufDB8fDB8fHww",
      // NOUVEAUX CHAMPS POUR LA MODAL
      email: "ismail.diarra@exemple.com",
      phone: "+223 70 00 00 01",
      socials: ["LinkedIn"],
      links: ["github.com/ismaild", "portfolio.com"],
      source: "LinkedIn",
      sourcer: "John the Assistant",
      coverLetter: "En tant que Community Manager passionné avec plus de 4 ans d'expérience, je suis convaincu d'être le candidat idéal pour ce poste. Je suis orienté résultats et j'aime le travail en équipe.\n\nCordialement,\nIsmaïl Diarra",
      createdAt: "13 Avr 2026",
      lastActivityAt: "il y a 2 jours"
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
      avatarUrl: "https://images.unsplash.com/photo-1645736593932-2c877741fd6c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // NOUVEAUX CHAMPS
      email: "emanuel.kone@exemple.com",
      phone: "+223 70 00 00 02",
      socials: [],
      links: [],
      source: "Career Page",
      sourcer: null,
      coverLetter: "Bonjour,\nJe vous soumets ma candidature pour le poste de Community Manager. Je suis très motivé à l'idée de rejoindre votre équipe.\n\nEmanuel Kone",
      createdAt: "12 Avr 2026",
      lastActivityAt: "il y a 4 jours"
    },
    { 
      id: "3", 
      jobId: "JOB-002", 
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
      avatarUrl: "https://images.unsplash.com/photo-1605569184719-8acf480acf51?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // NOUVEAUX CHAMPS
      email: "ibrahim.diabate@exemple.com",
      phone: "+223 70 00 00 03",
      socials: ["LinkedIn", "Twitter"],
      links: [],
      source: "Cooptation",
      sourcer: "Marie HR",
      coverLetter: "Fort de 6 années d'expérience en gestion des ressources humaines, je suis prêt à relever de nouveaux défis au sein de votre entreprise...",
      createdAt: "10 Avr 2026",
      lastActivityAt: "il y a 18 jours"
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
      avatarColor: "bg-orange-600",
      location: "Bamako",
      avatarUrl: undefined,
      // NOUVEAUX CHAMPS
      email: "rokiatou.ibrahim@exemple.com",
      phone: "+223 70 00 00 04",
      socials: [],
      links: [],
      source: "Indeed",
      sourcer: null,
      coverLetter: "Je souhaite vous proposer mes services en tant que Responsable RH. Mon parcours m'a permis d'acquérir une solide expertise...",
      createdAt: "09 Avr 2026",
      lastActivityAt: "il y a 10 jours"
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
      avatarUrl: "https://images.unsplash.com/photo-1636144896336-b056be4a8dfe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cvUrl: "/mocks/cv/Candidate1.pdf",
      cvFileName: "CV_Mariela_Vasquez.pdf",

      // NOUVEAUX CHAMPS

      email: "mariela.vasquez@exemple.com",
      phone: "+223 70 00 00 05",
      socials: ["LinkedIn"],
      links: ["behance.net/mariela"],
      source: "LinkedIn",
      sourcer: "John the Assistant",
      coverLetter: "C'est avec beaucoup d'enthousiasme que je postule à votre offre. Mes compétences créatives sauront mettre en valeur votre marque...",
      createdAt: "09 Avr 2026",
      lastActivityAt: "il y a 19 jours"
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
 */
export async function simulateGetCandidatesByJobId(jobId: string): Promise<Candidate[]> {
  await delay(600);
  return mockCandidates.filter((candidate) => candidate.jobId === jobId);
}

/**
 * Récupère un candidat spécifique via son ID (Pour la Modal)
 */
export async function simulateGetCandidateById(candidateId: string): Promise<Candidate | null> {
  await delay(1200); // Délai un peu plus long pour bien voir le skeleton dans la modal
  const candidate = mockCandidates.find((c) => c.id === candidateId);
  return candidate || null;
}

/**
 * Met à jour le stage (l'étape) d'un candidat.
 */
export async function simulateUpdateCandidateStage(candidateId: string, newStage: string): Promise<Candidate | null> {
  await delay(400);
  
  const candidateIndex = mockCandidates.findIndex(c => c.id === candidateId);
  if (candidateIndex === -1) return null;

  mockCandidates[candidateIndex] = {
    ...mockCandidates[candidateIndex],
    stage: newStage
  };

  return mockCandidates[candidateIndex];
}