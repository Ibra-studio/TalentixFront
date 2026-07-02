"use server";

import { Organization } from "@/types/organisation";

const globalForOrgs = global as typeof global & {
  mockOrganizations: Organization[];
};

if (!globalForOrgs.mockOrganizations) {
  globalForOrgs.mockOrganizations = [
    {
      id: "ORG-001",
      name: "Tehora",
      slug: "tehora",
      logoUrl: "/images/logos/tehora.png", // À adapter selon ton dossier public
      website: "https://tehora.com",
      industry: "Technologies de l'information",
      location: "Québec, Canada",
      description: "Nous sommes une entreprise dynamique spécialisée dans la transformation numérique et le développement de solutions technologiques innovantes.",
      themeColor: "#FF2B2B", // Rouge Tehora vu sur tes maquettes
      socialLinks: {
        linkedin: "https://linkedin.com/company/tehora",
      },
      contactEmail: "recrutement@tehora.com"
    },
    {
      id: "ORG-002",
      name: "Talentix Africa",
      slug: "talentix-africa",
     
      website: "https://talentix-africa.com",
      industry: "Logiciel SaaS / RH",
      location: "Casablanca, Maroc",
      description: "L'Applicant Tracking System (ATS) pensé pour simplifier et accélérer le recrutement en Afrique.",
    //   themeColor: "#FF2B2B", // Vert lime Talentix
      socialLinks: {
        linkedin: "https://linkedin.com/company/talentix",
        twitter: "https://twitter.com/talentix_africa"
      },
      contactEmail: "hello@talentix-africa.com"
    }
  ];
}

const mockOrganizations = globalForOrgs.mockOrganizations;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function simulateGetOrganizationBySlug(slug: string): Promise<Organization | undefined> {
  await delay(600); // Simulation de latence réseau
  return mockOrganizations.find((org) => org.slug === slug);
}

export async function simulateGetOrganizationById(id: string): Promise<Organization | undefined> {
  await delay(600); 
  return mockOrganizations.find((org) => org.id === id);
}

export async function simulateGetAllOrganizations(): Promise<Organization[]> {
  await delay(400);
  return mockOrganizations;
}