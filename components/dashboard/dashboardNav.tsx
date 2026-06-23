"use client";

import React from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Vue d'ensemble" },
  { id: "calendar", label: "Calendrier" },
  { id: "evaluations", label: "Évaluations" },
  { id: "tasks", label: "Tâches" },
  { id: "notes", label: "Notes récentes" },
  { id: "activity", label: "Activité" },
];

interface DashboardNavProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export function DashboardNav({ activeTab, setActiveTab }: DashboardNavProps) {
  return (
    <div className="border-b border-border bg-card px-6">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "py-4 text-sm font-medium transition-all relative border-b-4 border-transparent text-muted-foreground hover:text-foreground",
              activeTab === tab.id && "text-foreground border-brand font-semibold"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}