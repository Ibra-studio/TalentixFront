import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Pencil, ChevronRight, Search, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "CHOOSE_METHOD" | "CHOOSE_TEMPLATE";

// Données d'exemple adaptées en français
const TEMPLATES = [
  { id: "1", title: "Spécialiste Marketing (Exemple)", location: "Amsterdam" },
  { id: "2", title: "Recruteur (Exemple)", location: "Amsterdam" },
  { id: "3", title: "Senior Marketer (Exemple)", location: "Amsterdam" },
];

export function CreateJobDialog({ open, onOpenChange }: CreateJobDialogProps) {
  const [step, setStep] = useState<Step>("CHOOSE_METHOD");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const router=useRouter();

  // Réinitialiser l'état quand on ferme la modale
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("CHOOSE_METHOD");
        setSearchQuery("");
        setSelectedTemplateId(null);
      }, 200); // Petit délai pour attendre la fin de l'animation de fermeture
    }
  }, [open]);

  const filteredTemplates = TEMPLATES.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-card p-0 gap-0 overflow-hidden border-border shadow-2xl">
        
        {/* ÉTAPE 1 : Choix de la méthode */}
        {step === "CHOOSE_METHOD" && (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-xl font-bold">Nouveau job</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Choisissez un modèle ou commencez à partir de zéro pour créer un nouveau job.
              </DialogDescription>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-3">
              <button 
                onClick={() => setStep("CHOOSE_TEMPLATE")}
                className="w-full flex items-center text-left p-4 rounded-xl border border-border bg-background  hover:bg-brand transition-all group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-brand/10 transition-colors mr-4">
                  <FileText className="h-5 w-5 text-icon  transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-sm text-foreground">À partir d'un modèle</h4>
                  <p className="text-xs text-muted-foreground">
                    Utilisez un modèle comme point de départ. Personnalisez-le selon vos besoins.
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-icon opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </button>

              <button 
                onClick={() => {
                  console.log("Créer un job vierge");
                  onOpenChange(false);
                }}
                className="w-full flex items-center text-left p-4 rounded-xl border border-border bg-background  hover:bg-brand transition-all group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-brand/10 transition-colors mr-4">
                  <Pencil className="h-5 w-5 text-icon  transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-sm text-foreground">Job vierge</h4>
                  <p className="text-xs text-muted-foreground">Commencez à partir de zéro.</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-brand transition-all group-hover:translate-x-1" />
              </button>
            </div>
          </>
        )}

        {/* ÉTAPE 2 : Sélection du Template */}
        {step === "CHOOSE_TEMPLATE" && (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-xl font-bold">Sélectionner un modèle</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Sélectionnez un modèle existant comme point de départ. Vous pourrez le personnaliser selon vos besoins.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher des modèles..." 
                  className="pl-9 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="px-6 py-2 flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                Modèles de jobs
              </span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 rounded-sm">
                {filteredTemplates.length}
              </Badge>
            </div>

            {/* Liste scrollable des templates */}
            <div className="px-6 max-h-[300px] overflow-y-auto custom-scrollbar space-y-2 pb-6">
              {filteredTemplates.map((template) => {
                const isSelected = selectedTemplateId === template.id;
                return (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplateId(template.id)}
                    className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected 
                        ? "border-brand bg-brand" 
                        : "border-border bg-background hover:bg-brand"
                    }`}
                  >
                    {/* Faux bouton radio pour correspondre au design */}
                    <div className="mt-0.5 mr-3 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary">
                      {isSelected && <div className="h-2 w-2 rounded-full bg-icon" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{template.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{template.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer de l'étape 2 */}
            <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setStep("CHOOSE_METHOD")}
                className="text-muted-foreground hover:bg-brand!"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Retour
              </Button>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button 
                  size="sm" 
                  className="bg-brand text-brand-foreground hover:bg-brand/90"
                  disabled={!selectedTemplateId}
                  onClick={() => {
                    if (selectedTemplateId) {
                            onOpenChange(false);
                            // Redirection avec le template en query param
                            router.push(`/jobs/create?templateId=${selectedTemplateId}`);
                        }}
                    }
                >
                  Continuer
                </Button>
              </div>
            </div>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
}