"use client";

import React, { useState } from "react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export function AboutTheRoleSection() {
  // Vos états locaux (qui seront ensuite soumis à votre API .NET)
  const [description, setDescription] = useState("<p>Nous recherchons un professionnel...</p>");
  const [requirements, setRequirements] = useState("");
  const [jobHighlight, setJobHighlight] = useState("");

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
          <label className="text-sm font-semibold flex items-center gap-1 text-foreground">
            Job highlight 
            <span className="text-muted-foreground text-xs cursor-help border border-border rounded-full w-4 h-4 flex items-center justify-center">?</span>
          </label>
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