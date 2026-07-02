"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Upload, Image as ImageIcon } from "lucide-react";

// --- IMPORTS SHADCN ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Job } from "@/types/job";
import Image from "next/image";

interface JobSharingFormProps {
  initialJob: Job;
  onTabChange: (tabId: string) => void;
}

export function JobSharingForm({ initialJob, onTabChange }: JobSharingFormProps) {
  // --- ÉTATS ---
  const [metaTitle, setMetaTitle] = useState(initialJob?.title || "Marketer (Sample)");
  const [metaDescription, setMetaDescription] = useState(
    "Nous sommes à la recherche d'un marketeur professionnel. Vous contribuerez à divers projets allant du contenu et des graphiques à la publication de documents finaux..."
  );

  const maxDescriptionLength = 200;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. RÉFÉRENCEMENT (SEO) */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-foreground">Référencement (SEO) et Partage</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Personnalisez le titre et la description de la page de l'offre pour attirer plus de visiteurs via les moteurs de recherche. <a href="#" className="text-primary hover:underline">En savoir plus</a>
          </p>
        </div>

        {/* Prévisualisation SEO type Google/LinkedIn */}
        <div className="p-4 rounded-lg border border-border bg-background shadow-sm space-y-1">
          <div className="text-xs text-muted-foreground mb-1">
            <span className="font-medium text-foreground">Votre Entreprise</span>
            <br />
            https://votre-entreprise.recrutement.com/o/nom-de-loffre
          </div>
          <h3 className="text-base font-medium text-blue-600 dark:text-blue-400 truncate">
            {metaTitle || "Titre de l'offre"}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {metaDescription || "La description de votre offre apparaîtra ici."}
          </p>
        </div>

        {/* Champs de saisie */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Titre de l'offre (Meta Title)</label>
            <Input 
              placeholder="Saisissez le titre" 
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Description courte (Meta Description)</label>
            <div className="relative">
              <Textarea 
                placeholder="Saisissez une description attractive pour les candidats..." 
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value.slice(0, maxDescriptionLength))}
                className="bg-background resize-none min-h-[100px] pb-8"
              />
              <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                {metaDescription.length} / {maxDescriptionLength}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMAGE POUR LES RÉSEAUX SOCIAUX */}
      <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Image pour les réseaux sociaux</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Cette image sera affichée lorsque vous partagerez le lien de l'offre sur LinkedIn,WhatsApp,Facebook etc.
            </p>
          </div>
          <Button variant="outline" size="sm" className="bg-background border-border">
            <Upload className="w-4 h-4 mr-2 text-muted-foreground" /> 
            Ajouter une image
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Espace réservé pour l'image (Placeholder) */}
          <div className="w-full md:w-[400px] aspect-[1200/630] border border-border rounded-lg overflow-hidden relative shadow-sm bg-primary">
            <Image
              src="/images/imageSocialSharing3.png"
              alt="Aperçu du partage social"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
          </div>

          {/* Informations sur le fichier */}
         {/* Informations sur le fichier */}
<div className="flex flex-col justify-center h-full pt-4 md:pt-0 space-y-2">
  <p className="text-sm text-muted-foreground">
    <span className="font-semibold text-foreground">Dimensions recommandées :</span> 1200 x 630 px
  </p>
  <p className="text-sm text-muted-foreground">
    <span className="font-semibold text-foreground">Taille max :</span> 2 Mo
  </p>
  <p className="text-sm text-muted-foreground">
    <span className="font-semibold text-foreground">Formats :</span> JPG, JPEG, PNG
  </p>
</div>
        </div>
      </section>

      {/* 3. NAVIGATION (BOTTOM) */}
      <div className="flex justify-between items-center pt-4 pb-8">
        <Button 
          variant="ghost" 
          onClick={() => onTabChange("workflow")} 
          className="text-muted-foreground hover:text-foreground bg-card border border-border hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Processus de recrutement
        </Button>
        <Button 
          onClick={() => onTabChange("careers-page")} 
          className="bg-card border border-border hover:bg-muted text-foreground"
        >
          Page carrières <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

    </div>
  );
}