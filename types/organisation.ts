export interface Organization {
  id: string;
  name: string;
  slug: string; // Ex: 'tehora' pour l'URL /tehora
  logoUrl?: string;
  coverImageUrl?: string;
  website?: string;
  industry?: string;
  location?: string;
  description?: string;
  themeColor?: string; // Utile pour personnaliser le bouton de la landing page
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  contactEmail?: string;
}