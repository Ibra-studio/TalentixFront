"use client";

import { useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TABS = ["Candidatures", "Pipeline", "Notes"];
//TODO:tu peux ajouter ( Evaluation , activite , rapports fichiers , apres une fois le mvp fait)

export function PipelineTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Hook pour gérer l'état de chargement en arrière-plan
  const [isPending, startTransition] = useTransition();

  // Par défaut, si pas de tab dans l'URL, c'est "Candidatures"
  const currentTab = searchParams.get("tab") || "Candidatures";

  const handleTabChange = (tab: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", tab.toLowerCase());
    
    // startTransition garde l'UI réactive et passe isPending à true
    startTransition(() => {
      router.push(`${pathname}?${newParams.toString()}`);
    });
  };

  return (
    <div className="relative">
      <nav className="flex space-x-6 border-b border-gray-700 relative">
        {TABS.map((tab) => {
          const isActive = currentTab.toLowerCase() === tab.toLowerCase(); 

          return (
            <Button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={cn(
                "pb-2 text-sm font-medium transition-colors relative",
                isActive ? "text-primary" : "text-primary"
              )}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.75 bg-brand rounded-t-md" />
              )}
            </Button>
          );
        })}

        {/* Barre de chargement qui s'affiche pendant isPending */}
        {isPending && (
          <div className="absolute bottom-[-1px] left-0 w-full h-[4px] overflow-hidden rounded-full">
            <div className="h-full bg-brand animate-indeterminate" />
          </div>
        )}
      </nav>

      {/* Styles CSS pour l'animation de la barre de chargement */}
      <style jsx>{`
        .animate-indeterminate {
          width: 50%;
          transform-origin: left center;
          animation: indeterminate 1s infinite linear;
        }
        @keyframes indeterminate {
          0% {
            transform: translateX(-150%) scaleX(0.5);
          }
          50% {
            transform: translateX(-20%) scaleX(1);
          }
          100% {
            transform: translateX(200%) scaleX(0.5);
          }
        }
      `}</style>
    </div>
  );
}