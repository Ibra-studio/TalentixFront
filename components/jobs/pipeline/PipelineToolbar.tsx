"use client";

import { 
  Minus, 
  ChevronDown, 
  Tag, 
  UserPlus, 
  X, 
  Plus, 
  Menu, 
  LayoutGrid, 
  MoreHorizontal,
  Columns
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PipelineToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export function PipelineToolbar({ selectedCount, onClearSelection }: PipelineToolbarProps) {
  return (
    <div className="flex items-center justify-between w-full py-2 bg-background text-primary min-h-[56px]">
      
      {/* --- PARTIE GAUCHE (Actions de masse) --- */}
      <div className="flex items-center gap-3 ">
        {selectedCount > 0 && (
          <div className="flex items-center gap-1 animate-in fade-in slide-in-from-left-4 duration-200">
            
            {/* Badge de sélection */}
            <div 
              className="flex items-center gap-1 bg-brand text-white px-3 py-1.5 rounded-md text-sm font-semibold cursor-pointer hover:bg-brand/90 transition-colors"
              onClick={onClearSelection}
            >
              <Minus className="w-4 h-4" />
              <span>{selectedCount}</span>
              <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
            </div>

            <div className="w-[1px] h-5 bg-gray-700 mx-2" />

            {/* Actions */}
            <Button variant="ghost" size="sm" className="h-9 text-primary hover:bg-brand! hover:text-white">
              <Columns className="w-4 h-4 mr-2" /> Changer l'étape
            </Button>
            <Button variant="ghost" size="sm" className="h-9 text-primary hover:bg-brand! hover:text-white">
              <Tag className="w-4 h-4 mr-2" /> Ajouter un Tag
            </Button>
            <Button variant="ghost" size="sm" className="h-9 text-primary hover:bg-brand! hover:text-white">
              <UserPlus className="w-4 h-4 mr-2" /> Partager
            </Button>
            <Button variant="ghost" size="sm" className="h-9 text-primary hover:bg-brand! hover:text-white">
              Plus... <ChevronDown className="w-4 h-4 ml-1" />
            </Button>

            {/* Croix pour annuler */}
            <button 
              onClick={onClearSelection} 
              className="ml-2 p-1.5 text-gray-400 hover:bg-brand hover:text-white rounded-md  transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* --- PARTIE DROITE (Toujours visible) --- */}
      <div className="flex items-center gap-2">
        <Button className="bg-brand hover:bg-brand/90 text-white h-9 font-medium">
          <Plus className="w-4 h-4 mr-2" /> Ajouter un candidat
        </Button>
        <div className="flex items-center gap-1 ml-2">
          <Button variant="outline" size="icon" className="h-9 w-9 border-gray-700 bg-transparent text-primary hover:bg-gray-800">
            <Menu className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 border-gray-700 bg-transparent text-primary hover:bg-gray-800">
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 border-gray-700 bg-transparent text-primary hover:bg-gray-800">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

    </div>
  );
}