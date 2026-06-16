// app/page.tsx
// ============================================================
// Landing page Talentix — Route "/"
// SEO poussé : metadata statique + JSON-LD structured data
// ============================================================

import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import "../landing.css"
import MethodSection from "@/components/landing/MethodSection";
import FeatureSection from "@/components/landing/FeaturesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
// ─── METADATA (SEO) ─────────────────────────────────────────
// Next.js App Router : exporter `metadata` depuis un page.tsx
// génère automatiquement les balises <head> correctes.
// ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ① Title : mot-clé principal + nom de marque
  //    Format recommandé : "Mot-clé | Marque"
  title: "Talentix — Logiciel de recrutement pour l'Afrique francophone",

  // ② Description : 150-160 caractères, contient les mots-clés
  description:
    "Talentix est le logiciel ATS de recrutement #1 dédié aux entreprises d'Afrique francophone. Scoring IA des CV, pipeline personnalisé, paiement Mobile Money (Wave, Orange Money, MTN MoMo). Essai gratuit.",

  // ③ Keywords : ancienne balise, moins utilisée par Google mais
  //    toujours lue par Bing, Yandex, et certains agrégateurs africains
  keywords: [
    "logiciel recrutement Afrique",
    "ATS Afrique francophone",
    "recrutement Sénégal",
    "recrutement Côte d'Ivoire",
    "recrutement Mali",
    "logiciel RH Afrique",
    "applicant tracking system Afrique",
    "gestion candidatures Afrique",
    "recrutement IA Afrique",
    "Talentix",
  ],

  // ④ Open Graph — contrôle l'aperçu sur WhatsApp, Facebook, LinkedIn
  openGraph: {
    type: "website",
    url: "https://talentix.africa",
    siteName: "Talentix",
    title: "Talentix — Logiciel de recrutement pour l'Afrique francophone",
    description:
      "Scoring IA des CV, pipeline de recrutement personnalisé et paiement Mobile Money. Le seul ATS conçu pour les entreprises africaines.",
    images: [
      {
        url: "https://talentix.africa/og-image.jpg", // à créer : 1200×630px
        width: 1200,
        height: 630,
        alt: "Talentix — Logiciel de recrutement Afrique",
      },
    ],
    locale: "fr_FR",
  },

  // ⑤ Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "Talentix — Logiciel de recrutement pour l'Afrique francophone",
    description:
      "Scoring IA des CV, pipeline personnalisé et paiement Mobile Money. Essai gratuit.",
    images: ["https://talentix.africa/og-image.jpg"],
    // creator: "@talentix_africa", // ajoute quand le compte existe
  },

  // ⑥ Robots — indexation normale (à passer sur noindex en staging !)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ⑦ Canonical — évite le duplicate content si l'URL est accessible
  //    avec et sans "www" ou en HTTP/HTTPS
  alternates: {
    canonical: "https://talentix.africa",
    languages: {
      // Si tu ajoutes une version anglaise plus tard :
      // "en-US": "https://talentix.africa/en",
      "fr-FR": "https://talentix.africa",
    },
  },

  // ⑧ Vérification Google Search Console
  // verification: {
  //   google: "COLLE-TON-CODE-ICI-DEPUIS-SEARCH-CONSOLE",
  // },

  // ⑨ Auteur / éditeur
  authors: [{ name: "Talentix", url: "https://talentix.africa" }],
  creator: "Talentix",
  publisher: "Talentix Africa",
};

// ─── JSON-LD STRUCTURED DATA ─────────────────────────────────
// Schema.org permet à Google d'afficher des rich snippets.
// On utilise deux schemas : SoftwareApplication + Organization
// ─────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Talentix",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Logiciel de recrutement (ATS) conçu pour les entreprises d'Afrique francophone avec scoring IA des CV et paiement Mobile Money.",
      url: "https://talentix.africa",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "XOF",
        description: "Plan gratuit disponible",
      },
      aggregateRating: {
        // À mettre à jour avec de vrais avis plus tard
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "24",
      },
    },
    {
      "@type": "Organization",
      name: "Talentix",
      url: "https://talentix.africa",
      logo: "https://talentix.africa/logo.png",
      sameAs: [
        // Ajoute tes réseaux sociaux ici quand ils existent
        // "https://linkedin.com/company/talentix",
        // "https://twitter.com/talentix_africa",
      ],
    },
  ],
};

// ─── PAGE COMPONENT ─────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      {/* JSON-LD injecté dans le <head> via next/script pattern */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        .landing-root est le wrapper qui scope nos variables CSS custom.
        Il n'interfère pas avec le thème shadcn/ui du dashboard
        car le dashboard est dans app/(app)/... et ne passe jamais
        par cette page.
      */}
      <div className="landing-root min-h-[500vh]">
        <Navbar />
        <main id="main-content px-[150px]">
          <HeroSection />
          <MethodSection/>
          <FeaturesSection/>
          <WhyUsSection/>
          {/* Les prochaines sections viendront ici : */}
          {/* <SocialProofSection /> */}
          {/* <FeaturesSection />    */}
          {/* <PricingSection />     */}
          {/* <FAQSection />         */}
          {/* <FinalCTASection />    */}
        </main>
      </div>
    </>
  );
}