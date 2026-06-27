import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Pencil, ChevronRight, Search, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { simulateCreateJobDraft } from "@/lib/job/JobData"; // Importation de la simulation
import { Spinner } from "../ui/spinner";

interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "CHOOSE_METHOD" | "CHOOSE_TEMPLATE";

const TEMPLATES = [
  { id: "1", title: "Spécialiste Marketing (Exemple)", location: "Amsterdam" },
  { id: "2", title: "Recruteur (Exemple)", location: "Amsterdam" },
  { id: "3", title: "Senior Marketer (Exemple)", location: "Amsterdam" },
];

export function CreateJobDialog({ open, onOpenChange }: CreateJobDialogProps) {
  const [step, setStep] = useState<Step>("CHOOSE_METHOD");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false); // État de chargement global de la modale

  const router = useRouter();

  // Réinitialiser l'état quand on ferme la modale
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("CHOOSE_METHOD");
        setSearchQuery("");
        setSelectedTemplateId(null);
        setIsPending(false);
      }, 200);
    }
  }, [open]);

  // Fonction unique pour gérer la création (Vierge ou Template)
  const handleCreateJob = async (templateId?: string | null) => {
    setIsPending(true);
    try {
      // 1. Appel du mock (qui sera remplacé plus tard par votre API .NET)
      // On pourrait passer le templateId pour cloner les données côté backend
      const newJobId = await simulateCreateJobDraft(); 
      
      // 2. Fermer la modale
      onOpenChange(false);
      
      // 3. Rediriger directement vers la page d'édition
      router.push(`/jobs/${newJobId}/edit`);
    } catch (error) {
      console.error("Erreur lors de la création du job :", error);
      setIsPending(false);
    }
  };

  const filteredTemplates = TEMPLATES.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={isPending ? () => {} : onOpenChange}>
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
              
              {/* Option : À partir d'un modèle */}
              <button 
                onClick={() => setStep("CHOOSE_TEMPLATE")}
                disabled={isPending}
                className="w-full flex items-center text-left p-4 rounded-xl border border-border bg-background hover:bg-brand transition-all group disabled:opacity-50 disabled:pointer-events-none"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-brand/10 transition-colors mr-4">
                  <FileText className="h-5 w-5 text-icon transition-colors" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-sm text-foreground">À partir d'un modèle</h4>
                  <p className="text-xs text-muted-foreground">
                    Utilisez un modèle comme point de départ. Personnalisez-le selon vos besoins.
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-icon opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </button>

              {/* Option : Job Vierge (Avec gestion du chargement intégré) */}
              <button 
                onClick={() => handleCreateJob(null)}
                disabled={isPending}
                className="w-full flex items-center text-left p-4 rounded-xl border border-border bg-background hover:bg-brand transition-all group relative disabled:opacity-70"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-brand/10 transition-colors mr-4">
                  {isPending ? (
                    <Loader2 className="h-5 w-5 text-icon animate-spin" />
                  ) : (
                    <Pencil className="h-5 w-5 text-icon transition-colors" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-sm text-foreground">
                    {isPending ? "Initialisation du brouillon..." : "Job vierge"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {isPending ? "Veuillez patienter..." : "Commencez à partir de zéro."}
                  </p>
                </div>
                {!isPending && (
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-brand transition-all group-hover:translate-x-1" />
                )}
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
                  disabled={isPending}
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
                    onClick={() => !isPending && setSelectedTemplateId(template.id)}
                    className={`flex items-start p-4 rounded-xl border transition-all ${
                      isPending ? "pointer-events-none opacity-50" : "cursor-pointer"
                    } ${
                      isSelected 
                        ? "border-brand bg-brand" 
                        : "border-border bg-background hover:bg-brand"
                    }`}
                  >
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
                disabled={isPending}
                className="text-muted-foreground hover:bg-brand!"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Retour
              </Button>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} disabled={isPending}>
                  Annuler
                </Button>
                <Button 
                  size="sm" 
                  className="bg-brand text-brand-foreground hover:bg-brand/90 min-w-[100px]"
                  disabled={!selectedTemplateId || isPending}
                  onClick={() => handleCreateJob(selectedTemplateId)}
                >
                  {isPending ? (
                    <>
                       <Spinner data-icon="inline-start" />
                      Création...
                    </>
                  ) : (
                    "Continuer"
                  )}
                </Button>
              </div>
            </div>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
}