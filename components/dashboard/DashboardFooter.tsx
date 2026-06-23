"use client";

import { Card } from "@/components/ui/card";
import { Scale, Code2, ShieldCheck, MailWarning, Tags, Fingerprint, Wrench, UserCog, Compass } from "lucide-react";

const discoverItems = [
  { title: "Évaluations équitables", desc: "Garantir un processus neutre", icon: Scale },
  { title: "Documentation API", desc: "Intégrations et Webhooks", icon: Code2 },
  { title: "Résoudre les problèmes mail", desc: "Configuration SMTP & IMAP", icon: MailWarning },
  { title: "Sécuriser votre compte 2FA", desc: "Double facteur obligatoire", icon: ShieldCheck },
  { title: "Organiser les jobs via tags", desc: "Gagner en clarté opérationnelle", icon: Tags },
  { title: "Authentification SSO", desc: "Connexion centralisée entreprise", icon: Fingerprint },
];

export function DashboardFooter() {
  return (
    <div className="border-t border-border mt-8 pt-8 space-y-8 pb-12">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold flex items-center gap-2"><Compass className="h-4 w-4 text-brand" /> Découvrir</h3>
          <span className="text-xs text-brand hover:underline cursor-pointer">Voir tous les articles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discoverItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-4 bg-card hover:border-brand/40 transition-colors flex items-center gap-3 cursor-pointer">
                <div className="p-2 rounded-lg bg-brand/10 text-brand-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs pt-4 border-t border-border/40">
        <div className="space-y-3">
          <h4 className="font-bold flex items-center gap-1.5 text-muted-foreground"><Wrench className="h-3.5 w-3.5" /> Configuration</h4>
          <ul className="space-y-2 text-foreground/80">
            <li className="hover:text-brand cursor-pointer">Modifier votre profil</li>
            <li className="hover:text-brand cursor-pointer">Gérer les collaborateurs</li>
            <li className="hover:text-brand cursor-pointer">Télécharger l'application mobile</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold flex items-center gap-1.5 text-muted-foreground"><UserCog className="h-3.5 w-3.5" /> Préférences personnelles</h4>
          <ul className="space-y-2 text-foreground/80">
            <li className="hover:text-brand cursor-pointer">Modifier l'apparence de Talentix</li>
            <li className="hover:text-brand cursor-pointer">Gérer les notifications</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold flex items-center gap-1.5 text-muted-foreground"><Compass className="h-3.5 w-3.5" /> Ressources</h4>
          <ul className="space-y-2 text-foreground/80">
            <li className="hover:text-brand cursor-pointer">Centre d'assistance</li>
            <li className="hover:text-brand cursor-pointer">Contacter le support</li>
            <li className="hover:text-brand cursor-pointer">Notre feuille de route (Roadmap)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}