"use client";

import React, { useState, useMemo } from 'react'
import { FilterSidebar } from '@/components/FilterSidebar'
import { InfoBar } from '@/components/InfoBar'
import { JobFavorites } from '@/components/jobs/JobFavorites'
import JobHeader from '@/components/jobs/JobHeader'
import { JobToolbar } from '@/components/jobs/JobToolbar'

import { JobViews } from '@/components/jobs/JobViews' // <-- Import du nouveau composant
import { Job } from '@/types/job';

export default function JobsViewWrapper({initialJobs}:{initialJobs:Job[]}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

   
  
  // États de présentation
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"list" | "table">("list")
  const [sortBy, setSortBy] = useState("none")
  const [groupBy, setGroupBy] = useState("none")

  // Logique de recherche simple pour que la barre Toolbar fonctionne visuellement
  const filteredJobs = useMemo(() => {
    if (!searchQuery) return initialJobs;
    return initialJobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery,initialJobs])
  
  return (
    <div className="flex h-[calc(100vh-var(--header-height,3.5rem))] w-full overflow-hidden bg-background text-foreground">
      
      <FilterSidebar
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
        topContent={<JobFavorites/>}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        <JobHeader />
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          
          <JobToolbar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            view={view}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen((prev)=>!prev)}
            onViewChange={setView}
            sortBy={sortBy}
            onSortChange={setSortBy}
            groupBy={groupBy}
            onGroupChange={setGroupBy}
          />

          <InfoBar />
          
          {/* === AFFICHAGE DYNAMIQUE DES JOBS === */}
          <div className="mt-4">
            <JobViews jobs={filteredJobs} view={view} />
          </div>

        </div>
      </main>
    </div>
  )
}