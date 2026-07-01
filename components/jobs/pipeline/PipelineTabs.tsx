"use client";

import Link from "next/link";
import {  useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = ["Pipeline", "Filtre", "Diffusion", "Activité", "Notes", "Fichiers", "Rapports"];

export function PipelineTabs() {
   const searchParams = useSearchParams();
  // Par défaut, si pas de tab dans l'URL, c'est "Pipeline"
  const currentTab = searchParams.get("tab") || "Pipeline";


  return (
    <nav className="flex space-x-6 border-b border-gray-700">
      {TABS.map((tab) => {
       const isActive = currentTab.toLowerCase() === tab.toLowerCase(); 

       const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("tab", tab.toLowerCase());
        return (
          <Link
            key={tab}
            href={`?${newParams.toString()}`}
            className={cn(
              "pb-2 text-sm font-medium transition-colors relative",
              isActive ? "text-primary" : "text-primary"
            )}
          >
            {tab}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.75 bg-brand rounded-t-md" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}