"use client";

import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { CandidateCard } from "./CandidateCard";
import { ChevronRight, ChevronDown, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { PipelineStage } from "@/types/pipeline";


// Ajout des nouvelles props pour gérer l'état de sélection
interface PipelineColumnProps {
  stage: PipelineStage;
  index: number;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
}

export function PipelineColumn({ stage, index, selectedIds, onToggleSelect }: PipelineColumnProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);

  if (isCollapsed) {
    return (
      <div 
        className="w-12 h-full  bg-filter-sidebar-bg rounded-md flex flex-col items-center py-4 cursor-pointer hover:bg-brand/10 transition-colors"
        onClick={() => setIsCollapsed(false)}
      >
        <ChevronRight className="w-4 h-4 text-gray-400 mb-4" />
        <span className="writing-vertical text- text-primary  font-medium rotate-180" style={{ writingMode: 'vertical-rl' }}>
          {stage.title} <span className="bg-brand text-white px-2 py-1 rounded text-xs ml-2">{stage.candidates.length}</span>
        </span>
      </div>
    );
  }

  return (
    <Draggable draggableId={stage.id} index={index} isDragDisabled={true}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex flex-col w-75 shrink-0 bg-filter-sidebar-bg rounded-md h-full p-2"
        >
          {/* Header de la colonne avec logique de hover pour fermer */}
          <div 
            className="flex items-center gap-2 mb-3 px-1 cursor-pointer group"
            onMouseEnter={() => setIsHoveringHeader(true)}
            onMouseLeave={() => setIsHoveringHeader(false)}
            onClick={() => setIsCollapsed(true)}
            {...provided.dragHandleProps}
          >
            <div className={cn(
              "w-2 h-2 rounded-full",
              stage.candidates.length > 0 ? "bg-tags" : "bg-gray-600"
            )} />
            <h3 className="font-medium text-primary text-sm">{stage.title}</h3>
            <span className="text-xs bg-brand text-white px-2 py-0.5 rounded ml-1">
              {stage.candidates.length}
            </span>
            
            {isHoveringHeader && (
              <ChevronLeft className="w-4 h-4 ml-auto text-gray-500 hover:text-primary transition-colors" />
            )}
          </div>

          {/* Zone Droppable pour les cartes */}
          <Droppable droppableId={stage.id} type="CANDIDATE">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "flex flex-col gap-3 min-h-37.5 rounded-lg transition-colors",
                  snapshot.isDraggingOver ? "bg-brand/35" : "bg-transparent"
                )}
              >
                {stage.candidates.map((candidate, idx) => (
                  <CandidateCard 
                    key={candidate.id} 
                    candidate={candidate} 
                    index={idx}
                    // Transmission de l'état et de l'action de sélection
                    isSelected={selectedIds.has(candidate.id)}
                    onToggleSelect={onToggleSelect}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}