import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Bookmark } from "lucide-react";
import { EmploymentTypeLabels, Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  companySlug: string;
}

export default function JobCard({ job, companySlug }: JobCardProps) {
  return (
    <div className="group relative bg-white border border-[var(--landing-border)] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-[var(--landing-dark)] flex flex-col gap-4">
      
      {/* En-tête de la carte */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-[var(--landing-dark)] group-hover:text-[var(--landing-tag-bg)] transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-[var(--landing-muted)] mt-1">
            Publié il y a {job.dateCreated || "2 jours"}
          </p>
        </div>
        <div className="text-sm font-medium text-[var(--landing-body-text)] text-right">
          <span>{job.department}</span> • <span>{job.location}</span> • <span>
            {job.employmentDetails?.type ? EmploymentTypeLabels[job.employmentDetails.type] : "Type non précisé"}
          </span>
        </div>
      </div>

      {/* Description courte */}
      <p className="text-[var(--landing-body-text)] text-sm line-clamp-2">
        Rejoignez notre équipe pour participer à des projets innovants et façonner l'avenir de notre entreprise.
      </p>

      {/* Zone d'action (Bouton Postuler affiché au hover) */}
      <div className="mt-4 flex items-center justify-between h-10">
        <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link href={`/${companySlug}/jobs/${job.id}`}>
            <Button className="bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-[var(--landing-dark)] border border-[var(--landing-button-border)] rounded-full px-6">
              Postuler <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <Button variant="ghost" size="icon" className="text-[var(--landing-muted)] hover:text-[var(--landing-dark)]">
          <Bookmark className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}