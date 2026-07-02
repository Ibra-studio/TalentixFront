"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Department, EmploymentTypeLabels, Job, JobFiltersState, WorkModel, WorkModelLabels } from "@/types/job";


interface JobsFiltersProps {
  jobs: Job[];
  filters: JobFiltersState;
  onFiltersChange: (filters: JobFiltersState) => void;
}

export function JobsFilters({ jobs, filters, onFiltersChange }: JobsFiltersProps) {
  const locations = Array.from(
    new Set(jobs.map((job) => job.location).filter((value): value is string => typeof value === "string" && value.trim().length > 0))
  ).sort();

  const departments = Array.from(
    new Set(jobs.map((job) => job.department).filter((value): value is Department => typeof value === "string" && value.trim().length > 0))
  ).sort();

  const contractTypes = Array.from(
    new Set(
      jobs
        .map((job) => job.employmentDetails?.type)
        .filter((value): value is NonNullable<Job["employmentDetails"]["type"]> => typeof value === "string" && value.trim().length > 0)
    )
  ).sort();

  const workTypes = Array.from(
    new Set(jobs.map((job) => job.workModel).filter((value): value is WorkModel => typeof value === "string" && value.trim().length > 0))
  ).sort();

  const update = (key: keyof JobFiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
          style={{ color: "var(--landing-muted)" }}
        />
        <Input
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          placeholder="Recherche d'offres d'emploi..."
          className="h-12 rounded-[13px] border pl-11 border-black"
          style={{
            borderColor: "var(--landing-bor)",
            backgroundColor: "var(--landing-navbar-bg)",
            color: "var(--landing-dark)",
          }}
        />
      </div>

      <div className="grid  grid-cols-4 gap-3 md:grid-cols-4">
        <Select value={filters.workType} onValueChange={(v) => update("workType", v)}>
          <SelectTrigger className="h-11  w-full border border-black! bg-white!" style={{ borderColor: "var(--landing-border)" }}>
            <SelectValue placeholder="Type de lieu de travail" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border border-black/20">
            <SelectGroup>
                  <SelectLabel>Type de lieu de travail</SelectLabel>
                  <SelectItem value="all" className="hover:bg-[var(--landing-accent)]">
                    Tous les types de travail
                  </SelectItem>
                  {workTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {WorkModelLabels[type] ?? type}
              </SelectItem>
            ))}
            </SelectGroup>
            
          </SelectContent>
        </Select>

        <Select value={filters.location} onValueChange={(v) => update("location", v)}>
          <SelectTrigger className="h-11 w-full border border-black! bg-white!" style={{ borderColor: "var(--landing-border)" }}>
            <SelectValue placeholder="Lieu de travail" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border border-black/20">
            <SelectGroup>
                <SelectLabel>Lieu de travail</SelectLabel>
            <SelectItem value="all">Tous les lieux </SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
            </SelectGroup>
            
          </SelectContent>
        </Select>

        <Select value={filters.department} onValueChange={(v) => update("department", v)}>
          <SelectTrigger className="h-11 w-full border border-black! bg-white!" style={{ borderColor: "var(--landing-border)" }}>
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent  className="bg-white text-black border border-black/20">
            <SelectGroup>
                <SelectLabel>Service</SelectLabel>
                <SelectItem value="all"> tous les Service</SelectItem>
                
            {departments.map((dep) => (
              <SelectItem key={dep} value={dep}>
                {dep}
              </SelectItem>
            ))}

            </SelectGroup>
                
            
          </SelectContent>
        </Select>

        <Select value={filters.contractType} onValueChange={(v) => update("contractType", v)}>
          <SelectTrigger className="h-11 w-full border border-black! bg-white!" style={{ borderColor: "var(--landing-border)" }}>
            <SelectValue placeholder="Type de contrat" />
          </SelectTrigger>
          <SelectContent  className="bg-white  text-black border border-black/20">
            <SelectGroup>
                <SelectLabel>Type de contrat</SelectLabel>
                 <SelectItem value="all"> tous les types de contrat</SelectItem>
                 
            {contractTypes.map((type) => (
              <SelectItem
                key={type}
                value={type}
               
              >
                {EmploymentTypeLabels[type] ?? type}
              </SelectItem>
            ))}

            </SelectGroup>
           
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}