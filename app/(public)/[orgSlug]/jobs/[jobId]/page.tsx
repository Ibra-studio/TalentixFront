import "@/app/landing.css";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { simulateGetOrganizationBySlug } from "@/lib/organisation/OrganisationData";
import { simulateGetJobById } from "@/lib/job/JobData";
import { JobDetailsClient } from "@/components/careers/JobDetailsClient";
import { CareersFooter } from "@/components/careers/CareersFooter";

interface JobPageProps {
  params: Promise<{ orgSlug: string; jobId: string }>;
}

export default async function JobPage(props: JobPageProps) {
  // 1. Extraction des paramètres de l'URL
  const params = await props.params;
  const { orgSlug, jobId } = params;

  // 2. Fetch des données en parallèle
  const [organization, job] = await Promise.all([
    simulateGetOrganizationBySlug(orgSlug),
    simulateGetJobById(jobId),
  ]);

  // 3. Gestion des erreurs 404
  if (!organization || !job) {
    notFound(); // Redirige vers la page 404 par défaut de Next.js
  }

  return (
    <div className="landing-root min-h-screen flex flex-col bg-[var(--landing-bg)]">
      
      {/* HEADER SIMPLE (Centré comme sur la maquette Workable) */}
      <header className="w-full bg-[var(--landing-navbar-bg)] py-6 flex justify-center items-center border-b border-[var(--landing-border)]">
        <Link href={`/${orgSlug}`} className="flex items-center gap-2">
          {organization.logoUrl ? (
            <Image
              src={organization.logoUrl}
              alt={`Logo ${organization.name}`}
              width={150}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-2xl font-black text-[var(--landing-dark)] tracking-tight uppercase">
              {organization.name}
            </span>
          )}
        </Link>
      </header>

      {/* CONTENU PRINCIPAL (Client Component) */}
      <div className="flex-1 flex flex-col">
        <JobDetailsClient job={job} organization={organization} />
      </div>

      {/* FOOTER */}
      <CareersFooter organizationName={organization.name} />
      
    </div>
  );
}