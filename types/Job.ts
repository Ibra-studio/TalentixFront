export interface Job {
  id: string
  title: string
  department: string
  location: string
  workModel: "Présentiel" | "Télétravail" 
  status: "Publié"  | "Brouillon" | "Fermé"
  candidatesCount: number
  dateCreated: string
  isFollow:boolean
}