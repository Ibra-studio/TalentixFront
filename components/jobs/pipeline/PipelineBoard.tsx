"use client";

import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { PipelineStage } from "@/types/Pipeline";
import { PipelineColumn } from "./PipelineColumn";
import { PipelineToolbar } from "./PipelineToolbar";

interface PipelineBoardProps {
  initialStages: PipelineStage[];
  jobId: string;
}

export function PipelineBoard({ initialStages, jobId }: PipelineBoardProps) {
  const [stages, setStages] = useState<PipelineStage[]>(initialStages);
  
  // --- ÉTAT DES SÉLECTIONS ---
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  const clearSelection = () => setSelectedIds(new Set());

  // --- LOGIQUE DU DRAG AND DROP ---
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // 1. Si lâché en dehors d'une zone valide, on annule
    if (!destination) return;

    // 2. Si relâché exactement au même endroit, on annule
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Copie de l'état actuel
    const newStages = Array.from(stages);

    // Trouver les colonnes source et destination
    const sourceStageIndex = newStages.findIndex(s => s.id === source.droppableId);
    const destStageIndex = newStages.findIndex(s => s.id === destination.droppableId);

    if (sourceStageIndex === -1 || destStageIndex === -1) return;

    const sourceStage = newStages[sourceStageIndex];
    const destStage = newStages[destStageIndex];

    // 3. Déplacement DANS LA MÊME COLONNE (Réorganisation)
    if (source.droppableId === destination.droppableId) {
      const newCandidates = Array.from(sourceStage.candidates);
      const [movedCandidate] = newCandidates.splice(source.index, 1);
      newCandidates.splice(destination.index, 0, movedCandidate);

      const newStage = { ...sourceStage, candidates: newCandidates };
      newStages[sourceStageIndex] = newStage;
      
      setStages(newStages);
      return;
    }

    // 4. Déplacement D'UNE COLONNE À UNE AUTRE (Changement de stage)
    const sourceCandidates = Array.from(sourceStage.candidates);
    const destCandidates = Array.from(destStage.candidates);

    // On retire le candidat de la colonne source
    const [movedCandidate] = sourceCandidates.splice(source.index, 1);
    
    // (Optionnel) Mise à jour de la donnée "stage" sur le candidat lui-même si tu en as besoin
    // movedCandidate.stage = destStage.id;

    // On l'ajoute à la colonne de destination à l'index précis
    destCandidates.splice(destination.index, 0, movedCandidate);

    // On met à jour les deux colonnes concernées
    newStages[sourceStageIndex] = { ...sourceStage, candidates: sourceCandidates };
    newStages[destStageIndex] = { ...destStage, candidates: destCandidates };

    setStages(newStages);

    // TODO: Ici tu pourras faire ton appel pour sauvegarder en base de données
    // await fetch(`/api/candidates/${draggableId}/stage`, { 
    //   method: 'PATCH', 
    //   body: JSON.stringify({ newStage: destStage.id }) 
    // });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* La Toolbar qui réagit à l'état */}
      <PipelineToolbar 
        selectedCount={selectedIds.size} 
        onClearSelection={clearSelection} 
      />

      {/* Le Board Drag & Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 flex overflow-x-auto py-4 gap-4 items-start"
            >
              {stages.map((stage, index) => (
                <PipelineColumn 
                  key={stage.id} 
                  stage={stage} 
                  index={index} 
                  selectedIds={selectedIds}
                  onToggleSelect={toggleSelection}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}