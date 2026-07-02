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
  Columns,
  Mail,
  FileUp,
  PenLine,
  FileText,
  Globe,
  Copy,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface PipelineToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export function PipelineToolbar({ selectedCount, onClearSelection }: PipelineToolbarProps) {

    const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentStatus = searchParams.get("status") || "qualifie";

  // Fonction pour mettre à jour l'URL quand on clique sur Qualifié/Disqualifié
  const setStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-between w-full py-2 bg-background text-primary min-h-[56px]">
      
      {/* --- PARTIE GAUCHE (Actions de masse) --- */}
      <div className="flex items-center gap-3 ">
        {selectedCount > 0 ? (
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
        ):(
            // LES BOUTONS QUALIFIÉ / DISQUALIFIÉ
          <div className="flex bg-icon/70 p-1 rounded-md border border-gray-800/60">
            <Button 
              variant="ghost"
              className={cn(
                "h-8 px-3 rounded", 
                currentStatus === "qualifie" ? "bg-brand text-white hover:bg-brand hover:text-white" : "text-white hover:text-gray-200 hover:bg-brand"
              )}
              onClick={() => setStatus("qualifie")}
            >
                Qualifié
                {/* Remarque: Le chiffre 4 est statique ici, l'idéal serait de le recevoir en props depuis la DB */}
                <span className="text-[10px] bg-black/30 text-white px-1.5 py-0.5 rounded ml-2">4</span>
            </Button>
            
            <div className="w-[1px] bg-gray-700 mx-1 my-1 block"></div>
            
            <Button 
              variant="ghost"
              className={cn(
                "h-8 px-3 rounded", 
                currentStatus === "disqualifie" ? "bg-brand text-white hover:bg-brand hover:text-white" : "text-white hover:text-gray-200 hover:bg-brand"
              )}
              onClick={() => setStatus("disqualifie")}
            >
                Disqualifié
                <span className="text-[10px] bg-black/30 text-white px-1.5 py-0.5 rounded ml-2">2</span>
            </Button>
          </div>
        )
        //  <div className="flex bg-brand/50 p-0.5 rounded-md">
        //     <Button className="">
        //         Qualifié
        //         <span className="text-xs bg-brand text-white px-2 py-0.5 rounded ml-1">
        //          4
        //         </span>
        //     </Button>
        //     <div className="bg-background h-full w-0.5 block "></div>
        //     <Button className="" variant={"secondary"}>
        //         Disqualifié
        //         <span className="text-xs bg-brand text-white px-2 py-0.5 rounded ml-1">
        //          2
        //         </span>
        //     </Button>
        //  </div>
        }
      </div>

      {/* --- PARTIE DROITE (Toujours visible) --- */}
      <div className="flex items-center gap-2">
        
        {/* DROPDOWN MENU AJOUTER CANDIDAT */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-brand hover:bg-brand/90 text-white h-9 font-medium">
              <Plus className="w-4 h-4 mr-2" /> Ajouter un candidat
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[340px] bg-background border-gray-800 text-gray-200 p-1 shadow-2xl">
            <DropdownMenuLabel className="text-center font-medium py-2 text-sm bg-brand text-white">
              Choisir la méthode
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800/60" />
            
            {/* Option 1: Boîte mail (spécial avec input copy) */}
            <div className="flex flex-col p-2.5 rounded-sm hover:bg-gray-800/40 transition-colors">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary  shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm text-primary">Boîte mail de l'offre</span>
                  <span className="text-[13px] text-gray-400 leading-snug">
                    Envoyez les CV directement dans cette offre par email.
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-brand border border-gray-700/60 rounded p-1.5 mt-2.5 ml-7">
                <span className="text-xs text-white font-mono truncate mr-2 select-all">
                  job.gokb3.talentix@mail.com
                </span>
                <button 
                  className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors shrink-0"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("job.gokb3.talentix@mail.com");
                    // Tu pourrais ajouter un toast de succès ici
                  }}
                  title="Copier l'adresse"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Option 2: Importer un CV */}
            <DropdownMenuItem className="flex items-start gap-3 p-2.5 cursor-pointer hover:bg-gray-800/40 focus:bg-gray-800/40">
              <FileUp className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-sm text-primary">Importer un CV</span>
                <span className="text-[13px] text-gray-400 leading-snug">
                  Téléchargez un ou plusieurs fichiers ou un dossier.
                </span>
              </div>
            </DropdownMenuItem>

            {/* Option 3: Manuellement */}
            <DropdownMenuItem className="flex items-start gap-3 p-2.5 cursor-pointer hover:bg-gray-800/40 focus:bg-gray-800/40">
              <PenLine className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-sm text-primary">Manuellement</span>
                <span className="text-[13px] text-gray-400 leading-snug">
                  Saisissez les informations du candidat manuellement.
                </span>
              </div>
            </DropdownMenuItem>

            {/* Option 4: Import CSV */}
            <DropdownMenuItem className="flex items-start justify-between p-2.5 cursor-pointer hover:bg-gray-800/40 focus:bg-gray-800/40 group">
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 mt-0.5 text-primary  shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm text-primary">Importer depuis un CSV</span>
                  <span className="text-[13px] text-gray-400 leading-snug">
                    Ajoutez plusieurs candidats depuis un fichier CSV.
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </DropdownMenuItem>

            {/* Option 5: Extension Chrome */}
            {/* <DropdownMenuItem className="flex items-start justify-between p-2.5 cursor-pointer hover:bg-gray-800/40 focus:bg-gray-800/40 group">
              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm text-gray-100">Extension Chrome Talentix</span>
                  <span className="text-[13px] text-gray-400 leading-snug">
                    Sourcez des candidats via l'extension Talent Sourcing.
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </DropdownMenuItem> */}

          </DropdownMenuContent>
        </DropdownMenu>

        {/* Boutons d'affichage (List/Grid) */}
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