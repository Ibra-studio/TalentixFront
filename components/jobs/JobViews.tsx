import React, { useState } from "react"

import { 
  Building2, 
  Globe, 
  Megaphone, 
  Pencil, 
  MoreHorizontal, 
  Bookmark,
  Users,
  Building
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Job } from "@/types/job"
import { JobTable } from "./JobTable"
import { JobList } from "./JobList"
import { JobBoard } from "./JobBoard"

interface JobViewsProps {
  jobs: Job[]
  view: "list" | "table"
}

export function JobViews({ jobs:initialJobs, view }: JobViewsProps) {
    const [jobs, setJobs] = useState<Job[]>(initialJobs)

    React.useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

    const handleToggleFollow = (id: string) => {
        setJobs((prevJobs) => 
          prevJobs.map((job) => job.id === id ? {...job, isFollow:!job.isFollow}: job)
        )
    }
  
  // === VUE LISTE (Inspirée de votre maquette) ===
  if (view === "list") {
    return <JobList jobs={jobs} onToggleFollow={handleToggleFollow}/>
  }

  // === VUE TABLE ===
    if (view === "table") {
    return <JobTable jobs={jobs}/>
    }

  return null
}