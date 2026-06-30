"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, Pencil, Trash2, Ban, Check, Info, Mail, 
  ChevronDown, Settings, AlertCircle, GripVertical, ArrowLeft, ArrowRight,
  Phone,
  TextAlignStart
} from "lucide-react";

// --- IMPORTS SHADCN ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Job } from "@/types/Job";

// Types simulés pour l'exemple
type FieldType = "TEXT" | "FILE" | "YES_NO" | "MULTIPLE_CHOICE";

interface JobApplicattionFormProps {
  initialJob: Job;
  onTabChange: (tabId: string) => void;
}

export function JobApplicationForm({ initialJob, onTabChange }: JobApplicattionFormProps) {
  const router = useRouter();

  // --- ÉTATS ---
  const [isNewQuestionDialogOpen, setIsNewQuestionDialogOpen] = useState(false);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  
  // État du constructeur de question éliminatoire (Knockout)
  const [isKnockout, setIsKnockout] = useState(false);
  const [disqualifyingAnswer, setDisqualifyingAnswer] = useState<"YES" | "NO" | null>(null);
  const [disqualifyReason, setDisqualifyReason] = useState("");

  const [autoEmailEnabled, setAutoEmailEnabled] = useState(false);

  // --- HANDLERS ---
  const handleAddQuestionClick = () => {
    setIsNewQuestionDialogOpen(true);
  };

  const confirmAddQuestion = () => {
    setIsNewQuestionDialogOpen(false);
    setShowQuestionEditor(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. INFORMATIONS DU CANDIDAT */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-foreground">Informations du candidat</h2>
          <p className="text-sm text-muted-foreground">Les candidats rempliront ces détails sur le formulaire de candidature.</p>
        </div>

        <div className="space-y-3">
          {/* Champs Standards (Mock) */}
          <CandidateField icon={<span className="font-bold text-muted-foreground"><TextAlignStart className="w-3.5 h-3.5"/></span>} label="Nom complet" isRequired locked />
          <CandidateField icon={<Mail className="w-4 h-4 text-muted-foreground" />} label="Adresse e-mail" isRequired locked />
          <CandidateField icon={<span className="font-bold text-muted-foreground"><Phone className="w-3.5 h-3.5"/> </span>} label="Téléphone" />
          <CandidateField icon={<span className="font-bold text-muted-foreground">📎</span>} label="CV ou résumé" />
          <CandidateField icon={<span className="font-bold text-muted-foreground">📎</span>} label="Lettre de motivation" isOptional />
          
          {/* Bouton Ajouter un nouveau champ (REMPLACÉ PAR DROPDOWN MENU SHADCN) */}
          <div className="pt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full border-dashed text-muted-foreground hover:text-foreground">
                  <Plus className="w-4 h-4 mr-2" /> Ajouter un nouveau
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[300px]">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Type de champ</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <span className="font-medium text-sm">Titre général</span>
                  <span className="text-xs text-muted-foreground">M. • Mme.</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <span className="font-medium text-sm">Titre professionnel</span>
                  <span className="text-xs text-muted-foreground">Dr. • Professeur</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <span className="font-medium text-sm">Photo</span>
                  <span className="text-xs text-muted-foreground">Photo du candidat</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* 2. QUESTIONS DE PRÉSÉLECTION (Screening) */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm relative">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-foreground">Questions de présélection</h2>
            <p className="text-sm text-muted-foreground">Les candidats répondront à ces questions avant de postuler. <a href="#" className="text-primary hover:underline">En savoir plus</a></p>
          </div>
          <Button variant="outline" size="sm">
            <GripVertical className="w-4 h-4 mr-2 text-muted-foreground" /> Aucun <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </div>

        <div className="space-y-3">
          {/* Liste des questions existantes */}
          <CandidateField icon={<span className="font-bold text-muted-foreground">≡</span>} label="Quelles considérez-vous comme vos 5 principales forces ?" />
          <CandidateField icon={<Check className="w-4 h-4 text-muted-foreground" />} label="Dans quels domaines vous sentez-vous le plus fort ?" />
          
          {/* Éditeur de question (qui s'ouvre après confirmation) */}
          {showQuestionEditor ? (
            <div className="border border-sidebar-accent bg-brand rounded-xl overflow-hidden mt-4 animate-in slide-in-from-top-4">
              <div className="p-4 border-b border-brand flex justify-between items-center bg-brand">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white" >◉ Oui / Non</span>
                  <ChevronDown className="w-3 h-3 white" />
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-white flex items-center gap-1"><Ban className="w-3 h-3"/> Optionnel <ChevronDown className="w-3 h-3"/></span>
                </div>
              </div>
              
              <div className="p-4 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-black bg-(--helper-accent) px-1 rounded">Question *</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm  text-white">Question éliminatoire</span>
                      <Switch checked={isKnockout} onCheckedChange={setIsKnockout} className="data-[state=checked]:bg-emerald-500" />
                    </div>
                  </div>
                  <Input className="bg-background border-none focus-visible:ring-1 focus-visible:ring-(--helper-accent)" placeholder="Entrez votre question..." />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-white">Réponses</label>
                  
                  {/* Option OUI */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-input  rounded-md p-2.5 text-sm border-none ">Oui</div>
                    {isKnockout && (
                      <div className="relative group">
                        <button 
                          onClick={() => setDisqualifyingAnswer("YES")}
                          className={`p-2 rounded-md transition-colors ${disqualifyingAnswer === "YES" ? "text-red-400 bg-red-400/10" : "text-muted-foreground hover:bg-muted"}`}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                        {/* Tooltip Eliminatoire */}
                        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-max p-2 bg-input text-primary text-xs rounded shadow-lg">
                          Définir comme réponse éliminatoire
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Raison d'élimination (Si OUI est sélectionné) */}
                  {isKnockout && ( disqualifyingAnswer === "YES" )&& (
                    <div className="ml-4 pl-4 border-l-2   animate-in fade-in">
                       <select 
                        className="w-65 bg-input dark:bg-input border rounded-md p-2 text-sm focus:outline-none"
                        value={disqualifyReason}
                        onChange={(e) => setDisqualifyReason(e.target.value)}
                       >
                         <option value="">Sélectionner la raison de l'élimination</option>
                         <option value="not_fit">Ne correspond pas</option>
                         <option value="lack_knowledge">Manque de connaissances</option>
                         <option value="overpriced">Trop cher</option>
                       </select>
                    </div>
                  )}

                  {/* Option NON */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-input rounded-md p-2.5 text-sm border border-transparent">Non</div>
                    {isKnockout && (
                      <div className="relative group">
                        <button 
                          onClick={() => setDisqualifyingAnswer("NO")}
                          className={`p-2 rounded-md transition-colors ${disqualifyingAnswer === "NO" ? "text-red-400 bg-red-400/10" : "text-muted-foreground hover:bg-muted"}`}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                   {isKnockout && ( disqualifyingAnswer === "NO" )&& (
                    <div className="ml-4 pl-4 border-l-2  animate-in fade-in">
                       <select 
                        className="w-64 bg-input border rounded-md p-2 text-sm focus:outline-none"
                        value={disqualifyReason}
                        onChange={(e) => setDisqualifyReason(e.target.value)}
                       >
                         <option value="">Sélectionner la raison de l'élimination</option>
                         <option value="not_fit">Ne correspond pas</option>
                         <option value="lack_knowledge">Manque de connaissances</option>
                         <option value="overpriced">Trop cher</option>
                       </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-[#3c2a4d] flex justify-between items-center">
                <span className="text-sm text-white flex items-center gap-1"><Info className="w-4 h-4"/> Visible pour tout le monde <ChevronDown className="w-3 h-3"/></span>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setShowQuestionEditor(false)}>Annuler</Button>
                  <Button variant="outline" className="border-[#3c2a4d]">Enregistrer et ajouter une autre</Button>
                  <Button className="bg-muted text-muted-foreground" disabled>Enregistrer</Button>
                </div>
              </div>
            </div>
          ) : (
            <Button variant="outline" onClick={handleAddQuestionClick} className="w-full border-dashed mt-2 text-muted-foreground">
              <Plus className="w-4 h-4 mr-2" /> Ajouter un nouveau
            </Button>
          )}
        </div>
      </section>

      {/* 3. EMAIL DE CONFIRMATION */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
             <Switch checked={autoEmailEnabled} onCheckedChange={setAutoEmailEnabled} className="mt-1" />
             <div>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  Envoyer un email de confirmation auto 
                  <Badge className="bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 text-[10px] uppercase">Plans payants</Badge>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Les candidats recevront un email automatisé après avoir postulé. <a href="#" className="text-primary hover:underline">En savoir plus</a></p>
             </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Settings className="w-4 h-4 mr-2" /> Personnalisé pour ce poste <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>

        {!autoEmailEnabled && (
          <div className="flex items-center justify-between p-3 rounded-lg border border-pink-500/20 bg-pink-500/5 mt-4">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <AlertCircle className="w-4 h-4 text-pink-500" />
              Cette fonctionnalité n'est pas disponible en période d'essai. Mettez à niveau votre plan.
            </div>
            <a href="#" className="text-sm font-semibold text-foreground underline decoration-muted-foreground hover:decoration-foreground">Mettre à niveau</a>
          </div>
        )}

        <div className={`mt-4 border border-border rounded-lg overflow-hidden transition-opacity ${!autoEmailEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="border-b border-border p-3 bg-muted/30">
            <Input className="border-none bg-transparent h-auto p-0 focus-visible:ring-0 text-sm font-medium" defaultValue="[job_offer] - Confirmation de votre candidature" />
          </div>
          <div className="p-3 bg-background min-h-[120px]">
            <Textarea 
              className="border-none bg-transparent p-0 focus-visible:ring-0 text-sm resize-none min-h-[100px]" 
              defaultValue={`Votre candidature pour le poste [job_offer] a été soumise avec succès.\n\nSi vous souhaitez ajouter quelque chose à votre candidature, répondez simplement à cet email.\n\n[company]`}
            />
          </div>
        </div>
      </section>

      {/* 4. PRÉFÉRENCES DE CANDIDATURE */}
      <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-bold text-foreground">Préférences de candidature</h2>
        <p className="text-sm text-muted-foreground mb-4">Choisissez les plateformes via lesquelles les candidats pourront postuler.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PlatformIntegration title="Postuler avec LinkedIn" status="add" />
          <PlatformIntegration title="Postuler avec Indeed" status="enabled" />
          <PlatformIntegration title="Postuler avec XING" status="add" />
          <PlatformIntegration title="Postuler avec WhatsApp" status="add" />
        </div>
      </section>

      {/* 5. NAVIGATION */}
      <div className="flex justify-between items-center pt-4 pb-8">
        <Button variant="ghost" onClick={() => onTabChange("job-details")} className="text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" /> Détails de l'emploi
        </Button>
        <Button onClick={() => onTabChange("team")} className="bg-muted hover:bg-muted/80 text-foreground">
          Équipe <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* DIALOG AVERTISSEMENT NOUVELLE QUESTION (REMPLACÉ PAR ALERT-DIALOG SHADCN) */}
      <AlertDialog open={isNewQuestionDialogOpen} onOpenChange={setIsNewQuestionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Ajouter une nouvelle question ?</AlertDialogTitle>
            <AlertDialogDescription className="text-base mt-2">
              L'ajout de questions créera un nouvel ensemble personnalisé pour ce poste. Les modifications apportées au modèle d'origine n'affecteront pas cet ensemble.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAddQuestion} className="bg-blue-600 hover:bg-blue-700 text-white">
              Ajouter une question
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

// --- SOUS-COMPOSANTS UTILITAIRES ---

function CandidateField({ icon, label, isOptional = false, isRequired = false, locked = false }: { icon: React.ReactNode, label: string, isOptional?: boolean, isRequired?: boolean, locked?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background group">
      <div className="flex items-center gap-3">
        <div className="w-5 flex justify-center">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
        {isOptional && <Badge variant="secondary" className="text-[10px] uppercase h-5 bg-muted/50">Optionnel</Badge>}
      </div>
      {!locked && (
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></Button>
        </div>
      )}
    </div>
  );
}

function PlatformIntegration({ title, status }: { title: string, status: "enabled" | "add" }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-bold">{title}</div>
      {status === "enabled" ? (
        <div className="flex items-center gap-2 text-sm text-emerald-500 font-medium">
          <Switch checked={true} className="data-[state=checked]:bg-emerald-500" /> Activé
        </div>
      ) : (
        <Button variant="outline" size="sm" className="h-8 text-xs font-medium">
          Ajouter l'intégration
        </Button>
      )}
    </div>
  );
}