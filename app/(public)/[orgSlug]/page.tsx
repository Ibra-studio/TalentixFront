import "@/app/landing.css";
import Image from "next/image";

import { simulateGetAllJobs } from "@/lib/job/JobData";
import { simulateGetOrganizationBySlug } from "@/lib/organisation/OrganisationData";
import { JobsSection } from "@/components/careers/JobSection";
import { CareersFooter } from "@/components/careers/CareersFooter";


interface CareersPageProps {
  // 1. On type params comme une Promesse (selon le nom de ton dossier)
  params: Promise<{ orgSlug: string }>; 
}

export default async function CareersPage(props: CareersPageProps) {
  // 2. On "await" les params avant de les déstructurer
  const params = await props.params;
  const { orgSlug } = params;

  // 3. On utilise la bonne variable pour l'appel API
  const [organization, jobs] = await Promise.all([
    simulateGetOrganizationBySlug(orgSlug),
    simulateGetAllJobs(),
  ]);
  
  if (!organization) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Organisation non trouvée</p>
      </div>
    );
  }

  return (
    <div className="landing-root flex min-h-screen flex-col">
      <header
        className="w-full border-b"
        style={{
          borderColor: "var(--landing-border)",
          backgroundColor: "var(--landing-navbar-bg)",
          height: "var(--landing-navbar-h)",
        }}
      >
        <div
          className="mx-auto flex h-full items-center px-6"
          style={{ maxWidth: "var(--landing-max-w)" }}
        >
          {organization.logoUrl ? (
            <Image
              src={organization.logoUrl}
              alt={organization.name}
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-lg font-semibold" style={{ color: "var(--landing-dark)" }}>
              {organization.name}
            </span>
          )}
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto px-6 py-16" style={{ maxWidth: "var(--landing-max-w)" }}>
          <h1
            className="mb-12 text-center text-4xl font-bold md:text-5xl"
            style={{ color: "var(--landing-dark)" }}
          >
            Trouvez votre nouvel Emploi à {organization.name}
          </h1>

          <JobsSection jobs={jobs} companySlug={organization.slug} />
        </div>
      </main>

      <CareersFooter organizationName={organization.name} />
    </div>
  );
}