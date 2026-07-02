"use client";

import { useMemo, useState } from "react";
import { DEFAULT_JOB_FILTERS, Job, type JobFiltersState } from "@/types/job";
import { JobsFilters  } from "./JobsFilters";
import JobCard from "./JobCard";


interface JobsSectionProps {
  jobs: Job[];
  companySlug: string; 
}

export function JobsSection({ jobs, companySlug }: JobsSectionProps) {
  const [filters, setFilters] = useState<JobFiltersState>(DEFAULT_JOB_FILTERS);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Recherche par mot-clé (Titre) sécurisée
      const matchesSearch = !filters.search || job.title
        ?.toLowerCase()
        .includes(filters.search.trim().toLowerCase());

      // 2. Modèle de travail
      const matchesWorkType = 
        filters.workType === "all" || job.workModel === filters.workType;

      // 3. Lieu (rendu insensible à la casse)
      const matchesLocation =
        filters.location === "all" ||
        (job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()));

      // 4. Département
      const matchesDepartment =
        filters.department === "all" || job.department === filters.department;

      // 5. Type de contrat (CORRECTION : accès via employmentDetails.type)
      const matchesContract =
        filters.contractType === "all" || job.employmentDetails?.type === filters.contractType;

      return (
        matchesSearch &&
        matchesWorkType &&
        matchesLocation &&
        matchesDepartment &&
        matchesContract
      );
    });
  }, [jobs, filters]);

  return (
    <div className="flex flex-col gap-8">
      <JobsFilters jobs={jobs} filters={filters} onFiltersChange={setFilters} />

      {filteredJobs.length === 0 ? (
        <p className="py-16 text-center" style={{ color: "var(--landing-muted)" }}>
          Aucune offre ne correspond à votre recherche pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} companySlug={companySlug} />
          ))}
        </div>
      )}
    </div>
  );
}