"use client";

import { Draggable } from "@hello-pangea/dnd";
import { 
  MapPin, MessageSquare, ListTodo, Calendar, 
  Bookmark, ThumbsUp, Ban, Clock, Check 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Candidate } from "@/types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  index: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export function CandidateCard({ candidate, index, isSelected, onToggleSelect }: CandidateCardProps) {
  return (
    <Draggable draggableId={candidate.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // On change le style global si la carte est sélectionnée
          className={cn(
            "bg-background border p-4 rounded-lg shadow-sm group relative",
            "transition-all duration-200 ease-in-out cursor-grab active:cursor-grabbing",
            isSelected 
              ? "border-brand bg-brand/20" // Style quand sélectionné
              : "border-gray-800/60 hover:border-gray-700 hover:bg-brand",
            snapshot.isDragging && "shadow-xl shadow-black/50 rotate-2 scale-105 border-brand bg-card z-50"
          )}
        >
          {/* Section Haute : Profil & Métadonnées */}
          <div className="flex items-start gap-3">
            
            {/* Checkbox intégrée (Visible au hover ou si sélectionné) */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleSelect(candidate.id);
              }}
              className={cn(
                "mt-1 w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-all shrink-0",
                isSelected
                  ? "bg-brand border-brand text-white" // Coché (Violet)
                  : "border-gray-500 text-transparent opacity-0 group-hover:opacity-100 hover:border-gray-300" // Décoché (Caché sans hover)
              )}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex-shrink-0 border border-gray-800">
              {candidate.avatarUrl ? (
                <img src={candidate.avatarUrl} alt={candidate.name} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold bg-gradient-to-br from-gray-600 to-gray-800 text-gray-300">
                  {candidate.initial || candidate.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Informations principales */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-primary flex items-center gap-2 truncate group-hover:text-white">
                {candidate.name}
                {candidate.isNew && (
                  <span className="bg-brand text-primary text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    NEW
                  </span>
                )}
              </h4>

              <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-500" /> {candidate.date}
                </span>
                {Number(candidate.notesCount) > 0 && (
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-gray-500" /> {candidate.notesCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Localisation */}
          <div className="border-t border-gray-800/40 pt-3 mt-3">
            <div className="inline-flex items-center gap-1 text-xs text-gray-300 bg-black/30 px-2 py-1 rounded-md">
              <MapPin className="w-3 h-3 text-gray-500" />
              {candidate.location || "Non specifié"}
            </div>
          </div>

          {/* Barre d'actions au Hover */}
          <div className="hidden group-hover:flex items-center justify-between border-t border-gray-800/60 pt-2 mt-2 animate-in fade-in duration-150">
            <div className="flex items-center gap-0.5">
              <button className="p-1.5 rounded text-gray-400 hover:bg-brand hover:text-white cursor-pointer!" title="Planifier un entretien"><Calendar className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded text-gray-400  hover:text-white cursor-pointer!" title="Suivre le candidat"><Bookmark className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded text-gray-400 hover:text-white cursor-pointer!" title="Evaluer le candidat"><ThumbsUp className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded text-gray-400 hover:text-white cursor-pointer!" title="Ajouter une tâche"><MessageSquare className="w-3.5 h-3.5" /></button>
            </div>
            <button className="p-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer!" title="Disqualifier le candidat"><Ban className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      )}
    </Draggable>
  );
}