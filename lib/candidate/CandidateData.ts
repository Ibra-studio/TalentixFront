import { Candidate } from "@/types/Candidate"

export const mockCandidates: Candidate[] = [
  { id: "1", name: "Ismaïl Diarra", initial: "SH", job: "Senior Marketer", status: "Qualifié", stage: "Embauché", alert: null, score: "5", date: "il y a 15 jours", pool: "—", avatarColor: "bg-orange-500" },
  { id: "2", name: "Emanuel Kone", initial: "JS", job: "Senior Marketer", status: "Qualifié", stage: "Entretien sur site", alert: null, score: "5", date: "il y a 16 jours", pool: "Senior Marketer Pool", avatarColor: "bg-amber-600" },
  { id: "3", name: "Ibrahim Diabate", initial: "JD", job: "Senior Marketer", status: "Nouveau", stage: "Postulé", alert: null, score: "-", date: "il y a 18 jours", pool: "—", avatarColor: "bg-blue-500" },
  { id: "4", name: "Rokiatou ibrahim", initial: "WR", job: "Developpeur junior", status: "En retard", stage: "Évaluation", alert: "-1j", score: "-", date: "il y a 19 jours", pool: "—", avatarColor: "bg-orange-600" },
  { id: "5", name: "Mariela Vasquez", initial: "MV", job: "Java Developpeur", status: "Qualifié", stage: "Entretien téléphonique", alert: null, score: "4", date: "il y a 19 jours", pool: "—", avatarColor: "bg-pink-600" },
  { id: "6", name: "Conor Moreno", initial: "CM", job: "Recruteur", status: "Qualifié", stage: "Sourcé", alert: null, score: "—", date: "il y a 21 jours", pool: "—", avatarColor: "bg-blue-600" },
  { id: "7", name: "Brooke Strosin", initial: "BS", job: "—", status: "Nouveau", stage: "Postulé", alert: null, score: "—", date: "il y a 23 jours", pool: "Pool Marketing", avatarColor: "bg-orange-400" },
]

export const getStatusStyle = (stage: string) => {
  switch (stage) {
    case 'Embauché':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
    case 'Entretien sur site':
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
    case 'Postulé':
      return 'bg-brand/10 text-brand border-brand/20';
    case 'Entretien téléphonique':
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
    case 'Évaluation':
      return 'bg-muted text-muted-foreground border-border';
    case 'Sourcé':
      return 'bg-muted text-muted-foreground border-border';
    default:
      return 'text-muted-foreground border-transparent bg-transparent';
  }
}
