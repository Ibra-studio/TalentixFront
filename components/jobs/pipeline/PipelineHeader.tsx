'use client'; // À inclure si tu utilises Next.js App Router

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Share2, 
  ExternalLink, 
  Bookmark, 
  Plus, 
  Pencil, 
  MapPin, 
  Building2, 
  Hash, 
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { Job } from '@/types/job';



interface PipelineHeaderProps {
  job: Job;
}

export default function PipelineHeader({ job }: PipelineHeaderProps) {
  // État pour gérer le bouton "Suivre"
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex flex-col    md:flex-row md:items-center justify-between  bg-background text-gray-200">
      
      {/* Partie Gauche : Détails du Job */}
      <div className="flex flex-col gap-2">
        {/* Titre et Statut */}
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${job.status === "PUBLISHED" ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          <h1 className="text-xl font-semibold text-primary flex items-center gap-2 ">
            {job.title}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </h1>
        </div>

        {/* Badges d'informations */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-white font-medium">
          <div className="flex items-center gap-1 bg-tags px-2 py-1 rounded-md text-black">
            <MapPin className="w-3.5 h-3.5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1 bg-tags px-2 py-1 rounded-md text-black">
            <Building2 className="w-3.5 h-3.5" />
            <span>{job.workModel}</span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Hash className="w-3.5 h-3.5" />
            <span>2</span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Briefcase className="w-3.5 h-3.5" />
            <span>3</span>
          </div>
        </div>
      </div>

      {/* Partie Droite : Actions */}
      <div className="flex items-start gap-3 mt-4 md:mt-0 text-sm font-medium">
        
        <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-brand hover:text-white rouned-md  text-primary transition-colors cursor-pointer">
          <Share2 className="w-4 h-4" />
          <span>Partager</span>
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-brand hover:text-white rounded-md text-primary transition-colors cursor-pointer">
          <ExternalLink className="w-4 h-4" />
          <span>Aperçu</span>
        </button>

        {/* Bouton Suivre avec logique de remplissage */}
        <button 
          onClick={() => setIsFollowing(!isFollowing)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200 ${
            isFollowing ? 'text-brand bg-brand/10' : 'hover:bg-brand text-primary'
          }`}
        >
          <Bookmark 
            className={`w-4 h-4 ${isFollowing ? 'fill-brand text-brand' : 'text-primary'}`} 
          />
          <span>Suivre</span>
        </button>

        <button className="p-1.5 hover:bg-gray-800 rounded-full border border-gray-700 transition-colors">
          <Plus className="w-4 h-4" />
        </button>

        {/* Bouton Modifier avec Link */}
        <Link href={`/jobs/${job.id}/edit`}>
          <button className="flex items-center gap-1.5 px-4 py-1.5  bg-brand hover:bg-brand/90 border border-gray-700 rounded-md transition-colors text-white cursor-pointer">
            <Pencil className="w-4 h-4" />
            <span>Modifier</span>
          </button>
        </Link>
        
      </div>
    </div>
  );
}