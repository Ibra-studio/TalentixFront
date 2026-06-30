"use client";

import React, { useState } from "react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { CircleHelp } from "lucide-react";
import { Job } from "@/types/Job";
import { SafeHTML } from "@/components/ui/safe-html";

export function AboutTheRoleSection({job}:{job:Job}) {
  // Vos états locaux (qui seront ensuite soumis à votre API .NET)
  const [description, setDescription] = useState(job.description || "");
  const [requirements, setRequirements] = useState(job.requirements || "");
  const [jobHighlight, setJobHighlight] = useState(job.jobHighlights || "");

  return (
    <section className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-foreground">About the role</h2>
        <p className="text-sm text-muted-foreground">Description of the role and responsibilities.</p>
      </div>

      <div className="space-y-6">
        {/* Éditeur pour la Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Description</label>
          <RichTextEditor 
            value={description} 
            onChange={setDescription} 
          />
          <div className="mt-2 p-4 bg-muted/20 rounded-lg border border-border">
             <span className="text-[10px] font-bold uppercase text-muted-foreground">Prévisualisation :</span>
             <SafeHTML html={description} />
          </div>
        </div>

        {/* Éditeur pour les Requirements */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Requirements</label>
          <RichTextEditor 
            value={requirements} 
            onChange={setRequirements} 
          />
        </div>

        {/* Textarea classique pour le Job Highlight */}
        <div className="space-y-2">
          
            <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold flex items-center gap-1 text-foreground">
            Job highlight  </label>
                        {/* Tooltip via Tailwind CSS pur */}
                        <div className="relative group flex items-center">
                          <CircleHelp className="w-4 h-4 text-muted-foreground cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-65 p-2 bg-popover text-popover-foreground text-xs rounded-md shadow-md border border-border z-10 text-center">
                            Un résumé rapide en quelques points clés (avantages, technos, faits marquants) affiché en haut de l'offre pour donner envie aux candidats de lire la suite de votre annonce
                          </div>
                        </div>
                      </div>
         
          <textarea 
            className="w-full border border-border rounded-xl p-4 min-h-[100px] bg-background focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring text-sm resize-none transition-all"
            placeholder="Add highlights..."
            maxLength={200}
            value={jobHighlight}
            onChange={(e) => setJobHighlight(e.target.value)}
          ></textarea>
          <div className="text-right text-xs text-muted-foreground">
            {jobHighlight.length}/200
          </div>
        </div>
      </div>
    </section>
  );
}