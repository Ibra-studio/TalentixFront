// lib/candidates/status-styles.ts
//
// Fonction utilitaire pure, synchrone — PAS une Server Action.
// Elle ne doit jamais être dans un fichier "use server", puisque toute
// fonction exportée d'un fichier "use server" devient une Server Action,
// et les Server Actions doivent obligatoirement être async.
// getStatusStyle n'a aucune logique serveur (pas de DB, pas de fetch) :
// c'est du pur mapping stage -> classes Tailwind, utilisé côté UI.

export function getStatusStyle(stage: string): string {
  switch (stage) {
    case "Offre":
    case "Engagé":
    case "Embauché":
      return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
    case "Entretien RH":
    case "Entretien Direction":
    case "Entretien Téléphonique":
    case "Entretien sur site":
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
    case "Sélection":
    case "À trier":
    case "Postulé":
      return "bg-brand/10 text-brand border-brand/20";
    case "Test Technique":
    case "Évaluation":
      return "bg-muted text-muted-foreground border-border";
    case "Sourcé":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "text-muted-foreground border-transparent bg-transparent";
  }
}